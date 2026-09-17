import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const siteOrigin = 'https://docs.thandoff.com'
const distDir = fileURLToPath(new URL('../docs/.vitepress/dist/', import.meta.url))
const deploymentBase = normalizeBase(process.env.DOCS_BASE ?? '/')

function normalizeBase(value) {
  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

function htmlFilesBelow(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return htmlFilesBelow(path)
    return entry.name.endsWith('.html') ? [path] : []
  })
}

function routeFromHtml(file, rootDir) {
  const outputPath = relative(rootDir, file).split(sep).join('/')
  if (outputPath === 'index.html') return '/'
  if (outputPath.endsWith('/index.html')) return `/${outputPath.slice(0, -'index.html'.length)}`
  return `/${outputPath.slice(0, -'.html'.length)}`
}

function redirectDocument(targetRoute) {
  const publicTarget = `${deploymentBase.replace(/\/$/, '')}${targetRoute}` || '/'
  const canonical = new URL(targetRoute, siteOrigin).href
  const escapedTarget = JSON.stringify(publicTarget).replace(/</g, '\\u003c')

  return `<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting to TaskHandoff documentation</title>
    <link rel="canonical" href="${canonical}">
    <meta name="robots" content="noindex, follow">
    <meta http-equiv="refresh" content="0; url=${publicTarget}">
    <script>location.replace(${escapedTarget} + location.search + location.hash)</script>
  </head>
  <body>
    <p>This documentation has moved to <a href="${publicTarget}">${publicTarget}</a>.</p>
  </body>
</html>
`
}

const zhDir = join(distDir, 'zh')
const chineseFiles = htmlFilesBelow(zhDir)
const legacyChineseFiles = chineseFiles.filter((file) => relative(zhDir, file) !== 'index.html')

for (const sourceFile of legacyChineseFiles) {
  const outputPath = join(distDir, relative(zhDir, sourceFile))
  const targetRoute = `/zh${routeFromHtml(sourceFile, zhDir)}`
  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, redirectDocument(targetRoute))
}

const sitemap = readFileSync(join(distDir, 'sitemap.xml'), 'utf8')
if (sitemap.includes(`<loc>${siteOrigin}/en/</loc>`)) {
  throw new Error('Generated sitemap must not include the /en/ compatibility redirect')
}

console.log(`Generated ${legacyChineseFiles.length} legacy Chinese compatibility redirects.`)
