'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'

interface CommandOutput {
  command: string
  output: string[]
  timestamp?: string
}

const demoCommands = [
  {
    command: 'edge post fibonacci.wasm --input "n=40"',
    output: [
      'Uploading WASM module... ✓',
      'Module hash: 0x7f8e9a2b...',
      'Estimating execution cost...',
      '',
      'Job created: job_8x4k9p2m',
      'Workers assigned: 3',
      'Estimated cost: 0.025 SOL',
      'Status: PENDING',
      '',
      'Run `edge status job_8x4k9p2m` to check progress'
    ]
  },
  {
    command: 'edge list --limit 5',
    output: [
      'Recent Jobs:',
      '',
      'ID              STATUS      RUNTIME    COST',
      'job_8x4k9p2m    COMPLETED   1.24s      0.025 SOL',
      'job_7m3n8q1x    COMPLETED   0.89s      0.018 SOL',
      'job_6p2k5r9t    FAILED      -          0.000 SOL',
      'job_5w8x3n2v    COMPLETED   2.15s      0.041 SOL',
      'job_4q9m7k1p    COMPLETED   0.34s      0.009 SOL',
    ]
  },
  {
    command: 'edge status job_8x4k9p2m',
    output: [
      'Job: job_8x4k9p2m',
      'Status: COMPLETED',
      'Runtime: 1.24s',
      'Workers: 3/3 consensus',
      '',
      'Output hash: 0x4a3f8e92...',
      'Result: 102334155',
      '',
      'Settlement tx: 5xKJ9m...',
      'Cost: 0.025 SOL'
    ]
  },
  {
    command: 'edge collect job_8x4k9p2m',
    output: [
      'Fetching result from job_8x4k9p2m...',
      '',
      'Output:',
      '{',
      '  "result": 102334155,',
      '  "execution_time_ms": 1240,',
      '  "gas_used": 8450000',
      '}',
      '',
      'Result saved to: ./output_8x4k9p2m.json'
    ]
  }
]

const helpCommands = {
  help: [
    'Available commands:',
    '',
    '  post <file> --input "<data>"  Submit a WASM job',
    '  list [--limit N]              List recent jobs',
    '  status <job_id>               Check job status',
    '  collect <job_id>              Download job result',
    '  workers                       View active workers',
    '  help                          Show this help',
    '',
    'Try typing a command or wait for auto-demo'
  ],
  workers: [
    'Active Workers:',
    '',
    'ID              STAKE       UPTIME    JOBS',
    'worker_a7k2    125.5 SOL   99.8%     1,247',
    'worker_m3n8    89.2 SOL    98.5%     892',
    'worker_p9x4    156.0 SOL   99.9%     2,104',
    'worker_q2w7    78.4 SOL    97.2%     645',
    'worker_k5r1    201.8 SOL   99.7%     3,521',
  ],
  clear: []
}

