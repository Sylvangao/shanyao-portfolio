const TILT_STRENGTH = 2 / 3;
export const CARD_TILT_AMPLITUDE = 10.5 * TILT_STRENGTH;

// Match edge depth to the Projects surface, rather than applying the same
// degrees to differently sized cards. Limit extreme angles on short popovers.
export function tiltAmplitude(size: number, referenceSize: number) {
  const base = ((CARD_TILT_AMPLITUDE / TILT_STRENGTH) * Math.PI) / 180;
  return (
    Math.min(
      24,
      (Math.atan((Math.tan(base) * referenceSize) / Math.max(1, size)) * 180) / Math.PI,
    ) * TILT_STRENGTH
  );
}

// Keep the link's hit area stationary; animate only its inner surface.
export function attachProjectTilt(card: HTMLElement) {
  const preference = window.matchMedia(
    '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  );
  const position = [0, 0, 1];
  const velocity = [0, 0, 0];
  const target = [0, 0, 1];
  let frame = 0;
  let previousTime = 0;
  let active = false;

  const paint = () => {
    card.style.setProperty('--project-rotate-x', `${position[0]}deg`);
    card.style.setProperty('--project-rotate-y', `${position[1]}deg`);
    card.style.setProperty('--project-hover-scale', String(position[2]));
    // Project each foreground plane onto the glass surface. A literal
    // preserve-3d chain is flattened by backdrop-filter / clip-path, so project
    // the depth here instead; all planes share the same spring and reset.
    card.style.setProperty('--project-depth-x', String(Math.sin((position[1] * Math.PI) / 180)));
    card.style.setProperty('--project-depth-y', String(-Math.sin((position[0] * Math.PI) / 180)));
  };
  const animate = (time: number) => {
    const dt = previousTime ? Math.min((time - previousTime) / 1000, 0.032) : 1 / 60;
    previousTime = time;
    // The reference uses stiffness 100, damping 30, mass 2. Substeps keep
    // integration stable across variable frame rates and background pauses.
    const steps = Math.ceil(dt / (1 / 120));
    const step = dt / steps;
    for (let n = 0; n < steps; n++) {
      for (let i = 0; i < position.length; i++) {
        velocity[i] += ((100 * (target[i] - position[i]) - 30 * velocity[i]) / 2) * step;
        position[i] += velocity[i] * step;
      }
    }
    const moving = position.some(
      (value, i) => Math.abs(target[i] - value) > 0.0005 || Math.abs(velocity[i]) > 0.001,
    );
    if (!moving) {
      position.splice(0, 3, ...target);
      velocity.fill(0);
    }
    paint();
    frame = moving ? requestAnimationFrame(animate) : 0;
    if (!moving) {
      previousTime = 0;
      if (!active) delete card.dataset.tilting;
    }
  };
  const start = () => {
    if (!frame) frame = requestAnimationFrame(animate);
  };
  const reset = () => {
    if (!active && !frame) return;
    active = false;
    target.splice(0, 3, 0, 0, 1);
    card.dataset.tiltHovered = 'false';
    start();
  };
  const move = (event: PointerEvent) => {
    if (!preference.matches || event.pointerType !== 'mouse') return;
    const rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    const reference = document.querySelector<HTMLElement>('.portfolio-card .portfolio-thumb');
    const referenceWidth = reference?.offsetWidth || 582;
    const referenceHeight = reference?.offsetHeight || referenceWidth * 0.75;
    const amplitudeX = tiltAmplitude(card.offsetHeight, referenceHeight);
    const amplitudeY = tiltAmplitude(card.offsetWidth, referenceWidth);
    active = true;
    target.splice(0, 3, -(y * 2 - 1) * amplitudeX, (x * 2 - 1) * amplitudeY, 1.015);
    card.dataset.tilting = 'true';
    card.dataset.tiltHovered = 'true';
    card.style.setProperty('--project-light-x', `${x * 100}%`);
    card.style.setProperty('--project-light-y', `${y * 100}%`);
    start();
  };
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
    active = false;
    position.splice(0, 3, 0, 0, 1);
    target.splice(0, 3, 0, 0, 1);
    velocity.fill(0);
    delete card.dataset.tilting;
    delete card.dataset.tiltHovered;
    paint();
  };
  const visibility = () => {
    if (document.hidden) stop();
  };
  card.addEventListener('pointerenter', move);
  card.addEventListener('pointermove', move);
  card.addEventListener('pointerleave', reset);
  card.addEventListener('pointercancel', reset);
  window.addEventListener('blur', reset);
  window.addEventListener('scroll', reset, { passive: true });
  preference.addEventListener('change', stop);
  document.addEventListener('visibilitychange', visibility);
  return () => {
    stop();
    card.removeEventListener('pointerenter', move);
    card.removeEventListener('pointermove', move);
    card.removeEventListener('pointerleave', reset);
    card.removeEventListener('pointercancel', reset);
    window.removeEventListener('blur', reset);
    window.removeEventListener('scroll', reset);
    preference.removeEventListener('change', stop);
    document.removeEventListener('visibilitychange', visibility);
  };
}
