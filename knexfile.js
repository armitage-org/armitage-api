require('./dist/app/logger')
const config = require('./dist/config').default

module.exports = {
  ...config.bookshelf.knex.init,
}
