/* Prevel Framework Find Tests
 * Last test written on the 13th of Nov.
**/

(function(win, doc, undefined) {
  // 'use strict';
  
  // Give a name to this test
  module('Find');
  
  // Core of the CSS queries selector engine
  test('pl.find', function() {
    var title = 'found well';

    same(pl('a.trl').attr('title'), title, 'a.trl\'s title');
    same(pl('.link span').attr('title'), title, '.link span\'s title');
    same(pl('.sp sp').attr('title'), title, '.sp sp\'s title');
    
    // Because one paragraph will be added when QUnit loading (dynamically)
    same(pl('p', 1).attr('title'), title, 'p\'s title');
    same(pl('#p').attr('title'), title, '#p\'s title');
    same(pl('#p .link').attr('title'), title, '#p .link\'s title');
    same(pl('#p #sp1').attr('title'), title, '#p #sp1\'s title');
    same(pl('p#p').attr('title'), title, 'p#p\'s title');
    same(pl('p a').attr('title'), title, 'p a\'s title');
    same(pl('.link').attr('title'), title, '.link\'s title');
    same(pl('input[type=checkbox]').last().attr('title'), title, 'input[type=checkbox]\'s title');
    same(pl('h1:first-child').attr('id'), 'qunit-header', 'h1:first-child\'s ID');
    same(pl('p:nth-child(2n+1)').attr('id'), 'qunit-testresult', 'p:nth-child(2n+1)\'s ID');
    same(pl('body>div').attr('id'), 'qunit-testrunner-toolbar', 'body>div\'s ID');
  });
})(this, document);