import { LegalPageLayout, LegalSection } from '@/components/legal-page-layout'
import { mockPrivacyPolicy } from '@/lib/mock-data'

export const metadata = {
  title: 'Privacy Policy - Edgerun',
  description: 'Edgerun privacy policy and data protection information'
}

export default function PrivacyPolicyPage() {
  const policy = mockPrivacyPolicy
  
  return (
    <LegalPageLayout title={policy.title} lastUpdated={policy.lastUpdated}>
      {policy.sections.map((section) => (
        <LegalSection key={section.id} title={section.title}>
          <p>{section.content}</p>
        </LegalSection>
      ))}
    </LegalPageLayout>
  )
}
