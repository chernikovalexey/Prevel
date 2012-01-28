#Prevel Ajax Extension

This will be only useful if you use __[Prevel Ajax Extension](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Ajax.js)__
which is available as an addition to Prevel.

__Example of attaching:__

```html
<script type="text/javascript" src="path/to/your/js/prevel-min.js"></script>
<script type="text/javascript" src="path/to/your/js/prevel-ext-ajax.js"></script>

<!-- Your scripts attached here... -->
```

Where __prevel-ext-ajax.js__ is file contains [this code](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Ajax.js).

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