import * as feathersAuthentication from '@feathersjs/authentication'
import { HookContext } from '../../app'
import config from '../../config'
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks

const adminMails = config.businessLogic.adminEmails

export default {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [],
    find: [],
    get: [
      async (context: HookContext) => {
        if (adminMails.includes(context.result.email)) {
          context.result.permissions = ['admin']
        } else {
          context.result.permissions = ['user']
        }
        return context
      },
    ],
    create: [],
    update: [],
    patch: [],
    remove: [],
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
