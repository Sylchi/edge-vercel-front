import EmailLayout from './email-layout'

interface WelcomeEmailProps {
  userName?: string
}

export default function WelcomeEmail({ userName }: WelcomeEmailProps) {
  return (
    <EmailLayout preheader="Welcome to Edgerun - Get started with verifiable compute">
      <table cellPadding="0" cellSpacing="0" border={0} width="100%">
        <tr>
          <td>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>
              Welcome to Edgerun{userName ? `, ${userName}` : ''}!
            </h2>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#cccccc', lineHeight: '21px' }}>
              Thank you for joining Edgerun, the deterministic WASM compute platform with Solana settlement. 
              Get started with verifiable computation in minutes.
            </p>

            {/* Getting Started Section */}
            <table cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ marginBottom: '32px' }}>
              <tr>
                <td>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#ffffff' }}>
                    Get Started in 3 Steps
                  </h3>
                </td>
              </tr>
              
              {/* Step 1 */}
              <tr>
                <td style={{ paddingBottom: '20px' }}>
                  <table cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ backgroundColor: '#0a0a0a', borderRadius: '6px' }}>
                    <tr>
                      <td style={{ padding: '20px' }}>
                        <table cellPadding="0" cellSpacing="0" border={0}>
                          <tr>
                            <td style={{ paddingRight: '16px', verticalAlign: 'top' }}>
                              <div style={{ width: '32px', height: '32px', backgroundColor: '#a78bfa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold', color: '#000000' }}>
                                1
                              </div>
                            </td>
                            <td>
                              <p style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>
                                Connect Your Wallet
                              </p>
                              <p style={{ margin: 0, fontSize: '14px', color: '#999999', lineHeight: '21px' }}>
                                Connect your Solana wallet to submit jobs and manage payments securely.
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              {/* Step 2 */}
              <tr>
                <td style={{ paddingBottom: '20px' }}>
                  <table cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ backgroundColor: '#0a0a0a', borderRadius: '6px' }}>
                    <tr>
                      <td style={{ padding: '20px' }}>
                        <table cellPadding="0" cellSpacing="0" border={0}>
                          <tr>
                            <td style={{ paddingRight: '16px', verticalAlign: 'top' }}>
                              <div style={{ width: '32px', height: '32px', backgroundColor: '#a78bfa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold', color: '#000000' }}>
                                2
                              </div>
                            </td>
                            <td>
                              <p style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>
                                Submit Your First Job
                              </p>
                              <p style={{ margin: 0, fontSize: '14px', color: '#999999', lineHeight: '21px' }}>
                                Upload your WASM binary and configure execution parameters.
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              {/* Step 3 */}
              <tr>
                <td>
                  <table cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ backgroundColor: '#0a0a0a', borderRadius: '6px' }}>
                    <tr>
                      <td style={{ padding: '20px' }}>
                        <table cellPadding="0" cellSpacing="0" border={0}>
                          <tr>
                            <td style={{ paddingRight: '16px', verticalAlign: 'top' }}>
                              <div style={{ width: '32px', height: '32px', backgroundColor: '#a78bfa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold', color: '#000000' }}>
                                3
                              </div>
                            </td>
                            <td>
                              <p style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>
                                Get Verified Results
                              </p>
                              <p style={{ margin: 0, fontSize: '14px', color: '#999999', lineHeight: '21px' }}>
                                Receive cryptographically verified results with on-chain settlement.
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            {/* Resources */}
            <table cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ marginBottom: '24px' }}>
              <tr>
                <td>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#ffffff' }}>
                    Helpful Resources
                  </h3>
                  <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: '14px', color: '#999999', lineHeight: '24px' }}>
                    <li>
                      <a href="https://edgerun.app/docs" style={{ color: '#a78bfa', textDecoration: 'none' }}>
                        Documentation
                      </a>
                      {' - Learn how to use Edgerun'}
                    </li>
                    <li>
                      <a href="https://edgerun.app/docs/api-reference" style={{ color: '#a78bfa', textDecoration: 'none' }}>
                        API Reference
                      </a>
                      {' - Complete API documentation'}
                    </li>
                    <li>
                      <a href="https://edgerun.app/workers" style={{ color: '#a78bfa', textDecoration: 'none' }}>
                        Run a Worker Node
                      </a>
                      {' - Earn by providing compute'}
                    </li>
                  </ul>
                </td>
              </tr>
            </table>

            {/* CTA Button */}
            <table cellPadding="0" cellSpacing="0" border={0} width="100%">
              <tr>
                <td align="center" style={{ paddingTop: '8px' }}>
                  <a
                    href="https://edgerun.app/run"
                    style={{
                      display: 'inline-block',
                      padding: '12px 32px',
                      backgroundColor: '#a78bfa',
                      color: '#000000',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                    }}
                  >
                    Submit Your First Job
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </EmailLayout>
  )
}
