import logger from '../logger'
import config, { safeConfig } from '../config'
import knex from 'knex'

export default async () => {
  logger.info(safeConfig)

  if (!config.enableTests) {
    throw Error(
      'Tests are disabled. Please set "ENABLE_TESTS" configuration variable.'
    )
  }
  const db = knex(config.bookshelf.knex.init)

  await db.migrate.latest()
  await db.migrate.rollback({}, true)
  await db.migrate.latest()
  // await db.seed.run()
}
