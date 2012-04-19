/* Module: Css.js
 * Requirements: Core.js, Manipulate.js
**/

(function() {
  
  pl.extend({
    camelCase: function(str) {
      if(!str.match('-')) return str;
      var parts = str.split('-');
      return parts[0] + parts[1].charAt(0).toUpperCase() + parts[1].substr(1);  
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
    }
  });
  
  pl.extend(pl.fn, {
    css: function(style, set) {
      if(!pl.type(set, 'undef')) {
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
    }
  });
  
})();