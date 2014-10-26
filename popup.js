var base = 'https://www.assembla.com';

var Mentions = {
  url: base + '/user/mentions',
  count: 0,

  log: function(obj){
    var div = document.createElement('div');
    div.innerHTML = obj;
    document.body.appendChild(div);
  },

  load: function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", Mentions.url + '.json', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var mentions = JSON.parse(xhr.responseText);
        Mentions.render(mentions);
      }
    }
    xhr.send();
  },

  render: function(mentions){
    Mentions.count = mentions.length;
    Mentions.setBadge();    

    var html = "";
    for (var i = 0; i < mentions.length; i++) {   
      html += "<div class='item'>";
      html += "<img src='" + base + mentions[i].user.picture + "' />";
      html += "<div class='username'>" + mentions[i].user.name + "</div>";
      html += "<div class='mention'>";
      html += "<a class='mention' href='" + Mentions.url + "/" + mentions[i].id + "'>" + mentions[i].message;
      if(mentions[i].message.length > 150) html += "...";
      html += "</a></div>";
      html += "</div>";
    }

    if(html == "") html = "<div class='username'>Hooray, you've read all your mentions!</div>";
    Mentions.log(html);

    Mentions.setLinks();
  },

  setBadge: function(){
    var text = Mentions.count > 0 ? '' + Mentions.count : '';
    chrome.browserAction.setBadgeText({text: text});
  },

  setLinks: function(){
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      (function () {
        var ln = links[i];
        var location = ln.href;
        ln.onclick = function () {
          Mentions.count -= 1;
          Mentions.setBadge();
          chrome.tabs.create({active: true, url: location});
        };
      })();
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  Mentions.load();
});
