import { defineConfig } from 'vitest/config'
import vitestBaseConfig from './configs/vitest.base.ts'

export default defineConfig({
  ...vitestBaseConfig,
  test: {
    ...vitestBaseConfig.test,
    include: ['src/**/*.test.ts', 'core/src/**/*.test.ts']
  }
})
