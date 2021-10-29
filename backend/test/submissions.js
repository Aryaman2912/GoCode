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

describe('GET Submissions', () => {
    it('It should get all the submissions', (done) => {
        chai.request(server)
            .get('/api/submissions?problemID=6172932519ae9986b7c377ac')
            .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoiNjE3MjZjZTQxMDQzNjgwYzQxOWI3ZTY5IiwiaWF0IjoxNjM1NDkwNzEwLCJleHAiOjE2MzU0OTQzMTB9.aNz6pbbMQ4WlEktw1h59D4xP92eaAKzDrJMMn2joCaY')
            .then((res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
            .catch((err) => {
                console.error(err)
            })
    })

    it('It should return empty array for invalid problemID', (done) => {
        chai.request(server)
            .get('/api/submissions?problemID=afafda')
            .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoiNjE3MjZjZTQxMDQzNjgwYzQxOWI3ZTY5IiwiaWF0IjoxNjM1NDkwNzEwLCJleHAiOjE2MzU0OTQzMTB9.aNz6pbbMQ4WlEktw1h59D4xP92eaAKzDrJMMn2joCaY')
            .then((res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(0)
                done()
            })
            .catch((err) => {
                console.error(err)
            })
    })


    it('It should give status 401 for requests without bearer token', (done) => {
        chai.request(server)
            .get('/api/submissions?problemID=akdfjakjf')
            .then((res) => {
                res.should.have.status(401)
                res.body.should.have.property('message').equal('Authentication failed')
                done()
            })
            .catch((err) => {
                console.error(err)
            })
    })

    it('It should return empty array for invalid params', (done) => {
        chai.request(server)
            .get('/api/submissions?xyz=afafda')
            .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoiNjE3MjZjZTQxMDQzNjgwYzQxOWI3ZTY5IiwiaWF0IjoxNjM1NDkwNzEwLCJleHAiOjE2MzU0OTQzMTB9.aNz6pbbMQ4WlEktw1h59D4xP92eaAKzDrJMMn2joCaY')
            .then((res) => {
                res.should.have.status(400)
                res.body.should.have.property('message').equal('No problem ID provided')
                done()
            })
            .catch((err) => {
                console.error(err)
            })
    })

    it('It should give 404 for /api/submissions POST', (done) => {
        chai.request(server)
            .post('/api/submissions')
            .then((res) => {
                res.should.have.status(404)
                done()
            })
            .catch((err) => {
                console.error(err)
            })
    })



})
