/**
 * @type {HTMLDivElement?} */
const VideoPlayer = document.getElementById("VideoPlayer");
/**
 * @type {HTMLVideoElement?} */
const VideoFeedPlayback = VideoPlayer.querySelector("#VideoFeedPlaybackView");
/**
 * @type {HTMLSpanElement?} */
const VideoControls = VideoPlayer.querySelector("#VideoPlayerControls:nth-child(1)");

window.addEventListener("DOMContentLoaded", () => {
    /**
     * @type {HTMLButtonElement?} */
    let PlayButton = VideoControls.querySelector(".video-playback-toggle");

    VideoFeedPlayback.addEventListener("timeupdate", (e) => {
        e.stopPropagation();
        const CurrentTimestamp = e.timeStamp || 0;
    });
}, { once: true });
