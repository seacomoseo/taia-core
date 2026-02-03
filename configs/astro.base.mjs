/** @type {import('astro').AstroUserConfig} */
const astroBaseConfig = {
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssMinify: true,
      minify: true
    },
    ssr: {
      external: ['node:fs', 'node:path', 'node:crypto', 'path']
    }
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover'
  }
}

export default astroBaseConfig
export { astroBaseConfig }
