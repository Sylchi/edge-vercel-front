import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { recaptchaRiskBand, verifyRecaptchaEnterprise } from '@/lib/recaptcha-enterprise'
import { storeLead } from '@/lib/leads-storage'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DEFAULT_MIN_SCORE = 0.5

interface LeadRequestBody {
  email?: string
  token?: string
  action?: string
}

function normalizedEmail(email: string): string {
  return email.trim().toLowerCase()
}

function parseMinScore(): number {
  const raw = process.env.LEADS_MIN_RECAPTCHA_SCORE
  if (!raw) {
    return DEFAULT_MIN_SCORE
  }
  const parsed = Number.parseFloat(raw)
  if (Number.isNaN(parsed)) {
    return DEFAULT_MIN_SCORE
  }
  return Math.min(1, Math.max(0, parsed))
}

function requestIp(req: NextRequest): string | undefined {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || undefined
  }
  const realIp = req.headers.get('x-real-ip')
  return realIp?.trim() || undefined
}

export async function POST(req: NextRequest) {
  let body: LeadRequestBody
  try {
    body = (await req.json()) as LeadRequestBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const email = normalizedEmail(body.email ?? '')
  const token = body.token?.trim() ?? ''
  const action = body.action?.trim() ?? ''

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Provide a valid email address.' }, { status: 400 })
  }
  if (!token) {
    return NextResponse.json({ error: 'Missing reCAPTCHA token.' }, { status: 400 })
  }
  if (!action) {
    return NextResponse.json({ error: 'Missing reCAPTCHA action.' }, { status: 400 })
  }

  const ipAddress = requestIp(req)
  const userAgent = req.headers.get('user-agent') ?? undefined

  try {
    const assessment = await verifyRecaptchaEnterprise({
      token,
      expectedAction: action,
      ipAddress,
      userAgent,
    })

    if (!assessment.valid) {
      return NextResponse.json(
        {
          error: 'reCAPTCHA validation failed.',
          invalidReason: assessment.tokenInvalidReason,
        },
        { status: 400 }
      )
    }

    if (assessment.action !== action) {
      return NextResponse.json({ error: 'reCAPTCHA action mismatch.' }, { status: 400 })
    }

    const minScore = parseMinScore()
    const riskBand = recaptchaRiskBand(assessment.score)

    await storeLead({
      id: randomUUID(),
      email,
      createdAt: new Date().toISOString(),
      recaptcha: {
        score: assessment.score,
        reasons: assessment.reasons,
        action: assessment.action,
        valid: assessment.valid,
        tokenInvalidReason: assessment.tokenInvalidReason,
        assessmentName: assessment.assessmentName,
      },
      riskBand,
      client: {
        ip: ipAddress,
        userAgent,
      },
    })

    return NextResponse.json({
      ok: true,
      score: assessment.score,
      minScore,
      accepted: assessment.score >= minScore,
      riskBand,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unable to store lead right now.',
      },
      { status: 500 }
    )
  }
}
