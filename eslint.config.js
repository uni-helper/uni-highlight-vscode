const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  ignores: ['playground'],
  rules: {
    'no-new': 'off',
  },
})
