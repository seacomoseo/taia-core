const baseConfig = require('./eslint.base.cjs')

module.exports = {
  ...baseConfig,
  ignorePatterns: [...(baseConfig.ignorePatterns || []), 'vendor/']
}
