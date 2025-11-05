const GrabContentSectionBtns = document.querySelectorAll(".grab-move-button");
const ContentSectionIndexLocalstorageData = localStorage.getItem("ContentSectionIndexs");

let ContentSectionIndexData = ContentSectionIndexLocalstorageData ? JSON.parse(ContentSectionIndexLocalstorageData) : {};

GrabContentSectionBtns.forEach((GrabButton) => {
    if (!(GrabButton instanceof HTMLElement) || !(GrabButton instanceof HTMLButtonElement)) return console.warn("WARNING: Invalid Grab Content Section Element detected:", GrabButton);
    try {
        const BtnClassName = GrabButton.className.replace(" ", ".");
        const BtnClassNamedFormated = "." + BtnClassName;
        GrabButton.setAttribute("onmouseenter", `setupTooltip('${BtnClassNamedFormated}', 'Hold and drag, to move content to your liking.');`);
    } catch (FormatError) {
        reportError?.(FormatError);
        throw new Error(FormatError);
    }
});

function loadSavedIndexChanges(data) {
    if (!data || Object.keys(data).length === 0) return;

    const allSections = document.querySelectorAll(".grab-move-button");
    
    if (allSections.length === 0) return;
    
    const firstBtn = allSections[0];
    const container = firstBtn.parentElement.parentElement.parentElement.parentElement;
    const mainContentSection = document.querySelector(".main-content-section");
    
    allSections.forEach(btn => {
        const section = btn.parentElement.parentElement.parentElement;
        const id = section.id || section.dataset.id;
        
        if (id && data[id] !== undefined) {
            section.style.order = data[id];
        }
    });
    
    const movableSections = Array.from(container.children).filter(child => 
        child !== mainContentSection && child.querySelector(".grab-move-button")
    );
    
    movableSections.sort((a, b) => {
        const orderA = parseInt(a.style.order) || 9999;
        const orderB = parseInt(b.style.order) || 9999;
        return orderA - orderB;
    });
    
    movableSections.forEach(section => container.appendChild(section));
}

function saveContentSectionIndexChanges() {
    const allSections = document.querySelectorAll(".grab-move-button");
    const newData = {};
    
    allSections.forEach((btn, index) => {
        const section = btn.parentElement.parentElement.parentElement;
        const id = section.id || section.dataset.id || `section-${index}`;
        
        if (!section.id && !section.dataset.id) {
            section.dataset.id = id;
        }
        
        const orderValue = section.style.order ? parseInt(section.style.order) : index;
        newData[id] = orderValue;
    });

    if (newData && (newData instanceof Object) || typeof newData === "object") {
        window.notify?.("Updated content order successfully.");
    } else {
        window.notify?.("Failed to update content order.");
    }

    localStorage.setItem("ContentSectionIndexs", JSON.stringify(newData));
    ContentSectionIndexData = newData;
}

