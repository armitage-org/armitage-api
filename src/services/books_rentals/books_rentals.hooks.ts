import * as feathersAuthentication from '@feathersjs/authentication'
import { HookContext } from '@feathersjs/feathers'
import { Conflict, Forbidden } from '@feathersjs/errors'

const { authenticate } = feathersAuthentication.hooks

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authenticate('jwt'),
      async (context: HookContext) => {
        const { book_id: bookId } = context.data
        const book = await context.app.service('books').get(bookId)
        if (!book.available) {
          throw new Conflict('Book already rented')
        }
      },
      (context: HookContext) => {
        if (context.data.user_id !== context.params.user?.id) {
          throw new Forbidden()
        }
      },
    ],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [
      authenticate('jwt'),
      async (context: HookContext) => {
        const rental = await context.app.service('rentals').get(context.id)
        if (rental.user_id !== context.params.user?.id) {
          throw new Forbidden()
        }
      },
    ],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [
      (context: HookContext) => {
        context.statusCode = 204
      },
    ],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
}
