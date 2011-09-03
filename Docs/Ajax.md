#Prevel Framework Ajax

---

###pl.ajax(params)

Creates an Ajax-request.

* `url`

* `type`

*  `dataType`

* `async`

* `charset`

* `data`

* `load`

* `success`

* `error`

__Example of usage:__

  ```javascript
  pl.ajax({
    async: true,
    url: 'prevelAjaxTest.py',
    type: 'POST',
    dataType: 'json',
    charset: 'utf-8',
    
    data: {},
    
    load: function() {},
    success: function() {},
    error: function() {}
  });
  ```