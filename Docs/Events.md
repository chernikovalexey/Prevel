#Prevel Events Module

This documentation is for [Sources/Events.js](https://github.com/chernikovalexey/Prevel/blob/master/Sources/Events.js). So, if you used Events.js (e.g. `node Buid.js 1.2.9 events`) while building Prevel or if you used [Prevel Full](https://github.com/chernikovalexey/Prevel/blob/master/prevel-full.js), or [Prevel Minified](https://github.com/chernikovalexey/Prevel/blob/master/prevel-min.js), you will be able to use all underwritten functionality.

---

###pl().bind(event, fn)

Attaches event listener (to `event` event `fn` callback) to every selected element.

  ```javascript
  pl('a').bind('click', function() {
    alert('Clicked.');
  });
  ```

In addition, it's possible to attach not only one event listener. Example:

  ```javascript
  pl('a').bind({
    click: function() {
      alert('Clicked.');
    },
    mouseover: function() {
      pl(this).css('text-decoration', 'underline');
    },
    mouseout: function() {
      pl(this).css('text-decoration', 'none');
    }
  });
  ```

__IMPORTANT:__

Prevel has the in-built functionality for mending `Event Objects`.

The following code will work properly in all browsers, irrespective whether it's IE or Chrome.

```javascript
var h = function(e) {
  console.log( e.keyCode ); // Key code
  console.log( e.which );   // Mouse button pressed
  console.log( e.pageX, e.pageY ); // Coordinates
  console.log( e.target ); // Element, on which click has just happened
};
pl('*').bind('click', h);
```

---

###pl().unbind(event, fn)

Detaches event listener from all selected elements. If parameters didn't passed, it plucks all the event listeners attached 
to selected elements. If only `event` passed, it plucks all the event listeners of `event`-event (e.g.: click-events).

  ```javascript
  var evtListenerFn = function() {
    alert('Clicked.');
  };
  
  pl('a').bind('click', evtListenerFn);   // Event listener has been attached from all the links
  pl('a').unbind('click', evtListenerFn); // Event listener has been detached from all the links
  pl('a').unbind('click');                // Detach all the click-events
  pl('a').unbind();                       // Detach all (any) the event listeners
  ```