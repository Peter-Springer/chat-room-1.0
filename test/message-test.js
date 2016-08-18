const assert = require('chai').assert
const Message = require('../lib/message');

describe('message', function () {
  it('is an object', function () {
    var message = new Message('id', 'username', 'body');
    assert.isObject(message);
  });

  it('should take an body, username, and an id', function() {
    var message = new Message('username', 'dlahdflakhdf', '91203123098123');
    assert.deepEqual(message, {username: 'username', body: 'dlahdflakhdf',id: '91203123098123'});
  });
});
