const GrabContentSectionBtns = document.querySelectorAll(".grab-move-button");
const ContentSectionIndexLocalstorageData = localStorage.getItem("ContentSectionIndexs");

let ContentSectionIndexData = ContentSectionIndexLocalstorageData ? JSON.parse(ContentSectionIndexLocalstorageData) : {};

function loadSavedIndexChanges(data) {
    if (!data || Object.keys(data).length === 0) return;

    const allSections = document.querySelectorAll(".grab-move-button");
    
    allSections.forEach(btn => {
        const section = btn.parentElement.parentElement.parentElement;
        const id = section.id || section.dataset.id;
        
        if (id && data[id] !== undefined) {
            section.style.order = data[id];
        }
    });
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

    localStorage.setItem("ContentSectionIndexs", JSON.stringify(newData));
    ContentSectionIndexData = newData;
}

GrabContentSectionBtns.forEach((GrabBtn) => {
    if (GrabBtn instanceof HTMLButtonElement) {
        const ParentBtn_ContentSection = GrabBtn.parentElement.parentElement.parentElement;

        if (ParentBtn_ContentSection) {
            if (!ParentBtn_ContentSection.id && !ParentBtn_ContentSection.dataset.id) {
                ParentBtn_ContentSection.dataset.id = `section-${Date.now()}-${Math.random()}`;
            }

            GrabBtn.addEventListener("mousedown", (e) => {
                e.stopPropagation();
                e.preventDefault();

                const container = ParentBtn_ContentSection.parentElement;
                let ghostElement = null;
                let placeholderElement = null;
                let currentTargetIndex = -1;
                const SNAP_THRESHOLD = 50;
                
                // Get the main-content-section to use as minimum boundary
                const mainContentSection = document.querySelector(".main-content-section");
                const mainContentIndex = mainContentSection ? Array.from(container.children).indexOf(mainContentSection) : -1;
                const minAllowedIndex = mainContentIndex !== -1 ? mainContentIndex + 1 : 0;
                
                // Calculate offset from button position
                const btnRect = GrabBtn.getBoundingClientRect();
                const offsetX = e.clientX - btnRect.left;
                const offsetY = e.clientY - btnRect.top;
                
                // Set grabbing cursor on body
                document.body.style.cursor = "grabbing";
                GrabBtn.style.cursor = "grabbing";
                
                // Add smooth transitions to all sections in container
                Array.from(container.children).forEach(child => {
                    if (child !== ParentBtn_ContentSection) {
                        child.style.transition = "transform 0.2s ease, opacity 0.2s ease";
                    }
                });
                
                // Create ghost preview - actually transparent now!
                ghostElement = ParentBtn_ContentSection.cloneNode(true);
                ghostElement.style.position = "fixed";
                ghostElement.style.pointerEvents = "none";
                ghostElement.style.opacity = "0.5";
                ghostElement.style.zIndex = "9999";
                ghostElement.style.width = (ParentBtn_ContentSection.offsetWidth * 0.95) + "px";
                ghostElement.style.transform = "scale(0.95)";
                ghostElement.style.transition = "none";
                ghostElement.style.border = "2px solid rgba(59, 130, 246, 0.6)";
                ghostElement.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
                ghostElement.style.cursor = "grabbing";
                
                // Create placeholder
                placeholderElement = document.createElement("div");
                placeholderElement.style.height = ParentBtn_ContentSection.offsetHeight + "px";
                placeholderElement.style.border = "2px dashed #3b82f6";
                placeholderElement.style.borderRadius = "8px";
                placeholderElement.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
                placeholderElement.style.margin = getComputedStyle(ParentBtn_ContentSection).margin;
                placeholderElement.style.transition = "all 0.2s ease";
                
                // Hide original element with smooth transition
                ParentBtn_ContentSection.style.opacity = "0.3";
                ParentBtn_ContentSection.style.transition = "opacity 0.2s ease";
                
                document.body.appendChild(ghostElement);
                
                // Initial ghost position using button offset
                const initialRect = ParentBtn_ContentSection.getBoundingClientRect();
                const ghostBtnRect = ghostElement.querySelector('.grab-move-button')?.getBoundingClientRect();
                const ghostOffsetX = ghostBtnRect ? (btnRect.left - initialRect.left) : 0;
                const ghostOffsetY = ghostBtnRect ? (btnRect.top - initialRect.top) : 0;
                
                ghostElement.style.left = (e.clientX - ghostOffsetX - offsetX) + "px";
                ghostElement.style.top = (e.clientY - ghostOffsetY - offsetY) + "px";

                function onMouseMove(eMove) {
                    eMove.stopPropagation();
                    eMove.preventDefault();
                    
                    const MouseY = eMove.clientY;
                    const MouseX = eMove.clientX;
                    
                    // Update ghost position using button offset
                    const ghostBtnRect = ghostElement.querySelector('.grab-move-button')?.getBoundingClientRect();
                    const ghostOffsetX = ghostBtnRect ? (btnRect.left - initialRect.left) : 0;
                    const ghostOffsetY = ghostBtnRect ? (btnRect.top - initialRect.top) : 0;
                    
                    ghostElement.style.left = (MouseX - ghostOffsetX - offsetX) + "px";
                    ghostElement.style.top = (MouseY - ghostOffsetY - offsetY) + "px";
                    
                    // Find target position with improved logic
                    const sections = Array.from(container.children).filter(el => el !== placeholderElement);
                    const currentIndex = sections.indexOf(ParentBtn_ContentSection);
                    let targetIndex = -1;
                    let bestMatch = null;
                    
                    sections.forEach((section, i) => {
                        if (section === ParentBtn_ContentSection) return;
                        
                        // Skip if this would place item above main-content-section
                        if (i < minAllowedIndex) return;
                        
                        const rect = section.getBoundingClientRect();
                        const sectionTop = rect.top;
                        const sectionBottom = rect.bottom;
                        const sectionMiddle = sectionTop + (rect.height / 2);
                        const distanceFromMiddle = Math.abs(MouseY - sectionMiddle);
                        
                        // Within the section's area (with threshold)
                        if (MouseY >= sectionTop - SNAP_THRESHOLD && MouseY <= sectionBottom + SNAP_THRESHOLD) {
                            // Determine if we should insert before or after
                            const insertBefore = MouseY < sectionMiddle;
                            const proposedIndex = insertBefore ? i : i + 1;
                            
                            // Ensure we don't go above the minimum allowed index
                            if (proposedIndex >= minAllowedIndex) {
                                // Track the best match based on distance
                                if (!bestMatch || distanceFromMiddle < bestMatch.distance) {
                                    bestMatch = {
                                        index: proposedIndex,
                                        distance: distanceFromMiddle
                                    };
                                }
                            }
                        }
                    });
                    
                    // Use best match if found
                    if (bestMatch) {
                        targetIndex = bestMatch.index;
                    } else {
                        // Check if we're above the minimum allowed section
                        if (minAllowedIndex < sections.length) {
                            const minSection = sections[minAllowedIndex];
                            if (minSection && MouseY < minSection.getBoundingClientRect().top + SNAP_THRESHOLD) {
                                targetIndex = minAllowedIndex;
                            }
                        }
                        
                        // Check if we're below all elements
                        const lastSection = sections[sections.length - 1];
                        if (lastSection && MouseY > lastSection.getBoundingClientRect().bottom - SNAP_THRESHOLD) {
                            targetIndex = sections.length;
                        }
                    }
                    
                    // Update placeholder position if target changed
                    if (targetIndex !== -1 && targetIndex !== currentTargetIndex) {
                        currentTargetIndex = targetIndex;
                        
                        if (placeholderElement.parentElement) {
                            placeholderElement.remove();
                        }
                        
                        // Adjust index to account for the original element
                        const adjustedIndex = currentIndex !== -1 && currentIndex < targetIndex ? targetIndex - 1 : targetIndex;
                        
                        if (adjustedIndex >= sections.length) {
                            container.appendChild(placeholderElement);
                        } else if (adjustedIndex < 0 || adjustedIndex < minAllowedIndex) {
                            container.insertBefore(placeholderElement, sections[minAllowedIndex]);
                        } else {
                            container.insertBefore(placeholderElement, sections[adjustedIndex]);
                        }
                    }
                }

                function onMouseUp(eUp) {
                    eUp.stopPropagation();
                    eUp.preventDefault();
                    
                    // Restore cursors
                    document.body.style.cursor = "";
                    GrabBtn.style.cursor = "";
                    
                    // Remove transitions from all sections
                    Array.from(container.children).forEach(child => {
                        child.style.transition = "";
                    });
                    
                    // Update CSS order property based on final position
                    if (currentTargetIndex !== -1) {
                        if (placeholderElement.parentElement) {
                            container.insertBefore(ParentBtn_ContentSection, placeholderElement);
                        }
                        
                        // Update order values for all sections, ensuring nothing goes above main-content-section
                        Array.from(container.children).forEach((section, idx) => {
                            if (section !== placeholderElement) {
                                section.style.order = idx;
                            }
                        });
                    }
                    
                    // Restore original element
                    ParentBtn_ContentSection.style.opacity = "";
                    ParentBtn_ContentSection.style.transition = "";
                    
                    // Remove ghost and placeholder
                    if (ghostElement && ghostElement.parentElement) {
                        ghostElement.remove();
                    }
                    if (placeholderElement && placeholderElement.parentElement) {
                        placeholderElement.remove();
                    }
                    
                    // Save new order
                    saveContentSectionIndexChanges();
                    
                    document.removeEventListener("mousemove", onMouseMove);
                    document.removeEventListener("mouseup", onMouseUp);
                }

                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
            });
        }
    }
});

// Load saved order when DOM is ready
if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", () => loadSavedIndexChanges(ContentSectionIndexData));
} else {
    loadSavedIndexChanges(ContentSectionIndexData);
}
