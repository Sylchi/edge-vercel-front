import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { ColorSwatch } from '@/components/style-guide/color-swatch'
import { TypographyDemo } from '@/components/style-guide/typography-demo'
import { ComponentGallery } from '@/components/style-guide/component-gallery'
import { SpacingDemo } from '@/components/style-guide/spacing-demo'
import { Separator } from '@/components/ui/separator'

export const metadata = {
  title: 'Style Guide - Edgerun',
  description: 'Design system and brand guidelines for Edgerun'
}

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-bold mb-4">Style Guide</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {'Complete design system and brand guidelines for Edgerun. This page serves as the single source of truth for colors, typography, components, and spacing.'}
            </p>
          </div>
        </section>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* Color Palette */}
          <section id="colors">
            <h2 className="text-3xl font-bold mb-6">Color Palette</h2>
            <p className="text-muted-foreground mb-8">
              {'Edgerun uses a dark theme with purple and blue accents. All colors are defined as design tokens.'}
            </p>
            
            <div className="space-y-8">
              {/* Backgrounds */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Backgrounds</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ColorSwatch
                    name="Background"
                    variable="--background"
                    value="oklch(0 0 0)"
                    textColor="text-white"
                  />
                  <ColorSwatch
                    name="Card"
                    variable="--card"
                    value="oklch(0.12 0 0)"
                    textColor="text-white"
                  />
                  <ColorSwatch
                    name="Popover"
                    variable="--popover"
                    value="oklch(0.15 0 0)"
                    textColor="text-white"
                  />
                  <ColorSwatch
                    name="Muted"
                    variable="--muted"
                    value="oklch(0.20 0 0)"
                    textColor="text-white"
                  />
                </div>
              </div>
              
              {/* Accents */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Accent Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ColorSwatch
                    name="Primary (Purple)"
                    variable="--primary"
                    value="oklch(0.65 0.22 285)"
                    textColor="text-white"
                  />
                  <ColorSwatch
                    name="Accent (Blue)"
                    variable="--accent"
                    value="oklch(0.60 0.18 250)"
                    textColor="text-white"
                  />
                  <ColorSwatch
                    name="Secondary"
                    variable="--secondary"
                    value="oklch(0.25 0 0)"
                    textColor="text-white"
                  />
                  <ColorSwatch
                    name="Destructive (Red)"
                    variable="--destructive"
                    value="oklch(0.55 0.22 25)"
                    textColor="text-white"
                  />
                </div>
              </div>
              
              {/* Text Colors */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Text Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ColorSwatch
                    name="Foreground"
                    variable="--foreground"
                    value="oklch(0.98 0 0)"
                    textColor="text-black"
                  />
                  <ColorSwatch
                    name="Muted Foreground"
                    variable="--muted-foreground"
                    value="oklch(0.60 0 0)"
                    textColor="text-white"
                  />
                  <ColorSwatch
                    name="Primary Foreground"
                    variable="--primary-foreground"
                    value="oklch(0.98 0 0)"
                    textColor="text-black"
                  />
                  <ColorSwatch
                    name="Card Foreground"
                    variable="--card-foreground"
                    value="oklch(0.98 0 0)"
                    textColor="text-black"
                  />
                </div>
              </div>
              
              {/* UI Elements */}
              <div>
                <h3 className="text-xl font-semibold mb-4">UI Elements</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ColorSwatch
                    name="Border"
                    variable="--border"
                    value="oklch(0.22 0 0)"
                    textColor="text-white"
                  />
                  <ColorSwatch
                    name="Input"
                    variable="--input"
                    value="oklch(0.22 0 0)"
                    textColor="text-white"
                  />
                  <ColorSwatch
                    name="Ring"
                    variable="--ring"
                    value="oklch(0.65 0.22 285)"
                    textColor="text-white"
                  />
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <p className="text-sm font-semibold mb-2">Border Radius</p>
                    <p className="text-xs font-mono text-muted-foreground">--radius: 0.625rem</p>
                    <div className="mt-2 h-12 w-full bg-primary" style={{ borderRadius: 'var(--radius)' }} />
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <Separator />
          
          {/* Typography */}
          <section id="typography">
            <h2 className="text-3xl font-bold mb-6">Typography</h2>
            <p className="text-muted-foreground mb-8">
              {'Edgerun uses Geist for UI text and Geist Mono for technical data like hashes and code.'}
            </p>
            <TypographyDemo />
          </section>
          
          <Separator />
          
          {/* Components */}
          <section id="components">
            <h2 className="text-3xl font-bold mb-6">Components</h2>
            <p className="text-muted-foreground mb-8">
              {'Standard UI components built with shadcn/ui and customized for the Edgerun brand.'}
            </p>
            <ComponentGallery />
          </section>
          
          <Separator />
          
          {/* Spacing */}
          <section id="spacing">
            <h2 className="text-3xl font-bold mb-6">Spacing</h2>
            <p className="text-muted-foreground mb-8">
              {'Consistent spacing using Tailwind\'s spacing scale (4px base unit).'}
            </p>
            <SpacingDemo />
          </section>
          
          <Separator />
          
          {/* Usage Guidelines */}
          <section id="guidelines">
            <h2 className="text-3xl font-bold mb-6">Usage Guidelines</h2>
            <div className="space-y-6">
              <div className="p-6 bg-card border border-border rounded-lg space-y-4">
                <h4 className="text-lg font-semibold">Brand Principles</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">{'•'}</span>
                    <span><strong className="text-foreground">Professional:</strong> Clean, technical aesthetic that conveys trust and reliability</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">{'•'}</span>
                    <span><strong className="text-foreground">Dark-First:</strong> Pure black hero sections with near-black cards for depth</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">{'•'}</span>
                    <span><strong className="text-foreground">Monospace for Technical Data:</strong> Always use monospace font for hashes, addresses, and IDs</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">{'•'}</span>
                    <span><strong className="text-foreground">Subtle Accents:</strong> Purple primary and blue accent colors used sparingly for CTAs and highlights</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">{'•'}</span>
                    <span><strong className="text-foreground">No Crypto Hype:</strong> Avoid overly promotional language or flashy design elements</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 bg-card border border-border rounded-lg space-y-4">
                <h4 className="text-lg font-semibold">Design Patterns</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent">{'•'}</span>
                    <span><strong className="text-foreground">Hero Sections:</strong> Pure black background (--background) with large typography</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">{'•'}</span>
                    <span><strong className="text-foreground">Content Cards:</strong> Use --card background with subtle borders</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">{'•'}</span>
                    <span><strong className="text-foreground">Data Display:</strong> Tables and lists with clear hierarchy and monospace values</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">{'•'}</span>
                    <span><strong className="text-foreground">Status Indicators:</strong> Use badges with appropriate variants for job/worker status</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">{'•'}</span>
                    <span><strong className="text-foreground">CTAs:</strong> Primary buttons for main actions, outline for secondary actions</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
