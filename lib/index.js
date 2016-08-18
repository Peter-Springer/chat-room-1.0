const Reset = require('./reset');
const Styles = require('./styles');
const Chatroom = require('./chatroom');
const Message = require('./message');
const User = require('./user');
const $ = require('jquery');
const input = $('.input-field');
const sendButton = $('#send-button');
const counter = $('.counter');
var chatroom = new Chatroom('title')

chatroom.getStorage();
renderMessages();

function renderMessages() {
  if (!chatroom.messages) return;
  for (i=0; i<chatroom.messages.length; i++){
    if(chatroom.messages[i].username === 'human') {
      createTemplate(chatroom.messages[i].id,'human',chatroom.messages[i].body);
    } else {
      createTemplateAi(chatroom.messages[i].id,'ai',chatroom.messages[i].body);
    }
  }
}


$('.input-field').on('keyup', function() {
  counter.text('characters:'+input.val().length);
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
  var id = JSON.stringify(Date.now());
  createTemplate(id,'human',input.val());
  chatroom.appendMessage(id,'human',input.val());
  input.val('');
  counter.text('0');
  sendButton.prop('disabled', true);
  window.setTimeout(function() {
  createTemplateAi(id, 'ai','yes');
  chatroom.appendMessage(id,'ai','yes');}, 1000);
  chatroom.setStorage(chatroom.messages);
});

function createTemplate(id, username, input) {
  $('.all-messages').append(
    `<li data=${username} id=${id}>
      <p class="message" contenteditable=false>${username}: ${input}
        <button class="delete-button"></button>
        <button class="edit-button"></button>
      </p>
    </li>`
  );
}

function createTemplateAi(id, username, input) {
  $('.all-messages').append(
    `<li data=${username} id=${id}>
      <p class="message-ai" contenteditable=false>${username}: ${input}</p>
    </li>`
  );
}

$('.all-messages').on('click', '.delete-button', function() {
   var targetId = parseInt(this.closest('li').id);
   $(this).parent().remove();
   for (i = 0; i <chatroom.messages.length; i++) {
     if (parseInt(chatroom.messages[i].id) === targetId) {
       chatroom.messages.splice(i, 1);
       chatroom.setStorage(chatroom.messages);
     }
   }
});

$('.all-messages').on('click', '.edit-button', function() {
   $(this).parent('.message').prop('contenteditable', true);
});

$('.all-messages').on('focusout', '.message', function() {
  //when you leave the edit field make it not editable
  $('.message').prop('contenteditable', false);
});
