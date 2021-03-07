import app from '../../app'

describe("'rental_queue' service", () => {
  it('registered the service', () => {
    const service = app.service('queue')
    expect(service).toBeTruthy()
  })
})
