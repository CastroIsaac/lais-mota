# WhatsApp com IA via n8n — um número só (celular + IA)

A Laís usa o número normalmente no **app WhatsApp Business** do celular, e a IA
responde pelo mesmo número via **Cloud API** (recurso "Coexistence" da Meta).
Quando ela responde algo pelo celular, a Meta avisa o n8n (`smb_message_echoes`)
e a IA para de falar com aquele contato por `HUMAN_PAUSE_HOURS` (padrão: 72h).

Substitui o Chatwoot + `whatsapp-agent/`. O prompt da IA é o mesmo de
`whatsapp-agent/src/systemPrompt.ts`: só triagem, sem opinião jurídica (OAB/LGPD).

```
Cliente ──WhatsApp──► Meta (Cloud API, coexistência) ──webhook──► n8n
                                   ▲                              │ Claude faz a triagem
   Celular da Laís (app Business) ─┘ eco: "humano assumiu"        ▼
                                                    resposta pela API + e-mail pra Laís ao escalar
```

## 1. Número (coexistência)

1. O número definitivo precisa estar no **app WhatsApp Business** (versão 2.24.17+),
   em uso há alguns dias. **Não** pode estar registrado só na API.
   - O Phone Number ID `1296452826890177` do `deploy/README.md` foi registrado
     só na API. Se for esse o número, exclua-o no WhatsApp Manager antes e
     ative o app Business com ele.
2. Conecte o número à API pelo fluxo de coexistência (Embedded Signup com
   "conectar app WhatsApp Business existente"): ela digita o código SMS e lê um
   QR code no app. Dá pra importar o histórico de conversas.
   - Caminho direto exige app Meta como Tech Provider + empresa verificada.
   - Alternativa mais simples: um BSP com coexistência (ex.: 360dialog).
3. No app Meta, em WhatsApp → Configuração, assine os campos de webhook:
   `messages`, `smb_message_echoes` (obrigatório pra pausa funcionar),
   `history`, `smb_app_state_sync`.

## 2. Servidor

1. DNS no registro.br: registro **A** `n8n` → `89.167.17.6`.
2. Depois de propagar (`ping n8n.laismotaadvocacia.com.br`), no seu Mac:
   ```
   ssh root@89.167.17.6 'bash -s' < deploy/n8n/03-n8n.sh
   ```
3. Abra https://n8n.laismotaadvocacia.com.br e crie a conta de dono.

## 3. Credenciais no n8n (Credentials → Add)

| Nome (exato)    | Tipo          | Valores |
|-----------------|---------------|---------|
| `WhatsApp API`  | Header Auth   | Name `Authorization`, Value `Bearer <token permanente do System User>` (360dialog: Name `D360-API-KEY`, Value a chave) |
| `Anthropic`     | Anthropic     | chave da API |
| `Postgres n8n`  | Postgres      | Host `postgres`, Database `n8n`, User `n8n`, senha = `POSTGRES_PASSWORD` do `.env` no servidor |
| `SMTP`          | SMTP          | ex. Resend: host `smtp.resend.com`, porta 465, SSL, user `resend`, senha = API key (domínio verificado no Resend) |

## 4. Workflow

1. Workflows → Import from file → `workflow-whatsapp-ia.json`.
2. Abra cada nó com credencial (Marcar lida, Enviar resposta, Claude, Memória,
   Avisar Laís) e selecione a credencial correspondente.
3. Edite o nó **Config** (e o **Config (verificação)**, mesmos valores):
   - `VERIFY_TOKEN`: um texto aleatório qualquer (você repete na Meta).
   - `APP_SECRET`: App Secret do app Meta (Configurações → Básico). Valida que
     o webhook veio mesmo da Meta. Com 360dialog, deixe vazio.
   - `API_BASE`: `https://graph.facebook.com/v23.0/<PHONE_NUMBER_ID>`
     (360dialog: `https://waba-v2.360dialog.io`).
   - `NOTIFY_EMAIL`: pra onde vai o aviso "cliente aguardando".
4. Ative o workflow (toggle **Active**). Pausas e anti-duplicados só ficam
   salvos em execução de produção, não no botão "Test".
5. URL de produção do webhook (no nó "WhatsApp (POST)"):
   `https://n8n.laismotaadvocacia.com.br/webhook/whatsapp-88e6c06fb400`
   Coloque essa URL + o `VERIFY_TOKEN` no app Meta (WhatsApp → Configuração →
   Webhook) e clique em verificar. No 360dialog, configure via API deles.

## 5. Testar

De outro celular, mande "oi" pro número:
- a IA responde se apresentando como assistente virtual;
- depois de nome + área + resumo, ela encerra e chega o e-mail pra Laís;
- a Laís responde pelo celular → a IA não fala mais com aquele contato por 72h;
- mande um áudio → mensagem fixa + e-mail (a IA não abre anexos).

Problemas? Veja **Executions** no n8n. Se der erro "Corpo bruto indisponível",
deixe `APP_SECRET` vazio (a URL do webhook já tem um trecho aleatório).

## Regras que valem saber

- Janela de 24h: fora dela, a API só envia **template** aprovado. Como a IA só
  responde quem acabou de escrever, isso não é problema.
- Coexistência: sem selo azul, sem grupos via API; a Laís precisa abrir o app
  pelo menos a cada ~14 dias pra manter a ligação.
- Trocar o número no site: `src/lib/site.ts` (`phoneDisplay` e `whatsappUrl`).
