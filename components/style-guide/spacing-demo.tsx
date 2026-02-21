export function SpacingDemo() {
  const spacingScale = [
    { size: '0', rem: '0', px: '0px' },
    { size: '1', rem: '0.25rem', px: '4px' },
    { size: '2', rem: '0.5rem', px: '8px' },
    { size: '3', rem: '0.75rem', px: '12px' },
    { size: '4', rem: '1rem', px: '16px' },
    { size: '5', rem: '1.25rem', px: '20px' },
    { size: '6', rem: '1.5rem', px: '24px' },
    { size: '8', rem: '2rem', px: '32px' },
    { size: '10', rem: '2.5rem', px: '40px' },
    { size: '12', rem: '3rem', px: '48px' },
    { size: '16', rem: '4rem', px: '64px' }
  ]
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-lg font-semibold">Spacing Scale</h4>
        <p className="text-sm text-muted-foreground">
          Use Tailwind spacing utilities (p-*, m-*, gap-*) for consistent spacing
        </p>
      </div>
      
      <div className="space-y-4">
        {spacingScale.map((item) => (
          <div key={item.size} className="flex items-center gap-4">
            <div className="w-16 text-sm font-mono text-muted-foreground">
              {item.size}
            </div>
            <div className="flex-1">
              <div
                className="h-8 bg-primary rounded"
                style={{ width: item.rem }}
              />
            </div>
            <div className="w-24 text-sm text-muted-foreground text-right">
              {item.rem}
            </div>
            <div className="w-16 text-xs text-muted-foreground text-right font-mono">
              {item.px}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-card border border-border rounded-lg space-y-2">
        <p className="text-sm font-semibold">Common Patterns:</p>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li><code className="text-xs bg-muted px-1 py-0.5 rounded">gap-4</code> - Default gap between flex/grid items</li>
          <li><code className="text-xs bg-muted px-1 py-0.5 rounded">p-6</code> - Card padding</li>
          <li><code className="text-xs bg-muted px-1 py-0.5 rounded">space-y-4</code> - Vertical spacing between elements</li>
          <li><code className="text-xs bg-muted px-1 py-0.5 rounded">mb-8</code> - Section bottom margin</li>
        </ul>
      </div>
    </div>
  )
}
