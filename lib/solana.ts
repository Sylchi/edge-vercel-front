import { PublicKey, Transaction } from '@solana/web3.js'

export interface JobCreateWalletAuth {
  client_pubkey: string
  client_signed_at_unix_s: number
  client_signature: string
}

export interface JobCreateSignInputs {
  clientPubkey: string
  runtimeId: string
  maxMemoryBytes: number
  maxInstructions: number
  escrowLamports: number
  wasmBytes: Uint8Array
  inputBytes: Uint8Array
  signedAtUnixS: number
}

function uint8ArrayToBase64(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', Uint8Array.from(bytes))
  return Array.from(new Uint8Array(digest))
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('')
}

export async function buildJobCreateSigningMessage(inputs: JobCreateSignInputs): Promise<string> {
  const wasmSha256 = await sha256Hex(inputs.wasmBytes)
  const inputSha256 = await sha256Hex(inputs.inputBytes)

  return [
    'edgerun:job_create:v1',
    inputs.clientPubkey,
    inputs.runtimeId,
    String(inputs.maxMemoryBytes),
    String(inputs.maxInstructions),
    String(inputs.escrowLamports),
    wasmSha256,
    inputSha256,
    String(inputs.signedAtUnixS)
  ].join('|')
}

export async function signJobCreateRequest(
  inputs: JobCreateSignInputs,
  signMessage: (message: Uint8Array) => Promise<Uint8Array>
): Promise<JobCreateWalletAuth> {
  const message = await buildJobCreateSigningMessage(inputs)
  const signature = await signMessage(new TextEncoder().encode(message))

  return {
    client_pubkey: inputs.clientPubkey,
    client_signed_at_unix_s: inputs.signedAtUnixS,
    client_signature: uint8ArrayToBase64(signature)
  }
}

export function decodeSchedulerTransaction(base64Tx: string): Transaction {
  const txBytes = Uint8Array.from(atob(base64Tx), (char) => char.charCodeAt(0))
  return Transaction.from(txBytes)
}

export function isValidSolanaPubkey(value: string): boolean {
  try {
    // Throws if invalid base58 or wrong length.
    void new PublicKey(value)
    return true
  } catch {
    return false
  }
}
