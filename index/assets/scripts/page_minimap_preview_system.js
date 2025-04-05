let contentEditor = document.getElementById("content");
const previewContainer = document.getElementById("pageMappingPreview");

function createPreviewElement() {
    const preview = document.createElement("div");
    preview.className = "mapPreviewPage";
    previewContainer.appendChild(preview);
    return preview;
}

function updatePreview() {
    previewContainer.innerHTML = '';

    const files = JSON.parse(localStorage.getItem('odocsFiles')) || [];
    const fileName = document.getElementById("fileName").value;
    const currentFile = files.find(f => f.name === fileName);

    if (!currentFile || !currentFile.content) {
        const preview = createPreviewElement();
        preview.innerHTML = '<div style="color: #666;">No content yet...</div>';
        return;
    }

    const pageHeight = 225; // Height from CSS
    let pages = [];
    let currentPage = createPreviewElement();
    pages.push(currentPage);

    // Process the content
    const cleanContent = currentFile.content
        .replace(/undefined/g, '')
        .replace(/(<div><br><\/div>|<div><\/div>)/g, '<br>')
        .replace(/\n/g, '<br>');

    // Split content into elements
    const contentHolder = document.createElement('div');
    contentHolder.innerHTML = cleanContent;
    
    let currentContent = '';
    Array.from(contentHolder.childNodes).forEach(node => {
        const nodeContent = node.outerHTML || node.textContent || '';

        // Temporarily add the node to test if it fits
        currentPage.innerHTML = currentContent + nodeContent;

        if (currentPage.scrollHeight > pageHeight && currentContent !== '') {
            // Check if the node is an image or block element
            if (node.tagName === 'IMG' || window.getComputedStyle(node).display === 'block') {
                // Move the entire node to the next page
                currentPage.innerHTML = currentContent;
                currentPage = createPreviewElement();
                pages.push(currentPage);
                currentContent = nodeContent;
                currentPage.innerHTML = currentContent;
            } else {
                // Split text content at the best possible point
                const words = nodeContent.split(' ');
                let tempContent = currentContent;
                let remainingContent = '';

                for (let i = 0; i < words.length; i++) {
                    tempContent += words[i] + ' ';
                    currentPage.innerHTML = tempContent;

                    if (currentPage.scrollHeight > pageHeight) {
                        // Ensure at least one word remains on the current page
                        if (i === 0) {
                            tempContent = currentContent;
                            remainingContent = nodeContent;
                        } else {
                            // Remove the last word and break
                            tempContent = tempContent.trimEnd().slice(0, tempContent.lastIndexOf(' '));
                            remainingContent = words.slice(i).join(' ');
                        }
                        break;
                    }
                }

                currentPage.innerHTML = tempContent;
                currentPage = createPreviewElement();
                pages.push(currentPage);
                currentContent = remainingContent;
                currentPage.innerHTML = currentContent;
            }
        } else {
            currentContent += nodeContent;
        }
    });

    // Ensure all pages are properly styled
    pages.forEach(page => {
        const elements = page.getElementsByTagName('*');
        Array.from(elements).forEach(element => {
            if (element.style) {
                element.style.fontSize = '4px';
                if (element.style.backgroundColor) {
                    element.style.padding = '0 2px';
                }
            }
        });
    });
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
