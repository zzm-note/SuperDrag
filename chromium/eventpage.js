chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message['flag'] == 'openTable') {
    // 使用后台脚本原始的、正确的方式获取设置，并提供默认值
    chrome.storage.sync.get({superDrag: {tabOpenPosition: 0}}, function(result) {
      const tabOpenPosition = (result.superDrag && result.superDrag.tabOpenPosition) || 0;
      
      // 核心修正：直接使用 sender.tab 作为最可靠的参考
      const referenceTab = sender.tab;
      
      if (!referenceTab) {
        console.error('SuperDrag: 无法获取源标签页.');
        return;
      }

      const createInRight = tabOpenPosition === 0;

      if (typeof message['url'] === "string") {
        // 单个URL处理
        let createData = {
          url: message['url'],
          active: message['active'],
          openerTabId: referenceTab.id
        };
        if (createInRight) {
          createData.index = referenceTab.index + 1;
        }
        chrome.tabs.create(createData);

      } else if (Array.isArray(message['url'])) {
        // 多个URL处理
        message['url'].forEach((item, i) => {
          let createData = {
            url: item.url,
            active: message['active'] ? (i === 0) : false,
            openerTabId: referenceTab.id
          };
          if (createInRight) {
            createData.index = referenceTab.index + 1 + i;
          }
          chrome.tabs.create(createData);
        });
      }
    });
    // 异步响应需要返回 true
    return true;
  } else if (message['flag'] == 'download') {
    chrome.downloads.download({
      url: message['url'],
      saveAs: message['saveAs']
    });
  }
  sendResponse({status: 'ok'});
});