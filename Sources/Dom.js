/* Module: Dom.js
 * Requirements: Core.js
 * Provides: Different interactions with the DOM.
 * 
 * Dual licensed under the:
 *  - GNU LGPL (http://opensource.org/licenses/lgpl-license.php)
 *  - MIT License (http://opensource.org/licenses/mit-license.php)
**/

(function() {
  
  pl.extend({
    innerText: pl.browser('ie') ? 'innerText' : 'textContent',
    
    camelCase: function(str) {
      if(!str.match('-')) return str;
      var parts = str.split('-');
      return parts[0] + parts[1].charAt(0).toUpperCase() + parts[1].substr(1);  
    },
        
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
    
    create: function(o, params) {
      var ns = doc.createElement(o);
      return params ? pl(ns).attr(params).get() : ns;
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
    },
    
    fixAttr: {
      'class': 'className',
      'float': 'cssFloat',
      'for':   'htmlFor'
    },
    
    __fwe__: [
      'click', 'mouseover', 'mouseout',
      'keyup', 'keydown', 'dblclick',
      'mousedown', 'mouseup', 'keypress'
    ],
    
    parent: function(elem, step) {
      return step > 0 ? pl.parent(elem.parentNode, --step) : elem;
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
    
    html: function(ins, to) {
      // Delegate to the common method
      return pl.innerContent.midst(this, 'innerHTML', ins, to);
    },
    
    text: function(ins, to) {
      // The same as in pl().html()
      return pl.innerContent.midst(this, pl.innerText, ins, to);
    },
    
    get: function(index) {
      var e = this.elements;
      return e.length === 1 ? e[0] : (!pl.type(index, u) ? e[index] : e);
    },
    
    // Recursion's faster than loop
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

      if(set) {
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
    },

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
    },

    each: function(fn) {
      pl.each(pl.__self__.elements, function() {
        fn.call(this);
      });
      return this;
    },
    
    bind: function(evt, fn) {
      // Delegate to the common method
      return pl.events.routeEvent(evt, fn, 1);
    },
    
    unbind: function(evt, fn) {
      // The same as in pl().bind()
      return pl.events.routeEvent(evt, fn, 0);
    },
    
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