import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { HowItWorks } from '@/components/landing/how-it-works'
import { UseCases } from '@/components/landing/use-cases'
import { CTASection } from '@/components/landing/cta-section'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <UseCases />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
