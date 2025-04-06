// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const contentEditor = document.getElementById("content");
    const previewContainer = document.getElementById("pageMappingPreview");
  
    if (!contentEditor || !previewContainer) {
      console.error('Required elements not found');
      return;
    }
  
    // Creates and appends a new page element to the preview container.
    function createPreviewElement() {
      const preview = document.createElement("div");
      preview.className = "mapPreviewPage";
      // Rely on stylesheet for fonts and other styles;
      // Only enforce pre-wrapping so that newline characters are rendered.
      preview.style.whiteSpace = 'pre-wrap';
      previewContainer.appendChild(preview);
      return preview;
    }
  
    // Measures the rendered height of given HTML content by inserting it into a hidden container.
    function measureContentHeight(htmlContent) {
      const testDiv = document.createElement('div');
      testDiv.className = 'mapPreviewPage';
      testDiv.style.position = 'absolute';
      testDiv.style.visibility = 'hidden';
      testDiv.style.width = previewContainer.clientWidth + 'px';
      testDiv.innerHTML = htmlContent;
      document.body.appendChild(testDiv);
      const height = testDiv.scrollHeight;
      document.body.removeChild(testDiv);
      return height;
    }
  
    // After rendering, attach one-time image load listeners to update the preview when images finish loading.
    function addImageLoadListeners() {
      const imgs = previewContainer.getElementsByTagName('img');
      Array.from(imgs).forEach(img => {
        if (!img.complete) {
          img.addEventListener('load', () => {
            // Delay a little to allow the image to settle.
            setTimeout(updatePreview, 50);
          }, { once: true });
        }
      });
    }
  
    // Splits text nodes by newline characters so that 'Enter' keys are respected.
    function splitNodeOnNewlines(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const lines = node.textContent.split(/\n/);
        if (lines.length > 1) {
          return lines.map((line, index) => {
            if (line.trim() === '') {
              // When a line is empty, return a <br> element to maintain the line break.
              return document.createElement('br');
            } else {
              // Wrap the line in a span and add a br if it isn’t the last segment.
              const span = document.createElement('span');
              span.textContent = line;
              if (index < lines.length - 1) {
                span.appendChild(document.createElement('br'));
              }
              return span;
            }
          });
        }
        return [node];
      } else {
        return [node];
      }
    }
  
    // Removes blank pages from the end of the preview.
    // This only removes pages that are truly empty (no visible innerText)
    // and does not merge or remove any blank pages if there's subsequent content.
    function removeTrailingBlankPages() {
      const pages = previewContainer.getElementsByClassName('mapPreviewPage');
      let pagesArray = Array.from(pages);
      while (pagesArray.length > 1) {
        const lastPage = pagesArray[pagesArray.length - 1];
        // Only remove if the final page has no visible text.
        if (lastPage.innerText.trim().length === 0) {
          lastPage.remove();
          pagesArray.pop();
        } else {
          break;
        }
      }
    }
  
    // Main function that paginates content from the editor into preview pages.
    function updatePreview() {
      previewContainer.innerHTML = '';
      let content = contentEditor.innerHTML.trim();
      if (!content) {
        const preview = createPreviewElement();
        preview.innerHTML = '<div style="color: #666;">No content yet...</div>';
        return;
      }
  
      const pageHeight = 225; // Maximum content height per page (in pixels)
      const tolerance = 20;   // Acceptable overflow in pixels
      let currentPage = createPreviewElement();
      let currentContent = '';
  
      // Create a temporary container for processing the content.
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
  
      // Retrieve the nodes and further split any text nodes on newline characters.
      let originalNodes = Array.from(tempDiv.childNodes);
      let nodes = [];
      originalNodes.forEach(node => {
        nodes.push(...splitNodeOnNewlines(node));
      });
  
      // Filter out nodes that are empty.
      nodes = nodes.filter(node => {
        const nodeContent = node.outerHTML || node.textContent;
        return nodeContent.trim().length > 0;
      });
  
      if (nodes.length === 0) {
        const preview = createPreviewElement();
        preview.innerHTML = '<div style="color: #666;">No content yet...</div>';
        return;
      }
  
      // Process each node sequentially.
      nodes.forEach(node => {
        const nodeContent = node.outerHTML || node.textContent;
        if (!nodeContent.trim()) return;
  
        // If the current page is empty, initialize it with this node.
        if (currentContent === '') {
          currentContent = nodeContent;
          currentPage.innerHTML = currentContent;
          return;
        }
  
        // Append the node's content and measure if it exceeds the page threshold.
        const combinedContent = currentContent + nodeContent;
        const combinedHeight = measureContentHeight(combinedContent);
  
        if (combinedHeight > pageHeight) {
          // Measure the new node individually.
          const nodeHeight = measureContentHeight(nodeContent);
          if (nodeHeight >= pageHeight * 0.8) {
            // If the new node is tall on its own, finalize the current page and start a new one.
            currentPage.innerHTML = currentContent;
            currentPage = createPreviewElement();
            currentContent = nodeContent;
            currentPage.innerHTML = currentContent;
          } else {
            // If the combined content only slightly exceeds pageHeight, allow it;
            // otherwise, start a new page.
            const diff = combinedHeight - pageHeight;
            if (diff < tolerance) {
              currentContent = combinedContent;
              currentPage.innerHTML = currentContent;
            } else {
              currentPage.innerHTML = currentContent;
              currentPage = createPreviewElement();
              currentContent = nodeContent;
              currentPage.innerHTML = currentContent;
            }
          }
        } else {
          currentContent = combinedContent;
          currentPage.innerHTML = currentContent;
        }
      });
  
      // Remove any trailing blank page—if a blank page occurs between pages, it will remain.
      removeTrailingBlankPages();
  
      addImageLoadListeners();
    }
  
    contentEditor.addEventListener('input', updatePreview);
    window.renderPreview = updatePreview;
    updatePreview();
  });
