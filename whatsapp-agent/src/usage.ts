// Tiny file-backed usage tracker so the real cost can be compared with the R$500/month
// margin, and the contractual cap (100 automated conversations/month) can be watched.
// Note: on hosts with an ephemeral disk the file resets on redeploy — the console logs
// (`[usage] ...`) remain the source of truth in that case.

import fs from 'node:fs'
import path from 'node:path'
import { config } from './config.js'

type UsageFile = {
  month: string
  conversations: number[]
  inputTokens: number
  outputTokens: number
}

function currentMonth() {
  return new Date().toISOString().slice(0, 7) // YYYY-MM (UTC)
}

function emptyUsage(): UsageFile {
  return { month: currentMonth(), conversations: [], inputTokens: 0, outputTokens: 0 }
}

function load(): UsageFile {
  try {
    const parsed = JSON.parse(fs.readFileSync(config.usageFile, 'utf8')) as UsageFile
    return parsed.month === currentMonth() ? parsed : emptyUsage()
  } catch {
    return emptyUsage()
  }
}

function save(usage: UsageFile) {
  try {
    fs.mkdirSync(path.dirname(config.usageFile), { recursive: true })
    fs.writeFileSync(config.usageFile, JSON.stringify(usage))
  } catch (err) {
    console.error('[usage] could not persist usage file', err)
  }
}

export function recordConversation(conversationId: number) {
  const usage = load()
  if (!usage.conversations.includes(conversationId)) {
    usage.conversations.push(conversationId)
    save(usage)
    const count = usage.conversations.length
    const cap = config.monthlyConversationCap
    if (count > cap) {
      console.warn(`[usage] ${count}/${cap} conversas no mês ${usage.month} — acima do teto contratual`)
    } else if (count >= Math.ceil(cap * 0.8)) {
      console.warn(`[usage] ${count}/${cap} conversas no mês ${usage.month} — perto do teto contratual`)
    }
  }
}

export function recordTokens(inputTokens: number, outputTokens: number) {
  const usage = load()
  usage.inputTokens += inputTokens
  usage.outputTokens += outputTokens
  save(usage)
  console.log(
    `[usage] +${inputTokens} in / +${outputTokens} out tokens — mês ${usage.month}: ` +
      `${usage.conversations.length} conversas, ${usage.inputTokens} in / ${usage.outputTokens} out`,
  )
}
