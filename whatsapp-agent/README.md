# Laís Mota — WhatsApp AI triage agent

Receives incoming WhatsApp messages via Chatwoot, has Claude do initial intake/triage
(name, area of interest, brief reason for contact), and flags the conversation for
Laís to take over — the AI never gives legal advice or comments on a case; see
`src/systemPrompt.ts` for the exact guardrails and why they matter (OAB ethics rules,
contract clause 3 and LGPD clause 9).

## Architecture

```
Client on WhatsApp
      │
      ▼
Meta WhatsApp Cloud API (her number)
      │
      ▼
Chatwoot (shared inbox — she also uses this to take over conversations)
      │  Agent Bot webhook: message_created  →  POST /webhook/chatwoot?token=...
      ▼
This service  →  Claude (Anthropic API)  →  reply back through Chatwoot
```

### How a message is handled (`src/app.ts`)

1. The webhook URL carries `?token=WEBHOOK_SECRET`; anything else gets a 401.
2. Only `message_created` events for **incoming, non-private** messages are processed;
   retried deliveries of the same message id are ignored.
3. The bot stays silent if the conversation is not `pending` (already escalated) or is
   assigned to a human (`conversation.meta.assignee`).
4. The full thread is fetched from the Chatwoot API (the webhook only carries the latest
   message), private notes are dropped, and it is sent to Claude as alternating turns.
   Messages of the same conversation are processed one at a time.
5. Reply handling:
   - normal reply → sent back through Chatwoot;
   - reply ending in `[[ESCALATE]]` → marker stripped, reply sent, conversation moved to
     `open` (human queue) and a **private note** is added for Laís;
   - attachments (image/audio/document) → fixed message + escalation, Claude is not called
     (the AI must not analyse documents or collect sensitive data);
   - Claude error, empty answer, or `MAX_USER_MESSAGES` reached → fixed message + escalation,
     so the client is never left without an answer.

Once Laís assigns a conversation to herself (or it is moved to `open`), this service stops
responding to it — she takes over inside the exact same WhatsApp thread.

## Setup checklist

1. **WhatsApp number**: register her number with Meta Business Manager for the WhatsApp
   Cloud API. Choose the **coexistence** onboarding so she can keep using the WhatsApp
   Business app on the same number. Note the *Phone number ID*, *WhatsApp Business
   Account ID* and a permanent access token (System User).
2. **Chatwoot**: deploy an instance (self-hosted, e.g. Oracle Cloud Always Free, or Chatwoot
   Cloud). Create a *WhatsApp Cloud* inbox with the data from step 1.
3. **Agent Bot**: Settings → Integrations → Bots → *Add bot*.
   - Outgoing URL: `https://<where-this-service-is-hosted>/webhook/chatwoot?token=<WEBHOOK_SECRET>`
   - Then open the WhatsApp inbox → Settings → Configuration → select this bot.
     New conversations now start as `pending` and are routed to the bot.
   - Copy the bot's **access token** (used as `CHATWOOT_API_ACCESS_TOKEN`).
4. `cp .env.example .env` and fill it in (`ANTHROPIC_API_KEY`, `CHATWOOT_*`,
   `WEBHOOK_SECRET` — generate with `openssl rand -hex 24` — and `OAB_NUMBER`).
5. Run locally: `npm install && npm run dev`, then `ngrok http 3333` and put the ngrok
   https URL (with the `?token=`) in the Agent Bot's Outgoing URL while testing.
6. Test from another phone (see checklist below), then deploy.
7. Deploy: `npm ci && npm run build && NODE_ENV=production npm start` on any host with
   Node 20+ reachable over HTTPS by Chatwoot (Railway/Render, or the same VM as Chatwoot
   behind a reverse proxy; keep it running with pm2/systemd/Docker). In production the
   service **refuses to start without a real `OAB_NUMBER`**.
   Health check: `GET /health`.
8. Update `siteConfig.whatsappUrl` in the main site (`src/lib/site.ts`) to the live number.

### Manual test checklist

- [ ] "Oi" from another phone → bot introduces itself as an automated assistant.
- [ ] Give name / area / short reason → bot hands off, conversation moves to *Open*, a private note appears, and the client did **not** see the note.
- [ ] Send another message after the handoff → bot stays silent.
- [ ] Ask a legal question ("posso pedir o divórcio sem…?") → immediate handoff, no legal answer.
- [ ] Send a photo/PDF → fixed "não consigo abrir anexos" message + handoff.
- [ ] Assign the conversation to yourself in Chatwoot and write → bot stays silent.

## Development

```
npm run typecheck   # tsc --noEmit
npm test            # unit tests + end-to-end webhook tests against mock Chatwoot/Anthropic servers
npm run build       # compile to dist/
```

## Cost and usage tracking

Each Claude call logs its token usage (`[usage] ...`) and the service keeps monthly
counters in `USAGE_FILE` (`data/usage.json`): distinct conversations and input/output
tokens. A warning is logged at 80% and above `MONTHLY_CONVERSATION_CAP` (contract: 100
automated conversations/month). The Claude API is a real operating cost, not covered by
the client's price (contract clause 2.3) — compare these numbers with the R$500/month
margin. `ANTHROPIC_MODEL` can be changed without touching the code.

## What the agent will and won't do

- **Will**: greet, confirm it's an AI, collect name/company, área de atuação, a short
  reason for contact, and availability — then hand off. It can also state the areas of
  practice and the professional address.
- **Won't**: answer any legal question, discuss case specifics, estimate outcomes,
  timelines or fees, or handle documents/attachments. Any of those trigger an immediate
  handoff instead of an attempt to answer.

This scope is deliberate — an AI giving legal opinions risks unauthorized practice of
law and violates OAB advertising/ethics rules. Don't widen the system prompt's scope
without re-checking that constraint.
