import app from '../../app'
import * as cleaner from 'knex-cleaner'
import request from 'supertest'
import runSeed from '../utils/seed'

let user: any
let userAdmin: any
let book: any
let accessToken: string
let accessTokenAdmin: string
let authHeader: object
let authHeaderAdmin: object

describe("'books' service", () => {
  beforeEach(async () => {
    await cleaner.clean(app.get('knexClient'), {
      ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
    })
    ;({ user, userAdmin, book } = await runSeed(app))
    accessToken = await app
      .service('authentication')
      .createAccessToken({}, { subject: user.id.toString() })
    accessTokenAdmin = await app
      .service('authentication')
      .createAccessToken({}, { subject: userAdmin.id.toString() })
    await app.service('authentication').verifyAccessToken(accessToken)
    await app.service('authentication').verifyAccessToken(accessTokenAdmin)
    authHeader = { Authorization: `Bearer ${accessToken}` }
    authHeaderAdmin = { Authorization: `Bearer ${accessTokenAdmin}` }
  })
  it('registered the service', () => {
    const service = app.service('books')
    expect(service).toBeTruthy()
  })
  describe('Unauthenticated', () => {
    it('can read book list', async () => {
      await request(app).get('/books').expect(200)
    })
    it('can read book detail', async () => {
      await request(app)
        .get(`/books/${book.id as string}`)
        .expect(200)
    })
    it('cannot create a book', async () => {
      await request(app)
        .post('/books')
        .send({
          title: 'Why we sleep?',
        })
        .expect(401)
    })
  })
  describe('Authenticated', () => {
    it('can read book list', async () => {
      await request(app).get('/books').set(authHeader).expect(200)
    })
    it('can read book detail', async () => {
      await request(app)
        .get(`/books/${book.id as string}`)
        .set(authHeader)
        .expect(200)
    })
    it('cannot create a book', async () => {
      await request(app)
        .post('/books')
        .set(authHeader)
        .send({
          title: 'Why we sleep?',
        })
        .expect(403)
    })
  })
  describe('Admin', () => {
    it('can create a book', async () => {
      await request(app)
        .post('/books')
        .set(authHeaderAdmin)
        .send({
          title: 'Why we sleep?',
        })
        .expect(201)
    })
  })
})
