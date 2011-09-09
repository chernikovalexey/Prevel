/* Module: Ajax.js
 * Requirements: Core.js
 * Provides: Ajax.
 * 
 * Dual licensed under the:
 *  - GNU LGPL (http://opensource.org/licenses/lgpl-license.php)
 *  - MIT License (http://opensource.org/licenses/mit-license.php)
**/

(function() {
  pl.extend({
    ajax: function(params) {
      var Request,
          load    = params.load || ef,
          error   = params.error || ef,
          success = params.success || ef;
            
      var requestPrepare = function() {
        if(win.XMLHttpRequest) { // Modern browsers
          Request = new XMLHttpRequest();
          
          if(Request.overrideMimeType) {
            Request.overrideMimeType('text/html');
          }
        } else if(win.ActiveXObject) { // Obsolete IE
          try {
            Request = new ActiveXObject('Msxml2.XMLHTTP');
          } catch(e) {
            try {
              Request = new ActiveXObject('Microsoft.XMLHTTP');
            } catch(er) {}
          }
        }
        
        if(!Request) {
          return alert('Could not create an XMLHttpRequest instance.');
        }
        
        // Fix related with `attachEvent`
        Request.onreadystatechange = function(e) {
          switch(Request.readyState) {
            case 1: load();
              break;
            case 4:
              if(Request.status === 200) {
                success(
                  params.dataType === 'json' ? // Parse JSON if necessary
                    pl.JSON(Request.responseText) : 
                    Request.responseText
                );
              } else {
                error(Request.status);
              }
              break;
          }
        };
      };
      
      // Common headers
      var headers = function(type) {
        // To identify that it's XHR
        Request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        
        if(type) {
          Request.setRequestHeader(
            'Content-type', 
            'application/x-www-form-urlencoded; charset=' + 
            (params.charset || 'utf-8')
          );
        }
      };
      
      params.type  = params.type || 'POST';
      params.data  = pl.toParams(params.data || {});
      params.async = params.async || true;
      
      requestPrepare();
      
      switch(params.type) {
        case 'POST':
          Request.open('POST', params.url, params.async);
          headers(1);
          Request.send(params.data);
          break;
        case 'GET':
          Request.open('GET', params.url + '?' + params.data, params.async);
          headers();
          Request.send(n);
          break;
      }
    }
  });
})();