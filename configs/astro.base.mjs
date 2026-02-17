import tailwindcss from '@tailwindcss/vite'

/** @type {import('astro').AstroUserConfig} */
const astroBaseConfig = {
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto'
  },
  vite: {
    plugins: [tailwindcss()],
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
