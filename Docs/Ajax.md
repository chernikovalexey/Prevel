#Prevel Framework Ajax

---

###pl.toParams(Object)
Makes a param-string from the `Object`.

__Example:__

```javascript
alert( pl.toParams({ name: 'Roger', age: 45 }) ); // name=Roger&age=45
```

---

###pl.ajax(params)

Creates an Ajax-request.

`params` properties.

* `url`

* `type` - by default is _POST_. _POST_ or _GET_ are availiable.

* `dataType` - by default is _text_. _text_ or _json_ (JSON will be parsed automatically) are availiable.

* `async` - by default is _true_. Turns asynchronous on or off.

* `charset` - by default is _UTF-8_. Charset.

* `data` - data which will be transferred.

* `load` - function which will be called on request loading.

* `success` - function which will be called when success request.

* `error` - function which will be called when error (403, 404, ...).

__Examples of usage:__

  ```javascript 
  // Example #1
  pl.ajax({
    async: true,

    url:      'prevelAjaxTest.py',
    type:     'POST',
    dataType: 'json',
    charset:  'utf-8',
    
    data: {
      name: 'Abdala',
      id: 1
    },
    
    load: function() {
      alert('Ajax request is in load...');
    },
    success: function(json) {
      alert('Ajax request was completely successfull!');
    },
    
    // If dataType equals "json", response text of the error will be parsed as JSON
    error: function(errorNum, json_error) {
      alert('Error #' + errorNum + ': ' + json_error);
    }
  });
  
  // Example #2 
  pl.ajax({
    url:  'prevelAjaxTests.py',
    type: 'GET',
    data: 'name=Abdala&id=1',
    
    success: function(text) {
      alert('Server\'s answer: ' + text);
    },
    
    error: function(errorNum, errorText) {
      alert('Error #' + errorNum + ': ' + errorText);
    }
  });
  ```