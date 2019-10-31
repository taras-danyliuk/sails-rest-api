const supertest = require('supertest');

describe('CategoryController', function() {

  describe('#find()', function() {
    it('should find all available categories', function (done) {
      supertest(sails.hooks.http.app)
        .get('/category')
        .expect(200, done);
    });
  });

  describe('#findOne()', function() {
    it('should not find category', function (done) {
      supertest(sails.hooks.http.app)
        .get('/category/test')
        .expect(400, done);
    });
  });
});
