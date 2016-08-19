const Reset = require('./reset');
const Styles = require('./styles');
const Chatroom = require('./chatroom');
const Message = require('./message');
const User = require('./user');
const $ = require('jquery');
const input = $('.input-field');
const sendButton = $('#send-button');
const counter = $('.counter');
var chatroom = new Chatroom('title');

chatroom.getStorage();
renderMessages();

function renderMessages() {
  $('li').remove();
  if (chatroom.messages.length <= 10) {
    renderAllMessages();
    $('.show-more').hide();
  } else {
  renderTenMessages();
  $('.show-more').show();
}

}

function renderTenMessages() {
  if (chatroom.messages.length === 0) return;
  for (let i = chatroom.messages.length - 10; i <= chatroom.messages.length - 1; i++){
    if(chatroom.messages[i].username === 'human') {
      createTemplate(chatroom.messages[i].id,'human',chatroom.messages[i].body);
    } else {
      createTemplateAi(chatroom.messages[i].id,'ai',chatroom.messages[i].body);
    }
  }
}

function renderAllMessages() {
  if (chatroom.messages.length === 0) return;
  for (let i = 0; i < chatroom.messages.length; i++){
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
  // createTemplate(id,'human',input.val());
  var response = generateResponse(input.val());
  chatroom.appendMessage(id,'human',input.val());
  input.val('');
  counter.text('characters: 0');
  sendButton.prop('disabled', true);
  window.setTimeout(function() {
    var id = JSON.stringify(Date.now());
    createTemplateAi(id, 'ai', response);
    chatroom.appendMessage(id,'ai',response);}, 1000);
  chatroom.setStorage(chatroom.messages);
  renderMessages();
});

$('.input-field').on('keyup', function (event) {
  if(event.keyCode == 13){
    $("#send-button").click();
   }
 })

function generateResponse(input) {
  var type = input.slice(-1);
  if (type === '?') {
    return responses.question[Math.floor(Math.random()*responses.question.length)];
  } else {
    return responses.statement[Math.floor(Math.random()*responses.statement.length)];
  }
}

var responses = {
  question: ['It is certain', 'It is decidedly so', 'Without a doubt',
  'Yes, definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes',
 'Signs point to yes','Reply hazy try again','Ask again later','Better not tell you now',
 'Cannot predict now','Concentrate and ask again','Dont count on it','My reply is no','My sources say no','Outlook not so good',
 'Very doubtful'],
  statement: ['Do you even know what you are talking about?','You sound like a crazy person', 'You fool',
  'You are certainly entitled to your own opinions', 'My cats breath smells like catfood', 'I like waffles  ',
  'Good for you', 'Dayyum you looking good today','Someone is bossy',
  'Have you thought about how they must feel','Rude','Think before you speak','My mom says not to talk about that subject',
  'Shh there are children around','You and I are not so different','When pigs fly','If you insist','I have to agree','Someone is oversharing',
  '#pluglife'
  ]
};

function createTemplate(id, username, input) {
  $('.all-messages').append(
    `<li data=${username} id=${id}>
      <p class="message">${username}: <span class="body" contenteditable=false>${input}</span>
        <button class="delete-button"></button>
        <button class="edit-button"></button>
      </p>
    </li>`
  );
}

function createTemplateAi(id, username, input) {
  $('.all-messages').append(
    `<li data=${username} id=${id}>
      <p class="message-ai">${username}: <span>${input}</span></p>
    </li>`
  );
}

$('.all-messages').on('click', '.delete-button', function() {
   var targetId = parseInt(this.closest('li').id);
  //  $(this).parent().remove();
   for (i = 0; i <chatroom.messages.length; i++) {
     if (parseInt(chatroom.messages[i].id) === targetId) {
       chatroom.messages.splice(i, 1);
       chatroom.setStorage(chatroom.messages);
     }
   }
   renderMessages();
});

$('.all-messages').on('click', '.edit-button', function(event) {
  $(this).siblings('.body').prop('contenteditable', true);
});

$('.body').on('blur', function() {
  $(this).prop('contenteditable', false);
  var targetId = parseInt(this.closest('li').id);
  var message = $(this).text();
  for (i = 0; i <chatroom.messages.length; i++) {
    if (parseInt(chatroom.messages[i].id) === targetId) {
      chatroom.messages[i].body = message;
      chatroom.setStorage(chatroom.messages);
    }
  }
  renderMessages();
});

$('main').on('click', '.show-more',function() {
  renderAllMessages();
  $('.show-more').text('Show Less');
  $('.show-more').prop('class', 'show-less');
});

$('main').on('click', '.show-less', function() {
  renderMessages();
  $('.show-less').text('Show More');
  $('.show-less').prop('class', 'show-more');
});
