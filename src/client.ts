const generativeLabels = document.querySelectorAll<HTMLElement>('[data-generating-label]')
for (const label of generativeLabels) {
  let dots = 0
  setInterval(() => {
    dots = (dots + 1) % 4
    label.textContent = `Generating${'.'.repeat(dots)}`
  }, 420)
}

const versionSelect = document.querySelector<HTMLSelectElement>('#version-select')
if (versionSelect) {
  versionSelect.addEventListener('change', () => {
    const v = versionSelect.value.trim()
    if (!v) return
    window.location.href = `/docs/${v}/`
  })
}

const yearEl = document.querySelector<HTMLElement>('[data-current-year]')
if (yearEl) yearEl.textContent = String(new Date().getFullYear())

type RpcConfig = {
  cluster: string
  rpcUrl: string
  treasuryAccount: string
}

type RpcEnvelope<T> = {
  jsonrpc: string
  id: number
  result?: T
  error?: { code: number; message: string }
}

declare global {
  interface Window {
    __EDGERUN_RPC_CONFIG?: RpcConfig
  }
}

function setField(name: string, value: string): void {
  const els = document.querySelectorAll<HTMLElement>(`[data-chain-field="${name}"]`)
  for (const el of els) el.textContent = value
}

function formatInt(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

function formatSol(lamports: number): string {
  return `${(lamports / 1_000_000_000).toLocaleString('en-US', { maximumFractionDigits: 4 })} SOL`
}

async function rpcCall<T>(rpcUrl: string, method: string, params: unknown[] = []): Promise<T> {
  const res = await fetch(rpcUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params
    })
  })

  if (!res.ok) throw new Error(`rpc_http_${res.status}`)
  const payload = (await res.json()) as RpcEnvelope<T>
  if (payload.error) throw new Error(payload.error.message)
  if (payload.result === undefined) throw new Error('rpc_no_result')
  return payload.result
}

async function loadChainData(): Promise<void> {
  const cfg = window.__EDGERUN_RPC_CONFIG
  if (!cfg?.rpcUrl) return

  setField('cluster', cfg.cluster)
  setField('rpcUrl', cfg.rpcUrl)

  try {
    const [slot, blockHeight, epochInfo, perf, supply] = await Promise.all([
      rpcCall<number>(cfg.rpcUrl, 'getSlot', []),
      rpcCall<number>(cfg.rpcUrl, 'getBlockHeight', []),
      rpcCall<{ epoch: number }>(cfg.rpcUrl, 'getEpochInfo', []),
      rpcCall<Array<{ numTransactions: number; samplePeriodSecs: number }>>(
        cfg.rpcUrl,
        'getRecentPerformanceSamples',
        [1]
      ),
      rpcCall<{ value: { total: number } }>(cfg.rpcUrl, 'getSupply', [])
    ])

    setField('slot', formatInt(slot))
    setField('blockHeight', formatInt(blockHeight))
    setField('epoch', formatInt(epochInfo.epoch))
    setField('supplySol', formatSol(supply.value.total))

    const sample = perf[0]
    if (sample && sample.samplePeriodSecs > 0) {
      setField('tps', (sample.numTransactions / sample.samplePeriodSecs).toFixed(2))
    } else {
      setField('tps', 'n/a')
    }

    if (cfg.treasuryAccount) {
      const balance = await rpcCall<{ value: number }>(cfg.rpcUrl, 'getBalance', [cfg.treasuryAccount, { commitment: 'confirmed' }])
      setField('treasurySol', formatSol(balance.value))
    } else {
      setField('treasurySol', 'not configured')
    }
  } catch {
    const fallback = 'rpc unavailable'
    setField('slot', fallback)
    setField('blockHeight', fallback)
    setField('epoch', fallback)
    setField('tps', fallback)
    setField('supplySol', fallback)
    setField('treasurySol', fallback)
  }
}

void loadChainData()

export {}
