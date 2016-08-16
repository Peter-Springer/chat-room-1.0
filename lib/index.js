const Reset = require('./reset');
const Styles = require('./styles');
const Chatroom = require('./chatroom');
const Message = require('./message');
const User = require('./user');
// const Events = require('./event-listeners');
const $ = require('jquery');
const input = $('.input-field');
const sendButton = $('#send-button');
const counter = $('.counter');
var chatroom = new Chatroom('title')

chatroom.getStorage();


function renderMessages() {
  if (JSON.parse(localStorage.getItem('messages'))){
    for (i=0; i<chatroom.messages.length; i++){
      createTemplate(chatroom.messages[i].body);
    }
  }
}

renderMessages();



// function chatRoom() {
//   new Chatroom('title');
// }
//
// chatRoom();


$('.input-field').on('keyup', function() {
  counter.text(input.val().length);
  if(input.val().length === 0 ) {
    sendButton.prop('disabled', true);
  } else {
    sendButton.prop('disabled', false);
  }
});

$('.input-field').on('keyup', function() {
  if(input.val().length === 0 ) {
    sendButton.prop('disabled', true);
  } else {
    sendButton.prop('disabled', false);
  }
});



sendButton.on('click', function() {
  createTemplate(input.val());
  chatroom.appendMessage(input.val());
  input.val('');
  counter.text('0');
  sendButton.prop('disabled', true);
  window.setTimeout(function() {
  createTemplateAi('yes');
  chatroom.appendMessage('yes');}, 1000)
  chatroom.setStorage(chatroom.messages);
});

function createTemplate(input) {
  $('.all-messages').append(
    `<li >
      <p class="message" contenteditable=false>${input}</p>
      <button class="delete-button">delete</button>
      <button class="edit-button">edit</button>
    </li>`
  );
}

function createTemplateAi(input) {
  $('.all-messages').append(
    `<li>
      <p class="message-ai" contenteditable=false>${input}</p>
    </li>`
  );
}

$('.all-messages').on('click', '.delete-button', function() {
   $(this).parent().remove();
});

$('.all-messages').on('click', '.edit-button', function() {
   $(this).siblings('.message').prop('contenteditable', true);
})
