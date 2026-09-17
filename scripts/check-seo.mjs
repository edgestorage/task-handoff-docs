import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const distDirUrl = new URL('../docs/.vitepress/dist/', import.meta.url)
const distDir = fileURLToPath(distDirUrl)
const requiredHeadPatterns = [
  ['description', /<meta name="description" content="[^"]+">/g],
  ['canonical', /<link rel="canonical" href="[^"]+">/g],
  ['zh-CN alternate', /<link rel="alternate" hreflang="zh-CN" href="[^"]+">/g],
  ['en-US alternate', /<link rel="alternate" hreflang="en-US" href="[^"]+">/g],
  ['x-default alternate', /<link rel="alternate" hreflang="x-default" href="[^"]+">/g],
  ['robots', /<meta name="robots" content="index, follow,[^"]+">/g],
  ['Open Graph title', /<meta property="og:title" content="[^"]+">/g],
  ['Open Graph image', /<meta property="og:image" content="https:\/\/[^"\s]+">/g],
  ['Twitter card', /<meta name="twitter:card" content="summary_large_image">/g],
  ['JSON-LD', /<script type="application\/ld\+json">[^<]+<\/script>/g]
]

function filesBelow(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? filesBelow(path) : [path]
  })
}

function fail(message) {
  throw new Error(`SEO check failed: ${message}`)
}

if (!existsSync(distDir)) fail('build output does not exist')

const htmlFiles = filesBelow(distDir).filter((file) => file.endsWith('.html'))
const contentFiles = htmlFiles.filter((file) => !file.endsWith('/404.html'))
const indexableFiles = contentFiles.filter((file) => {
  const html = readFileSync(file, 'utf8')
  return !html.includes('<meta name="robots" content="noindex, follow">')
})
const compatibilityFiles = contentFiles.filter((file) => {
  const html = readFileSync(file, 'utf8')
  return html.includes('<meta name="robots" content="noindex, follow">')
})
const canonicals = new Set()
const descriptions = new Set()

for (const file of indexableFiles) {
  const html = readFileSync(file, 'utf8')

  for (const [label, pattern] of requiredHeadPatterns) {
    const count = html.match(pattern)?.length ?? 0
    if (count !== 1) fail(`${file} has ${count} ${label} tags`)
  }

  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1]
  const description = html.match(/<meta name="description" content="([^"]+)">/)?.[1]
  if (!canonical?.startsWith('https://docs.thandoff.com/')) fail(`${file} has an invalid canonical`)
  if (canonicals.has(canonical)) fail(`${file} repeats canonical ${canonical}`)
  if (descriptions.has(description)) fail(`${file} repeats a page description`)
  canonicals.add(canonical)
  descriptions.add(description)

  const jsonLd = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1]
  try {
    JSON.parse(jsonLd ?? '')
  } catch {
    fail(`${file} has invalid JSON-LD`)
  }
}

for (const file of compatibilityFiles) {
  const html = readFileSync(file, 'utf8')
  if (!html.includes('<meta name="robots" content="noindex, follow">')) {
    fail(`${file} must remain a noindex compatibility page`)
  }

  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1]
  if (!canonical || canonical.includes('docs.thandoff.com/en/')) {
    fail(`${file} must canonicalize to the root English route`)
  }
}

const notFound = readFileSync(new URL('404.html', distDirUrl), 'utf8')
if (!notFound.includes('<meta name="robots" content="noindex, nofollow">')) {
  fail('404.html must be noindex, nofollow')
}

const sitemap = readFileSync(new URL('sitemap.xml', distDirUrl), 'utf8')
for (const canonical of canonicals) {
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) fail(`sitemap is missing ${canonical}`)
}

const robots = readFileSync(new URL('robots.txt', distDirUrl), 'utf8')
if (!robots.includes('Sitemap: https://docs.thandoff.com/sitemap.xml')) {
  fail('robots.txt does not reference the production sitemap')
}

console.log(`SEO check passed for ${indexableFiles.length} indexable pages and ${compatibilityFiles.length} compatibility redirects.`)
