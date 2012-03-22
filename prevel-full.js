/* Prevel Library v1.2.8
 * http://github.com/chernikovalexey/Prevel
 * 
 * Copyright 2011-2012, Alexey Chernikov
 * Dual licensed under the:
 *  - GNU LGPL (http://opensource.org/licenses/lgpl-license.php)
 *  - MIT License (http://opensource.org/licenses/mit-license.php)
 * 
 * =====
 * 
 * Contains YASS v0.3.9
 * http://yass.webo.in
 * 
 * Copyright 2008-2009, Nikolay Matsievsky (sunnybear)
 * Dual licensed under the:
 *  - MIT License (http://opensource.org/licenses/mit-license.php)
 *  - GNU GPL (http://opensource.org/licenses/gpl-license.php)
**/

(function(win, doc, proto, ael, ge, cn, nn, u, newRegExp, n, ef, uf) {

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

/* Module: Manipulate.js
 * Requirements: Core.js
**/

(function() {
  
  pl.extend({
    create: function(o, params) {
      var ns = doc.createElement(o);
      
      // To avoid using pl().attr() which is a module
      for(var key in params) {
        ns[pl.fixAttr ? pl.fixAttr[key] || key : key] = params[key];
      }
      return ns;
    },
    
    parent: function(elem, step) {
      return step > 0 ? pl.parent(elem.parentNode, --step) : elem;
    },
    
    __self__: uf
  });
      
  // ======
  // Public
  
  // Add `fn` to `pl`, at first (to reduce nested level)
  pl.extend({
    fn: {}, 
    find: function(selector, root) { // If there is no Prevel Find
      return doc.querySelectorAll(root ? root + ' ' + selector : selector);
    }
  });
  
  pl.extend(pl.fn, {
    init: (function() {
      return function(o, params, index) {
        var _int;
        switch(pl.type(o)) {
          case 'str':
            var ne = o.match(newRegExp);
            if(ne) {
              _int = [pl.create(ne[1], params)];
            } else {
              switch(pl.type(params)) {
                case 'str': // Get `o` from the context
                  switch(pl.type(index)) {
                    case 'int':
                      _int = [pl.find(o, params)[index]];
                      break;
                    default:
                    case u:
                      _int = pl.find(o);
                      break;
                  }
                  break;
                case 'int': // Work only with the element №{params}
                  _int = [pl.find(o)[params]];
                  break;
                default:
                case u: // Just find all the `o`
                  _int = pl.find(o);
                  break;
              }
            }
            break;
          case 'fn':
            pl.events.ready(o);
            break; 
          case 'obj':
            _int = o[0] ? o : [o];
            break;
        }

        this.elements = _int;
        this.selector = arguments;
        pl.__self__ = this;
        return this;
      };
    })(), 
    
    len: function() {
      return this.elements.length;
    },
    
    last: function() {
      var l = this.elements.length;
      this.elements = [
        l && !pl.type(this.elements[l - 1], u) ? this.elements[l - 1] : n
      ];
      return this;
    },
    
    get: function(index) {
      var e = this.elements;
      return e.length === 1 ? e[0] : (!pl.type(index, u) ? e[index] : e);
    },
    
    // Recursion's faster than loop here
    parent: function(step) {
      this.elements = [pl.parent(this.elements[0], step || 1)];
      return this;
    },
    
    remove: function() {
      pl.each(this.elements, function() {
        this.parentNode.removeChild(this);
      });
      return this;
    },
    
    each: function(fn) {
      pl.each(pl.__self__.elements, function() {
        fn.call(this);
      });
      return this;
    }
  });

})();

/* Module: Css.js
 * Requirements: Core.js, Manipulate.js
**/

(function() {
  
  pl.extend({
    camelCase: function(str) {
      if(!str.match('-')) return str;
      var parts = str.split('-');
      return parts[0] + parts[1].charAt(0).toUpperCase() + parts[1].substr(1);  
    },
    
    curCSS: {
      rmvPostFix: {
        zIndex: true, 
        fontWeight: true, 
        opacity: true, 
        zoom: true, 
        lineHeight: true
      },
      
      // Get computed style
      get: function(o, style) {
        return o.currentStyle ? o.currentStyle[style] : 
          win.getComputedStyle(o, n).getPropertyValue(style);
      }
    }
  });
  
  pl.extend(pl.fn, {
    css: function(style, set) {
      if(set) {
        style = pl.camelCase(style);
        
        if(pl.type(set, 'int') && !pl.curCSS.rmvPostFix[style]) {
          set += 'px';
        }
        
        pl.each(this.elements, function() {
          this.style[style] = set;
        });
      } else {
        if(pl.type(style, 'str')) {
          return pl.curCSS.get(this.elements[0], style);
        } else {
          for(var key in style) {
            pl.fn.css.call(this, key, style[key]);
          }
        }
      }
      return this;
    }
  });
  
})();

/* Module: Ajax.js
 * Requirements: Core.js
**/

(function() {
  
  pl.extend({
    // Convert object to a 'param-string'
    toParams: function(o) {
      var pieces = [];
      for(var key in o) {
        pieces.push(
          encodeURIComponent(key) + '=' + encodeURIComponent(o[key])
        );
      }
      return pieces.join('&');
    },
    
    ajax: function(params) {
      var Request;
      var requestPrepare = function() {
        if(win.XMLHttpRequest) { // Modern browsers
          Request = new XMLHttpRequest();
          
          if(Request.overrideMimeType) {
            Request.overrideMimeType('text/html');
          }
        } else if(win.ActiveXObject) { // Obsolete IE
          try {
            Request = new ActiveXObject('Msxml2.XMLHTTP');
          } catch(e) {
            try {
              Request = new ActiveXObject('Microsoft.XMLHTTP');
            } catch(er) {}
          }
        }
        
        if(!Request) {
          pl.error('Could not create a XMLHttpRequest instance.');
        }
        
        // Fix related with `attachEvent`
        Request.onreadystatechange = function(e) {
          if(Request.readyState === 1) {
            (params.load || ef)();
          } else if(Request.readyState === 4) {
            if(Request.status > 199 && Request.status < 300) {
              (params.success || ef)(
                params.dataType === 'json' ? // Parse JSON if necessary
                  pl.JSON(Request.responseText) : 
                  Request.responseText,
                Request.status
              );
            } else {
              (params.error || ef)(Request.status, Request.responseText);
            }
          }
          
          params.always = params.always || ef;
          
          try {
            params.always(Request.readyState, Request.status, Request.responseText);
          } catch(e) {
            params.always(Request.readyState);
          }
        };
      };
      
      // Common headers
      var headers = function(type) {
        // To identify that it's XHR
        Request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        
        if(type) {
          Request.setRequestHeader(
            'Content-type', 
            'application/x-www-form-urlencoded; charset=' + 
            (params.charset || 'utf-8')
          );
        }
      };
      
      params.data  = pl.toParams(params.data || {});
      params.async = params.async || true;
      requestPrepare();
      
      if(params.type === 'POST') {
        Request.open('POST', params.url, params.async);
        headers(1);
        Request.send(params.data);
      } else {
        Request.open('GET', params.url + '&' + params.data, params.async);
        headers();
        Request.send(n);
      }
    }
  });
  
})();


/* Module: Attr.js
 * Requirements: Core.js, Manipulate.js
**/

(function() {
  
  pl.extend({
    fixAttr: {
      'class': 'className',
      'float': 'cssFloat',
      'for':   'htmlFor'
    }
  });
  
  pl.extend(pl.fn, {
    addClass: function(c) {
      pl.each(this.elements, function() {
        // If this class already exists
        if(~pl.inArray(c, this[cn].split(' '))) return;
        this[cn] += (this[cn] ? ' ' : '') + c;
      });
      return this;
    },
    
    hasClass: function(c) {
      return this.elements[0] && this.elements[0][cn] ? 
        !!~pl.inArray(c, this.elements[0][cn].split(' ')) : 
        false;
    },
    
    removeClass: function(c) {
      pl.each(this.elements, function() {
        if(!this[cn]) return;
        var cl = this[cn].split(' '),
            from = pl.inArray(c, cl);
        
        // If this class does not exist
        if(!~from) return;
        
        cl.splice(from, 1);
  
        this[cn] = (pl.empty(cl) ? cl.slice(from, 1) : cl).join(' ');
      });
      return this;
    },

    attr: function(attr, set) {
      attr = pl.fixAttr[attr] || attr;

      if(!pl.type(set, 'undef')) {
        pl.each(this.elements, function() {
          this[attr] = set;
        }); 
      } else {
        if(pl.type(attr, 'str')) {
          return this.elements[0][attr];
        } else {
          for(var key in attr) {
            pl.fn.attr.call(this, key, attr[key]);
          }
        }
      }
      return this;
    },
    
    removeAttr: function(attr) {
      attr = pl.fixAttr[attr] || attr;

      pl.each(this.elements, function() {
        this[attr] = n;
      });
      return this;
    }
  });
  
})();

/* Module: Events.js
 * Requirements: Core.js, Manipulate.js
**/

(function() {
  
  pl.extend({
    events: {
      // DOMContentLoaded
      ready: (function() {
        this.readyList = []; // Functions to be called
        this.bindReady = function(handler) {
          var called = false;
      
          function ready() {
            if(called) return;
            called = true;
            handler();
          }
      
          if(doc[ael]) {
            pl.events.attaches.bind(doc, 'DOMContentLoaded', ready);
          } else if(doc.attachEvent) {
            if(doc.documentElement.doScroll && win === win.top) {
              function tryScroll() {
                if(called) return;
                if(!doc.body) return;
                try {
                  doc.documentElement.doScroll('left');
                  ready();
                } catch(e) {
                  setTimeout(tryScroll, 0);
                }
              }
              tryScroll();
            }
      
            pl.events.attaches.bind(doc, 'readystatechange', function() {
              if(doc.readyState === 'complete') {
                ready();
              }
            });
          }
      
          pl.events.attaches.bind(win, 'load', ready);
        };
          
        var that = this;
          
        return function(handler) {         
          if(!that.readyList.length) {
            that.bindReady(function() {
              pl.each(that.readyList, function(k) {
                this();
              });
            });
          }
    
          that.readyList.push(handler);
        };
      })(),
      
      mend: function(event) {
        event = event || win.event;
        
        if(event.fixed) {
          return event;
        }
        event.fixed = true;
        
        event.preventDefault = event.preventDefault || function() {
          this.returnValue = false;
        };    
        event.stopPropagation = event.stopPropagation || function() {
          this.cancelBubble = true;
        };
        
        if(!event.target) {
          event.target = event.srcElement;
        }
    
        if(event.pageX == n && event.clientX != n) {
          var html = doc.documentElement, 
              body = doc.body;
          event.pageX = 
            event.clientX + 
            (html && html.scrollLeft || body && body.scrollLeft || 0) - 
            (html.clientLeft || 0);
          event.pageY = 
            event.clientY + 
            (html && html.scrollTop || body && body.scrollTop || 0) - 
            (html.clientTop || 0);
        }
        
        if(pl.type(event.which, u)) {
          event.which = (event.button & 1 ? 
            1 : 
            (event.button & 2 ? 
              3 : 
              (event.button & 4 ? 2 : 0)
            )
          );
        }
        
        return event;
      },
      
      // Cross-browser event adding and removing
      // http://javascript.ru/tutorial/events/crossbrowser
      attaches: (function() {
        var turns = 0;
        
        function handleCommon(e) {
          e = pl.events.mend(e);
          
          var handlerList = this.evt[e.type];
          
          for(var key in handlerList) {
            var updated = handlerList[key].call(this, e);
            
            if(updated === false) {
              e.preventDefault();
              e.stopPropagation();
            }
          }
        }
        
        return {
          bind: function(el, evt, fn) {
            if(el.setInterval && !el.frameElement) {
              if(el !== win) el = win;

              if(~pl.inArray(evt, pl.__fwe__)) {
                return (window.onload = function() {
                  pl(doc.body).bind(evt, fn);
                });
              }
            }
            
            if(!fn.turnID) {
              fn.turnID = ++turns;
            }
            
            if(!el.evt) {
              el.evt = {};
              
              el.handleEvt = function(e) {
                if(!pl.type(pl.events.attaches, u)) {
                  return handleCommon.call(el, e);
                }
              };
            }
            
            if(!el.evt[evt]) {
              el.evt[evt] = {};
              
              if(el[ael]) {
                el[ael](evt, el.handleEvt, false);
              } else {
                el.attachEvent('on' + evt, el.handleEvt);
              }
            }
            
            el.evt[evt][fn.turnID] = fn;
          },
          
          unbind: function(el, evt, fn) {
            var handlerList = el.evt;

            if(pl.type(fn, u)) {
              if(!handlerList) return;
              for(var handle in handlerList) {
                if(pl.type(evt, u) || evt === handle) {
                  for(var key in handlerList[handle]) {
                    pl.events.attaches.unbind(el, handle, handlerList[handle][key]);
                  }
                }
              }
              return;
            }
            
            handlerList = handlerList && handlerList[evt];
            if(!handlerList) return;
            
            delete handlerList[fn.turnID];
            
            for(var key in handlerList) return;
            
            if(el.removeEventListener) {
              el.removeEventListener(evt, el.handleEvt, false);
            } else {
              el.detachEvent('on' + evt, el.handleEvt);
            }
            
            delete el.evt[evt];
            
            for(var key in el.evt) return;
            
            try {
              delete el.handleEvt;
              delete el.evt;
            } catch(e) {
              el.removeAttribute('handleEvt');
              el.removeAttribute('evt');
            }
          }
        };
      })(),
          
      routeEvent: function(evt, fn, flag) {
        if(pl.type(evt, 'obj')) {
          for(var key in evt) {
            pl.events.routeEvent(key, evt[key], flag);
          }
        } else if((fn && evt) || (!fn && evt) || (!fn && !evt)) {
          if(flag) {
            pl.each(pl.__self__.elements, function() {
              pl.events.attaches.bind(this, evt, fn);
            });
          } else {
            pl.each(pl.__self__.elements, function() {
              pl.events.attaches.unbind(this, evt, fn);
            });
          }          
        }
        return pl.__self__;
      }
    },
    
    __fwe__: [
      'click', 'mouseover', 'mouseout',
      'keyup', 'keydown', 'dblclick',
      'mousedown', 'mouseup', 'keypress'
    ]
  });
  
  pl.extend(pl.fn, {
    bind: function(evt, fn) {
      // Delegate to the common method
      return pl.events.routeEvent(evt, fn, 1);
    },
    
    unbind: function(evt, fn) {
      // The same as in pl().bind()
      return pl.events.routeEvent(evt, fn, 0);
    }
  });
  
})();

/* Module: Find.js
 * Requirements: Core.js
 * Copyright 2008-2009, Nikolay Matsievsky (sunnybear) - http://yass.webo.in
**/

(function() {
  
  var classSupport = !!doc[ge + 'sByClassName'],
      qsSupport    = !!doc.querySelectorAll;

  pl.find = (function(_) {
    pl.extend(_, {      
      attr: {
        '': function(child, attr) {
          return !!child.getAttribute(attr);
        },
        '=': function(child, attr, value) {
          return (attr = child.getAttribute(attr)) && attr === value;
        },
        '&=': function(child, attr, value) {
          return 
            (attr = child.getAttribute(attr)) && 
            (new RegExp('(^| +)' + value + '($| +)').test(attr));
        },
        '^=': function(child, attr, value) {
          return 
            (attr = child.getAttribute(attr) + '') && !attr.indexOf(value);
        },
        '$=': function(child, attr, value) {
          return 
            (attr = child.getAttribute(attr) + '') && 
            attr.indexOf(value) === attr.length - value.length;
        },
        '*=': function(child, attr, value) {
          return 
            (attr = child.getAttribute(attr) + '') && 
            attr.indexOf(value) != -1;
        },
        '|=': function(child, attr, value) {
          return 
            (attr = child.getAttribute(attr) + '') && 
            (attr === value || !!attr.indexOf(value + '-'));
        },
        '!=': function(child, attr, value) {
          return 
            !(attr = child.getAttribute(attr)) || 
            !(new RegExp('(^| +)' + value + '($| +)').test(attr)) ||
            true;
        }
      },
      
      mods: {
        'first-child': function(child) {
          return child.parentNode.getElementsByTagName('*')[0] !== child;
        },
        'last-child': function(child) {
          var brother = child;
          while((brother = brother.nextSibling) && brother.nodeType != 1) {}
            return !!brother;
        },
        root: function(child) {
          return child.nodeName.toLowerCase() !== 'html';
        },
        'nth-child': function(child, ind) {
          var i = child.nodeIndex || 0,
              a = ind[3] = ind[3] ? (ind[2] === '%' ? -1 : 1) * ind[3] : 0,
              b = ind[1];

          if(i) {
            return !( (i + a) % b);
          } else {
            var brother = child.parentNode.firstChild;
            i++;
  
            do {
              if(
                 brother.nodeType == 1 && 
                 (brother.nodeIndex = ++i) && 
                 child === brother && 
                 ((i + a) % b)
              ) {
                return 0;
              }
            } while(brother = brother.nextSibling);
            return 1;
          }
        },
        'nth-last-child': function(child, ind) {
          var i = child.nodeIndexLast || 0,
              a = ind[3] ? (ind[2] === '%' ? -1 : 1) * ind[3] : 0,
              b = ind[1];
          if(i) {
            return !( (i + a) % b);
          } else {
            var brother = child.parentNode.lastChild;
            i++;
            do {
              if(
                 brother.nodeType == 1 && 
                 (brother.nodeLastIndex = i++) && 
                 child === brother && 
                 ((i + a) % b)
              ) {
                return 0;
              }
            } while(brother = brother.previousSibling);
            return 1;
          }
        },
        empty: function(child) {
          return !!child.firstChild;
        },
        parent: function(child) {
          return !child.firstChild;
        },
        'only-child': function(child) {
          return child.parentNode[ge + 'sByTagName']('*').length != 1;
        },
        checked: function(child) {
          return !child.checked;
        },
        lang: function(child, ind) {
          return child.lang !== ind && doc.documentElement.lang !== ind;
        },
        enabled: function(child) {
          return child.disabled || child.type === 'hidden';
        },
        disabled: function(child) {
          return !child.disabled;
        },
        selected: function(elem){
          child.parentNode.selectedIndex;
          return !child.selected;
        }
      }
    });
     
    return function(selector, root) {
      if(root) {
        selector = root + ' ' + selector;
      }
      
      root = doc;
      var sets = [];

      if(selector === 'body *') {
        return doc.body[ge + 'sByTagName']('*');
      } else if(/^[\w[:#.][\w\]*^|=!]*$/.test(selector)) {        
        var idx = 0;

        switch(selector.charAt(0)) {
        case '#':
          idx  = selector.slice(1);
          sets = doc[ge + 'ById'](idx);

          if(pl.browser('ie') && sets.id !== idx) {
            sets = doc.all[idx];
          }

          sets = sets ? [sets] : [];
          break;
        case '.':
          var klass = selector.slice(1);

          if(classSupport) {
            sets = (
            idx = (sets = root[ge + 'sByClassName'](klass)).length
            ) ? sets : [];
          } else {
            klass = ' ' + klass + ' ';
            var nodes = root[ge + 'sByTagName']('*'),
                i     = 0,
                node;

            while(node = nodes[i++]) {
              if((' ' + node[cn] + ' ').indexOf(klass) != -1) {
                sets[idx++] = node;
              }
            }
            sets = idx ? sets : [];
          }
          break;
        case ':':
          var node,
              nodes = root[ge + 'sByTagName']('*'),
              i = 0,
              ind = selector.replace(/[^(]*\(([^)]*)\)/, "$1"),
              mod = selector.replace(/\(.*/,'');
 
          while(node = nodes[i++]) {
            if(_.mods[mod] && !_.mods[mod](node, ind)) {
              sets[idx++] = node;
            }
          }
          sets = idx ? sets : [];
          break;
        case '[':
          var nodes = root[ge + 'sByTagName']('*'),
              node,
              i = 0,
              attrs = /\[([^!~^*|$ [:=]+)([$^*|]?=)?([^ :\]]+)?\]/.exec(
                selector
              ),
              attr = attrs[1],
              eql = attrs[2] || '',
              value = attrs[3];

          while(node = nodes[i++]) {
            console.log('216:', eql);
            
            if(
             _.attr[eql] && 
             (
               _.attr[eql](node, attr, value) || 
               (
                 attr === 'class' && 
                 _.attr[eql](node, cn, value)
               )
             )
            ) {
              sets[idx++] = node;
            }
          }
          sets = idx ? sets : [];
          break;
        default:
          sets = (
            idx = (sets = root[ge + 'sByTagName'](selector)).length
          ) ? sets : [];
          break;
        }
      } else {
        if(qsSupport && !~selector.indexOf('!=')) {
          sets = root.querySelectorAll(
            selector.replace(/=([^\]]+)/, '="$1"')
          );
        } else {
          var groups = selector.split(/ *, */),
              gl     = groups.length - 1,
              concat = !!gl,
              group, singles, singles_length, single, i, ancestor, 
              nodes, tag, id, klass, attr, eql, mod, ind, newNodes, 
              idx, J, child, last, childs, item, h;
  
          while(group = groups[gl--]) {
            singles_length = (
              singles = group
              .replace(/(\([^)]*)\+/,"$1%")
              .replace(/(\[[^\]]+)~/,"$1&")
              .replace(/(~|>|\+)/," $1 ")
              .split(/ +/)
            ).length;
            i = 0;
            ancestor = ' ';
            nodes = [root];
  
            while(single = singles[i++]) {
              if(
                 single !== ' ' && 
                 single !== '>' && 
                 single !== '~' && 
                 single !== '+' && 
                 nodes
              ) {
                single = single.match(/([^[:.#]+)?(?:#([^[:.#]+))?(?:\.([^[:.]+))?(?:\[([^!&^*|$[:=]+)([!$^*|&]?=)?([^:\]]+)?\])?(?:\:([^(]+)(?:\(([^)]+)\))?)?/);
                tag = single[1] || '*';
                id = single[2];
                klass = single[3] ? ' ' + single[3] + ' ' : '';
                attr = single[4];
                eql = single[5] || '';
                mod = single[7];
                ind = 
                  mod === 'nth-child' || 
                  mod === 'nth-last-child' ? 
                    /(?:(-?\d*)n)?(?:(%|-)(\d*))?/.exec(
                    single[8] === 'even' && 
                    '2n' || 
                    single[8] === 'odd' && 
                    '2n%1' || 
                    !/\D/.test(single[8]) && 
                    '0n%' + single[8] || 
                    single[8]
                    ) : 
                    single[8];
                  
                newNodes = [];
                idx = J = 0;
                last = i == singles_length;
    
                while(child = nodes[J++]) {
                  switch(ancestor) {
                    case ' ':
                    childs = child[ge + 'sByTagName'](tag);
                    h = 0;
    
                    console.log('304: ...');
                    
                    while(item = childs[h++]) {
                      if(
                         (!id || item.id === id) && 
                         (
                         !klass || 
                         (' ' + item[cn] + ' ')
                           .indexOf(klass) != -1
                         ) && (
                         !attr || 
                         (
                           _.attr[eql] && 
                           (
                             _.attr[eql](item, attr, single[6]) || 
                             (
                             attr === 'class' && 
                             _.attr[eql](
                               item, cn, single[6]
                             )
                             )
                           )
                         )
                         ) && 
                         !item.yeasss && 
                         !(
                         _.mods[mod] ? 
                           _.mods[mod](item, ind) : 
                           mod
                         )
                      ) {
                        console.log('Passed.');
                        
                        if(last) {
                          item.yeasss = 1;
                        }
                        newNodes[idx++] = item;
                      }
                    }
                    break;
                    case '~':
                    tag = tag.toLowerCase();
    
                    while(
                        (child = child.nextSibling) && 
                        !child.yeasss
                    ) {
                      if(
                         child.nodeType == 1 && 
                         (
                         tag === '*' || 
                         child.nodeName.toLowerCase() === tag
                         ) && 
                         (!id || child.id === id) && 
                         (
                         !klass || 
                         (' ' + child[cn] + ' ')
                           .indexOf(klass) != -1
                         ) && (
                         !attr || 
                         (
                           _.attr[eql] && 
                           (
                             _.attr[eql](item, attr, single[6]) || 
                             (
                             attr === 'class' && 
                             _.attr[eql](
                               item, cn, single[6]
                             )
                             )
                           )
                         )
                         ) && 
                         !child.yeasss && 
                         !(
                         _.mods[mod] ? 
                           _.mods[mod](child, ind) : 
                           mod
                        )
                      ) {
                        if(last) {
                         child.yeasss = 1;
                        }
                        newNodes[idx++] = child;
                      }
                    }
                    break;
                    case '+':
                    while(
                        (child = child.nextSibling) && 
                        child.nodeType != 1
                    ) {}
                    if(
                       child && 
                       (
                         child.nodeName.toLowerCase() === 
                         tag.toLowerCase() || 
                         tag === '*'
                       ) && (
                         !id || 
                         child.id === id
                       ) && (
                         !klass || 
                         (' ' + item[cn] + ' ')
                         .indexOf(klass) != -1
                       ) && (
                         !attr || 
                         (
                         _.attr[eql] && 
                         (
                           _.attr[eql](item, attr, single[6]) || 
                           (
                             attr === 'class' && 
                             _.attr[eql](
                             item, cn, single[6]
                             )
                           )
                         )
                         )
                       ) && 
                       !child.yeasss && 
                       !(
                         _.mods[mod] ? 
                         _.mods[mod](child, ind) : 
                         mod
                       )
                    ) {
                      if(last) {
                        child.yeasss = 1;
                      }
                      newNodes[idx++] = child;
                    }
                    break;
                    case '>':
                    childs = child[ge + 'sByTagName'](tag);
                    i = 0;
                    while(item = childs[i++]) {
                      if(
                         item.parentNode === child && 
                         (!id || item.id === id) && 
                         (
                         !klass || 
                         (' ' + item[cn] + ' ')
                           .indexOf(klass) != -1
                         ) && (
                           !attr || 
                           (
                             _.attr[eql] && 
                             (
                             _.attr[eql](item, attr, single[6]) || 
                             (
                               attr === 'class' && 
                               _.attr[eql](
                                 item, cn, single[6]
                               )
                             )
                             )
                           )
                         ) && 
                         !item.yeasss && 
                         !(
                           _.mods[mod] ? 
                             _.mods[mod](item, ind) : 
                             mod
                         )
                      ) {
                        if(last) {
                        item.yeasss = 1;
                        }
                        newNodes[idx++] = item;
                      }
                    }
                    break;
                  }
                }
                nodes = newNodes;
              } else {
                ancestor = single;
              }
            }
  
            if(concat) {
              if(!nodes.concat) {
                newNodes = [];
                h = 0;
    
                while(item = nodes[h]) {
                  newNodes[h++] = item;
                }
                nodes = newNodes;
              }
              sets = nodes.concat(sets.length == 1 ? sets[0] : sets);
            } else {
              sets = nodes;
            }
          }
          idx = sets.length;
           
          while(idx--) {
            sets[idx].yeasss = sets[idx].nodeIndex = 
              sets[idx].nodeIndexLast = n;
          }
        }
      }

      return sets;
    };
  })({});
  
})();

/* Module: Insert.js
 * Requirements: Core.js, Manipulate.js
**/

(function() {
  
  pl.extend({
    innerText: pl.browser('ie') ? 'innerText' : 'textContent',
        
    innerContent: {
      midst: function(e, method, ins, to) {
        var init = e;
        var e = init.elements[0];

        if(pl.type(ins, u)) {
          return e[method];
        } else {
          if(pl.type(ins, 'obj')) {
            var temp = doc.createElement('div');
            temp.appendChild(ins);
            ins = temp.innerHTML;
          }
              
          pl.each(init.elements, function() {
            if(!to) {
              this[method] = ins;
            } else if(~to) {
              this[method] += ins;
            } else {
              this[method] = ins + this[method];
            }
          });
          return init;
        }
      },
          
      edge: function(_this, args, table, dir, fn) {
        var a = pl.clean(args);
        for(var i = (dir < 0 ? a.length - 1 : 0); i != (dir < 0 ? dir : a.length); i += dir) {
          fn(_this, a[i]);
        }
      }
    },
    
    clean: function(a) {
      var r = [];
      var len = a.length;
      
      for(var i = 0; i < len; ++i) {
        if(pl.type(a[i], 'str')) {         
          var table = '';
    
          if(!a[i].indexOf('<thead') || !a[i].indexOf('<tbody')) {
            table = 'thead';
            a[i] = '<table>' + a[i] + '</table>';
          } else if(!a[i].indexOf('<tr')) {
            table = 'tr';
            a[i] = '<table>' + a[i] + '</table>';
          } else if(!a[i].indexOf('<td') || !a[i].indexOf('<th')) {
            table = 'td';
            a[i] = '<table><tbody><tr>' + a[i] + '</tr></tbody></table>';
          }
    
          var div = doc.createElement('div');
          div.innerHTML = a[i];
    
          if(table) {
            div = div.firstChild;
            if(table !== 'thead') div = div.firstChild;
            if(table === 'td') div = div.firstChild;
          }

          var cn_len = div.childNodes.length;
          for(var j = 0; j < cn_len; ++j) {
            r.push(div.childNodes[j]);
          }
        } else if(a[i] !== n) {
          r.push(a[i].nodeType ? a[i] : doc.createTextNode(a[i].toString()));
        }
      }
      
      return r;
    }
  });
  
  pl.extend(pl.fn, {
    html: function(ins, to) {
      // Delegate to the common method
      return pl.innerContent.midst(this, 'innerHTML', ins, to);
    },
    
    text: function(ins, to) {
      // The same as in pl().html()
      return pl.innerContent.midst(this, pl.innerText, ins, to);
    },
    
    after: function() {
      var args = arguments;
      pl.each(this.elements, function() {
        pl.innerContent.edge(this, args, false, -1, function(o, a) {
          o.parentNode.insertBefore(a, o.nextSibling);
        });
      });
      return this;
    },
    
    before: function() {
      var args = arguments;
      pl.each(this.elements, function() {
        pl.innerContent.edge(this, args, false, 1, function(o, a) {
          o.parentNode.insertBefore(a, o);
        });
      });
      return this;
    },
        
    append: function() {
      var args = arguments;
      pl.each(this.elements, function() {
        pl.innerContent.edge(this, args, true, 1, function(o, a) {
          o.appendChild(a);
        });
      });
      return this;
    },

    prepend: function() {
      var args = arguments;
      pl.each(this.elements, function() {
        pl.innerContent.edge(this, args, true, -1, function(o, a){
          o.insertBefore(a, o.firstChild);
        });
      });
      return this;
    },
   
    appendTo: function(selector, context, index) {
      pl.each(this.elements, function() {
        pl(selector, context, index).append(this);
      });
      return this;
    },
    
    prependTo: function(selector, context, index) {
      pl.each(this.elements, function() {
        pl(selector, context, index).prepend(this);
      });
      return this;
    }
  });
  
})();

/* Module: Visibility.js
 * Requirements: Core.js, Manipulate.js, Css.js
**/

(function() {
  
  pl.extend(pl.fn, {
    show: function() {
      pl.each(this.elements, function() {
        this.style.display = this.plrd ? this.plrd : '';
        if(pl.curCSS.get(this, 'display') === 'none') {
          this.style.display = 'block';
        }
      });
      return this;
    },
    
    hide: function() {
      pl.each(this.elements, function() {
        this.plrd = this.plrd || pl.curCSS.get(this, 'display');
        if(this.plrd === 'none') {
          this.plrd = 'block';
        }
        this.style.display = 'none';
      });
      return this;
    }
  });
  
})();

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

/* Prevel Dom Extension
 * Requirements: Core.js, Manipulate.js, Attr.js, Insert.js
**/

(function(win, doc, undefined) {
  
  /* NOTE:
   * this.elements (in pl() instance) always exists, so checking if this.elements equals true
   * is senseless, it will be always true. Much better will be checking if it's empty or 
   * trying to compare the first element with false values (false, null, undefined).
   * 
   * Examples:
   * this.elements[0] || ...
   * pl.empty(this.elements)
   * this.elements[0] !== undefined
  **/
  
  pl.extend({
    selectedBy: function(elem, selector) {
      var elems = pl(selector).get();
      return elems === elem || pl.filter(elems, function(el) {
        return el === elem;
      }).length > 0;
    },

    related: function(elem, fn, mod) {
      if(pl.type(mod, 'undef')) {
        mod = 1;
      }
      
      var get;
      var ret = pl();
      ret.selector = [elem.id, fn, mod];
      
      if(pl.type(mod, 'int')) {
        get = function(e, step) {
          return step > 0 ? get(e[fn], --step) : e;
        };
      } else {
        get = function(e, selector) {
          var ret = [];
          var rel, i;
          
          if(rel = e[fn]) {
            if(!selector || pl.selectedBy(rel, selector)) {
              ret.push(rel);
            }
            
            if(i = get(rel, selector)) {
              return ret.concat(i);
            }
            
            return ret;
          }
        };
      }
      
      ret.elements = get(elem, mod);
      return ret;
    }
  });

  pl.extend(pl.fn, {
    toggleClass: function(c) {
      pl.each(this.elements, function() {
        pl(this)[pl(this).hasClass(c) ? 'removeClass' : 'addClass'](c);
      });
      return this;
    },
    
    blur: function() {
      pl.each(this.elements, function() {
        this.blur();
      });
      return this;
    },
    
    focus: function() {
      pl.each(this.elements, function() {
        this.focus();
      });
      return this;
    },
    
    empty: function() {
      return pl(this.elements).html('');
    },
    
    tag: function(is) {
      var tn = this.elements[0].tagName.toLowerCase();
      return is ? is === tn : tn;
    },
    
    val: function(insert) {
      if(!pl.type(insert, 'undef')) {
        pl.each(this.elements, function() {
          this.value = insert;
        });
        return this;
      } else {
        return this.elements[0].value;
      }
    },

    prev: function(iterations) {
      return pl.related(this.elements[0], 'previousSibling', iterations);
    },
    
    next: function(iterations) {
      return pl.related(this.elements[0], 'nextSibling', iterations);
    },
    
    children: function(selector) {
      var children = pl.related(this.elements[0] || this, 'children');
      if(selector) {
        children.elements = pl.filter(children.elements, function(e) {
          return pl.selectedBy(e, selector);
        });
      }
      return children;
    },

    find: function(selector) {
      var children = pl.related(this.elements[0] || this, 'children');
      var list = [];
      pl.each(children.elements, function(k, v) {
        if(pl.selectedBy(this, selector)) {
          list.push(v);
        } else if(pl.type(v, 'obj')) {
          var found = pl(this).find(selector).get();
          list = list.concat(pl.type(found, 'arr') ? found : [found]);
        }
      });
      
      children.elements = list;
      return children;
    },
    
    parents: function(selector) {
      return pl.related(this.elements[0] || this, 'parentNode', selector || '*');
    },
    
    replaceWith: function(el, options) {
      el = pl.type(el, 'str') ? pl(el, options || {}).get() : el;
      pl.each(this.elements, function() {
        this.parentNode.replaceChild(el, this);
      });
      return this;
    },
    
    wrap: function(w, options) {
      w = pl.type(w, 'str') ? pl(w, options || {}).get() : w;
      pl.each(this.elements, function() {
        pl(this).replaceWith(w).appendTo(w);
      });
      return this;
    }
  });
  
})(this, document);

/* Prevel Events Extension
 * (adds cross-browser triggering)
 * 
 * Requirements: Core.js
**/

(function() {

  pl.extend(pl.fn, {
    trigger: function(evt) {
      var event;
      if (document.createEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(evt, true, true);
      } else {
        event = document.createEventObject();
        event.eventType = 'on' + evt;
      }
      
      event.eventName = evt;

      var element = this.elements[0];
      
      if (document.createEvent) {
        element.dispatchEvent(event);
      } else {
        element.fireEvent(event.eventType, event);
      }
    }
  });
  
})();

/* Prevel Observer Extension
 * (provides basic implementation of "observer" pattern)
 * 
 * Requirements: Core.js
**/

(function() {
  
  pl.extend({
    Observer: function(fns) {
      this.fns = fns ? (pl.type(fns, 'fn') ? [fns] : fns) : [];
      
      this.subscribe = function(fn) {
        this.fns.push(fn);
      };
      
      this.unsubscribe = function(fn) {
        var pos = pl.inArray(fn, this.fns);
        
        if(~pos) {
          this.fns.splice(pos, 1);
        }
      };
      
      this.clean = function() {
        this.fns = [];
      };
      
      this.has = function(fn) {
        return !!~pl.inArray(fn, this.fns);
      };
      
      this.publish = function(that, args) {
        if(!pl.type(args, 'arr')) {
          args = [args];
        }
        
        pl.each(this.fns, function() {
          this.apply(that, args);
        });
      };
    }
  });
  
})();

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

})(this, document, 'prototype', 'addEventListener', 
   'getElement', 'className', 'null', 'undef', 
   '<([A-z]+[1-6]*)>', null, function() {});
