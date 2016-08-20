const Message = require('./message');
const User = require('./user');

class Chatroom {
  constructor(title) {
    this.title = title;
    this.messages = [];
    this.users = [];
  }

  appendMessage(id, username, body) {
    var message = new Message(username, body, id);
    this.messages.push(message);
    this.setStorage(this.messages);
  }

  appendUser(user) {
    this.users.push(user);
  }

  setStorage(messages) {
    localStorage.setItem('messages', JSON.stringify(messages));
  }

  getStorage() {
    let parsedMessages = JSON.parse(localStorage.getItem('messages'))
    if (!parsedMessages) return;
    this.messages = parsedMessages;
  }
}

module.exports = Chatroom;