// Unified drag handler for both mouse and touch
function setupDragHandler(GrabBtn, ParentBtn_ContentSection, startEvent, isTouchEvent) {
    const container = ParentBtn_ContentSection.parentElement;
    let ghostElement = null;
    let placeholderElement = null;
    let lastTargetElement = null;
    const DEAD_ZONE = ParentBtn_ContentSection ? Number(ParentBtn_ContentSection.style.height.replace("px", "") / 10) : 60;
    
    const mainContentSection = document.querySelector(".main-content-section");
    const initialDraggedHeight = ParentBtn_ContentSection.offsetHeight;
    
    // Calculate offset from button position
    const btnRect = GrabBtn.getBoundingClientRect();
    const startX = isTouchEvent ? startEvent.touches[0].clientX : startEvent.clientX;
    const startY = isTouchEvent ? startEvent.touches[0].clientY : startEvent.clientY;
    const offsetX = startX - btnRect.left;
    const offsetY = startY - btnRect.top;
    
    // Force grabbing cursor
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `* { cursor: grabbing !important; }`;
    document.head.appendChild(styleSheet);
    
    // Temporarily remove order from all children
    Array.from(container.children).forEach(child => {
        child.style.order = '';
    });
    
    // Create ghost preview
    ghostElement = ParentBtn_ContentSection.cloneNode(true);
    ghostElement.style.position = "fixed";
    ghostElement.style.pointerEvents = "none";
    ghostElement.style.opacity = "0.5";
    ghostElement.style.zIndex = "9999";
    ghostElement.style.width = ParentBtn_ContentSection.offsetWidth + "px";
    ghostElement.style.transition = "none";
    ghostElement.style.border = "3px solid rgba(59, 130, 246, 0.6)";
    ghostElement.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
    
    // Create placeholder
    placeholderElement = document.createElement("div");
    placeholderElement.style.height = "0px";
    placeholderElement.style.border = "2px dashed #3b82f6";
    placeholderElement.style.borderRadius = "8px";
    placeholderElement.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
    placeholderElement.style.margin = getComputedStyle(ParentBtn_ContentSection).margin;
    placeholderElement.style.opacity = "0";
    placeholderElement.style.overflow = "hidden";
    placeholderElement.style.transition = "height 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease";
    placeholderElement.dataset.placeholder = "true";
    
    // Replace original with placeholder
    const originalNextSibling = ParentBtn_ContentSection.nextSibling;
    ParentBtn_ContentSection.style.display = "none";
    container.removeChild(ParentBtn_ContentSection);
    container.insertBefore(placeholderElement, originalNextSibling);
    
    document.body.appendChild(ghostElement);
    
    // Initial ghost position
    ghostElement.style.left = (startX - offsetX) + "px";
    ghostElement.style.top = (startY - offsetY) + "px";
    
    // Show placeholder
    setTimeout(() => {
        placeholderElement.style.height = initialDraggedHeight + "px";
        placeholderElement.style.opacity = "1";
    }, 10);

    function showPlaceholder() {
        placeholderElement.style.height = initialDraggedHeight + "px";
        placeholderElement.style.opacity = "1";
    }

    function hidePlaceholder() {
        placeholderElement.style.height = "0px";
        placeholderElement.style.opacity = "0";
    }

    function onMove(moveEvent) {
        if (isTouchEvent) {
            moveEvent.preventDefault();
        } else {
            moveEvent.stopPropagation();
            moveEvent.preventDefault();
        }
        
        const MouseX = isTouchEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
        const MouseY = isTouchEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
        
        // Update ghost position
        ghostElement.style.left = (MouseX - offsetX) + "px";
        ghostElement.style.top = (MouseY - offsetY) + "px";
        
        const ghostRect = ghostElement.getBoundingClientRect();
        const ghostCenterY = ghostRect.top + (ghostRect.height / 2);
        
        const allChildren = Array.from(container.children);
        const sections = allChildren.filter(el => 
            el.dataset.placeholder !== "true"
        );
        
        let targetSection = null;
        let insertBefore = true;
        let foundValidPosition = false;
        
        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            const middle = rect.top + rect.height / 2;
            
            if (ghostCenterY >= rect.top - DEAD_ZONE && ghostCenterY <= rect.bottom + DEAD_ZONE) {
                targetSection = section;
                insertBefore = ghostCenterY < middle;
                foundValidPosition = true;
                break;
            }
        }
        
        if (targetSection) {
            if (targetSection === mainContentSection && insertBefore) {
                hidePlaceholder();
                lastTargetElement = null;
                return;
            }
            
            const positionKey = `${targetSection.dataset.id || targetSection.id}_${insertBefore ? 'before' : 'after'}`;
            
            if (positionKey !== lastTargetElement) {
                lastTargetElement = positionKey;
                
                if (insertBefore) {
                    container.insertBefore(placeholderElement, targetSection);
                } else {
                    if (targetSection.nextSibling) {
                        container.insertBefore(placeholderElement, targetSection.nextSibling);
                    } else {
                        container.appendChild(placeholderElement);
                    }
                }
                
                setTimeout(() => showPlaceholder(), 10);
            }
        } else {
            if (sections.length > 0) {
                const lastSection = sections[sections.length - 1];
                const lastRect = lastSection.getBoundingClientRect();
                
                if (ghostCenterY > lastRect.bottom - DEAD_ZONE) {
                    if (lastTargetElement !== "bottom") {
                        lastTargetElement = "bottom";
                        container.appendChild(placeholderElement);
                        setTimeout(() => showPlaceholder(), 10);
                    }
                    return;
                }
            }
            
            if (sections.length > 0) {
                const firstSection = sections[0];
                const firstRect = firstSection.getBoundingClientRect();
                
                if (ghostCenterY < firstRect.top + DEAD_ZONE) {
                    if (firstSection !== mainContentSection) {
                        if (lastTargetElement !== "top") {
                            lastTargetElement = "top";
                            container.insertBefore(placeholderElement, firstSection);
                            setTimeout(() => showPlaceholder(), 10);
                        }
                    } else {
                        hidePlaceholder();
                    }
                    return;
                }
            }
            
            if (!foundValidPosition) {
                hidePlaceholder();
                lastTargetElement = null;
            }
        }
    }

    function onEnd(endEvent) {
        if (!isTouchEvent) {
            endEvent.stopPropagation();
            endEvent.preventDefault();
        }
        
        // Remove cursor override
        styleSheet.remove();
        
        // Move element to placeholder position
        container.insertBefore(ParentBtn_ContentSection, placeholderElement);
        
        // Restore original element
        ParentBtn_ContentSection.style.display = "";
        ParentBtn_ContentSection.style.transition = "";
        
        // Recalculate order values
        const allChildren = Array.from(container.children);
        allChildren.forEach((child, idx) => {
            child.style.order = idx;
        });
        
        // Remove ghost and placeholder
        if (ghostElement && ghostElement.parentElement) {
            ghostElement.remove();
        }
        if (placeholderElement && placeholderElement.parentElement) {
            placeholderElement.remove();
        }
        
        // Save new order
        saveContentSectionIndexChanges();
        
        // Remove event listeners
        if (isTouchEvent) {
            document.removeEventListener("touchmove", onMove, { passive: false });
            document.removeEventListener("touchend", onEnd);
            document.removeEventListener("touchcancel", onEnd);
        } else {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onEnd);
        }
    }

    // Add event listeners
    if (isTouchEvent) {
        document.addEventListener("touchmove", onMove, { passive: false });
        document.addEventListener("touchend", onEnd);
        document.addEventListener("touchcancel", onEnd);
    } else {
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onEnd);
    }
}

// Setup event listeners for each button
GrabContentSectionBtns.forEach((GrabBtn) => {
    if (GrabBtn instanceof HTMLButtonElement) {
        const ParentBtn_ContentSection = GrabBtn.parentElement.parentElement.parentElement;

        if (ParentBtn_ContentSection) {
            if (!ParentBtn_ContentSection.id && !ParentBtn_ContentSection.dataset.id) {
                ParentBtn_ContentSection.dataset.id = `section-${Date.now()}-${Math.random()}`;
            }

            // Mouse events
            GrabBtn.addEventListener("mousedown", (e) => {
                e.stopPropagation();
                e.preventDefault();
                setupDragHandler(GrabBtn, ParentBtn_ContentSection, e, false);
            });

            // Touch events
            GrabBtn.addEventListener("touchstart", (e) => {
                e.preventDefault(); // Prevent scrolling while dragging
                setupDragHandler(GrabBtn, ParentBtn_ContentSection, e, true);
            }, { passive: false });
        }
    }
});

// Load saved order when DOM is ready
if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", () => loadSavedIndexChanges(ContentSectionIndexData));
} else {
    loadSavedIndexChanges(ContentSectionIndexData);
}
