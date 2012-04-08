#Prevel Ajax Extension

This documentation will be only useful if you used __[Prevel Ajax Extension](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Ajax.js)__
which is available as an addition to Prevel.

To use it, you can simply attach it as the additional script to to your page or re-build Prevel locally on your computer.

__Example of attaching:__

```html
<script type="text/javascript" src="path/to/your/js/prevel-min.js"></script>
<script type="text/javascript" src="path/to/your/js/prevel-ext-ajax.js"></script>

<!-- Your scripts attached here... -->
```

Where __prevel-ext-ajax.js__ is file contains [this code](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Ajax.js).

__How to re-build Prevel:__

Firstable, you need Node.js. Just follow the [Builder Readme](https://github.com/chernikovalexey/Prevel/blob/master/Builder/README.md).

So:

```
node Build.js 1.2.9 * ajax
```

Will contain all [Source files](https://github.com/chernikovalexey/Prevel/blob/master/Sources) and [Extensions/Ajax.js](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Ajax.js).

---

###pl.get(params [, callback [, dataType]])

Makes a get request to the specified url. Two variants of using are possible:
to specify the object with parameters as in ordinary `pl.ajax()`.

__Like this:__

```javascript
pl.get({
  url: 'handle.rb',
  success: function(data) {
    console.log('Request succeeded.');
  },
  error: function(num, txt) {
    console.log('Error #' + num + ': ' + txt);
  }
});
```

Or use a bit shorter version: where `params` will a be an url, 
`callback` a callback on success, `dataType` - 
type of received data (it can only empty or equals to json).

```javascript
pl.get('handle.rb', function(data) {
  console.log('Request succeeded.');
}, 'json');
```

---

###pl.post(params [, data [, callback [, dataType]]])

Makes a post request to the specified url. Two variants of using are possible:
to specify the object with parameters as in ordinary `pl.ajax()`.

__Like this:__

```javascript```
pl.post({
  url: 'handle.py',
  data: {id: 902},
  success: function(data) {
    console.log('Request succeeded.');
  },
  error: function(num, txt) {
    console.log('Error #' + num + ': ' + txt);
  }
});
```

Or use a bit shorter version: where `params` will be a an url,
`data` is an object with data which will be passed to the server,
`callback` a callback on success, `dataType` - type of received data (
it can be only empty or equals to json).

```javascript
pl.post('handle.rb', {id: 902}, function(data) {
  console.log('Request succeeded.');
}, 'json');
```

---

###pl.ajaxDefauls(params)

Defines default settings for all further ajax requests using Prevel.

```javascript
pl.ajaxDefaults({
  type: 'POST',
  success: function(data) {
    console.log('Ajax defaults!');
  }
});

/* The following fragment of code will log "Ajax defaults!" to the console on success. 
 * Moreover, the request will be performed using POST type.
**/
pl.ajax({
  url: 'test.php'
});

/* The following fragment will take only `type` field from defaults.
 * On success callback is being overwrote, as we see.
 * So this code will log "Success callback has been overwritten!" to the console, if 
 * succeeded.
**/
pl.ajax({
  url: 'test.php',
  success: function(data) {
    console.log('Success callback has been overwritten!');
  }
});
```

---

###pl.serialize(formId)

Serializes form selected by id (`formId`). Returns an object, where key equals to name and value equals to the value. Submit inputs are omitted.

For example, we have the following HTML:

```html
<form id="user-data">
 <input type="text" name="login" value="Cockoo">
 <input type="password" name="pass" value="1234">
 <textarea name="comment">Some text..</textarea>
 <input type="submit" name="submit"> <!-- It will be omitted.. -->
</form>
```

```javascript
var serial = pl.serialize('user-data');
console.log(serial);
/* Outputs:
 * {name: 'Cockoo', pass: '1234', comment: 'Some text..'}
**/
```

---

###pl.put(params)

It performs an ordinary ajax request using `pl.post()`, except one. It adds one enrty to the data object - `action: 'put'`.

Thereby, these two fragments are completely equal.

```javascript
pl.put({
  url: 'someExtremelyComplicatedHandler.php',
  data: {
    id: 12
  }
});
```

```javascript
pl.ajax({
  url: 'someExtremelyComplicatedHandler.php',
  type: 'POST',
  data: {
    action: 'put',
    id: 12
  }
});
```

---

###pl.del(params)

It performs an ordinary ajax request using `pl.post()`, except one. It adds one enrty to the data object - `action: 'del'`.

Thereby, these two fragments are completely equal.

```javascript
pl.del({
  url: 'someExtremelyComplicatedHandler.php',
  data: {
    id: 12
  }
});
```

```javascript
pl.ajax({
  url: 'someExtremelyComplicatedHandler.php',
  type: 'POST',
  data: {
    action: 'del',
    id: 12
  }
});
```