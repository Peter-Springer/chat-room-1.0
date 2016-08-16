const assert = require('assert')

describe('welcome page', function(){
  it('should be able to grab the page title', function(){
    browser.url('/');
    var title = browser.getTitle();
    assert.equal(title, 'chatapp1.0');
  });
});

describe('input field', function(){
  it('should have an input field for a message', function(){
    browser.url('/');
    var input = browser.element('.input-field');
    input.setValue('hello');
    assert.equal(input.getValue(), 'hello');
  });
});

describe('send button', function(){
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
    input.setValue('hello');
    browser.click('#send-button');
    assert.equal(browser.getText('.message'), 'hello');
  });
});

  describe('delete button', function() {
    it('should remove specific message when clicked', function() {
      browser.url('/');
      var input = browser.element('.input-field');
      input.setValue('hello');
      browser.click('#send-button');
      browser.click('.delete-button');
      assert.equal(browser.isExisting('.message'), false);
    });
  });
