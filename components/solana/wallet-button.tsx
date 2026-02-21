'use client'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export function WalletButton() {
  return (
    <WalletMultiButton className="!h-9 !rounded-md !bg-primary !px-3 !text-sm !font-medium !text-primary-foreground hover:!bg-primary/90" />
  )
}
