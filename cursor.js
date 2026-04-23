/**
 * Custom VIEW cursor — appears over painting grid items.
 * Morphs/stretches along the direction of mouse movement.
 *
 * Architecture:
 *   .cursor  (wrapper) — positioned via translate(x, y) from top-left 0,0
 *   .cursor__circle — centered via translate(-50%,-50%), handles morph transform
 */

(function () {
  const wrapper = document.getElementById('cursor');
  const circle  = wrapper.querySelector('.cursor__circle');

  // Mouse state
  let mouseX = 0, mouseY = 0;
  let prevX  = 0, prevY  = 0;

  // Smoothed render position (lags slightly behind mouse for feel)
  let curX = 0, curY = 0;

  // Smoothed velocity for morph
  let vx = 0, vy = 0;

  // Visible state & smoothed opacity
  let isVisible = false;
  let opacity   = 0;

  // Guard: cursor stays hidden until user moves mouse after page load/transition
  let isReady = false;

  /* ── Track raw mouse position & velocity ── */
  document.addEventListener('mousemove', (e) => {
    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;
    prevX = e.clientX;
    prevY = e.clientY;

    mouseX = e.clientX;
    mouseY = e.clientY;

    // Exponential smoothing — weighted toward new delta for responsiveness
    vx = vx * 0.60 + dx * 0.40;
    vy = vy * 0.60 + dy * 0.40;

    // Unlock cursor 125ms after first movement so the page is fully settled
    if (!isReady) {
      setTimeout(function () { isReady = true; }, 125);
    }
  });

  /* ── Show / hide on grid item enter/leave ── */
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.grid-item')) {
      isVisible = true;
    }
  });

  document.addEventListener('mouseout', (e) => {
    const from = e.target.closest('.grid-item');
    const to   = e.relatedTarget && e.relatedTarget.closest('.grid-item');
    if (from && !to) {
      isVisible = false;
    }
  });

  /* ── rAF render loop ── */
  function animate() {
    // Smoothly follow mouse (slight lag = feel of weight)
    curX += (mouseX - curX) * 0.11;
    curY += (mouseY - curY) * 0.11;

    // Decay velocity each frame
    vx *= 0.84;
    vy *= 0.84;

    // Smooth opacity — only animate once cursor is ready post-load
    const targetOpacity = (isReady && isVisible) ? 1 : 0;
    opacity += (targetOpacity - opacity) * 0.14;

    // Position wrapper at cursor
    wrapper.style.transform = `translate(${curX}px, ${curY}px)`;
    wrapper.style.opacity   = opacity < 0.005 ? 0 : opacity;

    // Morph circle based on velocity
    const speed = Math.sqrt(vx * vx + vy * vy);
    let scaleX = 1, scaleY = 1, angle = 0;

    if (speed > 0.8) {
      angle  = Math.atan2(vy, vx) * (180 / Math.PI);
      const t = Math.min(speed / 18, 1); // normalise: full stretch at ~18px/frame
      scaleX = 1 + t * 0.55;             // stretch along movement axis
      scaleY = 1 - t * 0.25;             // compress perpendicular axis
    }

    circle.style.transform =
      `translate(-50%, -50%) rotate(${angle}deg) scaleX(${scaleX}) scaleY(${scaleY})`;

    requestAnimationFrame(animate);
  }

  // Initialise wrapper position off-screen until first mouse move
  wrapper.style.transform = 'translate(-200px, -200px)';
  wrapper.style.opacity   = 0;

  requestAnimationFrame(animate);
})();
