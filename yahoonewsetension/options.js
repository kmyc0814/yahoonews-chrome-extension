'use strict';
document.getElementById('Export').addEventListener('click', function() {
//エクスポート機能入れる
chrome.storage.sync.get(null, function(items) { // null implies all items

  var jsonstr = JSON.stringify(items);
  var blob = new Blob([jsonstr], {type: "text/plain"});
  var url = URL.createObjectURL(blob);
  chrome.downloads.download({
  url: url, // The object URL can be used as download URL
  filename: "yahoonews_extension_log/yourrecord.path"
  //...
  });
});
});
