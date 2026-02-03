import { createTaiaAstroConfig } from './src/integration/astro-config.ts'

export default createTaiaAstroConfig({
  output: 'static',
  useCloudflare: false
})
