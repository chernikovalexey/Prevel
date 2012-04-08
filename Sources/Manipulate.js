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
            _int = o[params || 0] ? o : [o];
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