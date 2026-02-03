import { defineConfig } from 'vitest/config'

const vitestBaseConfig = defineConfig({
  test: {
    environment: 'node',
    globals: true
  }
})

export default vitestBaseConfig
export { vitestBaseConfig }
