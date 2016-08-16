const $ = require('jquery');
let input = $('.input-field');
let button = $('#send-button');

$('.input-field').on('keyup', function() {
  if(input.val().length === 0 ) {
    button.prop('disabled', true);
  } else {
    button.prop('disabled', false);
  }
});

button.on('click', function() {
  createTemplate(input.val());
  input.val('');
  button.prop('disabled', true);
})

function createTemplate(input) {
  $('.all-messages').append(`<li>${input}</li>`)
}
