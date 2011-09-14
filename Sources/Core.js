/* Module: Core.js
 * Requirements: -
 * Provides: 
 *  - Extending objects (and their prototypes)
 *  - detecting the type of an object,
 *  - checking if object is empty
 *  - checking if value is in the given array
 *  - removing whitespaces from the both sides of a string
 *  - walking along the array
 *  - checking if object is an array
 *  - JSON parsing
 *  - browser detecting
 *  - converting object to string
 * 
 * Dual licensed under the:
 *  - GNU LGPL (http://opensource.org/licenses/lgpl-license.php)
 *  - MIT License (http://opensource.org/licenses/mit-license.php)
**/

(function() {
  
  // Short names for almost all the types
  var types = {
    'function':  'fn',
    'object':    'obj',
    'number':    'int',
    'string':    'str',
    'boolean':   'bool',
    'undefined': u
  };
  
  // Cached check if accessors are availiable
  var accessors = 
    !!Object[proto].__lookupGetter__ && 
    !!Object[proto].__lookupSetter__ &&
    !!Object[proto].__defineGetter__ &&
    !!Object[proto].__defineSetter;

  // Local copy of `pl`
  var pl = (function() {
    return function(o, context, index) {
      return pl.fn ? new pl.fn.init(o, context, index) : uf;
    };
  })(); 
  
  // User agent
  var ua = win.navigator.userAgent.toLowerCase();
  
  pl.extend = function(Child, Parent) {
    if(!Parent) {
      Parent = Child;
      Child  = pl;
    }
    
    // If accessors are supported, they will be considered in extending
    if(accessors) {
      var getter, setter;
      for(var key in Parent) {
        getter = Parent.__lookupGetter__(key);
        setter = Parent.__lookupSetter__(key);
        
        if(getter || setter) {
          if(getter) Child.__defineGetter__(key, getter);
          if(setter) Child.__defineSetter__(key, setter);
        } else if(!Child[key]) { // Do not reassign (*)
          Child[key] = Parent[key];
        }
      }
    } else {
      for(var key in Parent) {
        if(!Child[key]) { // *
          Child[key] = Parent[key];
        }
      }
    }
    
    return Child;
  };

  pl.extend({
    // Extend the Object.prototype
    implement: function(Child, Parent) {
      return pl.extend(Child[proto], Parent);
    },
    
    // Uses native method, if it's availiable
    isArray: Array.isArray || function(o) {
      return Object[proto].toString.call(o) === '[object Array]';
    },
    
    type: function(o, is) {
      var iUf;
      if(pl.isArray(o)) {
        iUf = 'arr';
      } else if(o instanceof RegExp) {
        iUf = 'regexp';
      } else if(o instanceof Date) {
        iUf = 'date';
      } else if(o === n) {
        iUf = nn;
      } else {
        iUf = types[typeof o];
      }
      
      return is ? iUf === is : iUf;
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
      return String[proto].trim ? 
        text.trim() : 
        text.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    },
    
    each: function(arr, func) {
      var key = arr.length;
      while(--key > -1) {
        // `this` ought to contains the current value
        func.call(arr[key], key, arr[key]);
      }
    },
    
    inArray: function(f, arr) {
      // Native check if it's availiable
      if(Array[proto].indexOf) return arr.indexOf(f);
      pl.each(arr, function(k) {
        if(f === this) {
          return k;
        }
      });
      return -1;
    },
    
    // Convert object to a 'param-string'
    toParams: function(o) {
      if(!pl.type(o, 'obj')) return o;
      
      var pieces = [];
      for(var key in o) {
        pieces.push(
          encodeURIComponent(key) + '=' + encodeURIComponent(o[key])
        );
      }
      return pieces.join('&');
    },
    
    JSON: function(data) {
      // Checks if JSON is valid
      return (!(/[^,:{}[]0-9.-+Eaeflnr-u nrt]/.test(
        data.replace(/"(.|[^"])*"/g, ''))) && eval('(' + data + ')')
      );
    },
    
    browser: function(name) {
      var isOpera  = /opera/i.test(ua),
          isChrome = /chrome/i.test(ua);
      var browser = {
        opera: isOpera,
        ie: !isOpera && /msie/i.test(ua),
        ie6: !isOpera && /msie 6/i.test(ua),
        ie7: !isOpera && /msie 7/i.test(ua),
        ie8: !isOpera && /msie 8/i.test(ua),
        firefox: /firefox/i.test(ua),
        chrome: isChrome,
        
        // Old Safari version
        safari_khtml: !isChrome && /khtml/i.test(ua),
        safari: !isChrome && /webkit|safari/i.test(ua)
      };

      for(var key in browser) {
        if(browser[key]) {
          return name === key || key;
        }
      }
    }
  });

  // Add `pl` to the global scope
  win.pl = pl;
})();