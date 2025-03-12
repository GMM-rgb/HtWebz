function createSplash(event) {
  if (!buttonEffectsEnabled()) return;

  const button = event.currentTarget;
  const splash = document.createElement('span');
  splash.className = 'splash';

  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  splash.style.width = size + 'px';
  splash.style.height = size + 'px';

  const x = event.clientX - rect.left - (size / 2);
  const y = event.clientY - rect.top - (size / 2);
  splash.style.left = `${x}px`;
  splash.style.top = `${y}px`;

  button.appendChild(splash);

  splash.addEventListener('animationend', () => {
    splash.remove();
  });
}

function buttonEffectsEnabled() {
  return localStorage.getItem('buttonEffects') === 'true';
}

function toggleButtonEffect(checkbox) {
  const enabled = checkbox.checked;
  localStorage.setItem('buttonEffects', enabled);
  // alert(`Button Effects ${enabled ? 'Enabled' : 'Disabled'}`);
}

function setInitialToggleState() {
  const checkbox = document.getElementById('effect-toggle');
  checkbox.checked = buttonEffectsEnabled();
}

// Ensure the initial state of the toggle button is set when the page loads
document.addEventListener('DOMContentLoaded', setInitialToggleState);
