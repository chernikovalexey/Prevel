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

