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
        let currentPage = createPreviewElement();
        let currentContent = '';

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;

        Array.from(tempDiv.childNodes).forEach(node => {
            const nodeContent = node.outerHTML || node.textContent;
            if (!nodeContent.trim()) return;

            const testDiv = document.createElement('div');
            testDiv.innerHTML = currentContent + nodeContent;
            currentPage.innerHTML = testDiv.innerHTML;

            if (currentPage.scrollHeight > pageHeight) {
                currentPage.innerHTML = currentContent;
                currentPage = createPreviewElement();
                currentPage.innerHTML = nodeContent;
                currentContent = nodeContent;
            } else {
                currentContent += nodeContent;
            }
        });

        if (currentContent) {
            currentPage.innerHTML = currentContent;
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
