"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PlusCircle, X } from "lucide-react";
import { directors, type Director } from "@/data/directors";
import { Reveal } from "@/components/ui/Reveal";

function DirectorCard({
  director,
  onSelect,
}: {
  director: Director;
  onSelect: (director: Director) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(director)}
      className="group w-full max-w-[15rem] cursor-pointer rounded-2xl bg-white p-4 text-center shadow-lg shadow-navy-900/10 ring-1 ring-navy-900/10 transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-gold-500/50"
      aria-label={`Ampliar foto de ${director.name}`}
    >
      <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-xl">
        <Image
          src={director.photo}
          alt={director.name}
          fill
          sizes="(max-width: 640px) 80vw, 25vw"
          className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
      </div>
      <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-wide text-navy-900">
        {director.name}
      </h3>
      <span className="mt-1 inline-block rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-gold-700">
        {director.role}
      </span>
    </button>
  );
}

export default function DirectorsChart() {
  const [selected, setSelected] = useState<Director | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      <div className="relative mx-auto mt-12 max-w-4xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {directors.map((director, index) => (
            <Reveal key={director.name} delay={index * 100}>
              <div className="flex flex-col items-center">
                <DirectorCard director={director} onSelect={setSelected} />
                <div className="hidden h-8 w-px bg-navy-900/25 sm:block" />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="hidden h-px w-full bg-navy-900/25 sm:block" />
        <div className="relative hidden h-8 w-px bg-navy-900/25 sm:mx-auto sm:block" />
      </div>

      <Reveal delay={200}>
        <div className="mx-auto mt-8 max-w-md sm:mt-0">
          <div className="rounded-2xl border-2 border-dashed border-navy-900/20 bg-white p-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
              <PlusCircle className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-wide text-navy-900">
              Diretoria e professores — em breve
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-navy-900/65">
              Os demais diretores e professores que passarem a integrar a
              Quinto Set serão apresentados aqui, conforme o projeto cresce.
            </p>
          </div>
        </div>
      </Reveal>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto de ${selected.name}`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/90 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            autoFocus
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-400 hover:text-navy-950"
            aria-label="Fechar ampliação"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-[70vh] w-full">
              <Image
                src={selected.photo}
                alt={selected.name}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                {selected.name}
              </h3>
              <span className="mt-2 inline-block rounded-full border border-gold-400/40 bg-gold-500/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-gold-400">
                {selected.role}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
