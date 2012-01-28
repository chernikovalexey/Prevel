/* Prevel Dom Extension
* (adds additional functionality to the Prevel's Dom)
*
* Requirements: Core.js, Dom.js
* Provides:
* - bluring, focusing elements
* - working with value of text inputs
* - getting previous, next siblings
* - wrapping elements
* - replacing elements with new ones
* - getting children
**/

(function(win, doc, undefined) {
  
  pl.extend(pl.fn, {
    toggleClass: function(c) {
      var cre = new RegExp('\\b' + c + '\\b');
      
      pl.each(this.elements, function() {
        if(this.className.match(cre)) {
          this.className = this.className.replace(cre, '');
        } else {
          this.className = this.className + ' ' + c;
        }
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
      return pl(this.elements).html(' ');
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
      this.elements = [this.elements[0].childNodes];
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