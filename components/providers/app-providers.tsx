'use client'

import { ReactNode, useMemo } from 'react'
import { clusterApiUrl } from '@solana/web3.js'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'
import { BackpackWalletAdapter } from '@solana/wallet-adapter-backpack'
import { CoinbaseWalletAdapter } from '@solana/wallet-adapter-coinbase'

import '@solana/wallet-adapter-react-ui/styles.css'

function resolveRpcEndpoint(): string {
  const configured = process.env.NEXT_PUBLIC_SOLANA_RPC_URL?.trim()
  if (configured) {
    return configured
  }

  const cluster = (process.env.NEXT_PUBLIC_SOLANA_CLUSTER?.trim().toLowerCase() ?? 'mainnet-beta') as
    | 'devnet'
    | 'testnet'
    | 'mainnet-beta'

  return clusterApiUrl(cluster)
}

export function AppProviders({ children }: { children: ReactNode }) {
  const endpoint = useMemo(() => resolveRpcEndpoint(), [])
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new BackpackWalletAdapter(),
      new CoinbaseWalletAdapter()
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
