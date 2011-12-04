#Prevel Framework Core

---

###pl.extend(Object = pl, From)

Extends `Object` (if it's not declared, `pl` will be extended) with `From` properties.

You can also extend `pl.fn` object for creating your own methods which 
will interact with the dom (such as pl('div').yourMethod()). 
You can access `this` object from your method, 
which contents elements and selector (e.g. this.elements or this.selector).

__Examples:__

Simple extending:

  ```javascript
  var Child = {};
  pl.extend(Child, {
    remove: function() {},
    amount: 2
  });
  alert(Child.amount); // 2
  ```
  
Extending pl:

  ```javascript
  pl.extend({
    arrayLength: function(array) {
      return array.length;
    },
    name: 'Chuck'
  });
  alert(pl.name); // Chuck
  alert( pl.arrayLength([]) ); // 0
  ```
  
Extending dom functions list:

  ```javascript
  pl.extend(pl.fn, {
    first: function() {
      return this.elements.length ? this.elements[0] : null;
    },
    getSelector: function() {
      return this.selector[0] + (this.selector[1] || '') + (this.selector[2] || '');
    }
  });
  alert( pl('div').getSelector() ); // 'div'
  ```

---

###pl.implement(Object, From);

Extends `Object.prototype` with `From` properties.

__Example:__

  ```javascript
  function UserInterfaceClass() {}
  pl.implement(UserInterfaceClass, {
    debugMode: false
  });
  alert(UserInterfaceClass.prototype.debugMode); // false
  ```

---

###pl.isArray(Object)

Returns true, if `Object` is an array, false, if it's not an array.

__Example:__

  ```javascript
  alert( pl.isArray([]) );           // true
  alert( pl.isArray({}) );           // false
  alert( pl.isArray(100500) );       // false
  ```
  
---

###pl.type(Object [, isType])

If `isType` is not declared, returns type of `Object`. Note: if `Object` belongs to one of the predefined type-objects 
such as __Number__, __Function__, __RegExp__ and so on, it will return 'int', 'fn', 'regexp' and so on accordingly.
If it's declared, returns the equality of `Object`'s type and type given in `isType`.

__Example:__

  ```javascript
  pl.type([])           === 'arr'
  pl.type({})           === 'obj'
  pl.type(function(){}) === 'fn'
  pl.type('Prevel')     === 'str'
  pl.type(false)        === 'bool'
  pl.type(undefined)    === 'undef'
  pl.type(null)         === 'null'
  pl.type(12345)        === 'int'
  pl.type(/abc/g)       === 'regexp'
  
  pl.type(new Date())              === 'date'
  pl.type(new Number(12))          === 'int'
  pl.type(new Boolean(false))      === 'bool'
  pl.type(new Object({}))          === 'obj'
  pl.type(new Array(10))           === 'arr'
  pl.type(mew Function('return;')) === 'fn'
  pl.type(new String('Prevel'))    === 'str'
  pl.type(new RegExp(/abc/i))      === 'regexp'
  
  alert(pl.type([]) === 'arr'); // true
  alert( pl.type([], 'arr') );  // true
  ```
  
---

###pl.empty(Object)

Returns true, if `Object` is empty, and false, if it's not empty.

__Example:__

  ```javascript
  pl.empty([])        === true
  pl.empty({})        === true
  pl.empty('')        === true
  pl.empty(undefined) === true
  pl.empty(null)      === true
  pl.empty([[1, 4, 8, 8]]) === false
  ```
  
---

###pl.trim(String)

Returns `String` without any whitespaces on the right and on the left.

__Example:__

  ```javascript
  alert( pl.trim('  Prevel  ') ); // 'Prevel'
  ```

---

###pl.each(Array, Function)

Walks through the `Array` and applies `Function` for each element.

__Example:__

  ```javascript
  pl.each([1, 2, 3, 'Prevel'], function(key, value) {
    alert(key + ': ' + value); // It's possible to use `this` instead of value (they are equal)
  });
  // 0: 1
  // 1: 2
  // 2: 3
  // 3: Prevel
  ```
  
---

###pl.inArray(Search, Array)

Returns position of `Search` in `Array`. If `Array` does not contain `Search`, it returns -1.

__Example:__

  ```javascript
  pl.inArray(0, [0, 0, 0])       === 0 // Because it returns the first match
  pl.inArray('Hello', ['World']) === -1
  ```
    
---

###pl.browser([isBrowser])

If `isBrowser` is not declared, returns name of current browser. If it's declared, returns the equality of 
current browser and browser given in `isBrowser`.

Browsers which will be detected: chrome, opera, firefox, ie (any IE), ie6, ie7, ie8, safari, safari_khtml.

__Example:__

  ```javascript
  alert( pl.browser() ); // chrome (or other)
  ```
  
---

###pl.JSON(json)

Returns parsed JSON from `json`.

__Example:__

  ```javascript
  var json = '{"name": "Nick", "age": 45, "balance": 12.453}';
  alert( pl.JSON(json).balance ); // 12.453
  ```