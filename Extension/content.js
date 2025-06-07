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

waitForVideo();
