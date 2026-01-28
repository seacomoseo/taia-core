#!/usr/bin/env tsx
/**
 * Lighthouse Performance Audit CLI
 * Runs Lighthouse CI with performance budgets
 * Usage: pnpm taia:lighthouse [url]
 */

import { execSync } from 'node:child_process'
import * as fs from 'node:fs'
import * as path from 'node:path'

/**
 * Performance budgets
 * Based on Core Web Vitals and best practices
 */
const BUDGETS = {
  // Core Web Vitals
  'largest-contentful-paint': 2500, // ms, good < 2.5s
  'cumulative-layout-shift': 0.1, // good < 0.1
  'total-blocking-time': 200, // ms (proxy for INP), good < 200ms

  // Other metrics
  'first-contentful-paint': 1800, // ms
  'speed-index': 3400, // ms
  'time-to-interactive': 3800, // ms

  // Lighthouse scores (0-100)
  performance: 90,
  accessibility: 100,
  'best-practices': 100,
  seo: 100
}

/**
 * Lighthouse configuration
 */
const LIGHTHOUSE_CONFIG = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'mobile',
    throttling: {
      // Simulated slow 4G
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4
    },
    screenEmulation: {
      mobile: true,
      width: 412,
      height: 823,
      deviceScaleFactor: 1.75
    }
  }
}

function checkLighthouseInstalled (): boolean {
  try {
    execSync('npx lighthouse --version', { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

function runLighthouse (url: string): Record<string, number> | null {
  console.log(`\n🔦 Running Lighthouse on ${url}...\n`)

  const configPath = path.join(process.cwd(), '.lighthouse-config.json')
  fs.writeFileSync(configPath, JSON.stringify(LIGHTHOUSE_CONFIG, null, 2))

  try {
    const outputPath = path.join(process.cwd(), '.lighthouse-results.json')

    execSync(
      `npx lighthouse ${url} --config-path=${configPath} --output=json --output-path=${outputPath} --chrome-flags="--headless --no-sandbox"`,
      { stdio: 'pipe' }
    )

    const results = JSON.parse(fs.readFileSync(outputPath, 'utf-8'))

    // Clean up
    fs.unlinkSync(configPath)
    fs.unlinkSync(outputPath)

    // Extract metrics
    const metrics: Record<string, number> = {}

    // Scores
    metrics.performance = Math.round(results.categories.performance.score * 100)
    metrics.accessibility = Math.round(results.categories.accessibility.score * 100)
    metrics['best-practices'] = Math.round(results.categories['best-practices'].score * 100)
    metrics.seo = Math.round(results.categories.seo.score * 100)

    // Core Web Vitals
    const audits = results.audits
    metrics['largest-contentful-paint'] = audits['largest-contentful-paint']?.numericValue || 0
    metrics['cumulative-layout-shift'] = audits['cumulative-layout-shift']?.numericValue || 0
    metrics['total-blocking-time'] = audits['total-blocking-time']?.numericValue || 0
    metrics['first-contentful-paint'] = audits['first-contentful-paint']?.numericValue || 0
    metrics['speed-index'] = audits['speed-index']?.numericValue || 0
    metrics['time-to-interactive'] = audits.interactive?.numericValue || 0

    return metrics
  } catch (error) {
    console.error('Failed to run Lighthouse:', error)

    // Clean up on error
    if (fs.existsSync(configPath)) fs.unlinkSync(configPath)

    return null
  }
}

function evaluateResults (metrics: Record<string, number>): { passed: boolean; report: string[] } {
  const report: string[] = []
  let passed = true

  const scoreMetrics = ['performance', 'accessibility', 'best-practices', 'seo']
  const timeMetrics = ['largest-contentful-paint', 'first-contentful-paint', 'speed-index', 'time-to-interactive', 'total-blocking-time']

  report.push('\n📊 Results:\n')
  report.push('Scores:')

  for (const metric of scoreMetrics) {
    const value = metrics[metric]
    const budget = BUDGETS[metric as keyof typeof BUDGETS] as number
    if (value !== undefined) {
      const pass = value >= budget
      const icon = pass ? '✅' : '❌'
      report.push(`  ${icon} ${metric}: ${value}/100 (target: ${budget})`)
      if (!pass) passed = false
    }
  }

  report.push('\nCore Web Vitals:')

  for (const metric of timeMetrics) {
    const value = metrics[metric]
    const budget = BUDGETS[metric as keyof typeof BUDGETS] as number

    if (value !== undefined) {
      if (metric === 'cumulative-layout-shift') {
        const pass = value <= budget
        const icon = pass ? '✅' : '❌'
        report.push(`  ${icon} CLS: ${value.toFixed(3)} (target: ≤${budget})`)
        if (!pass) passed = false
      } else {
        const pass = value <= budget
        const icon = pass ? '✅' : '❌'
        const displayName = metric.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        report.push(`  ${icon} ${displayName}: ${Math.round(value)}ms (target: ≤${budget}ms)`)
        if (!pass) passed = false
      }
    }
  }

  // CLS
  const clsValue = metrics['cumulative-layout-shift']
  const clsBudget = BUDGETS['cumulative-layout-shift']
  if (clsValue !== undefined) {
    const clsPass = clsValue <= clsBudget
    report.push(`  ${clsPass ? '✅' : '❌'} Cumulative Layout Shift: ${clsValue.toFixed(3)} (target: ≤${clsBudget})`)
    if (!clsPass) passed = false
  }

  return { passed, report }
}

function main () {
  const url = process.argv[2] || 'http://localhost:4321'

  console.log('🔦 TAIA Lighthouse Audit')
  console.log(`   URL: ${url}`)
  console.log('\nPerformance Budgets:')
  console.log('  - Performance: ≥90')
  console.log('  - Accessibility: 100')
  console.log('  - Best Practices: 100')
  console.log('  - SEO: 100')
  console.log('  - LCP: ≤2500ms')
  console.log('  - CLS: ≤0.1')
  console.log('  - TBT: ≤200ms')

  if (!checkLighthouseInstalled()) {
    console.log('\n⚠️  Lighthouse not found. Installing...')
    try {
      execSync('npm install -g lighthouse', { stdio: 'inherit' })
    } catch {
      console.error('Failed to install Lighthouse. Please install manually: npm install -g lighthouse')
      process.exit(1)
    }
  }

  const metrics = runLighthouse(url)

  if (!metrics) {
    console.error('\n❌ Failed to get Lighthouse results')
    process.exit(1)
  }

  const { passed, report } = evaluateResults(metrics)

  for (const line of report) {
    console.log(line)
  }

  if (passed) {
    console.log('\n✨ All performance budgets met!')
  } else {
    console.log('\n❌ Some performance budgets were not met')
    process.exit(1)
  }
}

main()
