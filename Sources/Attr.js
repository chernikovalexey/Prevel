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
          return this.elements[0][attr] || this.elements[0].getAttribute(attr);
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