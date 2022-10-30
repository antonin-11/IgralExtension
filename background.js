
chrome.runtime.onInstalled.addListener(() => { });

chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
      // read changeInfo data and do something with it (like read the url)
      if (changeInfo.url) {
        console.log("tab",tab.url)
      }
    }
);