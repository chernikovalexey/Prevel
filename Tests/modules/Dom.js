// Prevel unit-testing
// DOM Module

module('$.dom');

var ID = 'qunit-fixture', 
    $ID = '#' + ID,
    win = window, 
    doc = win.document,
    wrapper = doc.getElementById(ID), 
    slice = [].slice;

test('$.dom.create()', function() {
  var canvas = [
    $.dom.create('canvas'),
    $.dom.create('canvas', {width: 200})
  ];
  
  equal(canvas[0].tagName, 'CANVAS', 'Checking the ordinary creation.');
  equal(canvas[1].tagName, 'CANVAS', 'Is the created tag write.');
  equal(canvas[1].getAttribute('width'), 200, 'Check the attribute.');
});

test('$.dom.css()', function() {
  var css = $.dom.css,
      el = $ID + ' code';
  
  strictEqual(css($ID, 'color'), 'rgb(150, 150, 150)', '');
});