import { cn } from '@/lib/utils'

interface GeneratingIndicatorProps {
  className?: string
  label?: string
}

export function GeneratingIndicator({
  className,
  label = 'Generating'
}: GeneratingIndicatorProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground', className)}>
      {label}
      <span className="inline-flex items-center gap-0.5">
        <span className="size-1 rounded-full bg-current animate-pulse [animation-delay:-0.3s]" />
        <span className="size-1 rounded-full bg-current animate-pulse [animation-delay:-0.15s]" />
        <span className="size-1 rounded-full bg-current animate-pulse" />
      </span>
    </span>
  )
}
