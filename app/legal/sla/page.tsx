import LegalPageLayout from '@/components/legal-page-layout'
import { Card } from '@/components/ui/card'

export default function SLAPage() {
  return (
    <LegalPageLayout title="Service Level Agreement" lastUpdated="January 15, 2024">
      <p className="text-lg text-muted-foreground">
        This Service Level Agreement outlines the performance commitments and guarantees for the Edgerun platform.
      </p>

      <h2>1. Platform Availability</h2>
      <p>
        Edgerun commits to maintaining platform availability with the following targets:
      </p>
      <Card className="p-6 my-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">API Uptime</span>
            <span className="font-mono text-primary">99.9%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Job Submission Success Rate</span>
            <span className="font-mono text-primary">99.5%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Worker Network Availability</span>
            <span className="font-mono text-primary">99.0%</span>
          </div>
        </div>
      </Card>

      <h2>2. Performance Metrics</h2>
      <h3>Job Execution Time</h3>
      <p>
        Expected job execution times vary based on job complexity and worker availability:
      </p>
      <ul>
        <li>Simple jobs (&lt;100ms compute): 95% complete within 5 minutes</li>
        <li>Medium jobs (100ms-1s compute): 95% complete within 15 minutes</li>
        <li>Complex jobs (&gt;1s compute): 95% complete within 30 minutes</li>
      </ul>

      <h3>Settlement Time</h3>
      <p>
        On-chain settlement typically completes within 1-3 minutes after job verification, subject to Solana network conditions.
      </p>

      <h2>3. Worker Node Requirements</h2>
      <p>Worker nodes must maintain:</p>
      <Card className="p-6 my-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Minimum Uptime</span>
            <span className="font-mono text-primary">95%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Maximum Response Time</span>
            <span className="font-mono text-primary">&lt;500ms</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Execution Accuracy</span>
            <span className="font-mono text-primary">100%</span>
          </div>
        </div>
      </Card>

      <h2>4. Support Response Times</h2>
      <p>Support ticket response times by priority:</p>
      <ul>
        <li>Critical (platform down): 1 hour</li>
        <li>High (major functionality impaired): 4 hours</li>
        <li>Medium (minor issues): 24 hours</li>
        <li>Low (general inquiries): 48 hours</li>
      </ul>

      <h2>5. Maintenance Windows</h2>
      <p>
        Scheduled maintenance is performed during low-traffic periods with 48 hours advance notice. Emergency maintenance may occur without notice for critical security or stability issues.
      </p>

      <h2>6. Service Credits</h2>
      <p>
        If platform availability falls below committed levels, eligible users may receive service credits:
      </p>
      <ul>
        <li>99.0% - 99.9% uptime: 10% credit</li>
        <li>95.0% - 99.0% uptime: 25% credit</li>
        <li>Below 95.0% uptime: 50% credit</li>
      </ul>

      <h2>7. Exclusions</h2>
      <p>This SLA does not apply to:</p>
      <ul>
        <li>Issues caused by user error or misuse</li>
        <li>Solana blockchain network downtime or congestion</li>
        <li>Scheduled maintenance windows</li>
        <li>Force majeure events</li>
        <li>Third-party service provider failures</li>
      </ul>
    </LegalPageLayout>
  )
}
