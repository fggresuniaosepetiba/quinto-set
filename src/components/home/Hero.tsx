"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, Play, Medal, HeartHandshake } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { img } from "@/data/images";

export function Hero() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const decorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (bgRef.current) {
          bgRef.current.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(1.05)`;
        }
        if (decorRef.current) {
          decorRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-950 pb-20 pt-10">
      <div
        ref={bgRef}
        aria-hidden
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,20,60,.92) 0%, rgba(0,14,38,.9) 55%, rgba(0,14,38,.97) 100%), url('${img.hero}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 78% 12%, rgba(240,192,64,.3) 0, transparent 42%), radial-gradient(circle at 12% 88%, rgba(27,106,200,.35) 0, transparent 45%)",
        }}
      />

      <div
        ref={decorRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden will-change-transform lg:block"
      >
        <span className="absolute right-[8%] top-[18%] h-24 w-24 animate-float rounded-full border-2 border-gold-400/20 opacity-60" />
        <span className="absolute right-[16%] top-[38%] h-12 w-12 animate-float-slow rounded-full border border-white/10" />
        <span className="absolute bottom-[26%] left-[6%] h-16 w-16 animate-float rounded-full border-2 border-white/10" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="mb-8">
            <Logo className="h-40 w-40 sm:h-48 sm:w-48" priority />
          </div>

          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold-300">
            <HeartHandshake className="h-3.5 w-3.5" />
            Escolinha Social de Vôlei · Cesarão, RJ · Est. 2026
          </p>

          <h1 className="text-balance font-display text-5xl font-bold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Quinto Set
            <span className="block text-gold-400">Escolinha de Vôlei</span>
          </h1>

          <p className="mt-6 font-display text-lg font-semibold uppercase tracking-[0.2em] text-cream-100/90 sm:text-xl">
            Do Cesarão para o mundo.
          </p>

          <p className="mt-5 max-w-2xl text-base font-medium text-cream-100/80 sm:text-lg">
            Inclusão esportiva, educação e formação para jovens de 14 a 19
            anos. O esporte abre portas — a educação sustenta o caminho.
            Matrícula gratuita.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href="/matricula" size="lg">
              Quero fazer parte
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/sobre" size="lg" variant="outline">
              <Play className="h-5 w-5" />
              Conheça a Quinto Set
            </ButtonLink>
          </div>

          <div className="mt-12 grid w-full max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10">
            <div className="flex flex-col items-center gap-1 bg-navy-950/70 px-3 py-4">
              <span className="flex items-center gap-1.5 font-display text-lg font-bold text-gold-400">
                <Medal className="h-4 w-4" />
                14–19
              </span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-cream-100/60">
                Idade
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-navy-950/70 px-3 py-4">
              <span className="font-display text-lg font-bold text-gold-400">
                Grátis
              </span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-cream-100/60">
                Matrícula e treinos
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-navy-950/70 px-3 py-4">
              <span className="font-display text-lg font-bold text-gold-400">
                Sábados
              </span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-cream-100/60">
                Treinos
              </span>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#proposito"
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream-100/60 transition-colors hover:text-gold-400"
      >
        <ChevronDown className="h-7 w-7 animate-bounce" />
      </a>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
      />
    </section>
  );
}
