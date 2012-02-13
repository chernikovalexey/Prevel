(function(DIR, undefined) {

  var fs = require('fs');                          // File system API
  
  var forbidden = ['wrap.js'];                     // Files do not include to the final code
  var k = ['Core.js', 'Manipulate.js', 'Css.js'];  // With the highest importance-coefficient
  var requirements = [];                           // Files required to load but did not listed in arguments
  var queue = [[], []];                            // What to load
  var frequency = {};                              // How many files require each other
  var ready = [false, false];                      // Fire callback when both equals true
  
  // Unique the given array
  Array.prototype.unique = function() {
    var a = [];
    var l = this.length;
    for(var i = 0; i < l; ++i) {
      for(var j = i + 1; j < l; ++j) {
        if(this[i] === this[j]) {
          j = ++i;
        }
      }
      a.push(this[i]);
    }
    return a;
  };
  
  // Extend the given (`Parent`) object with `Child`;
  // override existing properties, if `flag` equals to true
  function extend(Parent, Child, flag) {
    for(var key in Child) {
      if((!Parent[key] && !flag) || flag) {
        Parent[key] = Child[key];
      }
    }
    return Parent;
  }
  
  // Fill array with something
  function fillArray(a, w) {
    var len = a.length;
    for(var key = 0; key < len; ++key) {
      a[key] = w;
    }
    return a;
  }
  
  // Which files requires current file to work properly
  function parseRequirements(path, callback) {
    fs.readFile(path, 'utf-8', function(err, file) {
      var line = file.match(/Requirements:.*(?!\\n)/);
            
      if(!line) {
        return;
      }
      
      addRequirement(line[0].replace('Requirements: ', '').trim().split(','));
      (callback || function() {})();
    });
  }
  
  // Transform array of parsed requirements to an array
  function addRequirement(array) {
    array.forEach(function(i) {
      i = i.trim();
      
      if(i === '-') {
        return;
      }

      frequency[i] = frequency[i] || 0;
      ++frequency[i];
      
      if(!~requirements.indexOf(i)) {
        requirements.push(i);
      }
    });
  }
  
  // Handed down in the separate function, because variable name can be changed
  var ready_pos = 0;
  function setReady() {
    ready[ready_pos++] = true;
  }
  
  function fillQueue(m, e, callback) {
    // Common functionality
    var common = function(fe, num, forbid, folder) {
      if(fe[0] === '*') {
        fs.readdir(DIR + folder, function(err, files) {
          files.forEach(function(f) {
            if(~forbidden.indexOf(f) && forbid) {
              return;
            }
            
            queue[num].push(f);
            parseRequirements(DIR + folder + '/' + f);
          });
          setReady();
        });
      } else if(fe[0] !== 'none') {
        var localReady = fillArray(new Array(fe.length), false);
        var localIndex = 0;
        
        fe.forEach(function(i) {
          i = i[0].toUpperCase() + i.substr(1) + '.js';
          queue[num].push(i);
          parseRequirements(DIR + folder + '/' + i, function() {
            localReady[localIndex++] = true;
          });
        });
        
        var lm = setInterval(function() {
          if(!~localReady.indexOf(false)) {
            setReady();
            clearInterval(lm);
          }
        }, 1);
      } else if(fe[0] === 'none') {
        setReady();
      }
    };
    
    common(m, 0, true, 'Sources');
    common(e, 1, false, 'Extensions');
  }
  
  // By priority
  function orderQueue(callback) {
    var _q = [];
    
    k.forEach(function(i) {
      if(~queue[0].indexOf(i)) {
        _q.push(i);
      }
    });
    
    for(var key in frequency) {
      queue[0].forEach(function(i) {
        if(i === key && !~_q.indexOf(i)) {
          _q.push(i);
        }
      });
    }
    
    queue[0].forEach(function(i) {
      if(!~_q.indexOf(i)) {
        _q.push(i);
      }
    });
    
    queue[0] = _q;
    callback();
  }
  
  function getQueue(m, e, callback) {
    console.log('Computing file dependencies..');
    
    fillQueue(m, e);
    
    var int = setInterval(function() {
      if(ready[0] && ready[1]) {
        queue[0] = queue[0].concat(requirements);
        queue[0] = queue[0].unique();
        orderQueue(function() {
          callback(queue);
        });
        clearInterval(int);
      }
    }, 1);
  }
  
  // Export
  module.exports.getQueue = getQueue;
  
})('../');