export function TerminalDemo() {
  const [history, setHistory] = useState<CommandOutput[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [currentDemoIndex, setCurrentDemoIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-play demo
  useEffect(() => {
    if (!isAutoPlaying || isTyping || currentDemoIndex >= demoCommands.length) return

    const timer = setTimeout(() => {
      const demo = demoCommands[currentDemoIndex]
      setIsTyping(true)
      
      // Simulate typing
      let charIndex = 0
      const typingInterval = setInterval(() => {
        if (charIndex <= demo.command.length) {
          setCurrentInput(demo.command.slice(0, charIndex))
          charIndex++
        } else {
          clearInterval(typingInterval)
          
          // Execute command after typing
          setTimeout(() => {
            setHistory(prev => [...prev, demo])
            setCurrentInput('')
            setIsTyping(false)
            setCurrentDemoIndex(prev => prev + 1)
          }, 300)
        }
      }, 50)

      return () => clearInterval(typingInterval)
    }, currentDemoIndex === 0 ? 1000 : 2500)

    return () => clearTimeout(timer)
  }, [isAutoPlaying, currentDemoIndex, isTyping])

  // Reset demo when it completes
  useEffect(() => {
    if (currentDemoIndex >= demoCommands.length && isAutoPlaying) {
      const resetTimer = setTimeout(() => {
        setHistory([])
        setCurrentDemoIndex(0)
      }, 5000)
      return () => clearTimeout(resetTimer)
    }
  }, [currentDemoIndex, isAutoPlaying])

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history, currentInput])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentInput.trim() || isTyping) return

    setIsAutoPlaying(false) // Stop auto-play when user types
    
    const input = currentInput.trim()
    const parts = input.split(' ')
    const command = parts[0]

    let output: string[] = []

    if (command === 'clear') {
      setHistory([])
      setCurrentInput('')
      return
    } else if (command === 'help') {
      output = helpCommands.help
    } else if (command === 'workers') {
      output = helpCommands.workers
    } else if (command === 'post') {
      output = [
        'Uploading WASM module... ✓',
        'Job created: job_' + Math.random().toString(36).substring(7),
        'Status: PENDING',
        '',
        'Use `edge status <job_id>` to check progress'
      ]
    } else if (command === 'list') {
      output = helpCommands.workers
    } else if (command === 'status' && parts[1]) {
      output = [
        `Job: ${parts[1]}`,
        'Status: COMPLETED',
        'Runtime: 0.89s',
        'Workers: 3/3 consensus',
        '',
        'Result available - use `edge collect ' + parts[1] + '`'
      ]
    } else if (command === 'collect' && parts[1]) {
      output = [
        `Fetching result from ${parts[1]}...`,
        '',
        'Output: { "result": 12345 }',
        '',
        'Result saved to: ./output_' + parts[1] + '.json'
      ]
    } else {
      output = [
        `edge: '${command}' is not a valid command`,
        'Use `help` to see available commands'
      ]
    }

    setHistory(prev => [...prev, { command: input, output }])
    setCurrentInput('')
  }

  return (
    <section className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Try the CLI
          </h2>
          <p className="text-lg text-muted-foreground">
            Interactive terminal demo. Watch commands execute or type your own.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto bg-black border-primary/20 overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-muted/10 border-b border-border">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs font-mono text-muted-foreground">edge-cli v1.0.0</span>
            </div>
            <button
              onClick={() => {
                setIsAutoPlaying(!isAutoPlaying)
                if (isAutoPlaying) {
                  setCurrentDemoIndex(0)
                  setHistory([])
                }
              }}
              className="text-xs font-mono text-primary hover:text-primary/80"
            >
              {isAutoPlaying ? 'pause' : 'auto-play'}
            </button>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalRef}
            className="h-[500px] overflow-y-auto p-4 font-mono text-sm"
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.focus()}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                inputRef.current?.focus()
              }
            }}
          >
            {/* Welcome Message */}
            {history.length === 0 && currentInput === '' && (
              <div className="text-muted-foreground mb-4">
                <p>Welcome to Edgerun CLI</p>
                <p>Type `help` for available commands</p>
                <p className="mt-2 text-xs">Tip: Auto-play demo running... or type your own commands</p>
              </div>
            )}

            {/* Command History */}
            {history.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center gap-2 text-primary">
                  <span className="text-accent">$</span>
                  <span>{item.command}</span>
                </div>
                <div className="mt-1 text-muted-foreground whitespace-pre-line">
                  {item.output.join('\n')}
                </div>
              </div>
            ))}

            {/* Current Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-accent">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                disabled={isTyping}
                className="flex-1 bg-transparent border-none outline-none text-primary font-mono"
                placeholder={isTyping ? '' : 'Type a command...'}
                autoComplete="off"
                spellCheck={false}
              />
              <span className="animate-pulse text-primary">|</span>
            </form>
          </div>
        </Card>
      </div>
    </section>
  )
}
