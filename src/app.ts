/* eslint-disable import/first */
import compress from 'compression'
// import helmet from 'helmet'
import cors from 'cors'
import * as path from 'path'

import feathers, {
  HookContext as FeathersHookContext,
} from '@feathersjs/feathers'
process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config/')
import configuration from '@feathersjs/configuration'
import express from '@feathersjs/express'

import { Application } from './declarations'
import logger from './logger'
import middleware from './middleware'
import services from './services'
import appHooks from './app.hooks'

import authentication from './authentication'
import knex from './knex'
import { initData } from './initialData'
import debuggerService from 'feathers-debugger-service'
// Don't remove this comment. It's needed to format import lines nicely.

const app: Application = express(feathers())
export type HookContext<T = any> = { app: Application } & FeathersHookContext<T>

// Load app configuration
app.configure(configuration())
// Enable security, CORS, compression, favicon and body parsing
/* app.use(
  helmet({
    contentSecurityPolicy: false,
  })
) */
app.options('*', cors())
app.use(cors({ origin: '*' }))
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(favicon(path.join(app.get('public'), 'favicon.ico')))
// Host the public folder
// app.use('/', express.static(app.get('public')))

// Set up Plugins and providers
app.configure(express.rest())

app.configure(knex)

// Configure other middleware (see `middleware/index.ts`)
app.configure(middleware)
app.configure(authentication)
// Set up our services (see `services/index.ts`)
app.configure(services)

// enable it only on development
if (process.env.NODE_ENV === 'development') {
  // the service comes with default options predefined,
  // you can override it if you wish to, see Options below
  app.configure(
    debuggerService({ ui: true, publicUrl: '/debugger', filename: undefined }) // undefined filename = in-memory only
  )

  void app
    .service('books')
    .find()
    .then((books: any) => {
      if (books.length === 0) {
        initData(app)
      }
    })
}

// Configure a middleware for 404s and the error handler
// app.use(express.notFound())
app.use((err: any, req: any, res: any, next: any) => {
  console.log(err.stack)
  next(err)
})

app.use(express.errorHandler({ logger } as any))

app.hooks(appHooks)

export default app
