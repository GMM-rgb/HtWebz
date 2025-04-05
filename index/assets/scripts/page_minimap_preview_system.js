// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const contentEditor = document.getElementById("content");
    const previewContainer = document.getElementById("pageMappingPreview");

    if (!contentEditor || !previewContainer) {
        console.error('Required elements not found');
        return;
    }

    function createPreviewElement() {
        const preview = document.createElement("div");
        preview.className = "mapPreviewPage";
        previewContainer.appendChild(preview);
        return preview;
    }

    function updatePreview() {
        previewContainer.innerHTML = '';

        const content = contentEditor.innerHTML;
        if (!content) {
            const preview = createPreviewElement();
            preview.innerHTML = '<div style="color: #666;">No content yet...</div>';
            return;
        }

        const pageHeight = 225;
        const tolerance = 20;
        let currentPage = null;  // Start with no page
        let currentContent = '';

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;

        // Only process if there's actual content
        const nodes = Array.from(tempDiv.childNodes).filter(node => 
            (node.outerHTML || node.textContent).trim()
        );

        if (nodes.length === 0) {
            const preview = createPreviewElement();
            preview.innerHTML = '<div style="color: #666;">No content yet...</div>';
            return;
        }

        // Create first page only when we have content to add
        currentPage = createPreviewElement();

        nodes.forEach(node => {
            const nodeContent = node.outerHTML || node.textContent;
            if (!nodeContent.trim()) return;

            // Hidden test element for combined content height
            const testDiv = document.createElement('div');
            testDiv.style.fontSize = '4px';
            testDiv.style.lineHeight = '1.5';
            testDiv.style.whiteSpace = 'pre-wrap';
            testDiv.style.position = 'absolute';
            testDiv.style.visibility = 'hidden';
            testDiv.style.width = previewContainer.clientWidth + 'px';

            testDiv.innerHTML = currentContent + nodeContent;
            previewContainer.appendChild(testDiv);
            const combinedHeight = testDiv.scrollHeight;
            previewContainer.removeChild(testDiv);

            // Always add content to an empty page
            if (currentContent === '') {
                currentContent = nodeContent;
                currentPage.innerHTML = currentContent;
            }
            else if (combinedHeight > pageHeight) {
                // Measure the height of the new node alone
                testDiv.innerHTML = nodeContent;
                previewContainer.appendChild(testDiv);
                const nodeHeight = testDiv.scrollHeight;
                previewContainer.removeChild(testDiv);

                // If node itself is tall, start a new page immediately
                if (nodeHeight >= pageHeight * 0.8) {
                    currentPage.innerHTML = currentContent;
                    currentPage = createPreviewElement();
                    currentContent = nodeContent;
                    currentPage.innerHTML = currentContent;
                }
                else {
                    const diff = combinedHeight - pageHeight;
                    if (diff < tolerance) {
                        currentContent += nodeContent;
                        currentPage.innerHTML = currentContent;
                    } else {
                        currentPage.innerHTML = currentContent;
                        currentPage = createPreviewElement();
                        currentContent = nodeContent;
                        currentPage.innerHTML = currentContent;
                    }
                }
            } else {
                currentContent += nodeContent;
                currentPage.innerHTML = currentContent;
            }
        });

        // Merge last page if too short (e.g. contains only minimal text)
        const pages = previewContainer.getElementsByClassName('mapPreviewPage');
        if (pages.length > 1) {
            const lastPage = pages[pages.length - 1];
            if (lastPage.textContent.trim().length < 10) { // threshold for minimal content
                pages[pages.length - 2].innerHTML += lastPage.innerHTML;
                lastPage.remove();
            }
        }

        Array.from(previewContainer.getElementsByClassName('mapPreviewPage')).forEach(page => {
            page.style.fontSize = '4px';
            page.style.lineHeight = '1.5';
            page.style.whiteSpace = 'pre-wrap';
        });
    }

    contentEditor.addEventListener('input', updatePreview);

    window.renderPreview = updatePreview;
    updatePreview();
});
