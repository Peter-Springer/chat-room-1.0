const assert = require('chai').assert
const Chatroom = require('../lib/chatroom');
const Message = require('../lib/message');
const User = require('../lib/user');

describe('chatroom', function () {
  it('is an object', function () {
    var chatroom = new Chatroom('title');
    assert.isObject(chatroom);
  });
  it('should have a title', function () {
    var chatroom = new Chatroom('title');
    assert.equal(chatroom.title, 'title');
  });
  it('should start with an empty array of messages', function () {
    var chatroom = new Chatroom('title');
    assert.deepEqual(chatroom.messages, []);
  });
  it('should start with an empty array of users', function () {
    var chatroom = new Chatroom('title');
    assert.deepEqual(chatroom.users, []);
  });
  it('should have a method called appendMessage', function() {
    var chatroom = new Chatroom('title');
    assert.isFunction(chatroom.appendMessage);
  });
  it('length of chatroom.messages array should increase by one each time appendMessage is excecuted', function () {
    var chatroom = new Chatroom('title');
    var message = new Message('username', 'body');
    chatroom.appendMessage(message);
    chatroom.appendMessage(message);
    chatroom.appendMessage(message);
    assert.equal(chatroom.messages.length, 3);
  });
  it('length of chatroom.users array should increase by one each time appendUser is excecuted', function () {
    var chatroom = new Chatroom('title');
    var user = new User('username');
    chatroom.appendUser(user);
    chatroom.appendUser(user);
    chatroom.appendUser(user);
    assert.equal(chatroom.users.length, 3);
  });

  it.skip('should have messages which are objects', function () {
    var chatroom = new Chatroom('title');
    assert.isObject(chatroom.messages);
  });
  //chatroom should have a property of messages
  //chatroom should have a tit
});
