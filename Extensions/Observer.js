/* Module: PubSub.js
 * Requirements: Core.js
 * Provides: Publish/Subscribe framework with individual observers
 * 
 * Dual licensed under the:
 *  - GNU LGPL (http://opensource.org/licenses/lgpl-license.php)
 *  - MIT License (http://opensource.org/licenses/mit-license.php)
**/
(function() {
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
      var callbacks=callbacks||[];
      var that=this;
      pl.each(['load','success','error'],function(i,evt){
        var cb=callbacks[evt];
        that[evt+'_observer']=new pl.Observer(cb ? (cb.length ? cb : [cb]) : []); 
        that[evt]=function() {
          that[evt+'_observer'].publish(this);
        };
      });
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
    }
  });
})();
