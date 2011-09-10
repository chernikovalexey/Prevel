/* Module: Dom.js
 * Requirements: Core.js
 * Provides: Different interactions with the DOM.
 * 
 * Dual licensed under the:
 *  - GNU LGPL (http://opensource.org/licenses/lgpl-license.php)
 *  - MIT License (http://opensource.org/licenses/mit-license.php)
**/

(function() {
  
  //Fix attribute names because of .setAttribute
  var fixAttr = {
    'className': 'class',
    'cssFloat':  'float',
    'htmlFor':   'for'
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
            _int = [o];
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
      this.elements = [l ? this.elements[l - 1] : n];
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
      return rParent(this.elements[0], step);
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
        if(pl.inArray(c, this[cn].split(' ')) !== -1) return;
        this[cn] += (this[cn] ? ' ' : '') + c;
      });
      return this;
    },
    
    hasClass: function(c) {
      return pl.inArray(c, this.elements[0][cn].split(' ')) !== -1;
    },
    
    removeClass: function(c) {
      pl.each(this.elements, function() {
        var cl = this[cn].split(' ');
        var from = pl.inArray(c, cl);
        
        // If this class does not exist
        if(from === -1) return;
        
        cl.splice(from, 1);

        if(pl.empty(cl)) {
          this.removeAttribute('class');
        } else {
          this[cn] = cl.join(' ');
        }
      });
      return this;
    },
    
    attr: function(attr, set) {
      attr = fixAttr[attr] || attr;

      if(set) {
        pl.each(this.elements, function() {
          this.setAttribute(attr, set);
        }); 
      } else {
        switch(pl.type(attr)) {
          case 'obj':
            for(var key in attr) {
              arguments.callee.call(this, key, attr[key]);
            }
            break;
          case 'str':
            return this.elements[0].getAttribute(attr);
            break;
        }
      }
      return this;
    },
    
    removeAttr: function(attr) {
      attr = fixAttr[attr] || attr;

      pl.each(this.elements, function() {
        this.removeAttribute(attr);
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
        
        if(!event.which && event.button) {
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
          
          if(!updated) {
            e.preventDefault();
            e.stopPropagation();
          }
        }
      }
      
      return {
        bind: function(el, evt, fn) {
          if(pl.browser('ie') && el.setInterval && el !== win) {
            el = win;
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
          var handlerList = el.evt && el.evt[evt];
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
      if(fn) {
        if(flag) {
          pl.each(__this.elements, function() {
            Events.attaches.bind(this, evt, fn);
          });
        } else {
          pl.each(__this.elements, function() {
            Events.attaches.unbind(this, evt, fn);
          });
        }          
      } else {
        for(var key in evt) {
          arguments.callee(key, evt[key], flag);
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
    return params ? pl.extend(ns, params) : ns;
  };
  
  var curCSS = {
    // E.g. 'font-siz' to 'fontSize'
    fixStyle: function(str) {
      if(!str.match('-')) return str;
      var parts = str.split('-');
      return parts[0] + parts[1].toUpperCase();  
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
  
  // "Deep parent" (pl().parent())
  var rParent = function(elem, step) {
    if(step > 0) {
      return rParent(elem.parentNode, --step);
    }
    return elem;
  };
})();