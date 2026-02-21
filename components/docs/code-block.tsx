'use client'

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = 'bash' }: CodeBlockProps) {
  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded border border-border"
          onClick={() => navigator.clipboard.writeText(code)}
        >
          Copy
        </button>
      </div>
      <pre className="p-4 bg-muted rounded-lg border border-border overflow-x-auto">
        <code className="text-sm font-mono text-foreground">
          {code}
        </code>
      </pre>
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
