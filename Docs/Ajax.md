#Prevel Framework Ajax

---

###pl.ajax(params)

*

*

*

*

*

*

*

*

*

*

*

__Example of use:__

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