function get( url, cbSuccess, cbFail){

  var httpRequest;

  if (window.XMLHttpRequest) {
    httpRequest = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
      try {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e) {}
    }
  }

  if (!httpRequest) {
    console.error('AppStore unable to make an XHR');
    return false;
  }

  httpRequest.onreadystatechange = function(xhr){
    if (httpRequest.readyState === 4) {
      if(httpRequest.status === 200){
        cbSuccess(xhr);
      }else {
        console.error('Unable to fetch apps');
        cbFail && cbFail();
      }
    }
  };

  httpRequest.open('GET', url, /*async*/ true);
  httpRequest.send();
}
