import { cache } from 'react'
import { codeToHtml } from 'shiki'

type SupportedLanguage = 'bash' | 'json' | 'javascript' | 'typescript' | 'rust' | 'text'

const languageAlias: Record<string, SupportedLanguage> = {
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  json: 'json',
  js: 'javascript',
  javascript: 'javascript',
  ts: 'typescript',
  typescript: 'typescript',
  rust: 'rust',
  rs: 'rust',
  text: 'text',
  plaintext: 'text'
}

function normalizeLanguage(language: string): SupportedLanguage {
  return languageAlias[language.toLowerCase()] ?? 'text'
}

function escapeHtml(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export const renderHighlightedCode = cache(async (code: string, language: string) => {
  const lang = normalizeLanguage(language)

  try {
    return await codeToHtml(code, {
      lang,
      theme: 'github-dark-default'
    })
  } catch {
    return `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`
  }
})
