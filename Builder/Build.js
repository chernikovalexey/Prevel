/* Prevel Builder
 * 
 * Provides assembling Prevel Modules and Extensions into two files:
 * unobfuscated for developers and obfuscated for production.
**/

(function(DIR, VERSION, undefined) {
   
  var fs = require('fs');
  var cd = require(DIR + 'ComputeDependencies.js');
  var lc = require(DIR + 'LoadCollection.js');
  var m  = require(DIR + 'Minify.js');
  
  var version = process.argv[2] || VERSION;
  var modules = (process.argv[3] || 'none').split(',');
  var extensions = (process.argv[4] || 'none').split(',');
  
  function wrap(code, callback) {
    console.log('Wrapping code with wrap.js..');
    
    fs.readFile(DIR + '../Sources/wrap.js', 'utf-8', function(err, f) {
      callback(f
        .replace('%version%', version)
        .replace('  // [Code]', code));
    });
  }
  
  cd.getQueue(modules, extensions, function(q) {
    lc.loadQueue(q, function(c) {
      wrap(c, function(w) {
        console.log('Bringing amendments in..');
        
        fs.writeFile(DIR + '../prevel-full.js', w, function(err) {
          if(err) {
            console.log('Error while filling prevel-full.js:', err);
          } else {
            console.log('  prevel-full.js filled successfully.');
          }
        });
        
        fs.writeFile(DIR + '../prevel-min.js', m.minify(w), function(err) {
          if(err) {
            console.log('Error while filling prevel-min.js:', err);
          } else {
            console.log('  prevel-min.js filled successfully.');
            console.log('Prevel has been built successfully.');
          }
        });
      });
    });
  });
  
})('./', '1.0.0');