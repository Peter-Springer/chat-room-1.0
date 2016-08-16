class User {
  constructor(name) {
    this.id = Date.now();
    this.name = name;
  }
}

module.exports = User;

//may need to have users aware of messages outside of scope of chatroom
