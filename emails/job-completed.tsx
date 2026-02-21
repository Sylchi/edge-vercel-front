import EmailLayout from './email-layout'

interface JobCompletedEmailProps {
  jobId: string
  jobName: string
  executionTime: string
  cost: string
  resultHash: string
}

export default function JobCompletedEmail({
  jobId,
  jobName,
  executionTime,
  cost,
  resultHash,
}: JobCompletedEmailProps) {
  return (
    <EmailLayout preheader={`Your job "${jobName}" has completed successfully`}>
      <table cellPadding="0" cellSpacing="0" border={0} width="100%">
        <tr>
          <td>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>
              Job Completed Successfully
            </h2>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#cccccc', lineHeight: '21px' }}>
              Your job has finished executing and the results have been verified on-chain.
            </p>

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
                      <td style={{ paddingBottom: '12px' }}>
                        <p style={{ margin: 0, fontSize: '12px', color: '#666666' }}>Execution Time</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#ffffff' }}>
                          {executionTime}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: '12px' }}>
                        <p style={{ margin: 0, fontSize: '12px', color: '#666666' }}>Total Cost</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#ffffff' }}>
                          {cost}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ margin: 0, fontSize: '12px', color: '#666666' }}>Result Hash</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#a78bfa', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                          {resultHash}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            {/* CTA Button */}
            <table cellPadding="0" cellSpacing="0" border={0} width="100%">
              <tr>
                <td align="center" style={{ paddingTop: '8px' }}>
                  <a
                    href={`https://edgerun.app/job/${jobId}`}
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
                    View Job Details
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
