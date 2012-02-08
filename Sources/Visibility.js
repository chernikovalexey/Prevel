/* Module: Visibility.js
 * Requirements: Core.js, Manipulate.js, Css.js
**/

(function() {
  
  pl.extend(pl.fn, {
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
    }
  });
  
})();