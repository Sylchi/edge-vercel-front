import { ReactNode } from 'react'

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'error'
  children: ReactNode
}

export function Callout({ type = 'info', children }: CalloutProps) {
  const styles = {
    info: 'bg-accent/10 border-accent/20 text-accent-foreground',
    warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-100',
    success: 'bg-green-500/10 border-green-500/20 text-green-100',
    error: 'bg-destructive/10 border-destructive/20 text-destructive-foreground'
  }
  
  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    success: '✓',
    error: '✕'
  }
  
  return (
    <div className={`p-4 rounded-lg border ${styles[type]}`}>
      <div className="flex gap-3">
        <span className="text-lg">{icons[type]}</span>
        <div className="flex-1 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}
