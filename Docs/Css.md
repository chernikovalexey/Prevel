#Prevel CSS Module

This documentation is for [Sources/Css.js](https://github.com/chernikovalexey/Prevel/blob/master/Sources/Css.js). So, if you used Css.js (e.g. `node Buid.js 1.2.9 css`) while building Prevel or if you used [Prevel Full](https://github.com/chernikovalexey/Prevel/blob/master/prevel-full.js), or [Prevel Minified](https://github.com/chernikovalexey/Prevel/blob/master/prevel-min.js), you will be able to use all underwritten functionality.

---

###pl().css(style [, set])

If `style` is an object, sets styles according to the current collection to all selected elements.

  ```javascript
  pl('div').css({
    'font-size': '12px'
  }); // Set font-size equals 12px to each DIV
  ```
  
If `style` is a string and `set` is not defined, it returns the first's element `style`.

  ```javascript
  pl('div').css({
    'font-size': '12px'
  });
  alert( pl('div').css('font-size') ); // 12px
  ```

If `style` is a string and `set` is defined, it sets `style` equals `set` to all selected elements.

  ```javascript
  pl('div').css('fontsize', '12px');
  ```