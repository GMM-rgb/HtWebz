/**
 * @type {HTMLDivElement?} */
const VideoPlayer = document.getElementById("VideoPlayer");
/**
 * @type {HTMLVideoElement?} */
const VideoFeedPlayback = VideoPlayer.querySelector("#VideoFeedPlaybackView");
/**
 * @type {HTMLSpanElement?} */
const VideoControls = VideoPlayer.querySelector("#VideoPlayerControls span");

/**
 * 
 * @param {numer} seconds 
 * @returns {Promise<string>}
 */
async function formatTimestamp(seconds) {
  // Ensure it's an integer (no long or just no decimals)
  const totalSeconds = Math.floor(seconds);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  // Pad with leading zeros
  const hDisplay = hours > 0 ? String(hours).padStart(2, '0') + ":" : "";
  const mDisplay = String(minutes).padStart(2, '0') + ":";
  const sDisplay = String(secs).padStart(2, '0');

  return hDisplay + mDisplay + sDisplay;
}

window.addEventListener("DOMContentLoaded", () => {
    /**
     * @type {HTMLButtonElement?} */
    let PlayButton = VideoControls.querySelector(".video-playback-toggle");

    VideoFeedPlayback.addEventListener("timeupdate", (e) => {
        e.stopPropagation?.();
        const CurrentTimestamp = Math.floor(e.timeStamp || 0);
        if (CurrentTimestamp !== null) console.log(`Video Timestamp: ${CurrentTimestamp}`); else return;
        formatTimestamp?.(CurrentTimestamp) ?? console.error(`ERROR: Failed to format video timestamp.`);
    });
}, { once: true });
