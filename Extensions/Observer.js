/* Prevel Observer Extension
 * (provides basic implemenatation of pattern "observer")
 * 
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
      this.fns = fns ? (fns.call ? [fns] : fns) : [];
      
      this.subscribe = function(fn) {
        this.fns.push(fn);
      };
      
      this.unsubscribe = function(fn) {
        var pos = pl.inArray(fn, this.fns);
        
        if(~pos) {
          this.fns.splice(pos, 1);
        }
      };
      
      this.publish = function(that, args) {
        if(pl.type(args, 'undef')) {
          args = that;
          that = pl;
        }
        
        if(!pl.type(args, 'arr')) {
          args = [args];
        }
        
        pl.each(this.fns, function() {
          this.apply(that, args);
        });
      };
    }
  });
  
})();