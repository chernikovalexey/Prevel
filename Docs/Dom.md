#Prevel Framework DOM

---

###pl()

There're a few variants of using `pl()`.

* `pl(selector [, context, index])` - select all the selector (optional: from the context).
* `pl(callback)` - call the callback-function on dom loaded.
* `pl('<tagname>' [, newElementAttributes])` - create tagname element.

  ```javascript
  pl('div', 'body', 0); // The first div from the body
  pl('div a'); // All the links from all the divs
  
  // Create a canvas element width width=600 and height=200
  pl('<canvas>', {
    width: 600,
    height: 200
  });
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

###pl().html([insert [, destination]])

If nothing is not declated, returns inner html code of the first element. 
If `insert` is declared, inserts it to each element. 
Destination means to which place of an element it's necessary insert `insert`. 
If it's equals _1_, `insert` will be inserted into the end of an element, 
otherwise (if destination = -1) - to the beggining.

  ```javascript
  pl('#id').html(); // #id's inner html
  pl('.class').html('<p>Test</p>'); // Insert '<p>Test</p>' to all the .class
  pl('.class', 0).html('<p>Test</p>'); // Insert '<p>Test</p>' to only the first .class
  pl('div').html('Lorem!', 1); // Insert 'Lorem!' to the end of each div
  pl('div').html('Lorem!', -1); // Insert 'Lorem!' to the beggining of each div
  ```
  
---

###pl().text([insert [, destination]])

If nothing is not declated, returns inner text code of the first element. 
If `insert` is declared, inserts it to each element. 
Destination means to which place of an element it's necessary insert `insert`. 
If it's equals _1_, `insert` will be inserted into the end of an element, 
otherwise (if destination = -1) - to the beggining.

  ```javascript
  pl('#id').text(); // #id's text
  pl('.class').text('Test'); // Insert 'Test' to all the .class
  pl('.class', 0).text('Test'); // Insert 'Test' to only the first .class
  pl('div').text('Lorem!', 1); // Insert 'Lorem!' to the end of each div
  pl('div').text('Lorem!', -1); // Insert 'Lorem!' to the beggining of each div
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
  
---

###pl().each(fn)

It applies `fn` to the each element.

  ```javascript
  // Add the red border to all the DIVs on the page
  pl('div').each(function() {
    pl(this).css('border', '1px solid red');
  });
  ```
  
---

###pl().bind(event, fn)

Attaches event listener (to `event` event `fn` callback) to every selected element.

  ```javascript
  pl('a').bind('click', function() {
    alert('Clicked.');
  });
  ```

In addition, it's possible to attach not only one event listener. Example:

  ```javascript
  pl('a').bind({
    click: function() {
      alert('Clicked.');
    },
    mouseover: function() {
      pl(this).css('text-decoration', 'underline');
    },
    mouseout: function() {
      pl(this).css('text-decoration', 'none');
    }
  });
  ```

---

###pl().unbind(event, fn)

Detaches event listener from all selected elements. If parameters didn't passed, it plucks all the event listeners attached 
to selected elements. If only `event` passed, it plucks all the event listeners of `event`-event (e.g.: click-events).

  ```javascript
  var evtListenerFn = function() {
    alert('Clicked.');
  };
  
  pl('a').bind('click', evtListenerFn);   // Event listener has been attached from all the links
  pl('a').unbind('click', evtListenerFn); // Event listener has been detached from all the links
  pl('a').unbind('click');                // Detach all the click-events
  pl('a').unbind();                       // Detach all (any) the event listeners
  ```
  
---

###pl().show()

Makes all selected elements visible.

---

###pl().hide()

Makes all selected elements invisible.

---

###pl().after(Element)

Inserts `Element` after all selected elements. `Element` can be a string or a new element.

  ```javascript
  pl('div').after('<p>Ave.</p>');                  // Insert a string after all the DIVs
  pl('div').after( pl('<p>').html('Ave.').get() ); // The same result as in upper example
  ```
  
---

###pl().before(Element)

Inserts `Element` before all selected elements. `Element` can be a string or a new element.

  ```javascript
  pl('div').before('<p>Ave bonum.</p>');                  // Insert a string before all the DIVs
  pl('div').before( pl('<p>').html('Ave bonum.').get() ); // The same result as in upper example
  ```
  
---

###pl().append(Element)

Appends `Element` to end of each of selected elements.

  ```javascript
  pl('div').append('<p>Something after all the content.</p>');
  pl('div').append( pl('<p>').html('Something after all the content.').get() ); // The same result
  ```

---

###pl().prepend(Element)

Appends `Elements` to the beginning of each of selected elements.

  ```javascript
  pl('div').prepend('<p>Something before all the content.</p>');
  pl('div').prepend( pl('<p>').html('Something before all the content.').get() ); // The same result
  ```
  
---

###pl('<tagName>' [, attributes]).appendTo(selector, context, index)

Appends `<tagName>` extended with `attributes` to `selector` (in context of `context`, if it's defined).

  ```javascript
  // Adds a paragraph to the end of all the DIVs
  pl('<p>').appendTo('div');
  
  // Adds a link to the end of only the first DIV
  pl('<a>', {href: '#'}).appendTo('div', 0);
  ```

---

###pl('<tagName>' [, attributes]).prependTo(selector, context, index)

Adds `<tagName>` extended with `attributes` to the beggining of each element matched with `selector` 
(in context of `context`, if it's defined).

  ```javascript
  // Adds a paragraph to the beginning of all the DIVs
  pl('<p>').prependTo('div');
  
  // Adds a link to the beginning of only the first DIV
  pl('<a>', {href: '#'}).prependTo('div', 0);
  ```