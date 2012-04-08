#Prevel Dom Extension

This documentation will be only useful if you used __[Prevel Dom Extension](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Dom.js)__
which is available as an addition to Prevel.

To use it, you can simply attach it as the additional script to to your page or re-build Prevel locally on your computer.

__Example of attaching:__

```html
<script type="text/javascript" src="path/to/your/js/prevel-min.js"></script>
<script type="text/javascript" src="path/to/your/js/prevel-ext-dom.js"></script>

<!-- Your scripts attached here... -->
```

Where __prevel-ext-dom.js__ is the file contains [this code](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Dom.js).

__How to re-build Prevel:__

Firstable, you need Node.js. Just follow the [Builder Readme](https://github.com/chernikovalexey/Prevel/blob/master/Builder/README.md).

So:

```
node Build.js 1.2.9 * dom
```

Will contain all [Source files](https://github.com/chernikovalexey/Prevel/blob/master/Sources) and [Extensions/Dom.js](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Dom.js).

---

###pl().blur()

Removes focus from selected elements.

__Example:__

```javascript
pl('textarea').blur();
```

---

###pl().focus()

Adds focus to selected elements.

__Example:__

```javascript
pl('textarea').focus();
```

---

###pl().empty()

Removes all the inner html of selected elements.

__Example:__

```javascript
pl('div').empty(); // Will make every DIV empty
```

---

###pl().tag(is)

If `is` is defined it will return true, if the 
tag name of the first selected element equals to `is`.

If `is` is undefined it will just return the tag name of the first selected
element.

__Examples:__

```javascript
alert( pl('div').tag() ); // => div
pl('div').tag('div') === true
```

---

###pl().val(insert)

If `insert` is defined, it inserts `insert` to all selected text 
inputs (input[type="text"], textarea, ...). 

If `insert` is undefined, it will return value of the first selected text input.

__Examples:__

```javascript
var text = 'Tuam casa incensis est.';

pl('textarea').val(text);
pl('textarea').val() === text;
```

---

###pl().wrap(tagName, attr)

Makes a wrap of all the selected elements. Instead of two parameters it's 
possible to pass only one - html node by which elements will be wrapped.

__Examples:__

```javascript
pl('p').wrap('<div>', {id: 'wrapper'});
pl('a').wrap('<span>');
pl('ul').wrap(pl('<div>').get());
```

---

###pl().replaceWith(element, options)

Replaces selected elements with new node (`element` with attributes - `options`).

__Example:__

```javascript
pl('div').replaceWith('<span>', {className: 'replaced'});
```

---

###pl().toggleClass(className)

Removes class `className`, if it already exists, and adds class 
`className`, if it doesn't exist. This operation turns for all the selected elements.

__Example:__

```javascript
pl('<div>').appendTo('body');
alert( pl('div').attr('class') ); // => ''
pl('div').toggleClass('js-added');
alert( pl('div').attr('class') ); // => js-added
```

---

###pl().parents(selector)

If `selected` is defined, returns all parents which fit to the `selector`. If undefined, returns all parent elements.

Exempli gratia, we have the following HTML:

```html
<html>
 <head></head>
 <body>
  <div class="test1">
   <div class="test2">
    <div id="final-test"></div>
   </div>
  </div>
 </body>
</html>
```

```javascript
pl('#final-test').parents('.test1').get(); // => <div class="test1">...</div>
pl('#final-test').parents().get(); 
/* Outputs:
 * [<div class="test2">...</div>, <div class="test1">...</div>, 
 *   <body>...</body>, <html>...</html>]
**/
```

---

###pl().find(selector)

Searches for elements, which fit to the `selector`, through already selected elements.

HTML:

```html
<html>
 <head></head>
 <body>
  <div class="test1">
   <div class="test2">
    <div id="final-test"></div>
   </div>
  </div>
 </body>
</html>
```

```javascript
pl('.test1').find('#final-test').get(); // => <div id="final-test"></div>
```