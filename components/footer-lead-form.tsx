'use client'

import { FormEvent, useMemo, useState } from 'react'
import Script from 'next/script'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type SubmitState =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }

declare global {
  interface Window {
    grecaptcha?: {
      enterprise?: {
        ready(callback: () => void): void
        execute(siteKey: string, options: { action: string }): Promise<string>
      }
    }
  }
}

const ACTION = 'lead_opt_in_footer'

async function getRecaptchaToken(siteKey: string): Promise<string> {
  if (!window.grecaptcha?.enterprise) {
    throw new Error('reCAPTCHA is not ready yet. Please try again in a moment.')
  }

  return new Promise<string>((resolve, reject) => {
    window.grecaptcha?.enterprise?.ready(() => {
      window.grecaptcha?.enterprise
        ?.execute(siteKey, { action: ACTION })
        .then(resolve)
        .catch(() => reject(new Error('Unable to verify reCAPTCHA. Please retry.')))
    })
  })
}

export function FooterLeadForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<SubmitState>({ type: 'idle' })

  const siteKey = useMemo(() => process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? '', [])

  const helperText =
    state.type === 'success'
      ? state.message
      : state.type === 'error'
        ? state.message
        : 'We only send product and launch updates. Unsubscribe anytime.'

  const helperTone =
    state.type === 'success'
      ? 'text-primary'
      : state.type === 'error'
        ? 'text-destructive'
        : 'text-muted-foreground'

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalized = email.trim().toLowerCase()
    if (!normalized) {
      setState({ type: 'error', message: 'Enter your email to join the list.' })
      return
    }

    if (!siteKey) {
      setState({ type: 'error', message: 'Lead form is not configured yet.' })
      return
    }

    setState({ type: 'loading' })

    try {
      const token = await getRecaptchaToken(siteKey)
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: normalized,
          token,
          action: ACTION,
        }),
      })

      const payload = (await response.json()) as { error?: string; score?: number }
      if (!response.ok) {
        throw new Error(payload.error ?? 'Unable to save your email right now.')
      }

      const scoreMsg =
        typeof payload.score === 'number' ? ` (risk score ${payload.score.toFixed(2)})` : ''
      setState({
        type: 'success',
        message: `You are in. Thanks for the interest${scoreMsg}.`,
      })
      setEmail('')
    } catch (error) {
      setState({
        type: 'error',
        message: error instanceof Error ? error.message : 'Submission failed. Please try again.',
      })
    }
  }

  return (
    <div className="rounded-lg border border-border bg-background/50 p-5">
      {siteKey && (
        <Script src={`https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`} strategy="afterInteractive" />
      )}

      <h3 className="text-base font-semibold text-foreground">Get Edgerun updates</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Leave your email for product drops, benchmark updates, and mainnet milestones.
      </p>

      <form onSubmit={onSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          placeholder="you@company.com"
          required
          className="h-10"
        />
        <Button type="submit" disabled={state.type === 'loading'} className="h-10 sm:min-w-28">
          {state.type === 'loading' ? 'Joining...' : 'Join'}
        </Button>
      </form>

      <p className={`mt-2 text-xs ${helperTone}`}>{helperText}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">
        Protected by reCAPTCHA Enterprise and subject to Google Privacy Policy and Terms.
      </p>
    </div>
  )
}
