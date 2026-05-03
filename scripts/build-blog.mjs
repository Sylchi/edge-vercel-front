import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')
const siteUrl = process.env.EDGERUN_SITE_URL || 'https://www.edgerun.tech'
const currentVersion = process.env.EDGERUN_VERSION || 'main'
const buildNumber =
  process.env.EDGERUN_BUILD_NUMBER ||
  `${currentVersion}-${(process.env.GITHUB_SHA || 'local').slice(0, 8)}-${process.env.GITHUB_RUN_NUMBER || '0'}`

const navLinks = [
  ['/', 'Home'],
  ['/run/', 'Run'],
  ['/workers/', 'Workers'],
  ['/token/', 'SOL Economics'],
  ['/dashboard/', 'Dashboard'],
  ['/blog/', 'Blog'],
  ['/docs/', 'Docs'],
  ['/releases/', 'Releases']
]

const posts = [
  {
    slug: 'why-edgerun-exists',
    title: 'Why Edgerun Exists',
    date: '2026-05-03',
    excerpt:
      'The internet made information cheap. Edgerun is about making useful compute available, accountable, and eventually owned by the people running it.',
    body: [
      ['p', 'Cloud computing became the default because it is convenient. The problem is that convenience quietly became dependency. A few companies own most of the control plane, pricing power, deployment surface, identity layer, and operational visibility.'],
      ['p', 'Edgerun starts from a different assumption: compute should be a network, not a landlord relationship. People already own phones, laptops, GPUs, home servers, routers, batteries, and idle capacity. The missing piece is a protocol that turns that messy edge into something usable, verifiable, and economically coordinated.'],
      ['h2', 'The first principle'],
      ['p', 'A command is not truth. A dashboard is not truth. A provider API is not truth. Durable facts must be recorded, signed, replayable, and linked to the subject that actually made the decision. That is why Edgerun is protocol-first: append-only events, immutable objects, explicit authority, and deterministic execution where it matters.'],
      ['h2', 'The product direction'],
      ['p', 'The near-term goal is simple: make it possible to run useful workloads on contributed compute without pretending trust is magic. Deterministic WASM, signed results, redundant verification, stake-aware incentives, and eventually richer hardware-backed assurance all point at the same target.'],
      ['p', 'The long-term goal is bigger: a personal cloud that can run locally, understand your own data, expose capabilities safely, and rent surplus compute only when you choose. Opt-in, privacy-preserving, and useful before it becomes ideological.'],
      ['h2', 'Why now'],
      ['p', 'AI made compute feel like a new natural resource. The winners will not only be the companies that own datacenters. The winners will be the systems that coordinate compute, trust, storage, identity, and payments into something normal people can actually use.'],
      ['p', 'Edgerun is the attempt to build that system from the protocol up.']
    ]
  },
  {
    slug: 'software-needs-an-xray',
    title: 'Software Needs an X-Ray',
    date: '2026-05-03',
    excerpt:
      'Code editors show files. Real systems behave as live graphs. Edgerun needs a visual runtime atlas because text alone does not scale to distributed software.',
    body: [
      ['p', 'Large software systems are not naturally understood as file trees. Humans reason spatially. We remember landmarks, paths, clusters, bottlenecks, and motion. A code editor forces a living system into a narrow text tunnel.'],
      ['p', 'The x-ray view we are building for Edgerun treats code, processes, protocol messages, storage, network edges, agents, and runtime traces as one graph. The center of the interface is not a file. It is the system.'],
      ['h2', 'Static maps are not enough'],
      ['p', 'A static dependency graph can show what might happen. A runtime-lit graph shows what did happen. During a stress run, hot nodes brighten, stuck spans remain open, error paths flash, and bottlenecks become visible without digging through logs.'],
      ['p', 'That changes the role of agents. They should not be blind typists editing files. They should be operators over a visible truth layer: focus this path, compare this run, explain this hot cluster, show which protocol node created this event.'],
      ['h2', 'Why this matters for Edgerun'],
      ['p', 'A decentralized compute system has too many moving parts for vibes: runtime, wallet, exchange, storage, network, identity, device capabilities, dashboards, and protocols. If the interfaces are wrong, everything becomes glue. The x-ray makes those boundaries visible.'],
      ['p', 'The editor remains useful. It is just no longer the primary interface for understanding. Code becomes the detail popup. The graph becomes the cockpit.']
    ]
  },
  {
    slug: 'protocol-first-compute',
    title: 'Protocol-First Compute',
    date: '2026-05-03',
    excerpt:
      'Edgerun is not starting with a dashboard or a marketplace. It starts with authority boundaries: signed commands, committed events, immutable objects, and derived state.',
    body: [
      ['p', 'Most platforms begin with UI flows and databases, then try to add trust later. Edgerun is intentionally inverted. The core model is signed commands, target-node validation, committed events, immutable objects, and derived views.'],
      ['p', 'That sounds abstract until you build real features. A crypto exchange quote, a worker registration, an app install, a user presence approval, and a compute result all have the same shape: requests are not truth until the right subject validates and records the result.'],
      ['h2', 'Why commands are not authority'],
      ['p', 'A command is only a request. Delivery does not mean acceptance. A UI saying success does not mean a state change happened. The receiving node must validate the command and write an outcome event into its own stream. That event becomes the durable fact.'],
      ['h2', 'Objects carry data'],
      ['p', 'Events should stay small and ordered. Objects carry data: app packages, payloads, snapshots, proofs, exchange audit records, and larger artifacts. Stored representations can be encrypted, chunked, or compressed without changing the logical object identity.'],
      ['h2', 'Derived state is allowed to be fast'],
      ['p', 'Indexes, dashboards, caches, and local stores are allowed. They just cannot be confused with truth. If a derived view is wrong, rebuild it from events and objects. That one rule keeps the system connectable as it grows.']
    ]
  }
]

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function navHtml() {
  return navLinks
    .map(([href, label]) => `<a class="navlink" href="${href}">${escapeHtml(label)}</a>`)
    .join('\n')
}

