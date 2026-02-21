'use client'

import { FormEvent, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { formatSOL, formatGas } from '@/lib/utils/format'
import { createSchedulerJob } from '@/lib/scheduler-client'
import { writeSubmittedJob } from '@/lib/submitted-jobs'

const DEFAULT_RUNTIME_ID =
  process.env.NEXT_PUBLIC_EDGERUN_DEFAULT_RUNTIME_ID ??
  '1111111111111111111111111111111111111111111111111111111111111111'

const DEFAULT_MAX_MEMORY_BYTES = 64 * 1024 * 1024
const DEFAULT_MAX_INSTRUCTIONS = 20_000_000
const LAMPORTS_PER_SOL = 1_000_000_000

function bytesToBase64(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  return bytesToBase64(new Uint8Array(buffer))
}

function parseWorkerCount(raw: string): number {
  const parsed = Number.parseInt(raw, 10)
  if (Number.isNaN(parsed)) {
    return 3
  }
  return Math.min(10, Math.max(3, parsed))
}

export default function RunJobPage() {
  const router = useRouter()

  const [jobName, setJobName] = useState('')
  const [wasmFile, setWasmFile] = useState<File | null>(null)
  const [inputFile, setInputFile] = useState<File | null>(null)
  const [workerCount, setWorkerCount] = useState('5')
  const [runtimeId, setRuntimeId] = useState(DEFAULT_RUNTIME_ID)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const workerCountNum = parseWorkerCount(workerCount)
  const estimatedGas = useMemo(() => {
    const wasmGas = wasmFile ? Math.max(100_000, Math.round(wasmFile.size / 16)) : 100_000
    return wasmGas * workerCountNum
  }, [wasmFile, workerCountNum])

  const estimatedRuntime = Math.max(30, Math.round(estimatedGas / 2000))
  const estimatedCost = Number((estimatedGas / 10_000_000).toFixed(4))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!wasmFile) {
      setSubmitError('A WASM module is required.')
      return
    }

    const normalizedRuntimeId = runtimeId.trim().toLowerCase()
    if (!/^[0-9a-f]{64}$/.test(normalizedRuntimeId)) {
      setSubmitError('Runtime ID must be a 32-byte hex string (64 hex chars).')
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const wasmBase64 = await fileToBase64(wasmFile)
      const inputBase64 = inputFile ? await fileToBase64(inputFile) : ''

      const response = await createSchedulerJob({
        runtime_id: normalizedRuntimeId,
        wasm_base64: wasmBase64,
        input_base64: inputBase64,
        limits: {
          max_memory_bytes: DEFAULT_MAX_MEMORY_BYTES,
          max_instructions: DEFAULT_MAX_INSTRUCTIONS
        },
        escrow_lamports: Math.max(1, Math.round(estimatedCost * LAMPORTS_PER_SOL))
      })

      writeSubmittedJob({
        id: response.job_id,
        name: jobName || wasmFile.name,
        createdAt: new Date().toISOString(),
        wasmFileName: wasmFile.name,
        wasmSize: wasmFile.size,
        inputFileName: inputFile?.name,
        inputSize: inputFile?.size
      })

      router.push(`/job/${response.job_id}`)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit job.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 bg-background">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-2">Execute Job</h1>
            <p className="text-sm text-muted-foreground font-mono">
              Submits directly to scheduler API at {process.env.NEXT_PUBLIC_EDGERUN_SCHEDULER_URL ?? 'http://127.0.0.1:8080'}
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Job Configuration</CardTitle>
                  <CardDescription>Configure your compute job parameters and upload files</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="job-name">Job Name</Label>
                      <Input
                        id="job-name"
                        placeholder="e.g., Image Processing Pipeline"
                        value={jobName}
                        onChange={(e) => setJobName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="runtime-id">Runtime ID (hex)</Label>
                      <Input
                        id="runtime-id"
                        value={runtimeId}
                        onChange={(e) => setRuntimeId(e.target.value)}
                        required
                        className="font-mono text-xs"
                      />
                      <p className="text-xs text-muted-foreground">Must match scheduler worker runtime allowlist.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="wasm-file">WASM Module</Label>
                      <Input
                        id="wasm-file"
                        type="file"
                        accept=".wasm"
                        onChange={(e) => setWasmFile(e.target.files?.[0] ?? null)}
                        required
                      />
                      {wasmFile && (
                        <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                          <Badge variant="secondary" className="text-xs">WASM</Badge>
                          <span className="text-sm font-mono">{wasmFile.name}</span>
                          <span className="text-xs text-muted-foreground ml-auto">{(wasmFile.size / 1024).toFixed(2)} KB</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="input-file">Input Data (Optional)</Label>
                      <Input id="input-file" type="file" onChange={(e) => setInputFile(e.target.files?.[0] ?? null)} />
                      {inputFile && (
                        <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                          <Badge variant="secondary" className="text-xs">DATA</Badge>
                          <span className="text-sm font-mono">{inputFile.name}</span>
                          <span className="text-xs text-muted-foreground ml-auto">{(inputFile.size / 1024).toFixed(2)} KB</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="worker-count">Worker Count</Label>
                      <Input
                        id="worker-count"
                        type="number"
                        min="3"
                        max="10"
                        value={workerCount}
                        onChange={(e) => setWorkerCount(e.target.value)}
                        required
                      />
                    </div>

                    {submitError && (
                      <p className="text-sm text-destructive">{submitError}</p>
                    )}

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || !wasmFile}>
                      {isSubmitting ? 'Submitting...' : 'Submit Job'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-20">
                <Card>
                  <CardHeader>
                    <CardTitle>Cost Estimate</CardTitle>
                    <CardDescription>Estimated costs for this job</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Gas Usage</span>
                      <span className="text-sm font-mono">{formatGas(estimatedGas)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Workers</span>
                      <span className="text-sm font-mono">{workerCountNum}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Est. Runtime</span>
                      <span className="text-sm font-mono">~{estimatedRuntime}s</span>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Escrow</span>
                        <span className="text-lg font-bold text-primary">{formatSOL(estimatedCost)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-base">Execution Flow</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground font-mono">
                    <div className="flex gap-3"><span className="text-foreground">1.</span><p>Submit bundle + limits</p></div>
                    <div className="flex gap-3"><span className="text-foreground">2.</span><p>Scheduler assigns committee</p></div>
                    <div className="flex gap-3"><span className="text-foreground">3.</span><p>Workers execute deterministically</p></div>
                    <div className="flex gap-3"><span className="text-foreground">4.</span><p>Quorum and settlement artifacts</p></div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
