const request = require('supertest')
const server = require('../server')
const data = require('../data.json')

test('Test setup is working correctly', () => {
  expect(true).toBeTruthy()
})

test('/1 gives a 200 status', (done) => {
  request(server)
    .get('/1')
    .end((err, res) => {
      expect(err).toBeNull()
      expect(res.status).toBe(200)
      done()
    })
})

test('/ gives a 200 status', (done) => {
  request(server)
    .get('/')
    .end((err, res) => {
      expect(err).toBeNull()
      expect(res.status).toBe(200)
      done()
    })
})

test('/:id returns a restaurant details page', (done) => {
  // Arrange
  data.restaurants.forEach(restaurant => {
    request(server)
      .get(`/${restaurant.id}`)
      .end((err, res) => {
        expect(err).toBeNull()
        expect(res.text).toMatch(restaurant.name && restaurant.rating && restaurant.location)
        done()
      })
  })
})
