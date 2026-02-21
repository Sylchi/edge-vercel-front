'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mockDocsStructure } from '@/lib/mock-data'

export function DocsSidebar() {
  const pathname = usePathname()
  
  return (
    <aside className="w-64 flex-shrink-0 border-r border-border bg-card">
      <div className="sticky top-16 p-6 h-[calc(100vh-4rem)] overflow-y-auto">
        <nav className="space-y-6">
          {mockDocsStructure.map((section) => (
            <div key={section.slug}>
              <h3 className="font-semibold text-sm mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.pages.map((page) => {
                  const href = `/docs/${section.slug}/${page.slug}`
                  const isActive = pathname === href
                  
                  return (
                    <li key={page.slug}>
                      <Link
                        href={href}
                        className={`block text-sm py-1.5 px-3 rounded-md transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        {page.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}
