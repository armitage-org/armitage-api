// rental_queue-model.ts - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import Knex from 'knex'
import { Application } from '../declarations'

export default function(app: Application): Knex {
  return app.get('knexClient')
}
