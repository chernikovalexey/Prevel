/* Module: Ajax.js
 * Requirements: Core.js
**/

(function() {
  
  pl.extend({
    // Convert object to a 'param-string'
    toParams: function(o) {
      var pieces = [];
      for(var key in o) {
        pieces.push(
          encodeURIComponent(key) + '=' + encodeURIComponent(o[key])
        );
      }
      return pieces.join('&');
    },
    
    ajax: function(params) {
      var Request;
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
          pl.error('Could not create a XMLHttpRequest instance.');
        }
        
        // Fix related with `attachEvent`
        Request.onreadystatechange = function(e) {
          if(Request.readyState === 1) {
            (params.load || ef)();
          } else if(Request.readyState === 4) {
            if(Request.status > 199 && Request.status < 300) {
              (params.success || ef)(
                params.dataType === 'json' ? // Parse JSON if necessary
                  pl.JSON(Request.responseText) : 
                  Request.responseText,
                Request.status
              );
            } else {
              (params.error || ef)(Request.status, Request.responseText);
            }
          }
          
          params.always = params.always || ef;
          
          try {
            params.always(Request.readyState, Request.status, Request.responseText);
          } catch(e) {
            params.always(Request.readyState);
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
      
      params.data  = pl.toParams(params.data || {});
      params.async = params.async || true;
      requestPrepare();
      
      if(params.type === 'POST') {
        Request.open('POST', params.url, params.async);
        headers(1);
        Request.send(params.data);
      } else {
        Request.open('GET', params.url + '?' + params.data, params.async);
        headers();
        Request.send(n);
      }
    }
  });
  
})();