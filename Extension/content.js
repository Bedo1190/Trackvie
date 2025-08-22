// Send page title immediately on load
// Send the page title every 500ms
setInterval(() => {
  chrome.runtime.sendMessage({ type: "page-title", title: document.title });
}, 1000);


function getVideoProgress() {
  const video = document.querySelector("video");
  if (video) {
    return {
      currentTime: video.currentTime,
    };
  }
  return null;
}

function startProgressInterval(video) {
  setInterval(() => {
    if (video) {
      const progress = {
        currentTime: video.currentTime,
      };
      chrome.runtime.sendMessage({ type: "video-progress", progress });
    }
  }, 500);
}

function waitForVideo() {
  const video = document.querySelector("video");
  if (video) {
    startProgressInterval(video);
  } else {
    setTimeout(waitForVideo, 500);
  }
}

window.addEventListener("message", function (event) {
  if (
    event.source !== window ||
    event.data?.source !== "trackvie-webapp" ||
    event.data?.type !== "FIREBASE_TOKEN"
  ) {
  }

  const token = event.data.token;
  const userId = event.data.userId;

  // Relay token to background script
  chrome.runtime.sendMessage({
    type: "SET_FIREBASE_TOKEN",
    token: token,
    userId: userId,
  });
});

waitForVideo();
