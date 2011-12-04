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
  
---

#Prevel Core Extension

This will be only useful if you use __[Prevel Core Extension](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Core.js)__
which is available as an addition to Prevel.

__Example of attaching:__

```html
<script type="text/javascript" src="path/to/your/js/prevel-min.js"></script>
<script type="text/javascript" src="path/to/your/js/prevel-ext-core.js"></script>

<!-- Your scripts attached here... -->
```

Where __prevel-ext-core.js__ is file contains [this code](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Core.js).

Benefits of using more 4.7 Kb (uncompressed) a below...

###pl.map(array, function)

Returns an array with elements on which `function` has been applied. 
Essentially, it's the analogue of __ECMAScript 5th__ [`Array.prototype.map`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map).

`array` is an array on which pl.map will walk; `function` is a function which will be applied on every arrsy's element.
__Note:__ `function` ought to contain a return statement for a proper work.

__Example:__

```javascript
var initial = [1, 2, 3, 4, 5];
var final = pl.map(initial, function(el) {
  return el * 2;
});

// Now `final` equals to [2, 4, 6, 8, 10]
```

---

###pl.filter(array, function)

Returns an array with elements from the `array` which respond to the `function`'s statement. 
Essentially, it's the analogue of __ECMAScript 5th__[`Array.prototype.filter`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter).

__Example:__

```javascript
var initial = [1, '2', 3, '4'];
var final = pl.filter(initial, function(el) {
  return pl.type(el, 'int');
});

// Now `final` equals to [1, 3] because the statement was to retain only numbers
```

---

###pl.every(array, function)

Tests whether __all__ elements in the `array` respond the `function`'s statement.
Essentially, it's the analogue of __ECMAScript 5th__[`Array.prototype.every`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every).

__Examples:__

```javascript
alert(pl.every([1, 2, 90, 23], function(el) {
  return el > 0;
})); // => true

alert(pl.every([1, 2, 90, 23], function(el) {
  return el > 2;
})); // => false
```

---

###pl.some(array, function)

Tests whether __some__ elements in the `array` respond the `function`'s statement.
Essentially, it's the analogue of __ECMAScript 5th__[`Array.prototype.some`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some).

__Examples:__

```javascript
alert(pl.some([1, 2, 90, 23], function(el) {
  return el === 90;
})); // => true

alert(pl.some([1, 2, 90, 23], function(el) {
  return el < 0;
})); // => false
```

---

###pl.unique(array)

Returns an array with elements from the `array` without any repetitions.

__Example:__

```javascript
var initial = [1, 1, 1, 4, 5, 6, 6, '9'];
var final = pl.unique(initial);

// Now `final` equals to [1, 4, 5, 6, '9']
```

---

###pl.isWin(Object)

Tests whether `Object` is `window`.

__Example:__

```javascript
alert(pl.isWin( {} )); // => false
alert(pl.isWin( window )); // => true

var alias = window;
alert(pl.isWin( alias )); // => true
```

---

###pl.attach(options)

Attaches a script or style file (it will be detected automatically by the file's extension) to the current document.

`options` can contain:

* `url` - path to a file
* `type` - (only for scripts) type of script
* `charset` - (only for scripts) charset of script
* `callback` - function which will be fired when file loaded

__Examples:___

```javascript
// Attach a new script
pl.attach({
  url: 'path/to/your/js/common.js',
  type: 'text/javascript',
  charset: 'windows-1251',
  callback: function(file, time) {
    alert('File ' + file + ' loaded at ' + time + '.');
  }
});

// ==================
// Attach a new style
pl.attach({
  url: 'path/to/your/css/main.css',
  callback: function(file, time) {
    alert('File ' + file + ' loaded at ' + time + '.');
  }
});
```

---

###pl.proxy(function, context)

Returns the `function` with `this` equals `context`. Useful for miscellaneous bindinds.

__Examples:__

```javascript
var obj = {
  name: 'Abdalla',
  getName: function() {
    alert('Name is ' + this.name);
  }
};

obj.getName(); // => Abdalla

var proxied = pl.proxy(obj.getName, {name: 'Dennis'});

proxied(); // => Dennis
```

---

###pl.stringify(Object)

Returns a string which contains an `Object` converted to JSON.

__Example:__

```javascript
alert(pl.stringify({
  name: 'Ernest',
  given: 'Hemingway'
})); // => '{"name":"Ernest","given":"Hemingway"}'
```