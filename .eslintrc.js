module.exports = {
  ...require('@ackee/styleguide-backend-config/eslint'),
  ignorePatterns: ['dist'],
  parserOptions: {
    project: '.eslint.tsconfig.json',
  },
}
