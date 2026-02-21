import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

function getPackageVersion() {
  try {
    const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
    return String(pkg.version ?? '0.0.0')
  } catch {
    return '0.0.0'
  }
}

function getGitSha() {
  const fromEnv = process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GIT_COMMIT_SHA
  if (fromEnv) {
    return fromEnv.slice(0, 8)
  }

  try {
    return execSync('git rev-parse --short=8 HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim()
  } catch {
    return 'dev'
  }
}

const buildVersion = `${getPackageVersion()}-${getGitSha()}`

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BUILD_VERSION: buildVersion
  },
  generateBuildId: async () => buildVersion
}

export default nextConfig
