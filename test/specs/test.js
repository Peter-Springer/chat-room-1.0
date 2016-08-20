const assert = require('assert')

describe('welcome page', function(){
  it('should be able to grab the page title', function(){
    browser.url('/');
    var title = browser.getTitle();
    assert.equal(title, 'chatapp1.0');
  });
});

describe('input field', function(){
  it('should have an input field', function(){
    browser.url('/');
    var input = browser.element('.input-field');
    assert.equal(input.isExisting(), true);
  });

  it('should have an input field that can hold a value', function(){
    browser.url('/');
    var input = browser.element('.input-field');
    input.setValue('hello');
    assert.equal(input.getValue(), 'hello');
  });
});

describe('send button', function(){
  it('should have a send button', function(){
    browser.url('/');
    var send = browser.element('#send-button');
    assert.equal(send.isExisting(), true);
  });

  it('should have a send button which is disabled if there is no input', function(){
    browser.url('/');
    var button = browser.element('#send-button');
    var input = browser.element('.input-field');
    input.setValue('');
    console.log(input.getValue());
    assert.equal(browser.isEnabled('#send-button'), false);
  });

  it('should enable the send button when there is an input', function(){
    browser.url('/');
    var button = browser.element('#send-button');
    var input = browser.element('.input-field');
    input.setValue('hello');
    assert.equal(browser.isEnabled('#send-button'), true);
  });

  it('should append the message to the DOM', function(){
    browser.url('/');
    var input = browser.element('.input-field');
    input.setValue('hello1');
    browser.click('#send-button');
    assert.equal(browser.getText('.message'), 'human: hello1');
    browser.click('.delete-button');
  });
});

describe('delete button', function() {
  it('should have a delete button', function(){
    browser.url('/');
    var deleteButton = browser.element('.delete-button');
    var input = browser.element('.input-field');
    input.setValue('hello1');
    browser.click('#send-button');
    assert.equal(deleteButton.isExisting(), true);
    browser.click('.delete-button');
  });

  it('should remove message when clicked', function() {
    browser.url('/');
    var input = browser.element('.input-field');
    input.setValue('hello1');
    browser.click('#send-button');
    browser.click('.delete-button');
    assert.equal(browser.isExisting('.message'), false, 'The message is still on the page');
  });
});

describe('messages on DOM', function() {
  it('messages should exist after send is clicked', function(){
    browser.url('/');
    var input = browser.element('.input-field');
    var message = browser.element('.message');
    input.setValue('hello1');
    browser.click('#send-button');
    assert.equal(message.isExisting(), true);
    browser.click('.delete-button');
  });

  it('should have a contenteditable attribute thats default is false', function() {
    browser.url('/');
    var input = browser.element('.input-field');
    var message = browser.element('.body');
    input.setValue('hello1');
    browser.click('#send-button');
    assert.equal(message.getAttribute('contenteditable'), "false");
  });

  it('content should become editable when you click the edit button', function() {
    browser.url('/');
    var input = browser.element('.input-field');
    input.setValue('hello1');
    browser.click('#send-button');
    var body = browser.element('.body');
    browser.click('.edit-button');
    assert.equal(body.getAttribute('contenteditable'), "true");
  });
});


describe('character counter', function() {
  it('character count should exist on page load', function(){
    browser.url('/');
    var input = browser.element('.input-field');
    var counter = browser.element('.counter');
    input.setValue('hello1');
    assert.equal(counter.isExisting(), true);
  });

  it('should increase as characters are typed into the input field', function() {
    browser.url('/');
    var input = browser.element('.input-field');
    var counter = browser.element('.counter');
    input.setValue('hello1');
    assert.equal(counter.getText(), 'characters: 6');
  });
});

describe('auto reply', function() {
  it('should detect when an element is created/has text', function() {
    browser.url('/');
    var input = browser.element('.input-field');
    var aimessage = browser.element('.message-ai');
    input.setValue('hello1');
    browser.click('#send-button');
    assert.equal(aimessage.waitForText(2000), true);
  });
});

describe('show more and show less', function() {
  it('should have no show more button if less than 10 messages exist', function() {
    browser.url('/');
    var input = browser.element('.input-field');
    var aimessage = browser.element('.message-ai');
    var showMore = browser.element('.show-more');
    input.setValue('hello1');
    browser.click('#send-button');
    assert.equal(showMore.isVisible(), false);
  });
  it('should have no show more button if less than 10 messages exist', function() {
    browser.url('/');
    var input = browser.element('.input-field');
    var aimessage = browser.element('.message-ai');
    var showMore = browser.element('.show-more');
    for (let i = 0; i < 12; i++) {
      input.setValue('hello1');
      browser.click('#send-button');
    }
    assert.equal(showMore.isVisible(), true);
  });
  it('should have no show more button if less than 10 messages exist', function() {
    browser.url('/');
    var input = browser.element('.input-field');
    var aimessage = browser.element('.message-ai');
    for (let i = 0; i < 12; i++) {
      input.setValue('hello1');
      browser.click('#send-button');
    }
    browser.click('.show-more');
    var showMore = browser.element('.show-more');
    var showLess = browser.element('.show-less');
    assert.equal(showMore.isVisible(), false);
    assert.equal(showLess.isVisible(), true);
  });
});

// describe('local storage', function() {
//   it('has data within local storage', function() {
//     browser.url('/');
//     var input = browser.element('.input-field');
//     input.setValue('hello1');
//     var message = browser.element('.message');
//     browser.click('#send-button');
//     input.setValue('hello1');
//     browser.click('#send-button');
//     var arr = [];
//     arr.push(browser.localStorage('GET', 'messages'));
//     assert.equal(arr.length, 1);
//   });
// });
