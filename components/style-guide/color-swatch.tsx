interface ColorSwatchProps {
  name: string
  variable: string
  value: string
  textColor?: string
}

export function ColorSwatch({ name, variable, value, textColor = 'text-foreground' }: ColorSwatchProps) {
  return (
    <div className="space-y-2">
      <div
        className={`h-24 rounded-lg border border-border flex items-center justify-center ${textColor}`}
        style={{ backgroundColor: `var(${variable})` }}
      >
        <span className="text-sm font-mono">{variable}</span>
      </div>
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs font-mono text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}
