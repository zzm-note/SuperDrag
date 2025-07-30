browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message['flag'] == 'openTable') {
    browser.tabs.query({currentWindow: true}, tabs => {
      // console.log(tabs)
      // console.log(message);
      let showTabs = tabs.filter(tab => tab.title !== 'Firefox View');
      if (typeof message['url'] == "string") {
        for (const tab of showTabs.reverse()) {
          if (tab.isArticle == undefined || tab.active == true) {
            browser.tabs.create({index: tab.index + 1, url: message['url'], active: message['active']});
            return;
          }
        }
      } else {
        for (const tab of showTabs.reverse()) {
          if (tab.isArticle == undefined || tab.active == true) {
            for (const i in message['url']){
              if (message['active'] == true){
                if (i == 0){
                  browser.tabs.create({ index: tab.index + Number(i) + 1, url: message['url'][i]['url'], active: message['active'] });
                } else {
                  browser.tabs.create({ index: tab.index + Number(i) + 1, url: message['url'][i]['url'], active: false });
                }
              } else {
                browser.tabs.create({ index: tab.index + Number(i) + 1, url: message['url'][i]['url'], active: message['active'] });
              }
            }
            return;
          }
        }
      }
    });
  } else if (message['flag'] == 'download') {
    browser.downloads.download({
      url: message['url'],
      saveAs: message['saveAs']
    },function(downloadId) {
        console.log(downloadId);
    });
  }
  sendResponse({status: 'ok'});
});