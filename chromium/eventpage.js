chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message['flag'] == 'openTable') {
    chrome.storage.sync.get({superDrag: _getDefault()}, function (result) {
      const settings = result.superDrag;
      if (settings.tabOpenPos === 'next') {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
          const activeTab = tabs[0];
          if (typeof message['url'] == "string") {
            chrome.tabs.create({index: activeTab.index + 1, url: message['url'], openerTabId: activeTab.id, active: message['active']});
          } else {
            for (var i in message['url']) {
              if (message['active'] == true) {
                if (i == 0) {
                  chrome.tabs.create({index: activeTab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: activeTab.id, active: message['active']});
                } else {
                  chrome.tabs.create({index: activeTab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: activeTab.id, active: false});
                }
              } else {
                chrome.tabs.create({index: activeTab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: activeTab.id, active: message['active']});
              }
            }
          }
          sendResponse({status: 'ok'});
        });
      } else { // 'end'
        chrome.tabs.query({currentWindow: true}, tabs => {
          if (typeof message['url'] == "string") {
            for (const tab of tabs.reverse()) {
              if (tab.hasOwnProperty("openerTabId") || tab.active == true) {
                chrome.tabs.create({index: tab.index + 1, url: message['url'], openerTabId: tab.id, active: message['active']});
                sendResponse({status: 'ok'});
                return;
              }
            }
          } else {
            for (const tab of tabs.reverse()) {
              if (tab.hasOwnProperty("openerTabId") || tab.active == true) {
                for (const i in message['url']) {
                  if (message['active'] == true) {
                    if (i == 0) {
                      chrome.tabs.create({index: tab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: tab.id, active: message['active']});
                    } else {
                      chrome.tabs.create({index: tab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: tab.id, active: false});
                    }
                  } else {
                    chrome.tabs.create({index: tab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: tab.id, active: message['active']});
                  }
                }
                sendResponse({status: 'ok'});
                return;
              }
            }
          }
          sendResponse({status: 'ok'});
        });
      }
    });
    return true; // Indicates async response
  } else if (message['flag'] == 'download') {
    chrome.downloads.download({
      url: message['url'],
      saveAs: message['saveAs']
    }, function (downloadId) {
      console.log(downloadId);
      sendResponse({status: 'ok'});
    });
    return true; // Indicates async response
  }
  sendResponse({status: 'ok'});
});