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

  setStorage(message) {
    localStorage.setItem('messages', JSON.stringify(message));
  }

  getStorage() {
    if (localStorage.getItem('messages') === "undefined") return;
    this.messages = JSON.parse(localStorage.getItem('messages'));
  }
}

// function to set local storaghe from this.messages
//
// function to retrieve local storage from this.messages
//
// function to render this.messages when page loads - maybe on index


module.exports = Chatroom;
