(function(UGLIFY, undefined) {
  
  var uj = require(UGLIFY + 'uglify-js.js');
    
  function minify(f) {
    console.log('  Minifying..');
    var ast = uj.parser.parse(f);     // parse code and get the initial AST
    ast = uj.uglify.ast_mangle(ast);  // get a new AST with mangled names
    ast = uj.uglify.ast_squeeze(ast); // get an AST with compression optimizations
    return uj.uglify.gen_code(ast);   // compressed code here
  }
  
  module.exports.minify = minify;
  
})('./UglifyJS/');
