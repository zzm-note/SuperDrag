chrome.extension.onMessage.addListener(message => {
  if (message['flag'] == 'openTable') {
    chrome.tabs.getAllInWindow(tabs => {
      // console.log(tabs)
      // console.log(message);
      let curTab
      if (typeof message['url'] == "string") {
        for (const tab of tabs.reverse()) {
          if (tab.hasOwnProperty("openerTabId") || tab.active == true) {
            chrome.tabs.create({index: tab.index + 1, url: message['url'], openerTabId: tab.id, active: message['active']});
            return;
          }
        }
      } else {
        for (const tab of tabs.reverse()) {
          if (tab.hasOwnProperty("openerTabId") || tab.active == true) {
            for (const i in message['url']){
              if (message['active'] == true){
                if (i == 0){
                  chrome.tabs.create({ index: tab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: tab.id, active: message['active'] });
                } else {
                  chrome.tabs.create({ index: tab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: tab.id, active: false });
                }
              } else {
                chrome.tabs.create({ index: tab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: tab.id, active: message['active'] });
              }
            }
            return;
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