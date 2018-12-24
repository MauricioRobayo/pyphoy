module.exports = {
  linters: {
    "src/**/*.js": [
      "eslint --fix",
      "git add"
      // "jest --bail --coverage --findRelatedTests"
    ],
    "**/*.{js,ts,css,less,scss,vue,json,gql,md,yml,yaml}": [
      "prettier --write",
      "git add"
    ]
  },
  ignore: ["assets"]
};
