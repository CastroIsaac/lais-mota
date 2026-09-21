import 'dotenv/config'

function required(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Missing required env var ${name} (see .env.example)`)
  return value
}

function positiveInt(name: string, fallback: number): number {
  const raw = process.env[name]?.trim()
  if (!raw) return fallback
  const value = Number(raw)
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`Env var ${name} must be a positive integer, got "${raw}"`)
  }
  return value
}

const oabNumber = process.env.OAB_NUMBER?.trim() ?? ''

// The bot introduces itself on behalf of a lawyer — never go live with a missing or
// placeholder registration number.
if (process.env.NODE_ENV === 'production' && (!oabNumber || /123\.?456|\{\{/.test(oabNumber))) {
  throw new Error('OAB_NUMBER must be set to the real OAB registration number in production')
}

export const config = {
  port: positiveInt('PORT', 3333),

  anthropicApiKey: required('ANTHROPIC_API_KEY'),
  anthropicModel: process.env.ANTHROPIC_MODEL?.trim() || 'claude-sonnet-4-5',

  chatwoot: {
    baseUrl: required('CHATWOOT_BASE_URL').replace(/\/+$/, ''),
    apiAccessToken: required('CHATWOOT_API_ACCESS_TOKEN'),
    accountId: required('CHATWOOT_ACCOUNT_ID'),
  },

  // Shared secret appended to the webhook URL (?token=...) so only Chatwoot can trigger the bot.
  webhookSecret: required('WEBHOOK_SECRET'),

  oabNumber,

  // Contract: the plan covers up to 100 automated conversations per month. Going over
  // only logs a warning (the client is never left without an answer).
  monthlyConversationCap: positiveInt('MONTHLY_CONVERSATION_CAP', 100),

  // Safety net: if the model never emits the escalation marker, hand off anyway.
  maxUserMessages: positiveInt('MAX_USER_MESSAGES', 12),

  usageFile: process.env.USAGE_FILE?.trim() || './data/usage.json',
}
