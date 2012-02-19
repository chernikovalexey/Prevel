/* Prevel Dom Extension
 * Requirements: Core.js, Manipulate.js, Attr.js, Insert.js
**/

(function(win, doc, undefined) {
<<<<<<< HEAD
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
=======
  
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
>>>>>>> b04f993a4bb2a288cef18c58727a56cfa02601fa
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
<<<<<<< HEAD
    
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
      var children=pl.related(this.elements ? this.elements[0] : this,'children',1);
      if (selector) 
        children.elements=pl.filter(children.elements,function(e){
          return pl.selectedBy(e, selector);
        });
      return children;
    },

    parents: function(selector) {
      return pl.related(this.elements ? this.elements[0] : this,'parentNode',selector);
=======

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
          found = pl.type(found, 'arr') ? found : [found];
          list = list.concat(found);
        }
      });
      
      children.elements = list;
      return children;
    },
    
    parents: function(selector) {
      return pl.related(this.elements[0] || this, 'parentNode', selector || '*');
>>>>>>> b04f993a4bb2a288cef18c58727a56cfa02601fa
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