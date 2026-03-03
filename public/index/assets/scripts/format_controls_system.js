let closeFormatControls = document.getElementById("closeFormatingControls");
const formatingControls = document.getElementById("formatingControls");

// Add performance optimizations
let lastProcessedContent = '';
let processingTimeout;

function processFormatting(action, callback) {
    if (processingTimeout) {
        clearTimeout(processingTimeout);
    }

    processingTimeout = setTimeout(() => {
        if (document.activeElement === editor) {
            requestAnimationFrame(() => {
                action();
                if (callback) callback();
            });
        }
    }, 10);
}

function optimizedHighlight(color) {
    processFormatting(() => {
        document.execCommand('styleWithCSS', false, true);
        document.execCommand('hiliteColor', false, color);
    }, () => editor.focus());
}

function optimizedRemoveHighlight() {
    processFormatting(() => {
        document.execCommand('styleWithCSS', false, true);
        document.execCommand('hiliteColor', false, 'transparent');
        
        // Batch DOM cleanup
        requestAnimationFrame(() => {
            const emptySpans = editor.querySelectorAll('span:empty:not(:contains(\u200B))');
            const fragment = document.createDocumentFragment();
            emptySpans.forEach(span => span.remove());
        });
    });
}

function waitFormatControls(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

closeFormatControls.onclick = () => {
    if (formatingControls.style.display === "flex" || formatingControls.style.display === "") {
        formatingControls.classList.add("fadeOutAnimationFormater");
        waitFormatControls(650).then(() => {
            formatingControls.classList.remove("fadeOutAnimationFormater");
            formatingControls.style.display = "none";
        });
    }
}
