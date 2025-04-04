let contentEditor = document.getElementById("content");
const previewContainer = document.getElementById("pageMappingPreview");

// Create preview element if it doesn't exist
if (!document.getElementById("mapPreviewPage")) {
    const preview = document.createElement("div");
    preview.id = "mapPreviewPage";
    previewContainer.appendChild(preview);
}

function updatePreview() {
    const preview = document.getElementById("mapPreviewPage");
    if (!preview) return;

    // Get current file content from localStorage
    const files = JSON.parse(localStorage.getItem('odocsFiles')) || [];
    const fileName = document.getElementById("fileName").value;
    const currentFile = files.find(f => f.name === fileName);

    if (!currentFile || !currentFile.content) {
        preview.textContent = "No content available.";
        return;
    }

    // Set the content directly from localStorage, preserving formatting (HTML tags)
    preview.innerHTML = currentFile.content;

    // Scale the text to fit within the preview boundaries
    const previewWidth = preview.offsetWidth;
    const previewHeight = preview.offsetHeight;

    // Create a temporary element to measure content size
    const tempElement = document.createElement("div");
    tempElement.style.position = "absolute";
    tempElement.style.visibility = "hidden";
    tempElement.style.whiteSpace = "pre-wrap";
    tempElement.style.fontSize = "16px"; // Start with a default font size
    tempElement.innerHTML = preview.innerHTML;
    document.body.appendChild(tempElement);

    // Adjust font size to fit within the preview
    let fontSize = 16; // Default font size
    while (
        (tempElement.offsetWidth > previewWidth || tempElement.offsetHeight > previewHeight) &&
        fontSize > 4 // Minimum font size
    ) {
        fontSize--;
        tempElement.style.fontSize = `${fontSize}px`;
    }

    // Apply the calculated font size to the preview
    preview.style.fontSize = `${fontSize}px`;
    preview.style.whiteSpace = "pre-wrap"; // Ensure line breaks are preserved

    // Clean up the temporary element
    document.body.removeChild(tempElement);
}

// Listen for changes in localStorage and update the preview
window.addEventListener('storage', (e) => {
    if (e.key === 'odocsFiles') {
        updatePreview();
    }
});

// Initial render
document.addEventListener('DOMContentLoaded', updatePreview);

// Expose for external calls
window.renderPreview = updatePreview;
