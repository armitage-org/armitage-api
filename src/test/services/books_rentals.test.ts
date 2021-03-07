import app from '../../app'
import * as cleaner from 'knex-cleaner'
import request from 'supertest'
import runSeed from '../utils/seed'

let user: any
let user2: any
let accessToken: string
let accessToken2: string
let authHeader: object
let authHeader2: object
let book: any

describe("'books_rentals' service", () => {
  beforeEach(async () => {
    await cleaner.clean(app.get('knexClient'), {
      ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
    })
    ;({ user, user2, book } = await runSeed(app))
    accessToken = await app
      .service('authentication')
      .createAccessToken({}, { subject: user.id.toString() })
    accessToken2 = await app
      .service('authentication')
      .createAccessToken({}, { subject: user2.id.toString() })
    await app.service('authentication').verifyAccessToken(accessToken)
    await app.service('authentication').verifyAccessToken(accessToken2)
    authHeader = { Authorization: `Bearer ${accessToken}` }
    authHeader2 = { Authorization: `Bearer ${accessToken2}` }
  })
  it('registered the service', () => {
    const service = app.service('rentals')
    expect(service).toBeTruthy()
  })
  describe('Unauthenticated', () => {
    it('cannot create a rental', async () => {
      await request(app)
        .post('/rentals')
        .send({
          user_id: user.id,
          book_id: book.id,
        })
        .expect(401)
    })
  })
  describe('Authenticated', () => {
    it('can create a rental', async () => {
      await request(app)
        .post('/rentals')
        .set(authHeader)
        .send({
          user_id: user.id,
          book_id: book.id,
        })
        .expect(201)
    })
    it('cannot create 2nd rental for the same book', async () => {
      await request(app)
        .post('/rentals')
        .set(authHeader)
        .send({
          user_id: user.id,
          book_id: book.id,
        })
        .expect(201)
      const { body } = await request(app)
        .post('/rentals')
        .set(authHeader)
        .send({
          user_id: user.id,
          book_id: book.id,
        })
        .expect(409)
      expect(body.message).toMatchInlineSnapshot('"Book already rented"')
    })
    it('can return a book', async () => {
      const { body: rental } = await request(app)
        .post('/rentals')
        .set(authHeader)
        .send({
          user_id: user.id,
          book_id: book.id,
        })
        .expect(201)
      await request(app)
        .delete(`/rentals/${rental.id as string}`)
        .set(authHeader)
        .expect(204)
    })
    it('can create 2nd rental for the same book if returned in between', async () => {
      const { body: rental } = await request(app)
        .post('/rentals')
        .set(authHeader)
        .send({
          user_id: user.id,
          book_id: book.id,
        })
        .expect(201)
      await request(app)
        .delete(`/rentals/${rental.id as string}`)
        .set(authHeader)
        .expect(204)
      await request(app)
        .post('/rentals')
        .set(authHeader)
        .send({
          user_id: user.id,
          book_id: book.id,
        })
        .expect(201)
    })
    it('cannot create rental for already rented book', async () => {
      await request(app)
        .post('/rentals')
        .set(authHeader)
        .send({
          user_id: user.id,
          book_id: book.id,
        })
        .expect(201)
      const { body } = await request(app)
        .post('/rentals')
        .set(authHeader2)
        .send({
          user_id: user.id,
          book_id: book.id,
        })
        .expect(409)
      expect(body.message).toMatchInlineSnapshot('"Book already rented"')
    })
    it('cannot create rental for another user', async () => {
      await request(app)
        .post('/rentals')
        .set(authHeader)
        .send({
          user_id: user2.id,
          book_id: book.id,
        })
        .expect(403)
    })
    it('cannot delete other users rental', async () => {
      const { body: rental } = await request(app)
        .post('/rentals')
        .set(authHeader)
        .send({
          user_id: user.id,
          book_id: book.id,
        })
        .expect(201)
      await request(app)
        .delete(`/rentals/${rental.id as string}`)
        .set(authHeader2)
        .expect(403)
    })
  })
})
