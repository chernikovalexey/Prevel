/* Prevel Events Extension
 * (adds cross-browser triggering)
 * 
 * Requirements: Core.js
**/

(function() {

  pl.extend(pl.fn, {
    trigger: function(evt) {
      var event;
      if(document.createEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(evt, true, true);
      } else {
        event = document.createEventObject();
        event.eventType = 'on' + evt;
      }

      event.eventName = evt;

      pl.each(this.elements, function(k, v) {
        if(document.createEvent) {
          v.dispatchEvent(event);
        } else {
          v.fireEvent(event.eventType, event);
        }
      });

      return this;
    }
  });
  
})();