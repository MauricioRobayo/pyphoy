module.exports = {
  extends: 'stylelint-config-recommended',
  ignoreFiles: ['assets'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'function',
          'if',
          'else',
          'for',
          'return',
          'each',
          'include',
          'mixin',
        ],
      },
    ],
  },
}
