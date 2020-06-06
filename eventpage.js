chrome.runtime.onMessage.addListener(message => {
  if (message['flag'] == 'openTable') {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const activeTab = tabs[0];
      chrome.tabs.create({ index: activeTab.index + 1, url: message['url'], openerTabId: activeTab.id, active: message['active'] });
    });
  } else if (message['flag'] == 'download') {
    chrome.downloads.download({
      url: message['url'],
    },function(downloadId) {
        console.log(downloadId);
    });
  }
});