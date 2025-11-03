const params = new URLSearchParams(window.location.search);
const topic = params.get("topic");

let detectedTopic = null;

// Uses topic to load content, highlight section, or redirect
if (topic && (typeof topic === "string")) {
    if (topic) {
        console.log("Requested topic:", topic);
    } else {
        console.warn("There was no requested topic.");
    }
    if (detectedTopic === null) {
        detectedTopic = topic;
    }
} else {
    console.error("No Topic data, or topic was invalid.");
}
