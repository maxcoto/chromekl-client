function load() {
  
  console.log('invoked');

  var xhr = new XMLHttpRequest();
  xhr.open("GET", 'https://www.assembla.com/user/mentions.json', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var mentions = JSON.parse(xhr.responseText);
      var text = mentions.length > 0 ? '' + mentions.length : '';
      chrome.browserAction.setBadgeText({text: text});
    }
  }
  xhr.send();
};

chrome.runtime.onStartup.addListener(function(){ load(); });
chrome.runtime.onInstalled.addListener(function(){ load(); });

chrome.alarms.create("checkServer", { delayInMinutes: 1, periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "checkServer") load();
});


