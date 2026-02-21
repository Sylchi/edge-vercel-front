import LegalPageLayout from '@/components/legal-page-layout'

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="January 15, 2024">
      <p className="text-lg text-muted-foreground">
        By accessing and using Edgerun, you agree to be bound by these Terms of Service and all applicable laws and regulations.
      </p>

      <h2>1. Service Description</h2>
      <p>
        Edgerun provides a deterministic WASM compute platform with cryptographic proof settlement on Solana. The service enables verifiable computation with worker node execution and on-chain settlement.
      </p>

      <h2>2. User Obligations</h2>
      <p>Users of the platform agree to:</p>
      <ul>
        <li>Provide accurate wallet and identity information</li>
        <li>Maintain security of their private keys and credentials</li>
        <li>Use the platform only for lawful purposes</li>
        <li>Not attempt to disrupt or compromise platform security</li>
        <li>Comply with all applicable laws and regulations</li>
      </ul>

      <h2>3. Worker Node Requirements</h2>
      <p>
        Worker node operators must meet minimum hardware requirements, maintain uptime commitments, and stake the required collateral. Failure to execute jobs correctly may result in slashing penalties.
      </p>

      <h2>4. Payment and Fees</h2>
      <p>
        All payments are processed on Solana blockchain. Job submitters pay execution fees plus network transaction costs. Worker nodes receive payment upon successful job completion and verification.
      </p>

      <h2>5. Slashing and Disputes</h2>
      <p>
        Worker nodes that fail verification or provide incorrect results may have their staked collateral slashed. Disputes are resolved through cryptographic proof verification and automated settlement.
      </p>

      <h2>6. Service Availability</h2>
      <p>
        While we strive for high availability, Edgerun does not guarantee uninterrupted service. The platform may undergo maintenance, upgrades, or experience downtime due to blockchain network conditions.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        Edgerun is provided "as is" without warranties. We are not liable for job execution failures, network delays, or financial losses resulting from platform use.
      </p>

      <h2>8. Modifications</h2>
      <p>
        We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of updated terms.
      </p>
    </LegalPageLayout>
  )
}
