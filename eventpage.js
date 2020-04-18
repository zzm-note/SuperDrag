chrome.runtime.onMessage.addListener(message => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    const activeTab = tabs[0];
    chrome.tabs.create({index: activeTab.index + 1, url: message['url'], openerTabId: activeTab.id, active: message['active']});
  });
});