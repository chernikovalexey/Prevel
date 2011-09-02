pl(function() {

  cl('DOM is ready.');
 
  console.time('Entire process');
 
    console.group('pl');
      console.time('timer');
         pl('div');
         pl('*', 'body');
         pl('.post .post_image');
         pl('.post_image', '.post');
         pl('.post_image', '.post', 0);
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.len');
      console.time('timer');
        pl('div').len();
        pl('*').len();
        pl('table').len();
        pl('.post_image', '.post').len();
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.html');
      console.time('timer');
        pl('.post_image', '.post').html();
        pl('.post_image', '.post').html('image');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.text');
      console.time('timer');
        pl('#text__').text();
        pl('#text__').text('newtest');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.get');
      console.time('timer');
        pl('div').get(60);
        pl('*', 'body').get(0);
        pl('.post .post_image').get(2);
        pl('.post_image', '.post').get(2);
        pl('.post_image', '.post', 0).get();
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.parent');
      console.time('timer');
        pl('div').parent();
        pl('*', 'body').parent(2);
        pl('.post .post_image').parent();
        pl('div', 60).parent(10);
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.remove');
      console.time('timer');
        pl('.post .post_image').remove();
        pl('#post16774825_5805').remove();
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.addClass');
      console.time('timer');
        pl('div').addClass('prevel');
        pl('*', 'body').addClass('prevel');
        pl('*', 'body').addClass('prevel');
        pl('*', 'body').addClass('onemorePrevel');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.hasClass');
      console.time('timer');
        pl('#text__l').hasClass('prevel');
        pl('*', 'body').hasClass('prevel');
        pl('*', 'body').hasClass('onemorePrevel');
        pl('#text__l').hasClass('onemorePrevel');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.removeClass');
      console.time('timer');
        pl('div').removeClass('prevel');
        pl('*', 'body').removeClass('prevel');
        pl('*', 'body').removeClass('prevel');
        pl('*', 'body').removeClass('onemorePrevel');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.attr');
      console.time('timer');
        pl('div').attr('id');
        pl('div').attr('data-localStorage', Math.PI);
        pl('*', 'body').attr({
          'data-localStorage': Math.PI,
          'class': 'PrevelFramework'
        });
        pl('*', 'body').attr('data-localStorage');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.css');
      console.time('timer');
        pl('div').css('display', 'inline');
        pl('div').css('display');
        pl('*', 'body').css({
          'margin-left': 20,
          marginTop: 15,
          filter: 'alpha(opacity=100)'
        });
        pl('*', 'body').css('opacity');
      console.timeEnd('timer');
    console.groupEnd();
  
    //================
    
    console.group('toParams');
      console.time('timer');
        pl.toParams({
          id: 1, 
          balance: 140903234.17,
          name: 'Mark',
          callback: function(u) { }
        });
        pl.toParams(['array', 'is', 'also', 'supported']);
        pl.toParams('user=Mark&uid=1024');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('ajax');
      console.time('timer');
        pl.ajax({
          async: true,
          
          url: 'ajax.php',
          type: 'GET',
          
          dataType: 'text',
          charset: 'utf-8',
          
          data: {
            first: 'Fizz',
            second: 'Buzz'
          },
  
          success: function(data) {
            //data
          }
        });
        
        pl.ajax({
          async: true,
          
          url: 'ajax.php?json',
          type: 'POST',
          
          dataType: 'json',
          charset: 'utf-8',
          
          data: {
            first: 'Fizz',
            second: 'Buzz'
          },
  
          success: function(data) {
            //data
          }
        });
      console.timeEnd('timer');
    console.groupEnd();
  
    //================
    
    console.group('.each');
      console.time('timer');
        pl('.post_image', '.post').each(function() {
          pl(this).html();
        });
        
        pl('*').each(function() { 
          pl(this).html(); 
        });
        
        pl('.post_image', '.post').each(function() {
          pl(this).remove();
        });
        
        pl('.post_image', '.post').each(function() {
          pl(this).html();
        });
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.removeAttr');
      console.time('timer');
        pl('*', 'body').removeAttr('data-localstorage');
        pl('div', 'body').removeAttr('style');
        pl('*', 'body').removeAttr('data-click-attribute');
        pl('*', 'body').removeAttr('data-focus-attribute');
      console.timeEnd('timer');
    console.groupEnd();
  
    //================
      
    console.group('trim');
      console.time('timer');
        pl.trim(' Prevel Framework');
        pl.trim('Prevel Framework ');
        pl.trim(' Prevel Framework ');
        pl.trim('  _  Prevel Framework _123#@$#@            ');
      console.timeEnd('timer');
    console.groupEnd();
  
    //================
    
    console.group('JSON');
      console.time('timer');
        pl.JSON('{"id":1,"balance":1239.34,"name":"Mark"}');
      console.timeEnd('timer');
    console.groupEnd();
  
    //================
      
    console.group('extend');
      console.time('timer');
        var obj = {
          id: 1,
          balance: 12943.323,
          name: 'Mark'
        };
        
        pl.extend(obj, {
          callback: function() {
            return 'Mark\'s account.';
          }
        });
        
        pl.extend({ 
          rootMethod: function() { 
            cl('pl.rootMethod();'); 
          }
        });
      console.timeEnd('timer');
    console.groupEnd();
  
    //================
    
    console.group('implement');
      console.time('timer');
        function UserConstructor() {
          this.title = 'Prevel Framework';
        };
  
        pl.implement(UserConstructor, {
          setData: function(key, value) {
            this[key] = value;
          }
        });
      console.timeEnd('timer');
    console.groupEnd();
  
    //================
    
    console.group('type');
      console.time('timer');
        pl.type('');
        pl.type([]);
        pl.type(function(){});
        pl.type(/abc/g);
        pl.type({});
        pl.type(+new Date());
        pl.type(new Date());
        pl.type(undefined);
        pl.type(null);
        pl.type(false);
      console.timeEnd('timer');
    console.groupEnd();
  
    //================
    
    console.group('browser');
      console.time('timer');
        pl.browser();
        pl.browser('chrome');
        pl.browser() === 'chrome';
        pl.browser('safari');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    var click = function() { cl('DIV has been clicked.'); };
    
    console.group('.bind');
      console.time('timer');
        pl('div').bind('click', click);
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.unbind');
      console.time('timer');
        //pl('div').unbind('click', click);
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
         
    console.group('.after');
      console.time('timer');      
        pl('#text__', 'body').after( pl('<strong>').html('AFTER').get());
        pl('#text__l', 'body').after('PLAIN');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.before');
      console.time('timer');      
        pl('*', 'body').before( pl('<strong>').html('BEFORE').get());
        pl('*', 'body').before('__PLAIN');
      console.timeEnd('timer');
    console.groupEnd();
  
    //================
    
    console.group('.append');
      console.time('timer');      
        pl('*', 'body').append( pl('<strong>').html('APPEND').get());
        pl('*', 'body').append('PLAIN__');
      console.timeEnd('timer');
    console.groupEnd();
  
    //================
    
    console.group('.prepend');
      console.time('timer');      
        pl('*', 'body').prepend( pl('<strong>').html('PREPEND').get());
        pl('*', 'body').prepend('_$_PLAIN_$_');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
  console.timeEnd('Entire process');
    
});