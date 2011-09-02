(function () {

var global = this, apply = Function.prototype.apply, original = global.console, console;

// firebug console has only getter, so we should delete it first
// Assign the undefined value instead of deleting; IE bug fixed
global.console = undefined;

console = global.console = { production: false };

if (original && !original.time) {
  original.time = function(name, reset){
    if (!name) return;
    var time = new Date().getTime();
    if (!console.timeCounters) console.timeCounters = {};

    var key = "KEY" + name.toString();
    if(!reset && console.timeCounters[key]) return;
    console.timeCounters[key] = time;
  };

  original.timeEnd = function(name){
    var time = new Date().getTime();

    if(!console.timeCounters) return false;

    var key  = "KEY" + name.toString(),
      timeCounter = console.timeCounters[key];

    if (timeCounter) {
      var diff  = time - timeCounter,
        label = name + ": " + diff + "ms";
      console.info(label);
      delete console.timeCounters[key];
    }
    return diff;
  };
}

var methods = ['assert', 'count', 'debug', 'dir', 'dirxml', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'trace', 'warn'];

for (var i = methods.length; i--;) {
  (function (methodName) {
    console[methodName] = function () {
      if (original && (methodName in original) && !console.production) {
        /* we can change this with original[methodName].apply(original, arguments),
        * but IE8 & IE9 fails in that case
        */
        apply.call(original[methodName], original, arguments);
      }
    };
  })(methods[i]);
}

})();

function cl(msg) {
  if(msg) {
    console.log(msg);
  }
}