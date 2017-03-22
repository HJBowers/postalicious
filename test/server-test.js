const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../sandbox-server/server.js')


chai.use(chaiHttp)


describe('sandbox-server', () => {

  context('sever started', () => {

    it('should respond with status 200', (done) => {
      chai.request(app)
      .get('/')
      .end( () => {
        expect.(response).to.have.status(200)
      })
    })

  })
})
