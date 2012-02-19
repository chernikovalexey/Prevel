/* Module: Core.js
 * Requirements: -
**/

(function() {
  
  // Short names for almost all types
  var types = {
    'function': 'fn',
    object: 'obj',
    number: 'int',
    string: 'str',
    'boolean': 'bool',
    regexp: 'regexp',
    date: 'date',
    undefined: u,
    array: 'arr'
  };
  
  var op = Object[proto];
  
  // Cached checks
  var accessors = 
    !!op.__lookupGetter__ && 
    !!op.__lookupSetter__ &&
    !!op.__defineGetter__;

  var trim     = !!''.trim,
      indexOf  = !![].indexOf,
      toString = op.toString,
      json     = win.JSON && win.JSON.parse;
    
  // Local copy of `pl`
  var pl = (function() {
    return function(o, context, index) {
      return pl.fn ? new pl.fn.init(o, context, index) : uf;
    };
  })(); 

  pl.extend = function(Child, Parent, flag) {
    if(!Parent) {
      Parent = Child;
      Child  = pl;
    }
    
    var init = Child;
    
    // If accessors are supported, they will be considered in extending
    if(accessors) {
      var getter, setter;
      for(var key in Parent) {
        getter = Parent.__lookupGetter__(key);
        setter = Parent.__lookupSetter__(key);

        if(getter || setter) {
          if(getter) Child.__defineGetter__(key, getter);
          if(setter) Child.__defineSetter__(key, setter);
        } else if((!Child[key]) || (Child[key] && flag)) {
          Child[key] = Parent[key];
        }
      }
    } else {
      for(var key in Parent) {
        // It can reassign the parameter if flag equals true
        if((!Child[key]) || (Child[key] && flag)) {
          Child[key] = Parent[key];
        }
      }
    }
    
    if(init === pl.fn) {
      pl.implement(pl.fn.init, pl.fn);
    }
    
    init = u;
    return Child;
  };

  // User agent
  var ua = win.navigator.userAgent.toLowerCase();
  
  var opera  = /opera/i.test(ua),
      chrome = /chrome/i.test(ua);
  var browsers = {
      opera: opera,
      ie: !opera && /msie/i.test(ua),
      ie6: !opera && /msie 6/i.test(ua),
      ie7: !opera && /msie 7/i.test(ua),
      ie8: !opera && /msie 8/i.test(ua),
      firefox: /firefox/i.test(ua),
      chrome: chrome,
      safari_khtml: !chrome && /khtml/i.test(ua),
      safari: !chrome && /webkit|safari/i.test(ua)
  };

  pl.extend({navigator: []});
  for(var key in browsers) {
    if(browsers[key]) {
      pl.navigator.push(key);
    }
  }
  
  // Public
  pl.extend({
    // Extend the Object.prototype
    implement: function(Child, Parent, flag) {
      return pl.extend(Child[proto], Parent, flag);
    },
    
    // Uses native method, if it's available
    isArray: Array.isArray || function(o) {
      return pl.type(o, 'arr');
    },
    
    type: function(o, is) {
      var t = o === n ? 
        nn : 
        o === uf ? u : (class2type[toString.call(o)] || 'obj');
      return is ? is === t : t;
    },
        
    empty: function(o) {
      // Separate check for an object
      if(pl.type(o, 'obj')) {
        for(var key in o) return false; 
        return true;
      }
      return (pl.type(o, nn) || pl.type(o, u)) || !o.length;
    },
    
    trim: function(text) { 
      // Uses native method, if it's availiable
      text = text || '';
      return trim ? text.trim() : text.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    },
    
    each: function(arr, func) {
      var key = -1;
      var len = arr.length;
      while(++key < len) {
        func.call(arr[key], key, arr[key]);
      }
    },
    
    // Moved from Core Extension
    filter: function(array, reservation) {
      var output = [];
      pl.each(array, function(k, val) {
        if(reservation(val)) {
          output.push(val);
        }
      });
      return output;
    },
    
    inArray: function(a, c, b, r) {
      if(indexOf) return c.indexOf(a, b);
      for(b = b > 0 || -1, r = -1; ++b < c.length && !~r; r = c[b] === a ? b : r);
      return r;
    },
    
    error: function(msg) {
      throw new Error(msg);
      return false;
    },

    JSON: function(data) {
      // Use native function if possible
      return json ? 
        win.JSON.parse(data) :
        (!(/[^,:{}[]0-9.-+Eaeflnr-u nrt]/.test(
          data.replace(/"(.|[^"])*"/g, ''))) && eval('(' + data + ')')
        );
    },
    
    browser: function(name) {
      return name ? !!~pl.inArray(name, pl.navigator) : pl.navigator[0];
    }
  });

  var class2type = {};
  pl.each('Array Boolean Number String Function Date RegExp Object'.split(' '), function(key, val) {
    class2type['[object ' + val + ']'] = types[val.toLowerCase()];
  });
  
  // Add `pl` to the global scope
  win.pl = pl;
  
})();