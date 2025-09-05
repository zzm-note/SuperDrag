browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message['flag'] == 'openTable') {
    browser.storage.sync.get({superDrag: _getDefault()}).then(result => {
      const settings = result.superDrag;
      if (settings.tabOpenPos === 'next') {
        browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
          const activeTab = tabs[0];
          if (typeof message['url'] == "string") {
            browser.tabs.create({index: activeTab.index + 1, url: message['url'], openerTabId: activeTab.id, active: message['active']});
          } else {
            for (var i in message['url']) {
              if (message['active'] == true) {
                if (i == 0) {
                  browser.tabs.create({index: activeTab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: activeTab.id, active: message['active']});
                } else {
                  browser.tabs.create({index: activeTab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: activeTab.id, active: false});
                }
              } else {
                browser.tabs.create({index: activeTab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: activeTab.id, active: message['active']});
              }
            }
          }
          sendResponse({status: 'ok'});
        });
      } else { // 'end'
        browser.tabs.query({currentWindow: true}).then(tabs => {
          let currentTab = tabs.find(tab => tab.active === true);
          let showTabs = tabs.filter(tab => tab.url !== 'about:firefoxview');
          if (typeof message['url'] == "string") {
            for (const tab of showTabs.reverse()) {
              if (tab.isArticle == undefined || tab.active == true) {
                browser.tabs.create({index: tab.index + 1, url: message['url'], openerTabId: currentTab.id, active: message['active']});
                sendResponse({status: 'ok'});
                return;
              }
            }
          } else {
            for (const tab of showTabs.reverse()) {
              if (tab.isArticle == undefined || tab.active == true) {
                for (const i in message['url']) {
                  if (message['active'] == true) {
                    if (i == 0) {
                      browser.tabs.create({index: tab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: currentTab.id, active: message['active']});
                    } else {
                      browser.tabs.create({index: tab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: currentTab.id, active: false});
                    }
                  } else {
                    browser.tabs.create({index: tab.index + Number(i) + 1, url: message['url'][i]['url'], openerTabId: currentTab.id, active: message['active']});
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
    browser.downloads.download({
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