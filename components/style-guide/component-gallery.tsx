import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function ComponentGallery() {
  return (
    <div className="space-y-8">
      {/* Buttons */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Buttons</h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      
      {/* Badges */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Badges</h4>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>
      
      {/* Inputs */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Input Fields</h4>
        <div className="max-w-md space-y-3">
          <Input placeholder="Default input" />
          <Input placeholder="Disabled input" disabled />
        </div>
      </div>
      
      {/* Cards */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Cards</h4>
        <div className="grid gap-4 md:grid-cols-2 max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>
                Card description with additional context about the content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Card content goes here. Cards are used to group related information.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-muted">
            <CardHeader>
              <CardTitle>Muted Card</CardTitle>
              <CardDescription>
                Cards can have different background colors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Use muted backgrounds for less prominent content.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
