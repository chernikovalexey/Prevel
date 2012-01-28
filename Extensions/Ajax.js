/* Prevel Ajax Extension
* (adds additional functionality to the Prevel's Core)
*
* Requirements: Core.js, Ajax.js
* Provides:
* - get, post, put, and del methods
* - serialize method
* - getAjax method returning a reusable Ajax object
**/

(function(win, doc, undefined) {
  
  pl.extend({
    get: function(params, callback, type) {
      pl.ajax(pl.type(params, 'obj') ? params : {
        url: params,
        success: callback,
        dataType: type
      });
    },
    
    post: function(params, data, callback, type) {
      pl.ajax(pl.type(params, 'obj') ? pl.extend(params, {type: 'POST'}) : {
        url: params,
        type: 'POST',
        data: data,
        success: callback,
        dataType: type
      });
    },
    
    put: function(params) {
      params.data = params.data || {};
      params.data.action = 'put';
      pl.post(params);
    },
    
    del: function(params) {
      params.data = params.data || {};
      params.data.action = 'delete';
      pl.post(params);
    },
        
    serialize: function(form) {
      var o = {};
      pl('form#' + form + ' input, form#' + form + ' textarea').each(function() {
        if(this.type !== 'submit') {
          o[this.name] = this.value;
        }
      });
      return o;
    }
  });
  
})(this, document);