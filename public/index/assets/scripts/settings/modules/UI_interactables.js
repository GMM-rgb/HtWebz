class ToggleSwitchCreationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ToggleSwitchCreationError";
  }
}

function CreateToggleSettingElement(switch_toggle_name, switch_toggle_IDNAME) {
  if (!switch_toggle_name) console.warn("No Toggle Switch name was inputed.");
  if (!switch_toggle_IDNAME) console.warn("No Toggle Switch ID was inputed, defaulting to SwitchToggleBtn.");

  let ToggleSwitch = null;
  
  try {
    ToggleSwitch = document.createElement("button");
    ToggleSwitch.id = (typeof switch_toggle_IDNAME === "string" && switch_toggle_IDNAME) || "SwitchToggleBtn";
    ToggleSwitch.setAttribute("class", "toggle-switch-btn");
    ToggleSwitch.setAttribute("Activated", "false");

    let ToggleSwitchInnerFrame = document.createElement("div");
    ToggleSwitchInnerFrame.setAttribute("class", "toggle-switch-inner-frame");
  
    let ToggleSwitchSlider = document.createElement("div");
    ToggleSwitchSlider.setAttribute("class", "toggle-switch-slider-element");
    ToggleSwitchSlider.innerText = 'OFF';

    // Drag state
    let isDragging = false;
    let hasMoved = false;
    let startX = 0;
    let startMarginLeft = 0;

    const ActivationObserverState = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === "attributes" && mutation.attributeName.toLowerCase() === "activated") {
          const ActivationStatusAttribute = ToggleSwitch.getAttribute("Activated");
          
          // Don't animate while dragging
          if (isDragging) return;
          
          console.log(`Toggle Switch -> ID: ${ToggleSwitch.id} -> Value:`, ActivationStatusAttribute);

          if (ActivationStatusAttribute === "true") {
            ToggleSwitchSlider.classList.remove("slide-backward");
            ToggleSwitchSlider.classList.add("slide-forward");
            ToggleSwitchSlider.innerText =  ActivationStatusAttribute === "true" ? 'ON' : 'OFF';
          } else {
            ToggleSwitchSlider.classList.remove("slide-forward");
            ToggleSwitchSlider.classList.add("slide-backward");
            ToggleSwitchSlider.innerText = ActivationStatusAttribute === "false" ? 'OFF' : 'ON';
          }
        }
      }
    });

    ToggleSwitch.appendChild(ToggleSwitchInnerFrame);
    ToggleSwitchInnerFrame.appendChild(ToggleSwitchSlider);
    
    ActivationObserverState.observe(ToggleSwitch, { attributes: true });

    const getEventX = (e) => {
      return e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    };

    const handleDragStart = (e) => {
      isDragging = true;
      hasMoved = false;
      startX = getEventX(e);
      
      // Get current position
      const computedStyle = window.getComputedStyle(ToggleSwitchSlider);
      const marginLeft = computedStyle.marginLeft;
      const rect = ToggleSwitchInnerFrame.getBoundingClientRect();
      startMarginLeft = (parseFloat(marginLeft) / rect.width) * 100;
      
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDragMove = (e) => {
      if (!isDragging) return;
      
      const currentX = getEventX(e);
      const deltaX = currentX - startX;
      
      if (!hasMoved && Math.abs(deltaX) < 3) {
        return;
      }
      
      if (!hasMoved) {
        hasMoved = true;
        ToggleSwitchSlider.classList.remove("slide-forward", "slide-backward");
        ToggleSwitchSlider.style.transition = "none";
      }
      
      // Check if cursor/finger is WAY off the toggle area (generous buffer)
      const rect = ToggleSwitchInnerFrame.getBoundingClientRect();
      const currentY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
      
      const bufferZone = 150; // 150px buffer before canceling
      const isWayOutOfBounds = currentX < rect.left - bufferZone || 
                               currentX > rect.right + bufferZone || 
                               currentY < rect.top - bufferZone || 
                               currentY > rect.bottom + bufferZone;
      
      if (isWayOutOfBounds) {
        // Cancel drag and snap back to current state
        isDragging = false;
        hasMoved = false;
        ToggleSwitchSlider.style.marginLeft = "";
        ToggleSwitchSlider.style.transition = "";
        
        const currentState = ToggleSwitch.getAttribute("Activated");
        ToggleSwitch.setAttribute("Activated", currentState);
        
        if (DebugMode) console.log("Drag cancelled - went way out of bounds");
        return;
      }
      
      const deltaPercent = (deltaX / rect.width) * 100;
      
      let newMarginLeft = startMarginLeft + deltaPercent;
      newMarginLeft = Math.max(0, Math.min(48, newMarginLeft));
      
      ToggleSwitchSlider.style.marginLeft = `${newMarginLeft}%`;
      
      e.preventDefault();
    };

    const handleDragEnd = (e) => {
      if (!isDragging) return;
      
      if (!hasMoved) {
        isDragging = false;
        const ActivationState = ToggleSwitch.getAttribute("Activated");
        ToggleSwitch.setAttribute("Activated", ActivationState === "true" ? "false" : "true");
        console.log("Slider tapped, toggled to:", ToggleSwitch.getAttribute("Activated"));
        return;
      }
      
      // Get final position
      const computedStyle = window.getComputedStyle(ToggleSwitchSlider);
      const marginLeft = parseFloat(computedStyle.marginLeft);
      const rect = ToggleSwitchInnerFrame.getBoundingClientRect();
      const marginPercent = (marginLeft / rect.width) * 100;
      
      // Reset styles
      ToggleSwitchSlider.style.marginLeft = "";
      ToggleSwitchSlider.style.transition = "";
      
      isDragging = false;
      
      // Determine state based on position (midpoint -> middle, is 24%)
      const newState = marginPercent > 24 ? "true" : "false";
      ToggleSwitch.setAttribute("Activated", newState);
      
      console.log("Drag ended at", marginPercent.toFixed(1), "%, set to:", newState);
    };

    // Slider drag events
    ToggleSwitchSlider.addEventListener("mousedown", handleDragStart);
    ToggleSwitchSlider.addEventListener("touchstart", handleDragStart, { passive: false });
    
    // Global move/end events
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDragMove, { passive: false });
    document.addEventListener("touchend", handleDragEnd);

    // Track background click
    ToggleSwitch.addEventListener("click", (e) => {
      if (e.target === ToggleSwitchSlider) return;
      
      e.stopPropagation();
      const ActivationState = ToggleSwitch.getAttribute("Activated");
      ToggleSwitch.setAttribute("Activated", ActivationState === "true" ? "false" : "true");
      console.log("Track clicked, toggled to:", ToggleSwitch.getAttribute("Activated"));
    });

  } catch (ToggleSwitchCreationError) {
    return console.error(ToggleSwitchCreationError);
  } finally {
    if (!ToggleSwitch) {
      return null;
    } else {
      return ToggleSwitch;
    }
  }
}

export { CreateToggleSettingElement, ToggleSwitchCreationError };