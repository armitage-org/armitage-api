import { createLoader, safeValues, values } from 'configuru'
import { Level } from 'pino'

const loader = createLoader()

const configSchema = {
  logger: {
    defaultLevel: loader.custom(x => x as Level)('LOGGER_DEFAULT_LEVEL'),
    pretty: loader.bool('LOGGER_PRETTY'),
  },
  enableTests: loader.bool('ENABLE_TESTS'),
  node: {
    env: loader.string('NODE_ENV'),
  },
  server: {
    port: loader.number('SERVER_PORT'),
  },
  bookshelf: {
    options: {
      runMigrationsOnStartup: false,
      runSeedsOnStartup: false,
    },
    knex: {
      init: {
        client: 'pg',
        connection: {
          host: loader.string('SQL_HOST'),
          port: loader.string('SQL_PORT'),
          user: loader.string('SQL_USER'),
          password: loader.string('SQL_PASSWORD'),
          database: loader.string('SQL_DB'),
          charset: 'utf8',
          timezone: 'UTC',
          connectTimeout: 10000,
          timeout: 10000,
        },
        debug: true,
        pool: { min: 2, max: 10 },
      },
    },
  },
}

export default values(configSchema)
export const safeConfig = safeValues(configSchema)
console.log(JSON.stringify(safeConfig), 'loaded config')
