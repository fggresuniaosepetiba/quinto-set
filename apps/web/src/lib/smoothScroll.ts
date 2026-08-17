const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

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

  const clamped = duration ?? Math.min(4000, Math.max(600, Math.abs(delta) * 0.8));

  const start = performance.now();
  let raf = 0;

  const cancel = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
  };

  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });

  const step = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / clamped, 1);
    const y = startY + delta * easeInOutCubic(progress);

    window.scrollTo({ top: y, behavior: "instant" });

    if (progress < 1) {
      raf = requestAnimationFrame(step);
    } else {
      cancel();
    }
  };

  raf = requestAnimationFrame(step);
}