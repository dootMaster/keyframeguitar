const app = require('./');
const supertest = require('supertest');
const request = supertest(app);
const db = require('../src/db/index.js');

describe('Test GET request for /id endpoint', () => {
  it('should get 200 status code', (done) => {
    request
      .get('/id')
      .expect(200)
      .end(done);
  });

  it('/id response should be array', (done) => {
    request
      .get('/id')
      .expect(200)
      .expect((res) => {
        if(!typeof res.body === 'array') {
          throw new Error('not an array');
        }
      })
      .end(done);
  });
});




beforeAll(done => {
  done()
})

afterAll(done => {
  db.close()
  done()
})