function template({ title, description, body }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)} | Edgerun</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="article" />
    <meta name="theme-color" content="#0d1729" />
    <link rel="stylesheet" href="/assets/styles.css" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/icon.svg" type="image/svg+xml" />
  </head>
  <body>
    <div class="shell">
      <header class="panel p-4 md:p-6">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p class="pill">Edgerun Blog</p>
            <h1 class="text-2xl md:text-4xl font-bold mt-2">${escapeHtml(title)}</h1>
          </div>
          <div class="text-xs font-mono text-right visually-muted">
            <p>version ${escapeHtml(currentVersion)}</p>
            <p>build ${escapeHtml(buildNumber)}</p>
          </div>
        </div>
        <nav class="mt-4 flex flex-wrap gap-2" aria-label="Primary">${navHtml()}</nav>
      </header>
      <main class="mt-4 md:mt-6">${body}</main>
      <footer class="mt-8 pb-8 text-sm visually-muted">
        <p>Edgerun is protocol-first infrastructure for verifiable compute, local-first systems, and user-owned cloud control.</p>
      </footer>
    </div>
    <script type="module" src="/assets/client.js"></script>
  </body>
</html>`
}

function renderBlock([kind, text]) {
  if (kind === 'h2') return `<h2 class="text-xl md:text-2xl font-semibold mt-8">${escapeHtml(text)}</h2>`
  return `<p class="mt-4 leading-7 visually-muted">${escapeHtml(text)}</p>`
}

function writePage(relative, html) {
  const target = path.join(dist, relative)
  mkdirSync(path.dirname(target), { recursive: true })
  writeFileSync(target, html, 'utf8')
}

function walkHtmlFiles(dir) {
  if (!existsSync(dir)) return []
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) out.push(...walkHtmlFiles(full))
    else if (entry.endsWith('.html')) out.push(full)
  }
  return out
}

function patchNav() {
  for (const file of walkHtmlFiles(dist)) {
    let html = readFileSync(file, 'utf8')
    if (html.includes('href="/blog/"')) continue
    const patched = html.replace(
      '<a class="navlink" href="/docs/">Docs</a>',
      '<a class="navlink" href="/blog/">Blog</a>\n<a class="navlink" href="/docs/">Docs</a>'
    )
    if (patched !== html) writeFileSync(file, patched, 'utf8')
  }
}

function patchSitemap() {
  const sitemapPath = path.join(dist, 'sitemap.xml')
  if (!existsSync(sitemapPath)) {
    const urls = ['/', '/blog/', ...posts.map((post) => `/blog/${post.slug}/`)]
    writeFileSync(
      sitemapPath,
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
        .map((href) => `  <url><loc>${siteUrl}${href}</loc></url>`)
        .join('\n')}\n</urlset>\n`,
      'utf8'
    )
    return
  }

  let sitemap = readFileSync(sitemapPath, 'utf8')
  if (!sitemap.includes('</urlset>')) return
  for (const href of ['/blog/', ...posts.map((post) => `/blog/${post.slug}/`)]) {
    const loc = `${siteUrl}${href}`
    if (!sitemap.includes(loc)) {
      sitemap = sitemap.replace('</urlset>', `  <url><loc>${loc}</loc></url>\n</urlset>`)
    }
  }
  writeFileSync(sitemapPath, sitemap, 'utf8')
}

function writeBlog() {
  const cards = posts
    .map(
      (post) => `<article class="panel p-4 md:p-6">
        <p class="text-xs font-mono visually-muted">${escapeHtml(post.date)}</p>
        <h2 class="text-xl md:text-2xl font-semibold mt-2"><a href="/blog/${post.slug}/">${escapeHtml(post.title)}</a></h2>
        <p class="mt-3 visually-muted leading-7">${escapeHtml(post.excerpt)}</p>
      </article>`
    )
    .join('\n')

  writePage(
    'blog/index.html',
    template({
      title: 'Blog',
      description: 'Edgerun protocol, product, and infrastructure notes.',
      body: `<section class="space-y-4">${cards}</section>`
    })
  )

  for (const post of posts) {
    const article = `<article class="panel p-4 md:p-8">
      <p class="text-xs font-mono visually-muted">${escapeHtml(post.date)}</p>
      ${post.body.map(renderBlock).join('\n')}
      <p class="mt-8"><a class="navlink" href="/blog/">Back to blog</a></p>
    </article>`

    writePage(
      `blog/${post.slug}/index.html`,
      template({ title: post.title, description: post.excerpt, body: article })
    )
  }

  writePage(
    'blog/rss.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>Edgerun Blog</title><link>${siteUrl}/blog/</link><description>Edgerun protocol, product, and infrastructure notes.</description>
${posts
  .map(
    (post) => `<item><title>${escapeHtml(post.title)}</title><link>${siteUrl}/blog/${post.slug}/</link><guid>${siteUrl}/blog/${post.slug}/</guid><pubDate>${new Date(post.date).toUTCString()}</pubDate><description>${escapeHtml(post.excerpt)}</description></item>`
  )
  .join('\n')}
</channel></rss>
`
  )
}

writeBlog()
patchNav()
patchSitemap()

console.log(`blog: wrote ${posts.length} posts`)
