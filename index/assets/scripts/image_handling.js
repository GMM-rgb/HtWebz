// Image handling system
function initializeImageHandling(editor) {
    editor.addEventListener('click', handleImageClick);
    
    function handleImageClick(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            e.stopPropagation();
            setupImageControls(e.target);
        } else if (!e.target.closest('.img-wrapper')) {
            removeAllImageControls();
        }
    }

    function setupImageControls(img) {
        removeAllImageControls();
        
        const wrapper = document.createElement('div');
        wrapper.className = 'img-wrapper';
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);

        addResizeHandles(wrapper, img);
        addBorderControls(wrapper, img);
    }

    function addResizeHandles(wrapper, img) {
        ['nw', 'ne', 'sw', 'se'].forEach(pos => {
            const handle = document.createElement('div');
            handle.className = `resize-handle ${pos}`;
            wrapper.appendChild(handle);

            handle.onmousedown = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = img.offsetWidth;
                const startHeight = img.offsetHeight;
                const ratio = startWidth / startHeight;
                
                function onMouseMove(moveEvent) {
                    moveEvent.preventDefault();
                    const dx = moveEvent.clientX - startX;
                    const dy = moveEvent.clientY - startY;

                    let newWidth = startWidth;
                    let newHeight = startHeight;

                    if (pos.includes('e')) newWidth = startWidth + dx;
                    if (pos.includes('w')) newWidth = startWidth - dx;
                    if (pos.includes('s')) newHeight = startHeight + dy;
                    if (pos.includes('n')) newHeight = startHeight - dy;

                    if (moveEvent.shiftKey) {
                        if (Math.abs(dx) > Math.abs(dy)) {
                            newHeight = newWidth / ratio;
                        } else {
                            newWidth = newHeight * ratio;
                        }
                    }

                    newWidth = Math.max(50, newWidth);
                    newHeight = Math.max(50, newHeight);
                    
                    img.style.width = newWidth + 'px';
                    img.style.height = newHeight + 'px';
                }

                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                    if (window.debouncedSave) window.debouncedSave();
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            };
        });
    }

    function addBorderControls(wrapper, img) {
        const borderMenu = document.createElement('div');
        borderMenu.className = 'image-border-menu';
        borderMenu.innerHTML = `
            <div class="border-control">
                <label>Border:</label>
                <input type="number" min="0" max="20" value="${img.style.borderWidth ? parseInt(img.style.borderWidth) : 0}" class="border-width"/>
                <input type="color" value="#000000" class="border-color"/>
            </div>
        `;
        wrapper.appendChild(borderMenu);

        const widthInput = borderMenu.querySelector('.border-width');
        const colorInput = borderMenu.querySelector('.border-color');
        
        widthInput.addEventListener('input', function() {
            img.style.border = `${this.value}px solid ${colorInput.value}`;
            if (window.debouncedSave) window.debouncedSave();
        });
        
        colorInput.addEventListener('input', function() {
            img.style.border = `${widthInput.value}px solid ${this.value}`;
            if (window.debouncedSave) window.debouncedSave();
        });
    }

    function removeAllImageControls() {
        const allWrappers = editor.querySelectorAll('.img-wrapper');
        allWrappers.forEach(wrapper => {
            const img = wrapper.querySelector('img');
            if (img) wrapper.replaceWith(img);
        });
    }
}