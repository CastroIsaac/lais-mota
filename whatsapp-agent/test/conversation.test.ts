import test from 'node:test'
import assert from 'node:assert/strict'
import { buildHistory } from '../src/conversation.js'

test('maps numeric and string message types, skips private notes and activity', () => {
  const history = buildHistory([
    { id: 1, content: 'Olá', message_type: 0 },
    { id: 2, content: 'Olá! Sou a assistente virtual.', message_type: 1 },
    { id: 3, content: 'nota interna', message_type: 1, private: true },
    { id: 4, content: 'Conversation was marked pending', message_type: 2 },
    { id: 5, content: 'Preciso de ajuda com um contrato', message_type: 'incoming' },
  ])
  assert.deepEqual(history.turns, [
    { role: 'user', content: 'Olá' },
    { role: 'assistant', content: 'Olá! Sou a assistente virtual.' },
    { role: 'user', content: 'Preciso de ajuda com um contrato' },
  ])
  assert.equal(history.userMessages, 2)
  assert.equal(history.lastDirection, 'incoming')
})

test('merges consecutive messages of the same role and sorts by id', () => {
  const history = buildHistory([
    { id: 3, content: 'sobre um contrato', message_type: 0 },
    { id: 2, content: 'tudo bem?', message_type: 0 },
    { id: 1, content: 'Oi', message_type: 0 },
  ])
  assert.deepEqual(history.turns, [{ role: 'user', content: 'Oi\ntudo bem?\nsobre um contrato' }])
  assert.equal(history.userMessages, 3)
})

test('drops leading assistant turns so the history starts with the user', () => {
  const history = buildHistory([
    { id: 1, content: 'Mensagem enviada pela Laís antes', message_type: 1 },
    { id: 2, content: 'Oi', message_type: 0 },
  ])
  assert.deepEqual(history.turns, [{ role: 'user', content: 'Oi' }])
})

test('uses a placeholder for attachment-only messages and ignores empty ones', () => {
  const history = buildHistory([
    { id: 1, content: null, message_type: 0, attachments: [{ file_type: 'image' }] },
    { id: 2, content: '  ', message_type: 0 },
  ])
  assert.equal(history.turns.length, 1)
  assert.match(history.turns[0].content, /anexo/)
})

test('reports the last direction so the bot does not answer its own message', () => {
  const history = buildHistory([
    { id: 1, content: 'Oi', message_type: 0 },
    { id: 2, content: 'Olá!', message_type: 1 },
  ])
  assert.equal(history.lastDirection, 'outgoing')
})
