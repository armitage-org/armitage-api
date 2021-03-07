import knex from 'knex'
import { Application } from './declarations'
import config from './config'

export default function(app: Application): void {
  const db = knex(config.bookshelf.knex.init)

  app.set('knexClient', db)
}
