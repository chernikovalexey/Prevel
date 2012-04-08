#Prevel Core Extension

This documentation will be only useful if you used __[Prevel Core Extension](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Core.js)__
which is available as an addition to Prevel.

To use it, you can simply attach it as the additional script to to your page or re-build Prevel locally on your computer.

__Example of attaching:__

```html
<script type="text/javascript" src="path/to/your/js/prevel-min.js"></script>
<script type="text/javascript" src="path/to/your/js/prevel-ext-core.js"></script>

<!-- Your scripts attached here... -->
```

Where __prevel-ext-core.js__ is file contains [this code](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Core.js).

__How to re-build Prevel:__

Firstable, you need Node.js. Just follow the [Builder Readme](https://github.com/chernikovalexey/Prevel/blob/master/Builder/README.md).

So:

```
node Build.js 1.2.9 * core
```

Will contain all [Source files](https://github.com/chernikovalexey/Prevel/blob/master/Sources) and [Extensions/Core.js](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Core.js).

---

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
* `load` - function which will be fired when file loaded

__Examples:__

```javascript
// Attach a new script
pl.attach({
  url: 'path/to/your/js/common.js',
  type: 'text/javascript',
  charset: 'windows-1251',
  load: function(file, time) {
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
  given: 'Ernest',
  family: 'Hemingway'
})); // => '{"given":"Ernest","family":"Hemingway"}'
```