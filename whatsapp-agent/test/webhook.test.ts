// End-to-end test of the webhook flow against mock Chatwoot and Anthropic servers.
import test, { before, after, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import type { AddressInfo } from 'node:net'

type Call = { method: string; url: string; body: any }

const chatwootCalls: Call[] = []
const anthropicCalls: Call[] = []
let thread: any[] = []
let claudeReply: string | 'ERROR' = 'Olá! Sou a assistente virtual da Dra. Laís. Qual o seu nome completo?'

function startMock(handler: (req: http.IncomingMessage, body: any, res: http.ServerResponse) => void) {
  const server = http.createServer((req, res) => {
    let raw = ''
    req.on('data', (chunk) => (raw += chunk))
    req.on('end', () => handler(req, raw ? JSON.parse(raw) : undefined, res))
  })
  return new Promise<http.Server>((resolve) => server.listen(0, () => resolve(server)))
}

const urlOf = (server: http.Server) => `http://127.0.0.1:${(server.address() as AddressInfo).port}`

let chatwootMock: http.Server
let anthropicMock: http.Server
let appServer: http.Server
let baseUrl: string
let idle: () => Promise<void>
let nextMessageId = 1000

before(async () => {
  chatwootMock = await startMock((req, body, res) => {
    chatwootCalls.push({ method: req.method!, url: req.url!, body })
    res.setHeader('Content-Type', 'application/json')
    if (req.method === 'GET') res.end(JSON.stringify({ payload: thread }))
    else {
      // behave like Chatwoot: a public reply becomes part of the thread
      if (req.url!.endsWith('/messages') && body && !body.private) {
        thread.push({ id: 5000 + thread.length, content: body.content, message_type: 1 })
      }
      res.end(JSON.stringify({ id: 1 }))
    }
  })
  anthropicMock = await startMock((req, body, res) => {
    anthropicCalls.push({ method: req.method!, url: req.url!, body })
    res.setHeader('Content-Type', 'application/json')
    if (claudeReply === 'ERROR') {
      res.statusCode = 400
      res.end(JSON.stringify({ type: 'error', error: { type: 'invalid_request_error', message: 'boom' } }))
      return
    }
    res.end(
      JSON.stringify({
        id: 'msg_test',
        type: 'message',
        role: 'assistant',
        model: 'test',
        content: [{ type: 'text', text: claudeReply }],
        stop_reason: 'end_turn',
        stop_sequence: null,
        usage: { input_tokens: 100, output_tokens: 20 },
      }),
    )
  })

  Object.assign(process.env, {
    ANTHROPIC_API_KEY: 'test-key',
    ANTHROPIC_BASE_URL: urlOf(anthropicMock),
    CHATWOOT_BASE_URL: urlOf(chatwootMock) + '/',
    CHATWOOT_API_ACCESS_TOKEN: 'cw-token',
    CHATWOOT_ACCOUNT_ID: '1',
    WEBHOOK_SECRET: 's3cret',
    OAB_NUMBER: 'OAB/DF nº 99.999',
    MAX_USER_MESSAGES: '3',
    USAGE_FILE: path.join(os.tmpdir(), `usage-${process.pid}.json`),
  })

  const mod = await import('../src/app.js')
  idle = mod.idle
  appServer = await new Promise<http.Server>((resolve) => {
    const s = mod.app.listen(0, () => resolve(s))
  })
  baseUrl = urlOf(appServer)
})

after(() => {
  chatwootMock.close()
  anthropicMock.close()
  appServer.close()
})

beforeEach(() => {
  chatwootCalls.length = 0
  anthropicCalls.length = 0
  thread = []
  claudeReply = 'Olá! Sou a assistente virtual da Dra. Laís. Qual o seu nome completo?'
})

function payload(overrides: Record<string, unknown> = {}, conversation: Record<string, unknown> = {}) {
  return {
    event: 'message_created',
    id: nextMessageId++,
    message_type: 'incoming',
    content: 'Oi',
    conversation: { id: 42, status: 'pending', meta: { assignee: null }, ...conversation },
    ...overrides,
  }
}

async function post(body: unknown, token = 's3cret') {
  const res = await fetch(`${baseUrl}/webhook/chatwoot?token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  await idle()
  return res
}

const posts = () => chatwootCalls.filter((c) => c.method === 'POST')
const replies = () => posts().filter((c) => c.url.endsWith('/messages') && !c.body.private)
const notes = () => posts().filter((c) => c.url.endsWith('/messages') && c.body.private)
const toggles = () => posts().filter((c) => c.url.endsWith('/toggle_status'))

test('rejects requests without the correct token', async () => {
  const res = await post(payload(), 'wrong')
  assert.equal(res.status, 401)
  assert.equal(chatwootCalls.length, 0)
  assert.equal(anthropicCalls.length, 0)
})

test('answers a first message using the full thread from the Chatwoot API', async () => {
  thread = [{ id: 1, content: 'Oi', message_type: 0 }]
  const res = await post(payload())
  assert.equal(res.status, 200)

  assert.equal(anthropicCalls.length, 1)
  assert.deepEqual(anthropicCalls[0].body.messages, [{ role: 'user', content: 'Oi' }])
  assert.match(anthropicCalls[0].body.system, /OAB\/DF nº 99\.999/)
  assert.doesNotMatch(anthropicCalls[0].body.system, /\{\{/)

  assert.equal(replies().length, 1)
  assert.match(replies()[0].body.content, /assistente virtual/)
  assert.equal(replies()[0].body.message_type, 'outgoing')
  assert.equal(toggles().length, 0)
})

test('sends previous turns (not just the last message) to Claude, without private notes', async () => {
  thread = [
    { id: 1, content: 'Oi', message_type: 0 },
    { id: 2, content: 'Qual o seu nome completo?', message_type: 1 },
    { id: 3, content: 'nota interna', message_type: 1, private: true },
    { id: 4, content: 'Maria Souza', message_type: 0 },
  ]
  await post(payload())
  assert.deepEqual(anthropicCalls[0].body.messages, [
    { role: 'user', content: 'Oi' },
    { role: 'assistant', content: 'Qual o seu nome completo?' },
    { role: 'user', content: 'Maria Souza' },
  ])
})

test('escalates when the model emits the marker: strips it, opens the conversation, adds a private note', async () => {
  thread = [{ id: 1, content: 'Quero falar com a advogada', message_type: 0 }]
  claudeReply = 'Obrigada pelas informações. Vou repassar para a Dra. Laís Mota.\n[[ESCALATE]]'
  await post(payload())

  assert.equal(replies().length, 1)
  assert.ok(!replies()[0].body.content.includes('[[ESCALATE]]'))
  assert.match(replies()[0].body.content, /Dra\. Laís/)
  assert.equal(toggles().length, 1)
  assert.equal(toggles()[0].body.status, 'open')
  assert.equal(notes().length, 1)
})

test('stays silent when the conversation is assigned to a human', async () => {
  thread = [{ id: 1, content: 'Oi', message_type: 0 }]
  await post(payload({}, { meta: { assignee: { id: 7 } } }))
  assert.equal(chatwootCalls.length, 0)
  assert.equal(anthropicCalls.length, 0)
})

test('stays silent when the conversation is no longer pending (already escalated)', async () => {
  thread = [{ id: 1, content: 'Oi', message_type: 0 }]
  await post(payload({}, { status: 'open' }))
  assert.equal(chatwootCalls.length, 0)
  assert.equal(anthropicCalls.length, 0)
})

test('ignores outgoing messages, private notes and other events', async () => {
  await post(payload({ message_type: 'outgoing' }))
  await post(payload({ private: true }))
  await post(payload({ event: 'conversation_status_changed' }))
  assert.equal(chatwootCalls.length, 0)
  assert.equal(anthropicCalls.length, 0)
})

test('processes a retried webhook delivery only once', async () => {
  thread = [{ id: 1, content: 'Oi', message_type: 0 }]
  const body = payload()
  await post(body)
  await post(body)
  assert.equal(anthropicCalls.length, 1)
  assert.equal(replies().length, 1)
})

test('does not answer when the last message in the thread is already a reply', async () => {
  thread = [
    { id: 1, content: 'Oi', message_type: 0 },
    { id: 2, content: 'Olá! Qual o seu nome?', message_type: 1 },
  ]
  await post(payload())
  assert.equal(anthropicCalls.length, 0)
  assert.equal(replies().length, 0)
})

test('hands attachments to a human without calling Claude', async () => {
  thread = [{ id: 1, content: null, message_type: 0, attachments: [{ file_type: 'file' }] }]
  await post(payload({ content: null, attachments: [{ file_type: 'file' }] }))
  assert.equal(anthropicCalls.length, 0)
  assert.equal(replies().length, 1)
  assert.match(replies()[0].body.content, /não consigo abrir/)
  assert.equal(toggles().length, 1)
  assert.equal(notes().length, 1)
})

test('hands off automatically after too many client messages', async () => {
  thread = [
    { id: 1, content: 'Oi', message_type: 0 },
    { id: 2, content: 'Tudo bem?', message_type: 0 },
    { id: 3, content: 'Alguém aí?', message_type: 0 },
  ]
  await post(payload())
  assert.equal(anthropicCalls.length, 0)
  assert.equal(replies().length, 1)
  assert.equal(toggles().length, 1)
})

test('falls back to a human handoff when the Claude request fails', async () => {
  thread = [{ id: 1, content: 'Oi', message_type: 0 }]
  claudeReply = 'ERROR'
  await post(payload())
  assert.equal(replies().length, 1)
  assert.match(replies()[0].body.content, /instabilidade/)
  assert.equal(toggles().length, 1)
})

test('serializes bursts of messages in the same conversation (one reply only)', async () => {
  thread = [
    { id: 1, content: 'Oi', message_type: 0 },
    { id: 2, content: 'Preciso de ajuda', message_type: 0 },
  ]
  const send = () =>
    fetch(`${baseUrl}/webhook/chatwoot?token=s3cret`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload()),
    })
  await Promise.all([send(), send()])
  await idle()
  // The first run answers the whole burst; the second re-reads the thread, sees the
  // bot's reply as the last message and stays quiet.
  assert.equal(anthropicCalls.length, 1)
  assert.equal(replies().length, 1)
})
