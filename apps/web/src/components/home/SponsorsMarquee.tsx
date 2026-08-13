"use client";

import { useEffect, useRef, useState } from "react";
import { sponsors } from "@/data/sponsors";

const SPEED = 90;

function SponsorMark({
  name,
  logo,
  fill,
}: {
  name: string;
  logo: string;
  fill?: boolean;
}) {
  const longName = name.length > 28;
  return (
    <div
      className={`mx-3 flex h-24 shrink-0 items-center gap-3 rounded-lg border border-white/10 bg-navy-950/60 px-4 transition-colors hover:border-gold-400/40 sm:mx-4 ${
        longName ? "w-52 sm:w-72 lg:w-80" : "w-48 sm:w-56 lg:w-64"
      }`}
      title={name}
    >
      <span
        className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/20 sm:h-16 sm:w-16 ${
          fill ? "" : "bg-white p-2"
        }`}
      >
        <img
          src={logo}
          alt={`Logo da ${name}`}
          className={`h-full w-full ${fill ? "object-cover" : "object-contain"}`}
          loading="lazy"
        />
      </span>
      <span
        className={`font-display font-semibold uppercase tracking-wide text-cream-100/85 ${
          longName ? "text-[11px] leading-tight sm:text-xs" : "text-sm"
        }`}
      >
        {name}
      </span>
    </div>
  );
}

export function SponsorsMarquee() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    const track = trackRef.current;
    if (!frame || !track) return;

    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!hovered) {
        const trackWidth = track.getBoundingClientRect().width;
        const frameWidth = frame.clientWidth;
        offsetRef.current += SPEED * dt;
        if (offsetRef.current > trackWidth) {
          offsetRef.current = -frameWidth;
        }
      }

      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  return (
    <div
      ref={frameRef}
      className="mask-fade-x overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {sponsors.map((sponsor) => (
          <SponsorMark key={sponsor.id} {...sponsor} />
        ))}
      </div>
    </div>
  );
}
