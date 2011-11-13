/* Prevel Framework Core Tests
 * Last test written on the 12th of Nov.
**/

(function(undefined) {
  // 'use strict';
  
  // Give a name to this test
  module('Core');
  
  // Test if Prevel has been initialized
  test('Initialize', function() {
    ok(pl, 'pl exists');
  });
  
  // pl.type
  test('pl.type', function() {
    equal(pl.type({}), 'obj', 'pl.type({});');
    equal(pl.type([]), 'arr', 'pl.type([]);');
    equal(pl.type(''), 'str', 'pl.type(\'\');');
    equal(pl.type(1), 'int', 'pl.type(1);');
    equal(pl.type(NaN), 'int', 'pl.type(NaN);');
    equal(pl.type(/abc/), 'regexp', 'pl.type(/abc/);');
    equal(pl.type(true), 'bool', 'pl.type(true);');
    equal(pl.type(null), 'null', 'pl.type(null);');
    equal(pl.type(undefined), 'undef', 'pl.type(undefined);');
    equal(pl.type(function() {}), 'fn', 'pl.type(function() {});');
    equal(pl.type(new Date()), 'date', 'pl.type(new Date());');
  });
  
  // pl.extend
  test('pl.extend', function() {
    var _ = {};
    
    equal(_.name, undefined, '{}.unExistableMethod;');
    
    pl.extend(_, {
      // Extending object with getter/setter is supported but when tested
      // in deprecated browsers it causes fatal errors, so that 
      // Prevel can't be tested properly
      getter: 'Getter.',
      'function': function() {
        return 'Function.';
      },
      value: 'Value.'
    });
    
    equal(_.getter, 'Getter.', '_.getter - getter');
    equal(_['function'](), 'Function.', '_.function - ordinary function');
    equal(_.value, 'Value.', '_.value - ordinary static value');
  });
  
  // pl.isArray
  test('pl.isArray', function() {
    equal(pl.isArray([]), true, 'pl.isArray([]);');
    equal(pl.isArray([[,]]), true, 'pl.isArray([[,]]);');
    equal(pl.isArray({}), false, 'pl.isArray({});');
    equal(
      pl.isArray('1,2,3'.split(',')), 
      true, 
      'pl.isArray(\'1,2,3\'.split(\',\'));'
    );
  });
  
  // pl.empty
  test('pl.empty', function() {
    equals(pl.empty(''), true, 'pl.empty(\'\');');
    equals(pl.empty([]), true, 'pl.empty([]);');
    equals(pl.empty({}), true, 'pl.empty({});');
    equals(pl.empty(0), true, 'pl.empty(0);');
    equals(
      pl.empty('Tuam casa incensis est.'), 
      false, 
      'pl.empty(\'Tuam casa incensis est.\')'
    );
  });
  
  // pl.trim
  test('pl.trim', function() {
    equals(pl.trim(''), '', 'Empty string');
    ok(pl.trim('   ') === '', 'String just with spaces');
    same(pl.trim(), '', 'Method called without a parameter');
    equals(pl.trim(' x'), 'x', 'Spaces before');
    equals(pl.trim('x '), 'x', 'Spaces after');
    equals(pl.trim(' x '), 'x', 'Spaces are on both sides');
    equals(pl.trim('    x  '), 'x', 'Tabs');
    equals(pl.trim('    x   y  '), 'x   y', 'Inside the string tabs and spaces mustn\'t be touched');
  });
  
  // pl.inArray
  test('pl.inArray', function() {
    var _ = [
      0, 1, 1, 2, 3, 5, 8, 13, 21, 34,
      'Luca', 'Paccioli', 'Johann', 'Wolfgang', 'von', 'Goethe'
    ];
    
    same(pl.inArray(34, _), 9, 'Yes, position #9.');
    same(pl.inArray(13, _), 7, 'Yes, position #7.');
    same(pl.inArray(100500, _), -1, 'Nope.');
    
    same(pl.inArray('Luca', _), 10, 'Yes (this is a string).');
    same(pl.inArray('Hugo', _), -1, 'Nope (this is a string).');
    same(pl.inArray('Notre-Dam de Paris', _), -1, 'Nope (this is a string).');
  });
  
  // pl.toParams
  test('pl.toParams', function() {
    var _ = {
      name: 'Sebastian',
      age: 26,
      balance: 1098.123
    };
    
    equals(
      pl.toParams(_), 
      'name=Sebastian&age=26&balance=1098.123', 
      'Simple object'
    );
  });
  
  // pl.JSON
  test('pl.json', function() {
    var _ = pl.JSON('{"name":"Sebastian","age":26,"balance":1098.123}');
    
    equals(_.name, 'Sebastian', 'Sebastian');
    equals(_.age, 26, '26');
    equals(_.balance, 1098.123, '1098.123');
  });
})();