/* Prevel Ajax Extension
 * Requirements: Core.js, Ajax.js
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
    
    // Adding and removing
    ajaxDefaults: function(params) {
      pl.each(['ajax', 'get', 'post', 'put', 'del'], function(k, val) {
        if(params === 'remove') {
          pl[val] = pl['_' + val];
          pl['_' + val] = undefined;
        } else {
          pl['_' + val] = pl[val];
          pl[val] = function(p) {
            pl['_' + val](pl.extend(p, params));
          };
        }
      });
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
  
})(window, document);