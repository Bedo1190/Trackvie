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

// Send video progress to background or popup
setInterval(() => {
  const progress = getVideoProgress();
  if (progress) {
    chrome.runtime.sendMessage({ type: "video-progress", progress });
  }
}, 5000); // every 5 seconds
