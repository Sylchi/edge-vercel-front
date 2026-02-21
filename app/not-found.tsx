import Link from 'next/link'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { GeneratingIndicator } from '@/components/ui/generating-indicator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-xl border-border">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-3">
              <span>Page Not Available Yet</span>
              <GeneratingIndicator />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              This route is either still generating or the link has moved.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/">
                <Button size="sm">Home</Button>
              </Link>
              <Link href="/docs">
                <Button size="sm" variant="outline">Docs</Button>
              </Link>
              <Link href="/run">
                <Button size="sm" variant="outline">Run Job</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

