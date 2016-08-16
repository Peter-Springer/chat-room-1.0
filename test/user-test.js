const assert = require('chai').assert
const User = require('../lib/user')

describe('user', function () {
  it('is an object', function () {
    var user = new User('username');
    assert.isObject(user);
  });
});
