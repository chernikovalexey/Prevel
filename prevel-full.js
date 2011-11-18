/* Prevel Framework v1.0.17
 * http://github.com/chernikovalexey/Prevel
 * 
 * Copyright 2011, Alexey Chernikov
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
    
    if(init === pl.fn) {
      pl.implement(pl.fn.init, pl.fn);
    }
    
    init = u;
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
      var iUf = pl.isArray(o) ? 
        'arr' : 
        o instanceof RegExp ? 
          'regexp' : 
          (o instanceof Date ? 
            'date' : 
            (o === n ? nn : types[typeof o]));
      
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
      text = text || '';
      return ''.trim ? 
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
    
    // Borrowed from jQuery v1.7
    // https://github.com/jquery/jquery/blob/master/src/core.js#L684
    inArray: function(elem, array, i) {
      var len;

      if(array) {
        if([].indexOf) { // Use native if possible
          return array.indexOf(elem, i);
        }

        len = array.length;
        i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

        for(; i < len; ++i) {
          if(i in array && array[i] === elem) {
            return i;
          }
        }
      }

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
      // Use native function if possible
      return win.JSON && win.JSON.parse ? 
        win.JSON.parse(data) :
        (!(/[^,:{}[]0-9.-+Eaeflnr-u nrt]/.test(
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
          return name ? name === key : key;
        }
      }
    }
  });

  // Add `pl` to the global scope
  win.pl = pl;
})();
/* Module: Ajax.js
 * Requirements: Core.js
 * Provides: Ajax.
 * 
 * Dual licensed under the:
 *  - GNU LGPL (http://opensource.org/licenses/lgpl-license.php)
 *  - MIT License (http://opensource.org/licenses/mit-license.php)
**/

