const supertest = require('supertest');

describe('CategoryController.find', function() {

  describe('#find()', function() {
    it('should find all available categories', function (done) {
      supertest(sails.hooks.http.app)
        .get('/category')
        .expect(200, done);
    });
  });
});
