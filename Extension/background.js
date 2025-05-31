chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "get-url") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ url: tabs[0].url });
    });

    // Required to keep the message channel open for sendResponse
    return true;
  }
});
