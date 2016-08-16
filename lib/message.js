class Message {
  constructor(username, body) {
    this.id = Date.now();
    this.username = username;
    this.body = body;
  }
}


module.exports = Message;
