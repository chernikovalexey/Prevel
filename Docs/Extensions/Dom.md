#Prevel Dom Extension

This will be only useful if you use __[Prevel Dom Extension](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Dom.js)__
which is available as an addition to Prevel.

__Example of attaching:__

```html
<script type="text/javascript" src="path/to/your/js/prevel-min.js"></script>
<script type="text/javascript" src="path/to/your/js/prevel-ext-dom.js"></script>

<!-- Your scripts attached here... -->
```

Where __prevel-ext-dom.js__ is the file contains [this code](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Dom.js).

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