/*
Use command mocha test/problem.js to run these tests
*/

import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../index.js'

chai.should()

chai.use(chaiHttp)


before((done) => {
    server.on('connected', () => {
        done()
    })
})

describe('/api/problems', () => {
    it('It should get all the problems', (done) => {
        chai.request(server)
            .get('/api/problems')
            .then((res) => {
                // console.log(res.body)
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
            .catch((err) => {
                console.error(err)
            })
    })

    it('It should give status: failure for invalid problemID', (done) => {
        chai.request(server)
            .get('/api/problems?problemID=abcd')
            .then((res) => {
                res.should.have.status(200)
                res.body.should.have.property('status').equal('failure')
                done()
            })
            .catch((err) => {
                console.error(err)
            })
    })

    it('It should give all problems if the parameter is anything other than problemID', (done) => {
        chai.request(server)
            .get('/api/problems?x=123')
            .then((res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
            .catch((err) => {
                console.error(err)
            })
    })


    it('It should give 404 for /api/problems POST', (done) => {
        chai.request(server)
            .post('/api/problems')
            .then((res) => {
                res.should.have.status(404)
                done()
            })
            .catch((err) => {
                console.error(err)
            })
    })

})
