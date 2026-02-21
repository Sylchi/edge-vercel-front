import EmailLayout from './email-layout'

interface JobFailedEmailProps {
  jobId: string
  jobName: string
  errorMessage: string
  attemptedWorkers: number
}

export default function JobFailedEmail({
  jobId,
  jobName,
  errorMessage,
  attemptedWorkers,
}: JobFailedEmailProps) {
  return (
    <EmailLayout preheader={`Your job "${jobName}" has failed`}>
      <table cellPadding="0" cellSpacing="0" border={0} width="100%">
        <tr>
          <td>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>
              Job Execution Failed
            </h2>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#cccccc', lineHeight: '21px' }}>
              Unfortunately, your job failed to complete. Please review the error details below and try again.
            </p>

            {/* Error Card */}
            <table cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ backgroundColor: '#1a0a0a', border: '1px solid #4a1a1a', borderRadius: '6px', marginBottom: '24px' }}>
              <tr>
                <td style={{ padding: '20px' }}>
                  <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                    <tr>
                      <td style={{ paddingBottom: '12px' }}>
                        <p style={{ margin: 0, fontSize: '12px', color: '#ff6b6b' }}>Error Message</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#ffcccc', fontFamily: 'monospace' }}>
                          {errorMessage}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            {/* Job Details Card */}
            <table cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ backgroundColor: '#0a0a0a', borderRadius: '6px', marginBottom: '24px' }}>
              <tr>
                <td style={{ padding: '20px' }}>
                  <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                    <tr>
                      <td style={{ paddingBottom: '12px' }}>
                        <p style={{ margin: 0, fontSize: '12px', color: '#666666' }}>Job Name</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#ffffff', fontWeight: '500' }}>
                          {jobName}
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
                      <td>
                        <p style={{ margin: 0, fontSize: '12px', color: '#666666' }}>Attempted Workers</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#ffffff' }}>
                          {attemptedWorkers}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            {/* Help Text */}
            <table cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ marginBottom: '24px' }}>
              <tr>
                <td>
                  <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#cccccc', fontWeight: '500' }}>
                    Common Solutions:
                  </p>
                  <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: '14px', color: '#999999', lineHeight: '21px' }}>
                    <li style={{ marginBottom: '6px' }}>Verify your WASM binary is valid and deterministic</li>
                    <li style={{ marginBottom: '6px' }}>Check that input parameters are correctly formatted</li>
                    <li style={{ marginBottom: '6px' }}>Ensure sufficient worker nodes are available</li>
                    <li>Review the job logs for detailed error information</li>
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
                          href="https://edgerun.app/run"
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
                          Submit New Job
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
