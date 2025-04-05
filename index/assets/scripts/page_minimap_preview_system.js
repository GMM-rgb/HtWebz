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
        if (!previewContainer) return;
        
        previewContainer.innerHTML = '';
        
        const content = contentEditor.innerHTML;
        if (!content) {
            const preview = createPreviewElement();
            preview.innerHTML = '<div style="color: #666;">No content yet...</div>';
            return;
        }

        const pageHeight = 225;
        let currentPage = createPreviewElement();
        let currentContent = '';

        // Process content in chunks
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        
        Array.from(tempDiv.childNodes).forEach(node => {
            const nodeContent = node.outerHTML || node.textContent;
            
            // Skip empty nodes
            if (!nodeContent.trim()) return;
            
            // Test if content fits current page
            const testContent = currentContent + nodeContent;
            currentPage.innerHTML = testContent;
            
            if (currentPage.scrollHeight > pageHeight && currentContent) {
                // Create new page if content overflows
                currentPage.innerHTML = currentContent;
                currentPage = createPreviewElement();
                currentContent = nodeContent;
                currentPage.innerHTML = currentContent;
            } else {
                currentContent = testContent;
            }
        });

        // Apply styling to preview content
        const pages = previewContainer.getElementsByClassName('mapPreviewPage');
        Array.from(pages).forEach(page => {
            const elements = page.getElementsByTagName('*');
            Array.from(elements).forEach(element => {
                if (element.style) {
                    element.style.fontSize = '4px';
                }
            });
        });
    }

    // Add real-time update handlers
    let updateTimeout;
    const updateDelay = 100;

    contentEditor.addEventListener('input', () => {
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(updatePreview, updateDelay);
    });

    contentEditor.addEventListener('load', (e) => {
        if (e.target.tagName === 'IMG') {
            updatePreview();
        }
    }, true);

    // Initial preview
    updatePreview();

    // Make preview update function globally available
    window.renderPreview = updatePreview;
});
