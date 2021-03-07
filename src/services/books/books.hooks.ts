import * as feathersAuthentication from '@feathersjs/authentication'
import { fastJoin, ResolverMap } from 'feathers-hooks-common'
import { HookContext } from '@feathersjs/feathers'
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks

const bookResolvers: ResolverMap<any> = {
  joins: {
    rentals: () => async (book, context) => {
      // TODO: remove rentals field
      book.rentals = await context.app.service('rentals').find({
        query: {
          book_id: book.id,
        },
      })
      book.mostRecentRent = book.rentals
        .filter((rental: any) => rental.returnedAt === null)
        .sort(function compare(a: any, b: any) {
          return new Date(a.rentedAt).getTime() - new Date(b.rentedAt).getTime()
        })[0]
      if (book.mostRecentRent) {
        book.mostRecentRent.user = await context.app
          .service('users')
          .get(book.mostRecentRent.user_id)
      }
      book.available = book.rentals.length === 0
    },
  },
}

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: authenticate('jwt'),
    update: authenticate('jwt'),
    patch: authenticate('jwt'),
    remove: authenticate('jwt'),
  },

  after: {
    all: [fastJoin(bookResolvers)],
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
