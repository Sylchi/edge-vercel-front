import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')
const publicDir = path.join(root, 'public')
const brandDir = path.join(publicDir, 'brand')
const configPath = path.join(root, 'config', 'brand-theme.json')
const theme = JSON.parse(readFileSync(configPath, 'utf8'))

mkdirSync(brandDir, { recursive: true })

const markPath = `
M50 8 L86 26 L50 44 L14 26 Z
M14 38 L50 56 L86 38 L86 52 L50 70 L14 52 Z
M14 64 L50 82 L86 64 L86 78 L50 96 L14 78 Z
`.trim()

function markSvg(fg, bg = 'none') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  ${bg === 'none' ? '' : `<rect width="100" height="100" rx="16" fill="${bg}" />`}
  <path d="${markPath}" fill="${fg}" />
</svg>
`
}

const logoHorizontalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 170" fill="none">
  <rect width="720" height="170" fill="white"/>
  <g transform="translate(30 35)">
    <path d="${markPath}" fill="#171717"/>
  </g>
  <text x="170" y="112"
    fill="#171717"
    font-family="Inter, Montserrat, Avenir Next, Segoe UI, Arial, sans-serif"
    font-size="78"
    font-weight="700"
    letter-spacing="0.12em">EDGERUN</text>
</svg>
`

const logoHorizontalDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 170" fill="none">
  <rect width="720" height="170" fill="#0b0b0d"/>
  <g transform="translate(30 35)">
    <path d="${markPath}" fill="#f5f5f5"/>
  </g>
  <text x="170" y="112"
    fill="#f5f5f5"
    font-family="Inter, Montserrat, Avenir Next, Segoe UI, Arial, sans-serif"
    font-size="78"
    font-weight="700"
    letter-spacing="0.12em">EDGERUN</text>
</svg>
`

const wordmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 120" fill="none">
  <rect width="560" height="120" fill="white"/>
  <text x="12" y="84"
    fill="#171717"
    font-family="Inter, Montserrat, Avenir Next, Segoe UI, Arial, sans-serif"
    font-size="78"
    font-weight="700"
    letter-spacing="0.12em">EDGERUN</text>
</svg>
`

const wordmarkDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 120" fill="none">
  <rect width="560" height="120" fill="#0b0b0d"/>
  <text x="12" y="84"
    fill="#f5f5f5"
    font-family="Inter, Montserrat, Avenir Next, Segoe UI, Arial, sans-serif"
    font-size="78"
    font-weight="700"
    letter-spacing="0.12em">EDGERUN</text>
</svg>
`

const iconAdaptiveSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <style>
    @media (prefers-color-scheme: light) {
      .bg { fill: ${theme.colors.lightBackground}; }
      .fg { fill: ${theme.colors.lightForeground}; }
    }
    @media (prefers-color-scheme: dark) {
      .bg { fill: ${theme.colors.darkBackground}; }
      .fg { fill: ${theme.colors.darkForeground}; }
    }
  </style>
  <rect class="bg" width="100" height="100" rx="16"/>
  <path class="fg" d="${markPath}" />
</svg>
`

writeFileSync(path.join(brandDir, 'edgerun-mark.svg'), markSvg('#171717'))
writeFileSync(path.join(brandDir, 'edgerun-mark-light.svg'), markSvg('#171717', '#ffffff'))
writeFileSync(path.join(brandDir, 'edgerun-mark-dark.svg'), markSvg('#f5f5f5', '#0b0b0d'))
writeFileSync(path.join(brandDir, 'edgerun-wordmark.svg'), wordmarkSvg)
writeFileSync(path.join(brandDir, 'edgerun-wordmark-dark.svg'), wordmarkDarkSvg)
writeFileSync(path.join(brandDir, 'edgerun-logo.svg'), logoHorizontalSvg)
writeFileSync(path.join(brandDir, 'edgerun-logo-dark.svg'), logoHorizontalDarkSvg)
writeFileSync(path.join(publicDir, 'icon.svg'), iconAdaptiveSvg)
writeFileSync(path.join(publicDir, 'placeholder-logo.svg'), logoHorizontalSvg)
writeFileSync(path.join(publicDir, 'placeholder.svg'), markSvg('#171717'))

const iconLightTemp = path.join(brandDir, 'icon-light-temp.svg')
const iconDarkTemp = path.join(brandDir, 'icon-dark-temp.svg')
writeFileSync(iconLightTemp, markSvg('#171717', '#ffffff'))
writeFileSync(iconDarkTemp, markSvg('#f5f5f5', '#0b0b0d'))

function magick(args) {
  execFileSync('magick', args, { stdio: 'inherit' })
}

magick([iconLightTemp, '-resize', '32x32', path.join(publicDir, 'icon-light-32x32.png')])
magick([iconDarkTemp, '-resize', '32x32', path.join(publicDir, 'icon-dark-32x32.png')])
magick([iconLightTemp, '-resize', '180x180', path.join(publicDir, 'apple-icon.png')])
magick([iconLightTemp, '-resize', '192x192', path.join(publicDir, 'icon-192.png')])
magick([iconDarkTemp, '-resize', '512x512', path.join(publicDir, 'icon-512.png')])
magick([path.join(publicDir, 'icon-light-32x32.png'), path.join(publicDir, 'favicon.ico')])
magick([path.join(brandDir, 'edgerun-logo.svg'), '-resize', '256x144', path.join(publicDir, 'placeholder-logo.png')])
rmSync(iconLightTemp, { force: true })
rmSync(iconDarkTemp, { force: true })

console.log('Generated brand assets in public/ and public/brand/')
