import { JSON_wiki_data, LoadJSON } from "./modules/parse_json_data";
const contentFrame = document.getElementById("wiki-content-frame");

let Retryed = false;

function generateWikiTopicOverview() {
    if (!contentFrame || !(contentFrame instanceof HTMLDivElement || HTMLElement)) return;

    if (JSON_wiki_data) {
        try {

        } catch (GenerationError) {
            console.error("ERROR: Wiki Generation Output Failed.\t", GenerationError);
            if (!Retryed && (typeof LoadJSON === "function")) {
                JSON_wiki_data = LoadJSON?.();
                generateWikiTopicOverview();
                Retryed = true;
            } else {
                return false;
            }
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {
    let Generation_Sucess = generateWikiTopicOverview?.() ? JSON_wiki_data : console.warn("JSON Wiki Data was null.");
    if (Generation_Sucess) {
        console.log("Gen Success.");
    }
});
