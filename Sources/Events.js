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