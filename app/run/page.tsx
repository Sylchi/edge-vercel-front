'use client'

import { useState } from 'react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { formatSOL, formatGas } from '@/lib/utils/format'

export default function RunJobPage() {
  const [jobName, setJobName] = useState('')
  const [wasmFile, setWasmFile] = useState<File | null>(null)
  const [inputFile, setInputFile] = useState<File | null>(null)
  const [workerCount, setWorkerCount] = useState('5')
  
  // Mock estimates
  const estimatedGas = 245000
  const estimatedCost = 0.025
  const estimatedRuntime = 150
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission - would navigate to job details
    console.log('[v0] Job submitted:', { jobName, wasmFile, inputFile, workerCount })
    alert('Job submitted! (Mock functionality)')
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-1 bg-background">
        {/* Header */}
        <section className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-4">Run Compute Job</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {'Submit a WASM module for deterministic execution across distributed workers'}
            </p>
          </div>
        </section>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Job Configuration</CardTitle>
                  <CardDescription>
                    Configure your compute job parameters and upload files
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Job Name */}
                    <div className="space-y-2">
                      <Label htmlFor="job-name">Job Name</Label>
                      <Input
                        id="job-name"
                        placeholder="e.g., Image Processing Pipeline"
                        value={jobName}
                        onChange={(e) => setJobName(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        A descriptive name for your compute job
                      </p>
                    </div>
                    
                    {/* WASM File */}
                    <div className="space-y-2">
                      <Label htmlFor="wasm-file">WASM Module</Label>
                      <Input
                        id="wasm-file"
                        type="file"
                        accept=".wasm"
                        onChange={(e) => setWasmFile(e.target.files?.[0] || null)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Compiled WebAssembly module to execute
                      </p>
                      {wasmFile && (
                        <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                          <Badge variant="secondary" className="text-xs">WASM</Badge>
                          <span className="text-sm font-mono">{wasmFile.name}</span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {(wasmFile.size / 1024).toFixed(2)} KB
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Input Data */}
                    <div className="space-y-2">
                      <Label htmlFor="input-file">Input Data (Optional)</Label>
                      <Input
                        id="input-file"
                        type="file"
                        onChange={(e) => setInputFile(e.target.files?.[0] || null)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Optional input data file to pass to your WASM module
                      </p>
                      {inputFile && (
                        <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                          <Badge variant="secondary" className="text-xs">DATA</Badge>
                          <span className="text-sm font-mono">{inputFile.name}</span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {(inputFile.size / 1024).toFixed(2)} KB
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Worker Count */}
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
                      <p className="text-xs text-muted-foreground">
                        Number of workers for consensus (3-10). More workers = higher confidence
                      </p>
                    </div>
                    
                    {/* Submit Button */}
                    <Button type="submit" size="lg" className="w-full">
                      Submit Job
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Estimate Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-20">
                <Card>
                  <CardHeader>
                    <CardTitle>Cost Estimate</CardTitle>
                    <CardDescription>
                      Estimated costs for this job
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Gas Usage</span>
                      <span className="text-sm font-mono">{formatGas(estimatedGas)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Workers</span>
                      <span className="text-sm font-mono">{workerCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Est. Runtime</span>
                      <span className="text-sm font-mono">~{estimatedRuntime}s</span>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Total Cost</span>
                        <span className="text-lg font-bold text-primary">
                          {formatSOL(estimatedCost)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-accent/50 bg-accent/5">
                  <CardHeader>
                    <CardTitle className="text-base">How It Works</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex gap-3">
                      <span className="text-accent">1.</span>
                      <p>Your WASM module is distributed to selected workers</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-accent">2.</span>
                      <p>Workers execute deterministically in parallel</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-accent">3.</span>
                      <p>Output hashes are compared for consensus</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-accent">4.</span>
                      <p>Results are settled on Solana with cryptographic proof</p>
                    </div>
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
