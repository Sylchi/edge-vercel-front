import EmailLayout from './email-layout'

interface WorkerSlashedEmailProps {
  workerAddress: string
  jobId: string
  slashedAmount: string
  reason: string
  transactionHash: string
}

export default function WorkerSlashedEmail({
  workerAddress,
  jobId,
  slashedAmount,
  reason,
  transactionHash,
}: WorkerSlashedEmailProps) {
  return (
    <EmailLayout preheader="Worker node slashing notification">
      <table cellPadding="0" cellSpacing="0" border={0} width="100%">
        <tr>
          <td>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>
              Worker Slashing Notification
            </h2>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#cccccc', lineHeight: '21px' }}>
              Your worker node has been slashed due to verification failure. Review the details below.
            </p>

            {/* Alert Card */}
            <table cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ backgroundColor: '#1a0a0a', border: '1px solid #4a1a1a', borderRadius: '6px', marginBottom: '24px' }}>
              <tr>
                <td style={{ padding: '20px' }}>
                  <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                    <tr>
                      <td>
                        <p style={{ margin: 0, fontSize: '12px', color: '#ff6b6b', fontWeight: '600' }}>SLASHING EVENT</p>
                        <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#ffcccc' }}>
                          {reason}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            {/* Slashing Details */}
            <table cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ backgroundColor: '#0a0a0a', borderRadius: '6px', marginBottom: '24px' }}>
              <tr>
                <td style={{ padding: '20px' }}>
                  <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                    <tr>
                      <td style={{ paddingBottom: '12px' }}>
                        <p style={{ margin: 0, fontSize: '12px', color: '#666666' }}>Worker Address</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#a78bfa', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                          {workerAddress}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: '12px' }}>
                        <p style={{ margin: 0, fontSize: '12px', color: '#666666' }}>Job ID</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#a78bfa', fontFamily: 'monospace' }}>
                          {jobId}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: '12px' }}>
                        <p style={{ margin: 0, fontSize: '12px', color: '#666666' }}>Slashed Amount</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '18px', color: '#ff6b6b', fontWeight: '600' }}>
                          {slashedAmount}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ margin: 0, fontSize: '12px', color: '#666666' }}>Transaction Hash</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#a78bfa', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                          {transactionHash}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            {/* Next Steps */}
            <table cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ marginBottom: '24px' }}>
              <tr>
                <td>
                  <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#cccccc', fontWeight: '500' }}>
                    Next Steps:
                  </p>
                  <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: '14px', color: '#999999', lineHeight: '21px' }}>
                    <li style={{ marginBottom: '6px' }}>Review your worker node configuration and logs</li>
                    <li style={{ marginBottom: '6px' }}>Verify your WASM runtime is up to date</li>
                    <li style={{ marginBottom: '6px' }}>Check your node's computational accuracy</li>
                    <li>Ensure adequate stake is maintained for continued operation</li>
                  </ul>
                </td>
              </tr>
            </table>

            {/* CTA Buttons */}
            <table cellPadding="0" cellSpacing="0" border={0} width="100%">
              <tr>
                <td align="center" style={{ paddingTop: '8px' }}>
                  <table cellPadding="0" cellSpacing="0" border={0}>
                    <tr>
                      <td style={{ paddingRight: '12px' }}>
                        <a
                          href={`https://edgerun.app/job/${jobId}`}
                          style={{
                            display: 'inline-block',
                            padding: '12px 24px',
                            backgroundColor: '#2a2a2a',
                            color: '#ffffff',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '600',
                          }}
                        >
                          View Job Details
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://edgerun.app/dashboard"
                          style={{
                            display: 'inline-block',
                            padding: '12px 24px',
                            backgroundColor: '#a78bfa',
                            color: '#000000',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '600',
                          }}
                        >
                          Go to Dashboard
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </EmailLayout>
  )
}
