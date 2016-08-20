const assert   = require('chai').assert
const Message  = require('./message-test')
const Chatroom = require('./chatroom-test')
const User     = require('./user-test')


describe('our test bundle', function () {
  it('should work', function () {
    assert(true);
  });
});

// describe('our renderMessages', function () {
//   it('should render ten messages when more than 10 messages exist', function () {
//     var chatroom = new Chatroom('title');
//     var message = new Message('username', 'body', 'id');
//     chatroom.appendMessage(message);
//     chatroom.appendMessage(message);
//     chatroom.appendMessage(message);
//     expect renderAllMessages to have been called;
//   });
// });
