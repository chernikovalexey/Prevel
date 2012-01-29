(function(DIR, undefined) {
  
  var fs = require('fs');
  
  var forbidden = ['wrap.js'];
  var requirements = [];
  var queue = [[], []];
  var frequency = {};
  
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
  
  function parseRequirements(path) {
    fs.readFile(path, 'utf-8', function(err, file) {
      var line = file.match(/Requirements:.*(?!\\n)/);
      
      if(!line) {
        return;
      }
      
      addRequirement(line[0]
        .replace('Requirements: ', '')
        .trim()
        .split(','));
    });
  }
  
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
    
  function fillQueue(m, e, callback) {
    if(m[0] === '*') {
      fs.readdir(DIR + 'Sources', function(err, files) {
        files.forEach(function(f) {
          if(~forbidden.indexOf(f)) {
            return;
          }
          
          queue[0].push(f);
          parseRequirements(DIR + 'Sources/' + f);
        });
      });
    } else if(m[0] !== 'none') {
      m.forEach(function(i) {
        i = i[0].toUpperCase() + i.substr(1) + '.js';
        queue[0].push(i);
        parseRequirements(DIR + 'Sources/' + i);
      });
    }
    
    if(e[0] === '*') {
      fs.readdir(DIR + 'Extensions', function(err, files) {
        files.forEach(function(f) {
          queue[1].push(f);
          parseRequirements(DIR + 'Extensions/' + f);
        });
      });
    } else if(e[0] !== 'none') {
      e.forEach(function(i) {
        i = i[0].toUpperCase() + i.substr(1) + '.js';
        queue[1].push(i);
        parseRequirements(DIR + 'Extensions/' + i);
      });
    }
  }
  
  function orderQueue(callback) {
    var _q = [];
        
    for(var key in frequency) {
      queue[0].forEach(function(i) {
        if(i === key) {
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
    
    setTimeout(function() {
      queue[0] = queue[0].concat(requirements);
      queue[0] = queue[0].unique();
      orderQueue(function() {
        callback(queue);
      });
    }, 100);
  }
  
  // Export
  module.exports.getQueue = getQueue;
  
})('../');