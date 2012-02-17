/* Prevel Core Extension
 * Requirements: Core.js
**/

(function(win, doc, undefined) {
  
  var proto = 'prototype',
      slice = Array[proto].slice,
      stringify = win.JSON && win.JSON.stringify;
  
  pl.extend({    
    map: function(array, fn) {
      var output = [];
      pl.each(array, function() {
        output.push(fn(this));
      });
      return output;
    },
    
    every: function(array, reservation) {
      var flag = true;
      pl.each(array, function(k, val) {
        if(!reservation(val)) {
          flag = false;
        }
      });
      return flag;
    },
    
    some: function(array, reservation) {
      var flag = false;
      pl.each(array, function(k, val) {
        if(reservation(val)) {
          flag = true;
        }
      });
      return flag;
    },
    
    unique: function(array) {
      var a = [];
      var l = array.length;
      for(var i = 0; i < l; ++i) {
        for(var j = i + 1; j < l; ++j) {
          if(array[i] === array[j]) {
            j = ++i;
          }
        }
        a.push(array[i]);
      }
      return a;
    },
    
    // Is window
    isWin: function(Obj) {
      return pl.type(Obj, 'obj') && 'setInterval' in Obj;
    },
    
    // Attach script or css
    attach: function(params) {
      var add;
      params.load = params.load || function() {};
      
      if(params.url.substr(-3) === '.js') { 
        add = pl('<script>', pl.extend({
          src: params.url, 
          type: params.type || 'text/javascript'
        }, params.charset ? {charset: params.charset} : {})).get();
        
        var _load = params.load;
        params.load = function() {
          _load(params.url, +new Date());
        };
        
        // attachEvent doesn't support adding events to objects, so
        // it's not possible to use `pl.events.attaches.bind`
        add.onreadystatechange = function(e) {        
          if(e.readyState === 'complete') {
            params.load();
          }
        };        
        add.onload = params.load;
      } else {
        add = pl('<link>', {
          href: params.url,
          rel: 'stylesheet',
          type: 'text/css'
        }).get();
        
        var sheet, cssRules;
        if('sheet' in add) {
          sheet = 'sheet';
          cssRules = 'cssRules';
        } else {
          sheet = 'styleSheet';
          cssRules = 'rules';
        }
        
        var timeout = setInterval(function() {
          try {
            if(add[sheet] && add[sheet][cssRules].length) {
              clearInterval(timeout);
              params.load.call(params.url, +new Date());
            }
          } catch(e) {}
        }, 10);
      }
      
      pl('head').append(add);
      return this;
    },
    
    proxy: function(context, source) {
      if(!pl.type(context, 'fn')) {
        return undefined;
      }

      return function() {
        return context.apply(
          source,
          slice.call(arguments, 2).concat(slice.call(arguments))
        );
      };
    },
    
    stringify: stringify ? win.JSON.stringify : function(obj) {
      var t = pl.type(obj);
      if(t === 'null') {
        return String(obj);
      } else {
        var n, v, json = [], arr = pl.type(obj, 'arr');
          
        for(n in obj) {
          v = obj[n];
          t = pl.type(v);
          
          if(t === 'str') {
            v = '"' + v + '"';
          } else if(t === 'obj') {
            v = pl.stringify(v);
          }
          
          json.push((arr ? '' : '"' + n + '":') + String(v));
        }
        return (arr ? '[' : '{') + String(json) + (arr ? ']' : '}');
      }
    }
  });
  
})(window, document);