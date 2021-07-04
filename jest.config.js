module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  testMatch: [
    '**/tests/unit/**/*.test.(js|jsx|ts|tsx)',
    '**/__tests__/**/*.test.(js|jsx|ts|tsx)'
  ]
}
