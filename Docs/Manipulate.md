#Prevel Manipulate Module

This documentation is for [Sources/Manipulate.js](https://github.com/chernikovalexey/Prevel/blob/master/Sources/Css.js). So, if you used Manipulate.js (e.g. `node Buid.js 1.2.9 manipulate`) while building Prevel or if you used [Prevel Full](https://github.com/chernikovalexey/Prevel/blob/master/prevel-full.js), or [Prevel Minified](https://github.com/chernikovalexey/Prevel/blob/master/prevel-min.js), you will be able to use all underwritten functionality.

---

###pl()

There're a few variants of using `pl()`.

* `pl(selector [, context, index])` - select all the selector (optional: from the context).
* `pl(callback)` - call the callback-function on dom loaded.
* `pl('<tagname>' [, newElementAttributes])` - create tagname element.
* `pl(node [, index])` - prepares `node` for further working with Prevel API; here `node` is an ordinary HTML Node (e.g. `var node = document.getElementById('some-id');`).

  ```javascript
  pl('div', 'body', 0); // The first div from the body
  pl('div a'); // All the links from all the divs
  
  // Create a canvas element width width=600 and height=200
  pl('<canvas>', {
    width: 600,
    height: 200
  });

  // Use HTML Node instead of the selector
  var node = document.getElementById('some-id');
  pl(node).hide();
  ```

---

###pl().len()

Returns length of selected elements.

  ```javascript
  pl('a').len(); // Total amount of links on the page
  ```
  
---

###pl().last()

Get the last element from the list of selected elements.

  ```javascript
  pl('div').last(); // The last div
  ```

---

###pl().get([index])

Returns NodeList of elements which has been found. If `index` is defined, returns only the element number `index`.

  ```javascript
  pl('body').get(); // Get the body element
  pl('div').get(0); // Get only the first DIV
  ```

---

###pl().parent([steps])

Returns parent node of the first element which has been found by `pl()`.

  ```javascript
  pl('body').parent(); // html
  ```
  
---

###pl().remove()

Removes all selected elements from the DOM.

  ```javascript
  pl('div').remove(); // Removes all the DIVs
  ```

---

###pl().each(fn)

It applies `fn` to the each element.

  ```javascript
  // Add the red border to all the DIVs on the page
  pl('div').each(function() {
    pl(this).css('border', '1px solid red');
  });
  ```