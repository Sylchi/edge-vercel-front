export interface SchedulerLimits {
  max_memory_bytes: number
  max_instructions: number
}

export interface JobCreateRequest {
  runtime_id: string
  wasm_base64: string
  input_base64: string
  limits: SchedulerLimits
  escrow_lamports: number
}

export interface JobCreateResponse {
  job_id: string
  bundle_hash: string
  bundle_url: string
  post_job_tx: string
  post_job_sig?: string | null
  assign_workers_tx?: string | null
  assign_workers_sig?: string | null
}

export interface WorkerResultReport {
  worker_pubkey: string
  job_id: string
  bundle_hash: string
  output_hash: string
  output_len: number
}

export interface WorkerFailureReport {
  worker_pubkey: string
  job_id: string
  bundle_hash: string
  phase: string
  error_code: string
  error_message: string
}

export interface JobQuorumState {
  expected_bundle_hash: string
  expected_runtime_id: string
  committee_workers: string[]
  committee_size: number
  quorum: number
  quorum_reached: boolean
  winning_output_hash?: string | null
  winning_workers: string[]
  created_at_unix_s: number
  quorum_reached_at_unix_s?: number | null
}

export interface JobStatusResponse {
  job_id: string
  reports: WorkerResultReport[]
  failures: WorkerFailureReport[]
  quorum?: JobQuorumState | null
}

function schedulerBaseUrl(): string {
  return process.env.NEXT_PUBLIC_EDGERUN_SCHEDULER_URL ?? 'http://127.0.0.1:8080'
}

async function parseJsonOrThrow<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Scheduler request failed (${res.status}): ${text}`)
  }
  return (await res.json()) as T
}

export async function createSchedulerJob(payload: JobCreateRequest): Promise<JobCreateResponse> {
  const res = await fetch(`${schedulerBaseUrl()}/v1/job/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  return parseJsonOrThrow<JobCreateResponse>(res)
}

export async function fetchSchedulerJobStatus(jobId: string): Promise<JobStatusResponse> {
  const res = await fetch(`${schedulerBaseUrl()}/v1/job/${jobId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  })

  return parseJsonOrThrow<JobStatusResponse>(res)
}
