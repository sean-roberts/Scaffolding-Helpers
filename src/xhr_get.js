
/**
  Simple GET AJAX function

  url = the url to send the GET request
  options = (optional) object to discern what to do with the request
    options.type === 'json' will have the response JSON.parse()'d
  cbSuccess = the success callback will be passed the response or parsed data
  cbFail = (optional) the callback for a failure in sending the request
*/

function get( url, options, cbSuccess, cbFail){

  // Check for optional options object
  // and fix argument assignment if it is omitted
  if( typeof options === 'function' ){
    cbFail = cbSuccess;
    cbSuccess = options;
    options = {};
  }

  var httpRequest;

  if (window.XMLHttpRequest) {
    httpRequest = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
      }catch (ev) { }
    }
  }

  if (!httpRequest) {
    console.error('Unable to make an XHR');
    return false;
  }

  httpRequest.onreadystatechange = function(xhr){
    if (httpRequest.readyState === 4) {
      if(httpRequest.status === 200){
        cbSuccess( options.type === 'json' ? JSON.parse(xhr) : xhr);
      }else {
        console.error('Unable to fetch apps');
        if(cbFail){
          cbFail();
        }
      }
    }
  };

  httpRequest.open('GET', url, /*async*/ true);
  httpRequest.send();
}
