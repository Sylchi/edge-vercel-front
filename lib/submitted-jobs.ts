export interface SubmittedJob {
  id: string
  name: string
  createdAt: string
  wasmFileName: string
  wasmSize: number
  inputFileName?: string
  inputSize?: number
}

const STORAGE_KEY = 'edgerun.submittedJobs'

export function readSubmittedJobs(): SubmittedJob[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }
    const parsed = JSON.parse(raw) as SubmittedJob[]
    if (!Array.isArray(parsed)) {
      return []
    }
    return parsed
      .filter((item) => item && typeof item.id === 'string')
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  } catch {
    return []
  }
}

export function writeSubmittedJob(job: SubmittedJob): void {
  if (typeof window === 'undefined') {
    return
  }

  const existing = readSubmittedJobs()
  const next = [job, ...existing.filter((item) => item.id !== job.id)].slice(0, 50)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}
