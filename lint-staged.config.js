module.exports = {
  'src/**/*.js': [
    'eslint --fix',
    // "jest --bail --coverage --findRelatedTests"
  ],
  '**/*.{js,ts,css,less,scss,vue,json,gql,md,yml,yaml}': ['prettier --write'],
}
