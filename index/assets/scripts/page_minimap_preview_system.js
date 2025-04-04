let previewMiniMapCanvas = document.getElementById("mapPreviewPageCanvas");

let ctx = previewMiniMapCanvas.getContext("2d");

if (!ctx) {
    return console.error("Failed to get 2D context for the minimap preview canvas.");
}


