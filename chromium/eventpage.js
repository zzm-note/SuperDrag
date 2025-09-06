chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message['flag'] == 'openTable') {
    chrome.storage.sync.get({superDrag: {tabOpenPosition: 0}}, function(result) {
      const tabOpenPosition = result.superDrag.tabOpenPosition || 0;
      chrome.tabs.query({currentWindow: true}, tabs => {
        // 查找参考标签页：优先找有 openerTabId 的，否则找当前激活的
        const referenceTab = tabs.find(tab => tab.hasOwnProperty("openerTabId")) || 
                             tabs.find(tab => tab.active);
        
        if (!referenceTab) {
          console.error('未找到参考标签页');
          return;
        }

        if (typeof message['url'] == "string") {
          // 单个URL处理
          const index = tabOpenPosition === 0 ? referenceTab.index + 1 : undefined;
          chrome.tabs.create({
            index: index, 
            url: message['url'], 
            openerTabId: referenceTab.id, 
            active: message['active']
          }).catch(err => console.error('创建标签页失败:', err));
        } else {
          // 多个URL处理
          for (let i = 0; i < message['url'].length; i++) {
            const index = tabOpenPosition === 0 ? referenceTab.index + i + 1 : undefined;
            const active = message['active'] ? (i === 0) : message['active'];
            
            chrome.tabs.create({
              index: index,
              url: message['url'][i]['url'],
              openerTabId: referenceTab.id,
              active: active
            }).catch(err => console.error('创建标签页失败:', err));
          }
        }
      });
    });
  } else if (message['flag'] == 'download') {
    chrome.downloads.download({
      url: message['url'],
      saveAs: message['saveAs']
    },function(downloadId) {
        console.log(downloadId);
    });
  }
  sendResponse({status: 'ok'});
});