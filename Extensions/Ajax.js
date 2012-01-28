
/* Prevel Ajax Extension
* (adds additional functionality to the Prevel's Core)
*
* Requirements: Core.js,Ajax.js
* Provides:
* - get, post, put, and del methods
* - serialize method
* - getAjax method returning a reusable Ajax object
**/

(function() {
  pl.extend({
    get:function(params){pl.ajax(params);},
    post:function(params){params.type='POST';pl.ajax(params);},
    put:function(params){params.data=params.data||{};params.data._method='put';pl.post(params);},
    del:function(params){params.data=params.data||{};params.data._method='delete';pl.post(params);},
    getAjax:function(params){
      this.params=params;
      var foo=this;
      pl.each(['get','post','put','del'],function(i,action){
        foo[action]=function(params){
            pl[action](pl.extend(params,foo.params));
          }
      });
    },
    serialize:function(form){
      var o={};
      pl.each(pl.find('form#'+form+' input, form#'+form+ ' textarea'),function(){
        if(this.type!='submit'){o[this.name]=this.value}
      });
      return o;
    }
  });
})();
