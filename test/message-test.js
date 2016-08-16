const assert = require('chai').assert
const Message = require('../lib/message');

describe('message', function () {
  it('is an object', function () {
    var message = new Message('username', 'body');
    assert.isObject(message);
  });
});
