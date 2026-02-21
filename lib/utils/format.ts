/**
 * Format utilities for Edgerun application
 */

/**
 * Format a hash to show first and last characters
 * @param hash - Full hash string
 * @param startChars - Number of characters to show at start (default: 8)
 * @param endChars - Number of characters to show at end (default: 6)
 */
export function formatHash(hash: string, startChars: number = 8, endChars: number = 6): string {
  if (hash.length <= startChars + endChars) return hash
  return `${hash.slice(0, startChars)}...${hash.slice(-endChars)}`
}

/**
 * Format bytes to human-readable size
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

/**
 * Format milliseconds to human-readable duration
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`
  if (ms < 3600000) return `${(ms / 60000).toFixed(2)}m`
  return `${(ms / 3600000).toFixed(2)}h`
}

/**
 * Format SOL amount with proper decimals
 */
export function formatSOL(amount: number, decimals: number = 4): string {
  return `${amount.toFixed(decimals)} SOL`
}

/**
 * Format gas units
 */
export function formatGas(gas: number): string {
  if (gas >= 1000000) return `${(gas / 1000000).toFixed(2)}M`
  if (gas >= 1000) return `${(gas / 1000).toFixed(2)}K`
  return gas.toString()
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return 'Just now'
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

/**
 * Format date for blog posts (e.g., "Feb 15, 2024")
 */
export function formatBlogDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

/**
 * Format worker ID or job ID for display
 */
export function formatId(id: string): string {
  return id.replace(/_/g, '-')
}

/**
 * Format uptime percentage with color indicator
 */
export function getUptimeColor(uptime: number): string {
  if (uptime >= 99.5) return 'text-green-500'
  if (uptime >= 95) return 'text-yellow-500'
  return 'text-red-500'
}

/**
 * Format status badge color
 */
export function getStatusColor(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'completed':
    case 'success':
    case 'active':
      return 'default'
    case 'running':
    case 'executing':
      return 'secondary'
    case 'failed':
    case 'slashed':
      return 'destructive'
    default:
      return 'outline'
  }
}
