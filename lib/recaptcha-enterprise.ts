interface VerifyRecaptchaInput {
  token: string
  expectedAction: string
  ipAddress?: string
  userAgent?: string
}

export interface RecaptchaAssessmentResult {
  valid: boolean
  score: number
  reasons: string[]
  action: string
  tokenInvalidReason?: string
  assessmentName?: string
}

interface RecaptchaAssessmentResponse {
  name?: string
  riskAnalysis?: {
    score?: number
    reasons?: string[]
  }
  tokenProperties?: {
    valid?: boolean
    action?: string
    invalidReason?: string
  }
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export async function verifyRecaptchaEnterprise(
  input: VerifyRecaptchaInput
): Promise<RecaptchaAssessmentResult> {
  const projectId = requiredEnv('RECAPTCHA_PROJECT_ID')
  const apiKey = requiredEnv('RECAPTCHA_API_KEY')
  const siteKey = requiredEnv('NEXT_PUBLIC_RECAPTCHA_SITE_KEY')

  const response = await fetch(
    `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: {
          token: input.token,
          siteKey,
          expectedAction: input.expectedAction,
          userIpAddress: input.ipAddress,
          userAgent: input.userAgent,
        },
      }),
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`reCAPTCHA assessment failed (${response.status}): ${body}`)
  }

  const payload = (await response.json()) as RecaptchaAssessmentResponse
  return {
    valid: Boolean(payload.tokenProperties?.valid),
    score: payload.riskAnalysis?.score ?? 0,
    reasons: payload.riskAnalysis?.reasons ?? [],
    action: payload.tokenProperties?.action ?? '',
    tokenInvalidReason: payload.tokenProperties?.invalidReason,
    assessmentName: payload.name,
  }
}

export function recaptchaRiskBand(score: number): 'high' | 'medium' | 'low' {
  if (score < 0.3) {
    return 'high'
  }
  if (score < 0.7) {
    return 'medium'
  }
  return 'low'
}
