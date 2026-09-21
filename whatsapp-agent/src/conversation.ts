// Turns the raw Chatwoot message list of a conversation into the alternating
// user/assistant history that the Anthropic Messages API expects.

export type ChatwootMessage = {
  id: number
  content?: string | null
  // The REST API returns numbers (0 incoming, 1 outgoing, 2 activity, 3 template);
  // webhook payloads use strings ('incoming' / 'outgoing'). Accept both.
  message_type: number | string
  private?: boolean
  attachments?: unknown[] | null
}

export type ChatTurn = { role: 'user' | 'assistant'; content: string }

export type History = {
  turns: ChatTurn[]
  userMessages: number
  lastDirection: 'incoming' | 'outgoing' | null
}

const ATTACHMENT_PLACEHOLDER = '[o cliente enviou um anexo — conteúdo indisponível para a assistente]'

function directionOf(type: number | string): 'incoming' | 'outgoing' | null {
  if (type === 0 || type === 'incoming') return 'incoming'
  if (type === 1 || type === 'outgoing') return 'outgoing'
  return null // activity / template messages are not part of the conversation
}

export function buildHistory(messages: ChatwootMessage[]): History {
  const sorted = [...messages].sort((a, b) => a.id - b.id)
  const turns: ChatTurn[] = []
  let userMessages = 0
  let lastDirection: History['lastDirection'] = null

  for (const message of sorted) {
    if (message.private) continue // private notes are internal, never part of the chat
    const direction = directionOf(message.message_type)
    if (!direction) continue

    let text = (message.content ?? '').trim()
    if (!text && direction === 'incoming' && (message.attachments?.length ?? 0) > 0) {
      text = ATTACHMENT_PLACEHOLDER
    }
    if (!text) continue

    const role = direction === 'incoming' ? 'user' : 'assistant'
    lastDirection = direction
    if (direction === 'incoming') userMessages++

    const previous = turns[turns.length - 1]
    if (previous && previous.role === role) {
      previous.content += `\n${text}` // API wants strictly alternating roles
    } else {
      turns.push({ role, content: text })
    }
  }

  // The API requires the first message to come from the user.
  while (turns.length > 0 && turns[0].role === 'assistant') turns.shift()

  return { turns, userMessages, lastDirection }
}
