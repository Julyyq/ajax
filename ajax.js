var httpClient = function(method, url, params, callbacks) {
  // arguments handling
  var length = arguments.length;
  var paramsFilter = function(paramsObject) {
    method = paramsObject.method;
    url = paramsObject.url;
    params = paramsObject.params;
    callbacks = {success: paramsObject.success, fail: paramsObject.fail};
  }
  if(length==3) {
    if(params.success || params.fail) {
      paramsFilter({method: method, url: url, params: "", callbacks: params});
    }
    else {
      paramsFilter({method: method, url: url, params: params, callbacks: {success: undefined, fail: undefined}});
    }
  }
  //url handling
  if(method == "GET" && (params!="" && params!=undefined)) {
    var postFix = "?";
    for (var p in params) {
      postFix += (p+"="+params[p]+"&");
    }
    postFix = postFix.replace(/&$/, "");
    url += (postFix=="?"?"":postFix);
  }
  // params handling
  if(method == "POST" && (params!="" && params!=undefined)) {
    var paramsString = "";
    for (var p in params) {
      paramsString += (p+"="+params[p]+"&");
    }
    paramsString = paramsString.replace(/&$/, "");
    params = paramsString;
  }
  // initialize
  var ajax = new XMLHttpRequest();
  // open
  ajax.open(method, url, true);
  // set http headers
  ajax.setRequestHeader("Content-Type", "application/json"); // send data type
  ajax.setRequestHeader("Accept", "application/json"); // accept data type
  // callbacks
  ajax.onreadystatechange = function() {
    if(ajax.readyState==4) {
      if(ajax.status==200) {
        callbacks.success && callbacks.success(ajax.responseText);
      }
      else {
        callbacks.fail && callbacks.fail(ajax.responseText);
      }
    }
  }
  // send
  ajax.send(params);
}
