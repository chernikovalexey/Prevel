
/* Prevel Dom Extension
* (adds additional functionality to the Prevel's Dom Functionality)
*
* Requirements: Core.js,Dom.js
* Provides:
* - get, post, put, and del methods
* - serialize method
* - getAjax method returning a reusable Ajax object
**/

(function() {
  pl.extend(pl.fn, {
    toggleClass:function(c){
      var cre=new RegExp('\\b'+c+'\\b')
      pl.each(this.elements, function() {
        if (this.className.match(cre)){
          this.className=this.className.replace(cre,'');
        } else {
          this.className=this.className+' '+c;
        }
      })
      return this;
    }
  });
})();
