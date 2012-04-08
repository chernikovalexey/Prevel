#Prevel Attr Module

This documentation is for [Sources/Attr.js](https://github.com/chernikovalexey/Prevel/blob/master/Sources/Attr.js). So, if you used Attr.js (e.g. `node Buid.js 1.2.9 attr`) while building Prevel or if you used [Prevel Full](https://github.com/chernikovalexey/Prevel/blob/master/prevel-full.js), or [Prevel Minified](https://github.com/chernikovalexey/Prevel/blob/master/prevel-min.js), you will be able to use all underwritten functionality.

---

###pl().addClass(className)

Adds class `className` to all selected elements.

  ```javascript
  pl('p').addClass('text');
  ```

---

###pl().hasClass(className)

Checks the if the first selected element has `className`

  ```javascript
  pl('a').addClass('plainLink');
  alert( pl('a').hasClass('plainLink') ); // true
  alert( pl('a').hasClass('someAnotherClass') ); // false
  
  // Check if the 11-th link has class
  alert( pl('a', 10).hasClass('plainLink') ); // true
  ```
  
---

###pl().removeClass(className)

Removes `className` from all selected elements.

  ```javascript
  pl('a').addClass('plainLink');
  alert( pl('a').hasClass('plainLink') ); // true
  
  pl('a').removeClass('plainLink');
  alert( pl('a').hasClass('plainLink') ); // false
  ```

---

###pl().attr(attribute [, set])

If `attribute` is an object, sets attributs according to the current collection for all selected elements.

  ```javascript
  pl('body').attr({
    lang: 'de'
    class: 'className'
  });
  ```
  
If `attribute` is a string and `set` is not defined, it returns value of `attribute` attribute.

  ```javascript
  pl('#wrap').attr({
    class: 'test'
  });
  
  alert( pl('#wrap').attr('class') ); // test
  ```

If `attribute` is a string and `set` is defined, it sets attribute `attribute` equals `set`.

  ```javascipt
  pl('#wrap').attr('style', 'font-size: 12px');
  alert( pl('#wrap').attr('style') ); // font-size: 12px
  ```

---

###pl().removeAttr(attribute)

Removes attribute `attribute` from all selected elements.

  ```javascript
  pl('#wrap').attr('style', 'font-size: 12px');
  alert( pl('#wrap').attr('style') ); // font-size: 12px
  
  pl('#wrap').removeAttr('style');
  alert( pl('#wrap').attr('style') ); // null
  ```