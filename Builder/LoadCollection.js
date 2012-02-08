(function(MODULES, EXT, undefined) {
  
  var fs = require('fs');
  
  function loadQueue(q, callback) {
    console.log('Loading files..');
    
    var padding = ['Core.js']; // Files which should be inserted before
    var before = ''; // Will be inserted before other code
    var code = '';
    var container = 0;
    var complex = q[0].length + q[1].length;
    
    q[0].forEach(function(i) {
      if(~padding.indexOf(i)) {
        before = fs.readFileSync(MODULES + i, 'utf-8');
      } else {
        code += fs.readFileSync(MODULES + i, 'utf-8');
      }
      
      ++container;
    });

    q[1].forEach(function(i) {
      code += fs.readFileSync(EXT + i, 'utf-8');
      ++container;
    });
    
    code = before + code;
    delete before;
    
    var int = setInterval(function() {
      if(container === complex) {
        console.log('  OK.');
        
        callback(code);
        clearInterval(int);
      }
    }, 1);
  }
  
  module.exports.loadQueue = loadQueue;
  
})('../Sources/', '../Extensions/');