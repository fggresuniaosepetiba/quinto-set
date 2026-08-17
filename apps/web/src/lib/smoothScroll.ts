const MAX_SPEED = 3200;
const MAX_DURATION = 5000;

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

export function smoothScrollTo(
  targetY: number,
  { duration }: { duration?: number } = {},
) {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) {
    window.scrollTo({ top: targetY, behavior: "instant" });
    return;
  }

  const startY = window.scrollY;
  const delta = targetY - startY;

  if (Math.abs(delta) < 1) return;

  const clamped =
    duration ??
    Math.min(MAX_DURATION, Math.max(600, (Math.abs(delta) / MAX_SPEED) * 1000));

  const start = performance.now();
  let lastNow = start;
  let lastY = startY;
  let raf = 0;

  const cancel = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
  };

  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });

  const step = (now: number) => {
    const dt = Math.min((now - lastNow) / 1000, 0.1);
    lastNow = now;

    const elapsed = now - start;
    const progress = Math.min(elapsed / clamped, 1);
    const eased = startY + delta * easeInOutSine(progress);

    const maxStep = MAX_SPEED * dt;
    const y = Math.max(lastY - maxStep, Math.min(lastY + maxStep, eased));
    lastY = y;

    window.scrollTo({ top: y, behavior: "instant" });

    if (progress < 1 || Math.abs(y - (startY + delta)) >= 1) {
      raf = requestAnimationFrame(step);
    } else {
      cancel();
    }
  };

  raf = requestAnimationFrame(step);
}