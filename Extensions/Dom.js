/* Prevel Dom Extension
 * Requirements: Core.js, Manipulate.js, Attr.js, Insert.js
**/

(function(win, doc, undefined) {
  
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
      for(var key = 0; key < (iterations || 1); ++key) {
        this.elements = [this.elements[0].previousSibling];
      }
      return this;
    },
    
    next: function(iterations) {
      for(var key = 0; key < (iterations || 1); ++key) {
        this.elements = [this.elements[0].nextSibling];
      }
      return this;
    },
    
    children: function() {
      this.elements = this.elements[0].childNodes;
      return this;
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
