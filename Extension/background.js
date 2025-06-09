let latestProgress = null;
let latestTitle = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "video-progress") {
    latestProgress = message.progress;
  }

  if (message.type === "page-title") {
    latestTitle = message.title;
  }

  if (message.type === "get-url") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ url: tabs[0].url });
    });
    return true;
  }

  if (message.type === "get-video-progress") {
    sendResponse({ progress: latestProgress });
    return true;
  }

  if (message.type === "get-page-info") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ 
        title: latestTitle || "",
        url: tabs[0].url || "",
      });
    });
    return true;
  }
  if (message.type === "SET_FIREBASE_TOKEN") {
    chrome.storage.local.set({ userToken: message.token, userId: message.userId}, () => {
      console.log("Token saved to chrome.storage");
    });
    return true;
  }
});
