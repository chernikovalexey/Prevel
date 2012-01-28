/* Module: PubSub.js
 * Requirements: Core.js
 * Provides: Publish/Subscribe framework with individual observers
 * 
 * Dual licensed under the:
 *  - GNU LGPL (http://opensource.org/licenses/lgpl-license.php)
 *  - MIT License (http://opensource.org/licenses/mit-license.php)
**/
(function() {
  pl.extend({
    Observer: function(fns) {
      this.fns=fns ? (fns.call ? [fns] : fns) : [];
      this.subscribe=function(fn) {
        this.fns.push(fn);
      }
      this.unsubscribe=function(fn) {
        pl.filter(this.fns, function(f){
          if (f !== fn) {
            return f;
          }
        });
      }
      this.publish=function(that, args) {
        pl.each(this.fns, function(){
          this.apply(that,args);
        });
      }
    }
  });
})();
