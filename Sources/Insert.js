/* Module: Insert.js
 * Requirements: Core.js, Manipulate.js
**/

(function() {
  
  pl.extend({
    innerText: pl.browser('ie') ? 'innerText' : 'textContent',
        
    innerContent: {
      midst: function(e, method, ins, to) {
        var init = e;
        var e = init.elements[0];

        if(pl.type(ins, u)) {
          return e[method];
        } else {
          if(pl.type(ins, 'obj')) {
            var temp = doc.createElement('div');
            temp.appendChild(ins);
            ins = temp.innerHTML;
          }
              
          pl.each(init.elements, function() {
            if(!to) {
              this[method] = ins;
            } else if(~to) {
              this[method] += ins;
            } else {
              this[method] = ins + this[method];
            }
          });
          return init;
        }
      },
          
      edge: function(_this, args, table, dir, fn) {
        var a = pl.clean(args);
        for(var i = (dir < 0 ? a.length - 1 : 0); i != (dir < 0 ? dir : a.length); i += dir) {
          fn(_this, a[i]);
        }
      }
    },
    
    clean: function(a) {
      var r = [];
      var len = a.length;
      
      for(var i = 0; i < len; ++i) {
        if(pl.type(a[i], 'str')) {         
          var table = '';
    
          if(!a[i].indexOf('<thead') || !a[i].indexOf('<tbody')) {
            table = 'thead';
            a[i] = '<table>' + a[i] + '</table>';
          } else if(!a[i].indexOf('<tr')) {
            table = 'tr';
            a[i] = '<table>' + a[i] + '</table>';
          } else if(!a[i].indexOf('<td') || !a[i].indexOf('<th')) {
            table = 'td';
            a[i] = '<table><tbody><tr>' + a[i] + '</tr></tbody></table>';
          }
    
          var div = doc.createElement('div');
          div.innerHTML = a[i];
    
          if(table) {
            div = div.firstChild;
            if(table !== 'thead') div = div.firstChild;
            if(table === 'td') div = div.firstChild;
          }

          var cn_len = div.childNodes.length;
          for(var j = 0; j < cn_len; ++j) {
            r.push(div.childNodes[j]);
          }
        } else if(a[i] !== n) {
          r.push(a[i].nodeType ? a[i] : doc.createTextNode(a[i].toString()));
        }
      }
      
      return r;
    }
  });
  
  pl.extend(pl.fn, {
    html: function(ins, to) {
      // Delegate to the common method
      return pl.innerContent.midst(this, 'innerHTML', ins, to);
    },
    
    text: function(ins, to) {
      // The same as in pl().html()
      return pl.innerContent.midst(this, pl.innerText, ins, to);
    },
    
    after: function() {
      var args = arguments;
      pl.each(this.elements, function() {
        pl.innerContent.edge(this, args, false, -1, function(o, a) {
          o.parentNode.insertBefore(a, o.nextSibling);
        });
      });
      return this;
    },
    
    before: function() {
      var args = arguments;
      pl.each(this.elements, function() {
        pl.innerContent.edge(this, args, false, 1, function(o, a) {
          o.parentNode.insertBefore(a, o);
        });
      });
      return this;
    },
        
    append: function() {
      var args = arguments;
      pl.each(this.elements, function() {
        pl.innerContent.edge(this, args, true, 1, function(o, a) {
          o.appendChild(a);
        });
      });
      return this;
    },

    prepend: function() {
      var args = arguments;
      pl.each(this.elements, function() {
        pl.innerContent.edge(this, args, true, -1, function(o, a){
          o.insertBefore(a, o.firstChild);
        });
      });
      return this;
    },
   
    appendTo: function(selector, context, index) {
      pl.each(this.elements, function() {
        pl(selector, context, index).append(this);
      });
      return this;
    },
    
    prependTo: function(selector, context, index) {
      pl.each(this.elements, function() {
        pl(selector, context, index).prepend(this);
      });
      return this;
    }
  });
  
})();