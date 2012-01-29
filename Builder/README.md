__Node.js__ is required for using the builder.

How to build:

```javascript
cd path/to/Prevel/Builder
node Build.js version modules_include extensions_include
```

To include all modules `modules_include` should equals to *. To include
any of modules it should equals to "none". Otherwise, list modules to be included via coma.

To include all extensions `extensions_include` should equals to *. To include
any of extensions it should equals to "none" (or leave it empty). Otherwise, list extensions to be included via coma.

```javascript
node Build.js 1.0.0 * *
node Build.js 1.0.0 none core,dom
node Build.js 1.0.0 core
```