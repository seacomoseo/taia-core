#!/usr/bin/env tsx
/**
 * Internal Link Checker CLI
 * Checks for broken internal links in content and layouts
 * Usage: pnpm taia:links [content-dir]
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { ConfigService } from '../services/config-service'

interface Link {
  href: string
  file: string
  line: number
}

interface CheckResult {
  valid: Link[]
  broken: Link[]
  external: Link[]
}

/**
 * Extract links from markdown content
 */
function extractLinks (content: string, filePath: string): Link[] {
  const links: Link[] = []
  const lines = content.split('\n')

  // Markdown link pattern: [text](url)
  const mdLinkRegex = /\[([^\]]*)\]\(([^)]+)\)/g

  // HTML href pattern: href="url" or href='url'
  const htmlLinkRegex = /href=["']([^"']+)["']/g

  lines.forEach((line, index) => {
    let match: RegExpExecArray | null

    // Markdown links
    while ((match = mdLinkRegex.exec(line)) !== null) {
      if (match[2]) {
        links.push({
          href: match[2],
          file: filePath,
          line: index + 1
        })
      }
    }

    // HTML links
    while ((match = htmlLinkRegex.exec(line)) !== null) {
      if (match[1]) {
        links.push({
          href: match[1],
          file: filePath,
          line: index + 1
        })
      }
    }
  })

  return links
}

/**
 * Find all content and layout files
 */
function findFiles (dir: string, extensions: string[]): string[] {
  const files: string[] = []

  if (!fs.existsSync(dir)) {
    return files
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
        files.push(...findFiles(fullPath, extensions))
      }
    } else if (extensions.some(ext => entry.name.endsWith(ext))) {
      files.push(fullPath)
    }
  }

  return files
}

/**
 * Build a set of valid internal paths
 */
function buildValidPaths (srcDir: string, publicDir: string): Set<string> {
  const paths = new Set<string>()

  // Add root path
  paths.add('/')

  // Add pages from Astro routes
  const pagesDir = path.join(srcDir, 'pages')
  if (fs.existsSync(pagesDir)) {
    const pageFiles = findFiles(pagesDir, ['.astro', '.md', '.mdx'])

    for (const file of pageFiles) {
      let pagePath = file
        .replace(pagesDir, '')
        .replace(/\.(astro|md|mdx)$/, '')
        .replace(/\/index$/, '/')
        .replace(/\[.*\]/, '*') // Dynamic routes

      if (!pagePath.endsWith('/')) {
        pagePath += '/'
      }

      paths.add(pagePath)
    }
  }

  // Add content collections
  const contentDir = path.join(srcDir, 'content')
  const configService = new ConfigService(process.cwd())
  const taiaConfig = configService.getTaiaConfig()
  const defaultLang = configService.getDefaultLanguage()
  const languages = taiaConfig.languages

  const addPath = (pathValue: string) => {
    if (!pathValue.endsWith('/')) pathValue += '/'
    paths.add(pathValue)
  }

  for (const collection of taiaConfig.collections) {
    const collectionDir = path.join(contentDir, collection.id)
    if (!fs.existsSync(collectionDir)) continue

    const collectionFiles = findFiles(
      collectionDir,
      ['.md', '.mdx', '.json', '.yaml', '.yml']
    )

    for (const file of collectionFiles) {
      const rawSlug = path.basename(file).replace(/\.(md|mdx|json|yaml|yml)$/, '')
      const match = rawSlug.match(/^(.*)\.([a-zA-Z-]+)$/)
      const matchLang = match?.[2]
      const hasLang = matchLang ? languages.includes(matchLang) : false
      const lang = hasLang ? matchLang : defaultLang
      const slug = hasLang ? (match?.[1] || rawSlug) : rawSlug

      if (slug === '_index') {
        const slugValue = configService.getCollectionSlug(collection, lang)
        const langPrefix = lang === defaultLang ? '' : `/${lang}`
        addPath(`${langPrefix}/${slugValue}`.replace(/\/+$/, '/') || '/')
        continue
      }

      const prefix = configService.getCollectionPrefix(collection, lang)
      const langPrefix = lang === defaultLang ? '' : `/${lang}`
      const fullPath = [langPrefix, prefix, slug].filter(Boolean).join('/')
      addPath(`/${fullPath}`)
    }
  }

  for (const single of taiaConfig.singles) {
    for (const lang of languages) {
      const filePath = path.join(contentDir, 'singles', `${single.id}.${lang}.md`)
      if (!fs.existsSync(filePath)) continue
      const slug = configService.getSingleSlug(single, lang)
      const langPrefix = lang === defaultLang ? '' : `/${lang}`
      const fullPath = [langPrefix, slug].filter(Boolean).join('/')
      addPath(fullPath ? `/${fullPath}` : '/')
    }
  }

  // Add public files
  if (fs.existsSync(publicDir)) {
    const publicFiles = findFiles(publicDir, [
      '.html', '.pdf', '.jpg', '.png', '.svg', '.webp', '.gif'
    ])

    for (const file of publicFiles) {
      paths.add(file.replace(publicDir, ''))
    }
  }

  return paths
}

