/* Prevel Dom Extension
 * Requirements: Core.js, Manipulate.js, Attr.js, Insert.js
**/

(function(win, doc, undefined) {
  pl.extend({
    selectedBy: function(elem,selector) {
      var elems=pl(selector).get()
      return (elems===elem || pl.filter(elems, function(el){return el==elem}).length > 0)
    },

    related:function(elem,fn,mod){
      var ret=pl();
      ret.selector=[elem.id,fn,mod];
      if (pl.type(mod,'int')){
        var func=function(e,step){
          return step > 0 ? func(e[fn], --step) : e;
        }
      } else {
        var func=function(e,selector){
          var ret=[];var rel,i;
          if (rel=e[fn]){
            if( !selector||pl.selectedBy(rel,selector)) ret.push(rel);
            if (i=func(rel,selector)) return ret.concat(i);
            return ret;
          }
        }
      }
      ret.elements=func(elem,mod);
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
    
    selectedBy: function(selector) {
      return pl.selectedBy(this.get(),selector);
    },

    prev: function(iterations) {
      return pl.related(this.elements[0],'previousSibling',iterations||1);
    },
    
    next: function(iterations) {
      return pl.related(this.elements[0],'nextSibling',iterations||1);
    },
    
    children: function(selector) {
      return pl.related(this.elements ? this.elements[0] : this,'children',selector||1);
    },

    parents: function(selector) {
      return pl.related(this.elements ? this.elements[0] : this,'parentNode',selector);
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
