function getVideoProgress() {
  const video = document.querySelector("video");
  if (video) {
    return {
      currentTime: video.currentTime,
      duration: video.duration,
    };
  }
  return null;
}

function startProgressInterval(video) {
  setInterval(() => {
    if (video) {
      const progress = {
        currentTime: video.currentTime,
        duration: video.duration,
      };
      //console.log("[content.js] Sending progress:", progress);
      chrome.runtime.sendMessage({ type: "video-progress", progress });
    }
  }, 500);
}

function waitForVideo() {
  const video = document.querySelector("video");
  if (video) {
    //console.log("[content.js] Video found, starting progress tracking.");
    startProgressInterval(video);
  } else {
    //console.log("[content.js] Waiting for video element...");
    setTimeout(waitForVideo, 500);
  }
}

waitForVideo(); // Initial call
