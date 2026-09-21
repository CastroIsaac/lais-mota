import { config } from './config.js'
import type { ChatwootMessage } from './conversation.js'

const { baseUrl, apiAccessToken, accountId } = config.chatwoot

async function chatwootFetch<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${baseUrl}/api/v1/accounts/${accountId}${path}`, {
    ...init,
    signal: AbortSignal.timeout(15_000),
    headers: {
      'Content-Type': 'application/json',
      api_access_token: apiAccessToken,
      ...init.headers,
    },
  })
  if (!res.ok) {
    throw new Error(`Chatwoot API error ${res.status} on ${path}: ${await res.text()}`)
  }
  return (await res.json()) as T
}

// The webhook payload only carries the message that triggered it, so the full thread is
// fetched here (Chatwoot returns the most recent ~20 messages, oldest first).
export async function getMessages(conversationId: number): Promise<ChatwootMessage[]> {
  const data = await chatwootFetch<{ payload?: ChatwootMessage[] }>(
    `/conversations/${conversationId}/messages`,
  )
  return data.payload ?? []
}

export function sendReply(conversationId: number, content: string) {
  return chatwootFetch(`/conversations/${conversationId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ content, message_type: 'outgoing', private: false }),
  })
}

// Private notes are only visible inside Chatwoot, never sent to the client on WhatsApp —
// used to tell Laís why a conversation was escalated without exposing it in the thread.
export function addPrivateNote(conversationId: number, content: string) {
  return chatwootFetch(`/conversations/${conversationId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ content, message_type: 'outgoing', private: true }),
  })
}

// Moving the conversation from "pending" (bot-handled) to "open" puts it in the human
// agents' queue — and Chatwoot stops delivering further events to the Agent Bot.
export function markConversationOpen(conversationId: number) {
  return chatwootFetch(`/conversations/${conversationId}/toggle_status`, {
    method: 'POST',
    body: JSON.stringify({ status: 'open' }),
  })
}
