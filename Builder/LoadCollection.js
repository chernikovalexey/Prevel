(function(MODULES, EXT, undefined) {
  
  var fs = require('fs');
  
  function loadQueue(q, callback) {
    console.log('Loading files..');
    
    var padding = ['Core.js'];  // Files which should be inserted before
    var before = '';            // Will be inserted before other code
    var code = '';              // Contains output code
    var prefix = '\n\n';        // Padding between modules
    var container = 0;          // Handled files counter
    var complex = q[0].length + q[1].length;
    
    // Modules (/Sources/)
    q[0].forEach(function(i) {
      if(~padding.indexOf(i)) {
        before = fs.readFileSync(MODULES + i, 'utf-8');
      } else {
        code += prefix + fs.readFileSync(MODULES + i, 'utf-8');
      }
      
      ++container;
    });

    // Extensions (/Extensions)
    q[1].forEach(function(i) {
      code += prefix + fs.readFileSync(EXT + i, 'utf-8');
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