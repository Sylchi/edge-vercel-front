export function TypographyDemo() {
  return (
    <div className="space-y-8">
      {/* Headings */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-balance">Heading 1 - Bold Display</h1>
        <h2 className="text-3xl font-bold text-balance">Heading 2 - Section Title</h2>
        <h3 className="text-2xl font-semibold text-balance">Heading 3 - Subsection</h3>
        <h4 className="text-xl font-semibold">Heading 4 - Card Title</h4>
        <h5 className="text-lg font-medium">Heading 5 - Small Heading</h5>
      </div>
      
      {/* Body Text */}
      <div className="space-y-4 max-w-3xl">
        <p className="text-base leading-relaxed">
          This is body text in the default size. It uses the Geist font family with relaxed line height 
          for optimal readability. Body text should be clear and comfortable to read for extended periods.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This is secondary body text, often used for descriptions, captions, or less prominent information. 
          It uses a muted foreground color to create visual hierarchy.
        </p>
      </div>
      
      {/* Monospace */}
      <div className="space-y-2">
        <p className="text-sm font-mono text-primary">
          0x7f3a9b2c8e1d4f6a9c2b5e8d1a4f7c3b9e2a5d8c1f4a7b3e6d9c2a5f8e1b4d7
        </p>
        <p className="text-xs font-mono text-muted-foreground">
          Technical data like hashes, addresses, and code snippets use monospace font
        </p>
      </div>
      
      {/* Font Classes */}
      <div className="space-y-2 p-4 bg-card border border-border rounded-lg">
        <p className="text-sm font-semibold">Available Font Classes:</p>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li><code className="text-xs bg-muted px-1 py-0.5 rounded">font-sans</code> - Default UI font (Geist)</li>
          <li><code className="text-xs bg-muted px-1 py-0.5 rounded">font-mono</code> - Monospace font (Geist Mono)</li>
        </ul>
      </div>
    </div>
  )
}
