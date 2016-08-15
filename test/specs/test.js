const assert = require('assert')

describe('welcome page', function(){
  it('should be able to grab the page title', function(){
    browser.url('/');
    var title = browser.getTitle();
    assert.equal(title, 'chatapp1.0');
  });
});
