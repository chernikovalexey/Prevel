$(function() {

  cl('DOM is ready.');
 
  console.time('Entire process');
  
    console.group('$');
      console.time('timer');
        $('div');
        $('*', 'body');
        $('.post .post_image');
        $('.post_image', '.post');
        $('.post_image', '.post').eq(0);
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.len');
      console.time('timer');
        $('div').size();
        $('*').size();
        $('table').size();
        $('.post_image', '.post').size();
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.html');
      console.time('timer');
        $('.post_image', '.post').html();
        $('.post_image', '.post').html('image');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.text');
      console.time('timer');
        $('#text__').text();
        $('#text__').text('newtest');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.get');
      console.time('timer');
        $('div').get(60);
        $('*', 'body').get(0);
        $('.post .post_image').get(2);
        $('.post_image', '.post').get(2);
        $('.post_image', '.post').eq(0).get();
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.parent');
      console.time('timer');
        $('div').parent();
        $('*', 'body').parent(2);
        $('.post .post_image').parent();
        $('div').eq(60).parent(10);
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.remove');
      console.time('timer');
        $('.post .post_image').remove();
        $('#post16774825_5805').remove();
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.addClass');
      console.time('timer');
        $('div').addClass('prevel');
        $('*', 'body').addClass('prevel');
        $('*', 'body').addClass('prevel');
        $('*', 'body').addClass('onemorePrevel');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.hasClass');
      console.time('timer');
        $('#text__l').hasClass('prevel');
        $('*', 'body').hasClass('prevel');
        $('*', 'body').hasClass('onemorePrevel');
        $('#text__l').hasClass('onemorePrevel');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.removeClass');
      console.time('timer');
        $('div').removeClass('prevel');
        $('*', 'body').removeClass('prevel');
        $('*', 'body').removeClass('prevel');
        $('*', 'body').removeClass('onemorePrevel');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.attr');
      console.time('timer');
        $('div').attr('id');
        $('div').attr('data-localStorage', Math.PI);
        $('*', 'body').attr({
          'data-localStorage': Math.PI,
          'class': 'PrevelFramework'
        });
        $('*', 'body').attr('data-localStorage');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.css');
      console.time('timer');
        $('div').css('display', 'inline');
        $('div').css('display');
        $('*', 'body').css({
          'margin-left': 20,
          marginTop: 15,
          filter: 'alpha(opacity=100)'
        });
        $('*', 'body').css('opacity');
      console.timeEnd('timer');
    console.groupEnd();
  
    //================
    
    console.group('toParams');
      console.time('timer');
        $.param({
          id: 1, 
          balance: 140903234.17,
          name: 'Mark',
          callback: function(u) { }
        });
        $.param(['array', 'is', 'also', 'supported']);
        $.param('user=Mark&uid=1024');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('ajax');
      console.time('timer');
        $.ajax({
          async: true,
          
          url: '../other/ajax.php',
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
        
        $.ajax({
          async: true,
          
          url: '../other/ajax.php?json',
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
        $('.post_image', '.post').each(function() {
          $(this).html();
        });
        
        $('*').each(function() { 
          $(this).html(); 
        });
        
        $('.post_image', '.post').each(function() {
          $(this).remove();
        });
        
        $('.post_image', '.post').each(function() {
          $(this).html();
        });
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.removeAttr');
      console.time('timer');
        $('*', 'body').removeAttr('data-localstorage');
        $('div', 'body').removeAttr('style');
        $('*', 'body').removeAttr('data-click-attribute');
        $('*', 'body').removeAttr('data-focus-attribute');
      console.timeEnd('timer');
    console.groupEnd();
  
    //================
  
    console.group('trim');
      console.time('timer');
        $.trim(' Prevel Framework');
        $.trim('Prevel Framework ');
        $.trim(' Prevel Framework ');
        $.trim('  _  Prevel Framework _123#@$#@            ');
      console.timeEnd('timer');
    console.groupEnd();
  
    //================
    
    console.group('JSON');
      console.time('timer');
        $.parseJSON('{"id":1,"balance":1239.34,"name":"Mark"}');
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
  
        $.extend(obj, {
          callback: function() {
            return 'Mark\'s account.';
          }
        });
        
        $.extend({ 
          rootMethod: function() { 
            cl('$.rootMethod();'); 
          }
        });
  
        $.extend(obj, {
          get v() {
            return 'Router error.';
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
  
        $.extend(UserConstructor['prototype'], {
          setData: function(key, value) {
            this[key] = value;
          }
        });
      console.timeEnd('timer');
    console.groupEnd();
  
    //================
    
    console.group('type');
      console.time('timer');
        $.type('');
        $.type([]);
        $.type(function(){});
        $.type(/abc/g);
        $.type({});
        $.type(+new Date());
        $.type(new Date());
        $.type(undefined);
        $.type(null);
        $.type(false);
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    var click = function() { cl('DIV has been clicked.'); };
    
    console.group('.bind');
      console.time('timer');
        $('div').bind('click', click);
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.unbind');
      console.time('timer');
        $('div').unbind('click', click);
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.after');
      console.time('timer');      
        $('#text__', 'body').after( $('<strong>').html('AFTER').get());
        $('#text__l', 'body').after('PLAIN');
      console.timeEnd('timer');
    console.groupEnd();
    
    //================
    
    console.group('.before');
      console.time('timer');      
        $('*', 'body').before( $('<strong>').html('BEFORE'));
        $('*', 'body').before('__PLAIN');
      console.timeEnd('timer');
    console.groupEnd();
  
    //================
    
    console.group('.append');
      console.time('timer');      
        $('*', 'body').append( $('<strong>').html('APPEND'));
        $('*', 'body').append('PLAIN__');
      console.timeEnd('timer');
    console.groupEnd();
  
    //================
    
    console.group('.prepend');
      console.time('timer');      
        $('*', 'body').prepend( $('<strong>').html('PREPEND').get());
        $('*', 'body').prepend('_$_PLAIN_$_');
      console.timeEnd('timer');
    console.groupEnd();
  
  console.timeEnd('Entire process');
});