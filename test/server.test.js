// Require the dev-dependencies
import 'regenerator-runtime/runtime';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server';

// Assertion
chai.should()
chai.use(chaiHttp)
const API = 'http://localhost:1337'
// Our parent block
describe('Server', () => {
    /*
    *   Testing the /POST route
    **/
    describe('/POST entries', () => {
        it('should post entries', (done) => {
            const entry = {
                title: 'Mayday',
                description: 'A life or death experience'
            }
            chai.request(API)
                .post('/api/v1/entries')
                .send(entry)
                .end((err, res) => {
                    if (res.should.have.status(200)) {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        res.body.should.have.property('id')
                        res.body.should.have.property('title').eql('Mayday')
                        res.body.should.have.property('description')
                        res.body.should.have.property('timestamp')
                        // delete the file created after the test
                        const entryId = res.body.id
                        console.log(entryId)
                        chai.request(API)
                            .delete(`/api/v1/entries/${entryId}`)
                            .end((err, res) => {
                                res.should.have.status(200)
                            })
                        done()
                    }
                })
        })

        it('should not post a entry without all require fields', (done) => {
            const entry = {}
            chai.request(API)
                .post('/api/v1/entries')
                .send(entry)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('error')
                    res.body.error.should.be.eql('Missing required fields')
                    done()
                })
        })
    })

    /*
    *   Test the /GET route
    */
    describe('./GET entries', () => {
        it('should get all the entries', (done) => {

            chai.request(API)
                .get('/api/v1/entries')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.not.be.eq(0)
                    done()
                })
        })

        it('should NOT return all the entries', (done) => {
            chai.request(API)
                .get('/api/v1/entry')
                .end((err, res) => {
                    res.should.have.status(404)
                    done()
                })
        })
    })

    /*
    *   Test the /GET/:id route
    */
    describe('/GET/:id entries', () => {
        it('should get an entry by id', (done) => {
            const entryId = 'trYl7JYATH0'
            chai.request(API)
                .get(`/api/v1/entries/${entryId}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id')
                    res.body.should.have.property('title')
                    res.body.should.have.property('description')
                    res.body.should.have.property('timestamp')
                    done()
                })
        })

        it('should not get entry without right Id', (done) => {
            const entryId = 'trYl7JYATH9'
            chai.request(API)
                .get(`/api/v1/entries/${entryId}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    res.body.should.have.property('error')
                    res.body.error.should.be.eql('Not Found')
                    done()
                })
        })
    })

    /*
    *   Test the /PUT/:id route
    **/
    describe('/PUT/:id entry', () => {
        it('should update an entry given the Id', (done) => {
            const entryId = 'trYl7JYATH0'
            const entry = {
                title: 'Sunday',
                description: 'The Lords Day is a Great Day'
            }
            chai.request(API)
                .put(`/api/v1/entries/${entryId}`)
                .send(entry)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id')
                    res.body.should.have.property('title')
                    res.body.should.have.property('description')
                    done()
                })
        })
    })

    /*
    *   Test the /DELETE/:id route
    **/
    describe('/DELETE/:id entry', () => {

        it('should delete an entry given its ID', (done) => {
            const entry = {
                title: 'Testing',
                description: 'Just some description'
            }
            chai.request(API)
                .post('/api/v1/entries')
                .send(entry)
                .end((err, res) => {
                    if (res.should.have.status(200)) {
                        const entryId = res.body.id
                        chai.request(API)
                            .delete(`/api/v1/entries/${entryId}`)
                            .end((err, res) => {
                                res.should.have.status(200)
                                res.body.should.be.a('object')
                                res.body.should.have.property('message')
                                res.body.message.should.be.eql('Entry deleted')
                            })
                        done()
                    } else {
                        throw new Error(err)
                    }
                })
        })

        it('should not delete an entry given wrong id', (done) => {
            const entryId ='cgcgcgj'
            chai.request(API)
                .delete(`/api/v1/entries/${entryId}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message')
                    res.body.message.should.be.eql('Entry does not exist in file')
                    done()
                })
        })
    })
})

