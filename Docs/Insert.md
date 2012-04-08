#Prevel Insert Module

This documentation is for [Sources/Insert.js](https://github.com/chernikovalexey/Prevel/blob/master/Sources/Insert.js). So, if you used Insert.js (e.g. `node Buid.js 1.2.9 insert`) while building Prevel or if you used [Prevel Full](https://github.com/chernikovalexey/Prevel/blob/master/prevel-full.js), or [Prevel Minified](https://github.com/chernikovalexey/Prevel/blob/master/prevel-min.js), you will be able to use all underwritten functionality.

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