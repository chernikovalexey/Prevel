/* Module: PubSub.js
 * Requirements: Core.js
 * Provides: Publish/Subscribe framework with individual observers
 * 
 * Dual licensed under the:
 *  - GNU LGPL (http://opensource.org/licenses/lgpl-license.php)
 *  - MIT License (http://opensource.org/licenses/mit-license.php)
**/
(function(win) {
  pl.extend({
    Observer: function(fns) {
      this.fns=fns ? (fns.call ? [fns] : fns) : [];
      this.subscribe=function(fn) {
        this.fns.push(fn);
      }
      this.unsubscribe=function(fn) {
        pl.filter(this.fns, function(f){
          if (f !== fn) {
            return f;
          }
        });
      }
      this.publish=function(that, args) {
        pl.each(this.fns, function(){
          this.apply(that,args);
        });
      }
    },
    Ajax:function(url,data,callbacks,dataType){
      if(pl.type(url,'obj')) {
        var params=url;
        var url=params.url, data=params.data,callbacks=params.callbacks,dataType=params.DataType;
      }
      this.url=url;
      this.data=data;
      this.dataType=dataType||'json';
      var that=this;
      if (callbacks) {
        pl.each(['load','success','error','always'],function(i,evt){
          var cb=callbacks[evt];
          that[evt+'_observer']=new pl.Observer(cb ? (cb.length ? cb : [cb]) : []); 
        });
      }
      pl.each(['get','post','put','delete'],function(i,type){
        that[type]=function(params){
          if (type!='get'){
            params=params || {};
            params.type='POST';
            if(type=='put' || type=='delete') {
              if (params.data) {
                params.data['_method']=type;
              } else {
                params.data=pl.extend({'_method':type}, (that.data || {}))
              }
            }
          }
          pl.ajax(pl.extend(params || {},that));
        };
      });
    },
    win_bind:function(selector,evt,fn){
      win.addEventListener(evt, function(e){
        elems=pl(selector).get()
        if (elems==e.target || pl.filter(elems, function(el){return el==e.target}).length > 0){
          fn.call(e.target,e);
        }
      });
    },
    a_ajax:function(){
    },
    form_ajax:function(){
    }
  });
  pl.each(['load','success','error','always'],function(i,evt){
    pl.Ajax.prototype[evt]=function(){
      this[evt+'_observer'].publish(this,arguments)
    }
  });
/*  pl.each(['get','post','put','delete'],function(i,type){
    pl.Ajax.prototype[type]=function(params){
    }
  });*/
})(window);
