/* Prevel Storage Extension
 * (provides functionality for interacting with cookies, localstorage, ...)
 * 
 * Requirements: Core.js
**/

(function(win, doc, undefined) {
  
  var prefixes = {
        localStorage: 'ls_',
        sessionStorage: 'ss_'
      },
      
      cookieAsSession = 60 * 60 * 24,
      cookieAsStorage = cookieAsSession * 31 * 12 * 4,
      
      stringify = pl.stringify ? 
        pl.stringify : 
        win.JSON && win.JSON.stringify ? 
          win.JSON.stringify : 
          function(o) {return o;};
  
  pl.extend({
    getStorage: function(name, type) {
      var support = !!type;
      return support ? type.getItem(name) : pl.storage.cookie(prefixes[String(type)] + name);
    },
    
    setStorage: function(name, val, type) {
      var support = !!type;
      
      if(support) {
        if(pl.type(val, 'obj')) {
          val = stringify(val);
        }
        
        type.setItem(name, val);
      } else {
        pl.storage.cookie.set(prefixes[String(type)] + name, val, {
          expires: type === 'localStorage' ? cookieAsStorage : cookieAsSession
        });
      }
      
      return storage[type];
    },
    
    delStorage: function(name, type) {
      var support = !!type;
      
      if(support) {
        type.removeItem(name);
      } else {
        pl.storage.cookie.del(prefixes[String(type)] + name);
      }
      
      return storage[type];
    }
  });
  
  // Main Router
  var storage = (function() {
    return function(name) {
      return new storage.complexGet(name);
    };
  })();
  
  pl.extend(storage, {
    // Storage Cookie Router
    cookie: (function() {
      return function(name) {
        return new storage.cookie.get(name);
      };
    })(),
    
    // Storage LocalStorage Router
    ls: (function() {
      return function(name) {
        return new storage.ls.get(name);
      };
    })(),
    
    session: (function() {
      return function(name) {
        return new storage.session.get(name);
      };
    })(),
    
    // Complex storage (based on all the technics)
    complexGet: function(name) {
      var token = [
        storage.cookie(name),
        storage.ls(name),
        storage.session(name)
      ];
      
      var ret, _break = false;
      pl.each(token, function(key, val) {
        if(_break) return;
        if(val) {
          ret = val;
          _break = true;
        } 
      });
      return ret;
    },
    set: function(name, val) {
      storage.cookie.set(name, val, {expires: cookieAsStorage});
      storage.session.set(name, val);
      return storage.ls.set(name, val);
    },
    del: function(name) {
      storage.cookie.del(name);
      storage.ls.del(name);
      storage.session.del(name);
    }
  });
  
  // Storage Cookie Model
  pl.extend(storage.cookie, {
    get: function(name) {
      var matches = doc.cookie.match(new RegExp(
        '(?:^|; )' + 
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + 
        '=([^;]*)'
      ));
      return matches ? decodeURIComponent(matches[1]) : null;
    },
    set: function(name, val, options) {
      options = options || {};
      var exp = options.expires;
      if(exp) {
        if(exp.toUTCString) {
          exp = exp.toUTCString();
        } else if(pl.type(exp, 'int')) {
          exp = exp * 1000 + (+new Date());
        }
        options.expires = exp;
      }

      var cookie = [name + '=' + encodeURIComponent(val)];
      for(var o in options) {
        cookie.push(options[o] === true ? o : o + '=' + options[o]);
      }
      doc.cookie = cookie.join('; ');

      return storage.cookie;
    },
    del: function(name) {
      return storage.cookie.set(name, '', {expires: -1});
    }
  });
  
  // Local Storage Model
  pl.extend(storage.ls, {
    get: function(name) {
      return pl.getStorage(name, localStorage);
    },
    set: function(name, val) {
      return pl.setStorage(name, val, localStorage);
    },
    del: function(name) {
      return pl.delStorage(name, localStorage);
    }
  });
  
  // Session Storage Model
  pl.extend(storage.session, {
    get: function(name) {
      return pl.getStorage(name, sessionStorage);
    },
    set: function(name, val) {
      return pl.setStorage(name, val, sessionStorage);
    },
    del: function(name) {
      return pl.delStorage(name, sessionStorage);
    }
  });
  
  pl.extend({storage: storage});
  
})(this, document);