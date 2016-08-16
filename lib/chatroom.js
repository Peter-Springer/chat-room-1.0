const Message = require('./message');
const User = require('./user');

class Chatroom {
  constructor(title) {
    this.title = title;
    this.messages = [];
    this.users = [];
  }

  appendMessage(message) {
    this.messages.push(message);
  }

  appendUser(user) {
    this.users.push(user);
  }
}




module.exports = Chatroom;
