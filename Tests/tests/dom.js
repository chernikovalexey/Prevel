/* Prevel Framework Dom Tests
 * Last test written on the 13th of Nov.
**/

(function(win, doc, undefined) {
  // 'use strict';
  
  // Give a name to this test
  module('Dom');
  
  // IE6 makes tags upper case in the DOM
  var makeSpanLowerCase = function(string) {
    return string
      .replace(/<SPAN>/, '<span>')
      .replace(/<\/SPAN>/, '</span>');
  };
  
  var divAmount = doc.getElementsByTagName('div').length,
      pAmount = doc.getElementsByTagName('p').length + 1,
      h1Amount = doc.getElementsByTagName('h1').length,
      lastDivId = 'qunit-fixture';
  
  // pl as dom finder
  test('pl(selector)', function() {
    same(pl('body').get(), doc.body, 'Look for document.body');
    same(pl(
      'div', '#qunit-fixture').len(), 
      divAmount, 
      'Found 2 DIVs in div#qunit-fixture'
    );
    same(pl('div').last().get().id, lastDivId, 'Get the ID of the last DIV');
  });
  
  // pl().len()
  test('pl().len()', function() {
    same(pl('div').len(), divAmount, 'Found ' + divAmount + ' DIVs');
    same(pl('p').len(), pAmount, 'Found ' + pAmount + ' paragraphs');
    same(pl('h1').len(), h1Amount, 'Found ' + h1Amount + ' H1');
  });
  
  // pl().last()
  test('pl().last()', function() {    
    // Firefox returns an empty string if ID doesn't exist
    same(pl('div').last().get().id, lastDivId, 'Get the ID of the last DIV');
    same(
      pl('p').last().get().id, 
      undefined || '', 
      'Get the ID of the last paragraph'
    );
    same(pl('h1').last().get().id, undefined || '', 'Get the ID of the last H1');
  });
  
  // pl().html()
  test('pl().html', function() {
    var text = '<span>Weird cliche..</span>';
    
    // First paragraph
    pl('p', 0).html(text);
        
    same(
      makeSpanLowerCase(pl('p', 0).html()), 
      text, 
      'Set and then get html code (' + text + ') from the first paragraph'
    );
  });
  
  // pl().text()
  test('pl().text()', function() {
    var text = '- Dart? - Never heard.';
    
    // First paragraph
    pl('p', 0).html(text);
    
    same(
      pl('p', 0).html(), 
      text, 
      'Set and then get text from the first paragraph'
    );
  });
  
  // pl().get()
  test('pl().get()', function() {
    equals(pl('body').get(), doc.body, 'If selected <body> equals to document.body');
  });
  
  // pl().parent()
  test('pl().parent()', function() {
    equals(
      pl('#qunit-fixture').parent().get(), 
      doc.body, 
      '#qunit-fixture\'s parent is <body>'
    );
  });
  
  // pl().attr()
  test('pl().attr()', function() {
    equals(
      pl('.last').attr('title'), 
      'Latina non pe...', 
      'The last paragraph has got the title "Latina non pe..."'
    );
    
    pl('.last').attr('title', 'New title');
    
    equals(
      pl('.last').attr('title'), 
      'New title', 
      'The last paragraph has got the title "New title" after update'
    );
  });
  
  // pl().addClass()
  test('pl().addClass()', function() {
    equals(
      pl('.last').attr('class'), 
      'last', 
      'Before adding new class to the last paragraph'
    );
    
    pl('.last').addClass('qunit');
    
    equals(
      pl('.last').attr('class'), 
      'last qunit', 
      'After adding new class to the last paragraph'
    );
  });
  
  // pl().hasClass()
  test('pl().hasClass()', function() {
    ok(pl('.last').hasClass('last'), 'p.last has class "last"');
    same(
      pl('.last').hasClass('unExistableClass'), 
      false, 
      'p.last hasn\'t class "unExisableClass"'
    );
  });
  
  // pl().removeClass()
  test('pl().removeClass()', function() {
    ok(pl('.last').hasClass('last'), 'p.last has class "qunit"');
    pl('.last').removeClass('last');
    same(
      pl('p').last().hasClass('last'), 
      false, 
      'p.last hasn\'t class "unit" after plucking'
    );
  });
  
  // pl().css()
  test('pl().css()', function() {
    var el = pl('.last');
    
    equals(el.css('position'), 'relative', 'The last\'s paragraph position');
    
    el.css('position', 'absolute');
    
    equals(
      el.css('position'), 
      'absolute', 
      'The last\'s paragraph position after updating'
    );
  });
})(this, document);