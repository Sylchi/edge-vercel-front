import { kv } from '@vercel/kv'
import { createHash } from 'crypto'

export interface StoredLead {
  id: string
  email: string
  createdAt: string
  recaptcha: {
    score: number
    reasons: string[]
    action: string
    valid: boolean
    tokenInvalidReason?: string
    assessmentName?: string
  }
  riskBand: 'high' | 'medium' | 'low'
  client: {
    ip?: string
    userAgent?: string
  }
}

function assertKvConfigured(): void {
  const hasKv = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
  const hasUpstash = Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  )
  if (!hasKv && !hasUpstash) {
    throw new Error('Lead storage is not configured (KV/Upstash env vars missing).')
  }
}

function emailKey(normalizedEmail: string): string {
  const hash = createHash('sha256').update(normalizedEmail).digest('hex')
  return `lead:${hash}`
}

export async function storeLead(lead: StoredLead): Promise<void> {
  assertKvConfigured()
  const key = emailKey(lead.email)

  await kv.set(key, lead)
  await kv.zadd('leads:index:createdAt', {
    score: Date.now(),
    member: key,
  })
}
