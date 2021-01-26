"use strict";

require("regenerator-runtime/runtime");

// Require the dev-dependencies
var chai = require('chai');

var chaiHttp = require('chai-http'); // const server = require('../server/bin/www')


var app = require('../../dist-server/server'); // Assertion


chai.should();
chai.use(chaiHttp);
var API = 'http://localhost:1337'; // Our parent block

describe('Server', function () {
  /*
  *   Testing the /POST route
  **/
  describe('/POST entries', function () {
    it('should post entries', function (done) {
      var entry = {
        title: 'Sunday',
        description: 'The Lords Day'
      };
      chai.request(API).post('/api/v1/entries').send(entry).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('title').eql('Sunday');
        res.body.should.have.property('description');
        res.body.should.have.property('timestamp');
        done();
      });
    });
    it('should not post a entry without all require fields', function (done) {
      var entry = {};
      chai.request(API).post('/api/v1/entries').send(entry).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Missing required fields');
        done();
      });
    });
  });
  /*
  *   Test the /GET route
  */

  describe('./GET entries', function () {
    it('should get all the entries', function (done) {
      chai.request(API).get('/api/v1/entries').end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.not.be.eq(0);
        done();
      });
    });
    it('should NOT return all the entries', function (done) {
      chai.request(API).get('/api/v1/entry').end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });
  });
  /*
  *   Test the /GET/:id route
  */

  describe('/GET/:id entries', function () {
    it('should get an entry by id', function (done) {
      var entryId = 'trYl7JYATH0';
      chai.request(API).get("/api/v1/entries/".concat(entryId)).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('title');
        res.body.should.have.property('description');
        res.body.should.have.property('timestamp');
        done();
      });
    });
    it('should not get entry without right Id', function (done) {
      var entryId = 'trYl7JYATH9';
      chai.request(API).get("/api/v1/entries/".concat(entryId)).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Not Found');
        done();
      });
    });
  });
  /*
  *   Test the /PUT/:id route
  **/

  describe('/PUT/:id entry', function () {
    it('should update an entry given the Id', function (done) {
      var entryId = 'trYl7JYATH0';
      var entry = {
        title: 'Sunday',
        description: 'The Lords Day is a Great Day'
      };
      chai.request(API).put("/api/v1/entries/".concat(entryId)).send(entry).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('title');
        res.body.should.have.property('description');
        done();
      });
    });
  });
  /*
  *   Test the /DELETE/:id route
  **/

  describe('/DELETE/:id entry', function () {
    it('should delete an entry given its ID', function (done) {
      var entry = {
        title: 'Testing',
        description: 'Just some description'
      };
      chai.request(API).post('/api/v1/entries').send(entry).end(function (err, res) {
        if (res.should.have.status(200)) {
          var entryId = res.body.id;
          chai.request(API)["delete"]("/api/v1/entries/".concat(entryId)).end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Entry deleted');
          });
          done();
        } else {
          throw new Error(err);
        }
      });
    });
    it('should not delete an entry given wrong id', function (done) {
      var entryId = 'cgcgcgj';
      chai.request(API)["delete"]("/api/v1/entries/".concat(entryId)).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('Entry does not exist in file');
        done();
      });
    });
  });
});