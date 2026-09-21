import crypto from 'node:crypto'
import express from 'express'
import Anthropic from '@anthropic-ai/sdk'
import { config } from './config.js'
import { buildSystemPrompt, ESCALATE_MARKER } from './systemPrompt.js'
import { addPrivateNote, getMessages, markConversationOpen, sendReply } from './chatwootClient.js'
import { buildHistory } from './conversation.js'
import { recordConversation, recordTokens } from './usage.js'

const anthropic = new Anthropic({ apiKey: config.anthropicApiKey, maxRetries: 2, timeout: 30_000 })
const systemPrompt = buildSystemPrompt(config.oabNumber)

// Fixed messages used when Claude is not (or cannot be) involved. They keep the same
// sober tone as the prompt and never touch the substance of a case.
const HANDOFF_MESSAGE =
  'Obrigada pelas informações. Vou repassar para a Dra. Laís Mota, que vai te responder por aqui em breve.'
const ATTACHMENT_MESSAGE =
  'Sou uma assistente virtual e não consigo abrir imagens, áudios ou documentos por aqui. Vou repassar sua mensagem para a Dra. Laís Mota, que vai te responder por aqui em breve.'
const FALLBACK_MESSAGE =
  'O atendimento automatizado está com uma instabilidade momentânea. Já repassei sua mensagem para a Dra. Laís Mota, que vai te responder por aqui em breve.'

type ChatwootWebhookPayload = {
  event?: string
  id?: number
  message_type?: string
  private?: boolean
  content?: string | null
  attachments?: unknown[] | null
  conversation?: {
    id: number
    status?: string
    meta?: { assignee?: { id: number } | null }
  }
}

export const app = express()
app.use(express.json({ limit: '1mb' }))

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

function isAuthorized(candidate: unknown): boolean {
  if (typeof candidate !== 'string') return false
  const a = crypto.createHash('sha256').update(candidate).digest()
  const b = crypto.createHash('sha256').update(config.webhookSecret).digest()
  return crypto.timingSafeEqual(a, b)
}

app.post('/webhook/chatwoot', (req, res) => {
  if (!isAuthorized(req.query.token)) {
    res.status(401).json({ error: 'unauthorized' })
    return
  }
  // Always ack fast — Chatwoot retries webhooks that don't respond quickly.
  res.status(200).json({ ok: true })

  const payload = req.body as ChatwootWebhookPayload
  if (!shouldProcess(payload)) return
  enqueue(payload.conversation!.id, () => handleEvent(payload))
})

// ---- filtering -----------------------------------------------------------------------

const seenMessageIds = new Set<number>()

function shouldProcess(payload: ChatwootWebhookPayload): boolean {
  if (payload.event !== 'message_created') return false
  if (payload.message_type !== 'incoming') return false // ignore the bot's/agent's own messages
  if (payload.private) return false
  if (!payload.conversation) return false

  // Chatwoot retries deliveries; never answer the same message twice.
  if (typeof payload.id === 'number') {
    if (seenMessageIds.has(payload.id)) return false
    seenMessageIds.add(payload.id)
    if (seenMessageIds.size > 1000) {
      seenMessageIds.delete(seenMessageIds.values().next().value as number)
    }
  }
  return true
}

// ---- per-conversation queue ----------------------------------------------------------
// A client often sends several short messages in a row. Handling them one at a time
// (each run re-reads the whole thread) avoids duplicate or out-of-order replies.

const queues = new Map<number, Promise<void>>()

function enqueue(conversationId: number, task: () => Promise<void>) {
  const previous = queues.get(conversationId) ?? Promise.resolve()
  const next: Promise<void> = previous
    .then(task)
    .catch((err) => console.error(`Failed to handle conversation ${conversationId}`, err))
    .finally(() => {
      if (queues.get(conversationId) === next) queues.delete(conversationId)
    })
  queues.set(conversationId, next)
}

/** Resolves when every queued conversation has finished (used by the tests). */
export async function idle() {
  while (queues.size > 0) await Promise.all([...queues.values()])
}

// ---- main flow -----------------------------------------------------------------------

async function handleEvent(payload: ChatwootWebhookPayload) {
  const conversation = payload.conversation!

  // Once the conversation leaves "pending" (escalated) or Laís takes it over, stay silent.
  if (conversation.status && conversation.status !== 'pending') return
  if (conversation.meta?.assignee) return

  const history = buildHistory(await getMessages(conversation.id))
  // Nothing new to answer (e.g. another run already replied to this burst of messages).
  if (history.lastDirection !== 'incoming' || history.turns.length === 0) return

  recordConversation(conversation.id)

  // LGPD / contract: documents, images and audio are not handled by the AI.
  if ((payload.attachments?.length ?? 0) > 0) {
    await escalate(conversation.id, ATTACHMENT_MESSAGE, 'Cliente enviou um anexo (imagem, áudio ou documento); a IA não abre anexos.')
    return
  }

  if (history.userMessages >= config.maxUserMessages) {
    await escalate(conversation.id, HANDOFF_MESSAGE, 'Triagem passou do limite de mensagens sem concluir; encaminhada automaticamente.')
    return
  }

  let rawReply: string
  try {
    const completion = await anthropic.messages.create({
      model: config.anthropicModel,
      max_tokens: 400,
      system: systemPrompt,
      messages: history.turns,
    })
    recordTokens(completion.usage.input_tokens, completion.usage.output_tokens)
    const textBlock = completion.content.find((block) => block.type === 'text')
    rawReply = textBlock?.type === 'text' ? textBlock.text : ''
  } catch (err) {
    console.error('Claude request failed — handing off to a human', err)
    await escalate(conversation.id, FALLBACK_MESSAGE, 'Falha ao consultar a IA; conversa encaminhada para atendimento humano.')
    return
  }

  const shouldEscalate = rawReply.includes(ESCALATE_MARKER)
  const visibleReply = rawReply.split(ESCALATE_MARKER).join('').trim()

  if (shouldEscalate) {
    await escalate(conversation.id, visibleReply || HANDOFF_MESSAGE, 'Triagem concluída pela IA — conversa pronta para a Dra. Laís assumir.')
  } else if (visibleReply) {
    await sendReply(conversation.id, visibleReply)
  } else {
    // An empty answer would leave the client hanging — hand off instead.
    await escalate(conversation.id, FALLBACK_MESSAGE, 'A IA não gerou resposta; conversa encaminhada para atendimento humano.')
  }
}

async function escalate(conversationId: number, message: string, note: string) {
  await sendReply(conversationId, message)
  await markConversationOpen(conversationId)
  await addPrivateNote(conversationId, `🔔 ${note}`)
}
