var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var app = require('../server');
var config = {
  db: 'mongodb://localhost/jusbrasil',
  api: 'http://localhost:8080'
};

describe('Searching', function() {

  it('should create an article', function(done) {

    var article = { title: 'article test', type: 'test' };

    request(app)
      .post('/api/articles')
      .send(article)
      .expect(201, done);
    
  })

  it ('should make a simple search and return results', function(done) {

    request(app)
      .get('/api/articles?q=test')
      .expect(200, done);

  });

  it('should make a simple search and return no results', function(done) {
    request(app)
      .get('/api/articles?q=noresult123')
      .expect(204, done);
  })

  it ('should make a filtered by entity search and return results', function(done) {

    request(app)
      .get('/api/articles?q=article&entity_type=test')
      .expect(200, done);

  });

  it ('should make a filtered by entity search and return no results', function(done) {

    request(app)
      .get('/api/articles?q=article&entity_type=alakazan')
      .expect(204, done);

  });

  it ('should return types', function(done) {

    request(app)
      .get('/api/types')
      .expect(200, done);

  });

});
