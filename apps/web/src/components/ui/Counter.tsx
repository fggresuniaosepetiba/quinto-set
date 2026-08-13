"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CounterProps = {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

export function Counter({
  value,
  label,
  suffix = "",
  prefix = "",
  duration = 1800,
  className,
}: CounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(Math.round(eased * value));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full flex-col items-center justify-center px-4 py-6 text-center sm:py-8",
        className,
      )}
    >
      <span className="font-display text-4xl font-bold leading-snug text-gold-400 sm:text-5xl">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="mt-3 text-sm font-semibold uppercase tracking-widest text-cream-100/70">
        {label}
      </span>
    </div>
  );
}
