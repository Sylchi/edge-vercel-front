import { renderHighlightedCode } from '@/lib/syntax-highlight'

interface CodeBlockProps {
  code: string
  language?: string
}

export async function CodeBlock({ code, language = 'bash' }: CodeBlockProps) {
  const html = await renderHighlightedCode(code, language)

  return (
    <div className="relative">
      <div
        className="rounded-lg border border-border overflow-x-auto [&_.shiki]:m-0 [&_.shiki]:p-4 [&_.shiki]:text-sm [&_.shiki]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {language && (
        <div className="absolute top-2 left-2">
          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded border border-primary/20 font-mono">
            {language}
          </span>
        </div>
      )}
    </div>
  )
}
