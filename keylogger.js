document.addEventListener("keyup", function(e) {
  chrome.runtime.sendMessage({keyCode: e.keyCode});
});
