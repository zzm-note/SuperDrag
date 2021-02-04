chrome.extension.onMessage.addListener(message => {
  if (message['flag'] == 'openTable') {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const activeTab = tabs[0];
      if (typeof message['url'] == "string"){
        chrome.tabs.create({ index: activeTab.index + 1, url: message['url'], openerTabId: activeTab.id, active: message['active'] });
      }  else {
        // message['url'].reverse();
        for (var i in message['url']){
          if (message['active'] == true){
            if (i == 0){
              chrome.tabs.create({ index: activeTab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: activeTab.id, active: message['active'] });
            } else {
              chrome.tabs.create({ index: activeTab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: activeTab.id, active: false });
            }
          } else {
            chrome.tabs.create({ index: activeTab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: activeTab.id, active: message['active'] });
          }
        }
      }
    });
  } else if (message['flag'] == 'download') {
    chrome.downloads.download({
      url: message['url'],
      saveAs: message['saveAs']
    },function(downloadId) {
        console.log(downloadId);
    });
  }
});