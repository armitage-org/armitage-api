// users-model.ts - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import { Application } from '../declarations'
import Knex from 'knex'

export default function(app: Application): Knex {
  return app.get('knexClient')
}
