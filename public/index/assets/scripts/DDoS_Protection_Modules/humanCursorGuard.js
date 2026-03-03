// humanCursorGuard.js
const HumanCursorGuard = (() => {
  let path = [];
  let startTime = null;
  let clickTime = null;

  function trackMouse(e) {
    if (!startTime) startTime = performance.now();
    path.push({ x: e.clientX, y: e.clientY, t: performance.now() });
  }

  function analyzePath() {
    if (path.length < 2) return false;

    const totalTime = clickTime - startTime;
    const totalDistance = path.reduce((sum, p, i, arr) => {
      if (i === 0) return 0;
      const dx = p.x - arr[i - 1].x;
      const dy = p.y - arr[i - 1].y;
      return sum + Math.sqrt(dx * dx + dy * dy);
    }, 0);

    const dx = path[path.length - 1].x - path[0].x;
    const dy = path[path.length - 1].y - path[0].y;
    const straightDistance = Math.sqrt(dx * dx + dy * dy);
    const straightnessRatio = straightDistance / totalDistance;

    const suspiciousSpeed = totalTime < 100; // under 100ms = sus
    const suspiciousStraightness = straightnessRatio > 0.98; // nearly perfect line

    return suspiciousSpeed || suspiciousStraightness;
  }

  function attachToButton(buttonId, callback) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    document.addEventListener("mousemove", trackMouse);
    button.addEventListener("click", (e) => {
      clickTime = performance.now();
      document.removeEventListener("mousemove", trackMouse);

      const isBot = analyzePath();
      callback(isBot);
    });
  }

  return {
    attachToButton,
  };
})();