/**
 * Check if a path is valid
 */
function isValidPath (href: string, validPaths: Set<string>): boolean {
  // External links
  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
    return true // Marked as external, not checked
  }

  // Special protocols
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return true
  }

  // Normalize path
  const urlPart = href.split('#')[0]
  if (!urlPart) return false
  const pathPart = urlPart.split('?')[0]
  if (!pathPart) return false
  let normalizedPath = pathPart
  if (!normalizedPath.endsWith('/') && !normalizedPath.includes('.')) {
    normalizedPath += '/'
  }

  // Check exact match
  if (validPaths.has(normalizedPath)) {
    return true
  }

  // Check with wildcard patterns
  for (const validPath of validPaths) {
    if (validPath.includes('*')) {
      const pattern = validPath.replace(/\*/g, '[^/]+')
      const regex = new RegExp(`^${pattern}$`)
      if (regex.test(normalizedPath)) {
        return true
      }
    }
  }

  return false
}

function main () {
  const baseDir = process.argv[2] || '.'
  const srcDir = baseDir
  const publicDir = path.join(baseDir, 'public')

  console.log('🔗 TAIA Link Checker')
  console.log(`   Scanning: ${path.resolve(baseDir)}\n`)

  // Build valid paths
  const validPaths = buildValidPaths(srcDir, publicDir)
  console.log(`   Found ${validPaths.size} valid paths\n`)

  // Find all files to check
  const filesToCheck = [
    ...findFiles(srcDir, ['.astro', '.md', '.mdx', '.ts', '.tsx']),
    ...findFiles(publicDir, ['.html'])
  ]

  // Extract and check links
  const result: CheckResult = {
    valid: [],
    broken: [],
    external: []
  }

  for (const file of filesToCheck) {
    const content = fs.readFileSync(file, 'utf-8')
    const links = extractLinks(content, file)

    for (const link of links) {
      if (link.href.startsWith('http') || link.href.startsWith('//')) {
        result.external.push(link)
      } else if (isValidPath(link.href, validPaths)) {
        result.valid.push(link)
      } else {
        result.broken.push(link)
      }
    }
  }

  // Report results
  console.log('Results:')
  console.log(`  ✅ Valid internal links: ${result.valid.length}`)
  console.log(`  🌐 External links (not checked): ${result.external.length}`)
  console.log(`  ❌ Broken internal links: ${result.broken.length}`)

  if (result.broken.length > 0) {
    console.log('\nBroken links:')
    for (const link of result.broken) {
      console.log(`  ${link.file}:${link.line} → ${link.href}`)
    }
    process.exit(1)
  }

  console.log('\n✨ All internal links valid!')
}

main()
