(function(MODULES, EXT, undefined) {
  
  var fs = require('fs');
  
  function loadQueue(queue, callback) {
    console.log('Loading files..');
    
    var code = '';
        
    queue[0].forEach(function(i) {
      fs.readFile(MODULES + i, function(err, f) {
        code += f;
      });
    });
    
    queue[1].forEach(function(i) {
      fs.readFile(EXT + i, function(err, f) {
        code += f;
      });
    });
    
    setTimeout(function() {
      console.log('  OK.');
      callback(code);
    }, 25);
  }
  
  module.exports.loadQueue = loadQueue;
  
})('../Sources/', '../Extensions/');