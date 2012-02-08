/* Prevel Observer Extension
 * (provides basic implementation of "observer" pattern)
 * 
 * Requirements: Core.js
**/

(function() {
  
  pl.extend({
    Observer: function(fns) {
      this.fns = fns ? (pl.type(fns, 'fn') ? [fns] : fns) : [];
      
      this.subscribe = function(fn) {
        this.fns.push(fn);
      };
      
      this.unsubscribe = function(fn) {
        var pos = pl.inArray(fn, this.fns);
        
        if(~pos) {
          this.fns.splice(pos, 1);
        }
      };
      
      this.clean = function() {
        this.fns = [];
      };
      
      this.has = function(fn) {
        return !!~pl.inArray(fn, this.fns);
      };
      
      this.publish = function(that, args) {
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