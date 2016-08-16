const $ = require('jquery');
let input = $('.input-field');
const sendButton = $('#send-button');
const Index = require('./index');
const Chatroom = require('./chatroom');

$('.input-field').on('keyup', function() {
  if(input.val().length === 0 ) {
    sendButton.prop('disabled', true);
  } else {
    sendButton.prop('disabled', false);
  }
});

var chatroom = new Chatroom('title')

sendButton.on('click', function() {
  createTemplate(input.val());
  chatroom.appendMessage(input.val());
  input.val('');
  sendButton.prop('disabled', true);
  window.setTimeout(function() {
    debugger;
    createTemplateAi('yes');
    chatroom.appendMessage('yes');
  }, 1000)
});

function createTemplate(input) {
  $('.all-messages').append(
    `<li>
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
      <button class="delete-button">delete</button>
      <button class="edit-button">edit</button>
    </li>`
  );
}

$('.all-messages').on('click', '.delete-button', function() {
   $(this).parent().remove();
});

$('.all-messages').on('click', '.edit-button', function() {
   $(this).siblings('.message').prop('contenteditable', true);
})
