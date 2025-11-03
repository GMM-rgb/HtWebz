import { JSON_wiki_data } from "./modules/parse_json_data";
const contentFrame = document.getElementById("wiki-content-frame");

function generateWikiTopicOverview() {
    if (!contentFrame || !(contentFrame instanceof HTMLDivElement || HTMLElement)) return;

    
}

if (JSON_wiki_data) window.addEventListener("DOMContentLoaded", generateWikiTopicOverview);
