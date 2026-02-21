# Edgerun Frontend (Static Solid Build)

This frontend is built as a static site using:
- SolidJS `renderToString` for server-side HTML generation
- Tailwind CSS CLI for stylesheet output
- esbuild for native ESM browser scripts
- Bun for package/runtime tooling

## Build

```bash
bun install
bun run build
```

Build output:
- `dist/` static website for GitHub Pages
- `wiki/` versioned markdown docs for GitHub wiki sync

## Quality checks

```bash
bun run check
```

## Build metadata

The generator reads environment variables:
- `EDGERUN_VERSION`
- `EDGERUN_VERSIONS`
- `EDGERUN_BUILD_NUMBER`
- `EDGERUN_SITE_URL`
- `EDGERUN_SITE_DOMAIN`

These values are embedded in pages and release artifacts.
