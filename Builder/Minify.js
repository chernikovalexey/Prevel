(function(UGLIFY, undefined) {
  
  var uj = require(UGLIFY + 'uglify-js.js');
    
  function minify(f) {
    console.log('  Minifying..');
    var ast = uj.parser.parse(f);     // Parse code and get the initial AST
    ast = uj.uglify.ast_mangle(ast);  // Get a new AST with mangled names
    ast = uj.uglify.ast_squeeze(ast); // Get an AST with compression optimizations
    return uj.uglify.gen_code(ast);   // Return compressed code
  }
  
  module.exports.minify = minify;
  
})('./UglifyJS/');
