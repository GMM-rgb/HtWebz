document.addEventListener('DOMContentLoaded', function() {
    const editor = document.getElementById('content');
    
    editor.addEventListener('click', function(e) {
        const clickedImage = e.target.closest('img');
        if (clickedImage) {
            e.preventDefault();
            e.stopPropagation();
            handleImageClick(clickedImage);
        } else if (!e.target.closest('.img-wrapper')) {
            removeAllImageControls();
        }
    });

    function handleImageClick(img) {
        removeAllImageControls();
        
        const wrapper = document.createElement('div');
        wrapper.className = 'img-wrapper';
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);

        addFormatMenu(wrapper, img);
        addResizeHandles(wrapper, img);
    }

    function addFormatMenu(wrapper, img) {
        const menu = document.createElement('div');
        menu.className = 'image-format-menu';
        menu.innerHTML = `
            <div class="format-control">
                <div class="format-section">
                    <label>Border:</label>
                    <input type="number" min="0" max="20" value="${img.style.borderWidth ? parseInt(img.style.borderWidth) : 0}" class="border-width"/>
                    <input type="color" value="${img.style.borderColor || '#000000'}" class="border-color"/>
                </div>
                <div class="format-section">
                    <label>Style:</label>
                    <select class="border-style">
                        <option value="solid">Solid</option>
                        <option value="dashed">Dashed</option>
                        <option value="dotted">Dotted</option>
                    </select>
                </div>
                <div class="format-section">
                    <label>Radius:</label>
                    <input type="number" min="0" max="50" value="${img.style.borderRadius ? parseInt(img.style.borderRadius) : 0}" class="border-radius"/>
                </div>
            </div>
        `;
        wrapper.appendChild(menu);

        const widthInput = menu.querySelector('.border-width');
        const colorInput = menu.querySelector('.border-color');
        const styleSelect = menu.querySelector('.border-style');
        const radiusInput = menu.querySelector('.border-radius');

        function updateStyle() {
            img.style.border = `${widthInput.value}px ${styleSelect.value} ${colorInput.value}`;
            img.style.borderRadius = `${radiusInput.value}px`;
            if (window.debouncedSave) window.debouncedSave();
        }

        widthInput.addEventListener('input', updateStyle);
        colorInput.addEventListener('input', updateStyle);
        styleSelect.addEventListener('change', updateStyle);
        radiusInput.addEventListener('input', updateStyle);
    }

    function addResizeHandles(wrapper, img) {
        ['nw', 'ne', 'sw', 'se'].forEach(pos => {
            const handle = document.createElement('div');
            handle.className = `resize-handle ${pos}`;
            wrapper.appendChild(handle);

            handle.addEventListener('mousedown', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                handle.classList.add('active');
                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = img.offsetWidth;
                const startHeight = img.offsetHeight;
                const ratio = startWidth / startHeight;

                function handleResize(moveEvent) {
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

                    requestAnimationFrame(() => {
                        img.style.width = newWidth + 'px';
                        img.style.height = newHeight + 'px';
                    });
                }

                function stopResize() {
                    handle.classList.remove('active');
                    document.removeEventListener('mousemove', handleResize);
                    document.removeEventListener('mouseup', stopResize);
                    if (window.debouncedSave) window.debouncedSave();
                }

                document.addEventListener('mousemove', handleResize);
                document.addEventListener('mouseup', stopResize);
            });
        });
    }

    function removeAllImageControls() {
        const allWrappers = editor.querySelectorAll('.img-wrapper');
        allWrappers.forEach(wrapper => {
            const img = wrapper.querySelector('img');
            if (img) wrapper.replaceWith(img);
        });
    }

    // Handle clicks outside of images
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.img-wrapper') && !e.target.matches('img')) {
            removeAllImageControls();
        }
    });
});