(function() {
  pl.extend({
    ajax: function(params) {
      var Request,
          load    = params.load || ef,
          error   = params.error || ef,
          success = params.success || ef;
            
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
          return alert('Could not create an XMLHttpRequest instance.');
        }
        
        // Fix related with `attachEvent`
        Request.onreadystatechange = function(e) {
          switch(Request.readyState) {
            case 1: load();
              break;
            case 4:
              if(Request.status === 200) {
                success(
                  params.dataType === 'json' ? // Parse JSON if necessary
                    pl.JSON(Request.responseText) : 
                    Request.responseText
                );
              } else {
                error(Request.status);
              }
              break;
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
      
      params.type  = params.type || 'POST';
      params.data  = pl.toParams(params.data || {});
      params.async = params.async || true;
      
      requestPrepare();
      
      switch(params.type) {
        case 'POST':
          Request.open('POST', params.url, params.async);
          headers(1);
          Request.send(params.data);
          break;
        case 'GET':
          Request.open('GET', params.url + '?' + params.data, params.async);
          headers();
          Request.send(n);
          break;
      }
    }
  });
})();

/* Module: Dom.js
 * Requirements: Core.js
 * Provides: Different interactions with the DOM.
 * 
 * Dual licensed under the:
 *  - GNU LGPL (http://opensource.org/licenses/lgpl-license.php)
 *  - MIT License (http://opensource.org/licenses/mit-license.php)
**/

(function() {
  
  // Fix attribute names because of .setAttribute
  var __this;
  var fixAttr = {
    'class': 'className',
    'float': 'cssFloat',
    'for':   'htmlFor'
  };
  
  // Add `fn` to `pl`, at first (to reduce nested level)
  pl.extend({
    fn: {}, 
    find: function(selector, root) { // Basic
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
              _int = [create(ne[1], params)];
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
            Events.ready(o);
            break; 
          case 'obj':
            _int = o[0] ? o : [o];
            break;
        }

        this.elements = _int;
        this.selector = arguments;
        __this = this;
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
    
    html: function(ins, to) {
      // Delegate to the common method
      return inner(this, 'innerHTML', ins, to);
    },
    
    text: function(ins, to) {
      // The same as in pl().html()
      return inner(this, innerText, ins, to);
    },
    
    get: function(index) {
      var e = this.elements;
      return e.length === 1 ? e[0] : (!pl.type(index, u) ? e[index] : e);
    },
    
    // Recursion's faster than loop
    parent: function(step) {
      if(!step) var step = 1;
      this.elements = [rParent(this.elements[0], step)];
      return this;
    },
    
    remove: function() {
      pl.each(this.elements, function() {
        this.parentNode.removeChild(this);
      });
      return this;
    },
    
    addClass: function(c) {
      pl.each(this.elements, function() {
        // If this class already exists
        if(!this[cn] || ~pl.inArray(c, this[cn].split(' '))) return;
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
      attr = fixAttr[attr] || attr;

      if(set) {
        pl.each(this.elements, function() {
          this[attr] = set;
        }); 
      } else {
        switch(pl.type(attr)) {
          case 'obj':
            for(var key in attr) {
              arguments.callee.call(this, key, attr[key]);
            }
            break;
          case 'str':
            return this.elements[0][attr];
            break;
        }
      }
      return this;
    },
    
    removeAttr: function(attr) {
      attr = fixAttr[attr] || attr;

      pl.each(this.elements, function() {
        this[attr] = n;
      });
      return this;
    },

    css: function(style, set) {
      if(set) {
        style = curCSS.fixStyle(style);
        
        if(pl.type(set, 'int') && !curCSS.rmvPostFix[style]) {
          set += 'px';
        } else if(style === 'opacity') { // Cross-browser opacity
          var fixed = curCSS.fixOpacity(set),
              style = fixed[0],
              set   = fixed[1];
        }
        
        pl.each(this.elements, function() {
          this.style[style] = set;
        });
      } else {
        switch(pl.type(style)) {
          case 'obj':
            for(var key in style) {
              arguments.callee.call(this, key, style[key]);
            }
            break;
          case 'str':
            return curCSS.get(this.elements[0], style);
            break;
        }
      }
      return this;
    },

    each: function(fn) {
      pl.each(__this.elements, function() {
        fn.call(this);
      });
      return this;
    },
    
    bind: function(evt, fn) {
      // Delegate to the common method
      return Events.routeEvent(evt, fn, 1);
    },
    
    unbind: function(evt, fn) {
      // The same as in pl().bind()
      return Events.routeEvent(evt, fn, 0);
    },
    
    show: function() {
      pl.each(this.elements, function() {
        if(pl(this).css('display') !== 'none') return;           
        pl(this).css('display', this.getAttribute('plrd') || '');
      });

      return this;
    },
    
    hide: function() {
      pl.each(this.elements, function() {
        var display = pl(this).css('display');
        
        if(display === 'none') return;
        
        // 'Real-display' vault
        this.setAttribute('plrd', display);
        this.style.display = 'none';
      });
      return this;
    },
    
    // (!) Below there are a few repetitions of code which 
    //     help improving the perfomance
    
    after: function(o) {
      if(pl.type(o, 'obj')) {
        var el = doc.createElement('div');
        el.appendChild(o);
        o = el.innerHTML;
      }
      
      pl.each(this.elements, function() {
        var to = this;
        var el = doc.createElement('div');
        el.innerHTML = o;
        
        try {
          pl.each(el.childNodes, function() {
            to.parentNode.insertBefore(this, to.nextSibling);
          });
        } catch(er) {}
      });
      return this;
    },
    
    before: function(o) {
      if(pl.type(o, 'obj')) {
        var el = doc.createElement('div');
        el.appendChild(o);
        o = el.innerHTML;
      }
      
      pl.each(this.elements, function() {
        var to = this;
        var el = doc.createElement('div');
        el.innerHTML = o;
        
        try {
          pl.each(el.childNodes, function() {
            to.parentNode.insertBefore(this, to);
          });
        } catch(er) {}
      });
      return this;
    },
    
    append: function(o) {
      if(pl.type(o, 'obj')) {
        var el = doc.createElement('div');
        el.appendChild(o);
        o = el.innerHTML;
      }
      
      pl.each(this.elements, function() {
        var to = this;
        var el = doc.createElement('div');
        el.innerHTML = o;
        
        try {
          pl.each(el.childNodes, function() {
            to.appendChild(this);
          });
        } catch(er) {}
      });
      return this;
    },
    
    prepend: function(o) {
      if(pl.type(o, 'obj')) {
        var el = doc.createElement('div');
        el.appendChild(o);
        o = el.innerHTML;
      }
      
      pl.each(this.elements, function() {
        var to = this;
        var el = doc.createElement('div');
        el.innerHTML = o;
        
        try {
          pl.each(el.childNodes, function() {
            to.insertBefore(this, to.firstChild);
          });
        } catch(er) {}
      });
      return this;
    },
    
    appendTo: function(selector, context, index) {
      pl(selector, context, index).append(this.elements[0]);
      return this;
    },
    
    prependTo: function(selector, context, index) {
      pl(selector, context, index).prepend(this.elements[0]);
      return this;
    }
  });
  
  pl.implement(pl.fn.init, pl.fn);

  //Private methods
  var innerText = pl.browser('ie') ? 'innerText' : 'textContent';
  var Events = {
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
          Events.attaches.bind(doc, 'DOMContentLoaded', ready);
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
    
          Events.attaches.bind(doc, 'readystatechange', function() {
            if(doc.readyState === 'complete') {
              ready();
            }
          });
        }
    
        Events.attaches.bind(win, 'load', ready);
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
    
    // Cross-browser event adding and removing
    // http://javascript.ru/tutorial/events/crossbrowser
    attaches: (function() {
      var turns = 0;
      
      function fixEvt(event) {
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
        
        if(pl.type(event.which, 'undef') && !pl.type(event.button, 'undef')) {
          event.which = (event.button & 1 ? 
            1 : 
            (event.button & 2 ? 
              3 : 
              (event.button & 4 ? 2 : 0)
            )
          );
        }
        
        return event;
      }
      
      function handleCommon(e) {
        e = fixEvt(e);
        
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

            if(~pl.inArray(evt, unResolvedEvt)) {
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
              if(!pl.type(Events.attaches, u)) {
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
                  Events.attaches.unbind(el, handle, handlerList[handle][key]);
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
          arguments.callee(key, evt[key], flag);
        }
      } else if((fn && evt) || (!fn && evt) || (!fn && !evt)) {
        if(flag) {
          pl.each(__this.elements, function() {
            Events.attaches.bind(this, evt, fn);
          });
        } else {
          pl.each(__this.elements, function() {
            Events.attaches.unbind(this, evt, fn);
          });
        }          
      }
      return __this;
    }
  };

  var inner = function(e, method, ins, to) {
    var init = e;
    var e = init.elements[0];

    if(!ins) {
      return e[method];
    } else {
      if(!to) {
        e[method] = ins;
      } else {
        switch(to) {
          case 1:
            pl.each(init.elements, function() {
              this[method] += ins;
            });
            break;
          case -1:
            pl.each(init.elements, function() {
              this[method] = ins + this[method];
            });
            break;
        }
      }
      return init;
    }
  };
  
  // Create new element
  var create = function(o, params) {
    var ns = doc.createElement(o);
    return params ? pl(ns).attr(params).get() : ns;
  };
  
  var curCSS = {
    // E.g. 'font-siz' to 'fontSize'
    fixStyle: function(str) {
      if(!str.match('-')) return str;
      var parts = str.split('-');
      return parts[0] + parts[1].charAt(0).toUpperCase() + parts[1].substr(1);  
    },
    
    // Cross-browser opacity
    fixOpacity: function(val) {
      var op    = 'opacity', 
          fixed = [op, val];

      switch(pl.browser()) {
        case 'ie7':
          fixed[0] = 'filter';
          fixed[1] = 'alpha(' + op + '=' + (val * 100) + ');';
          break;
        case 'ie8':
          fixed[0] = '-ms-filter';
          fixed[1] = 'alpha(' + op + '=' + (val * 100) + ')';
          break;
        case 'safari_khtml':
          fixed[0] = '-khtml-' + op;
          break;
        case 'firefox':
          fixed[0] = '-moz-' + op;
          break;
      }
      
      return fixed;
    },
    
    fixReturnOpacity: function(val) {
      return val ? 
        (val.match('opacity=') ? val.match('=([0-9]+)')[1] / 100 : val) : 
        n;
    },
    
    rmvPostFix: {
      zIndex: true, 
      fontWeight: true, 
      opacity: true, 
      zoom: true, 
      lineHeight: true
    },
    
    // Get computed style
    get: function(o, style) {
      if(style === 'opacity') {
        var fixed = curCSS.fixOpacity(0),
            style = fixed[0];
      }
      return curCSS.fixReturnOpacity(
        o.currentStyle ? o.currentStyle[style] : 
          win.getComputedStyle(o, n).getPropertyValue(style)
      );
    }
  };
  
  var unResolvedEvt = [
    'click', 'mouseover', 'mouseout',
    'keyup', 'keydown', 'dblclick',
    'mousedown', 'mouseup', 'keypress'
  ];
  
  // "Deep parent" (pl().parent())
  var rParent = function(elem, step) {
    if(step > 0) {
      return rParent(elem.parentNode, --step);
    }
    return elem;
  };
})();

/* Module: Find.js
 * Requirements: Core.js
 * Provides: CSS3 queries.
 * 
 * Contains YASS v0.3.9
 * http://yass.webo.in
 * 
 * Copyright 2008-2009, Nikolay Matsievsky (sunnybear)
 * Dual licensed under the:
 *  - MIT License (http://opensource.org/licenses/mit-license.php)
 *  - GNU GPL (http://opensource.org/licenses/gpl-license.php)
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
            !(new RegExp('(^| +)' + value + '($| +)').test(attr));
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
        if(qsSupport && selector.indexOf('!=') == -1) {     
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

})(this, document, 'prototype', 'addEventListener', 
   'getElement', 'className', 'null', 'undef', 
   '<([A-z]+)>', null, function() {});