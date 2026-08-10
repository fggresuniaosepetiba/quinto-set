"use client";

import { useState } from "react";
import { Camera, Clapperboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { img } from "@/data/images";

type Category = "todos" | "treinamentos" | "jogos" | "comunidade" | "bastidores";

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: Exclude<Category, "todos">;
};

const items: GalleryItem[] = [
  { id: "g1", src: img.quadra, alt: "Treino de vôlei em quadra", category: "treinamentos" },
  { id: "g2", src: img.youthGame, alt: "Jovens jogando vôlei", category: "jogos" },
  { id: "g3", src: img.beach, alt: "Manchete durante o treino", category: "treinamentos" },
  { id: "g4", src: img.player, alt: "Fundamento de vôlei", category: "treinamentos" },
  { id: "g5", src: img.hit, alt: "Ataque de vôlei", category: "jogos" },
  { id: "g6", src: img.women, alt: "Partida de vôlei feminino", category: "jogos" },
  { id: "g7", src: img.youth, alt: "Jovens da comunidade em ação", category: "comunidade" },
  { id: "g8", src: img.team, alt: "Trabalho em equipe", category: "comunidade" },
  { id: "g9", src: img.bluenet, alt: "Rede de vôlei", category: "bastidores" },
  { id: "g10", src: img.men, alt: "Grupo de jovens treinando", category: "treinamentos" },
  { id: "g11", src: img.womanHit, alt: "Saque de vôlei", category: "jogos" },
  { id: "g12", src: img.net, alt: "Quadra pronta para o jogo", category: "bastidores" },
];

const categories: { id: Category; label: string }[] = [
  { id: "todos", label: "Todas" },
  { id: "treinamentos", label: "Treinamentos" },
  { id: "jogos", label: "Jogos" },
  { id: "comunidade", label: "Comunidade" },
  { id: "bastidores", label: "Bastidores" },
];

export function Gallery() {
  const [active, setActive] = useState<Category>("todos");

  const filtered = items.filter(
    (item) => active === "todos" || item.category === active,
  );

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActive(category.id)}
            aria-pressed={active === category.id}
            className={cn(
              "rounded-full px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-wider transition-colors",
              active === category.id
                ? "bg-gold-400 text-navy-950"
                : "border border-navy-900/15 bg-white text-navy-900/70 hover:border-gold-500 hover:text-gold-600",
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <figure
            key={item.id}
            className="group relative overflow-hidden rounded-xl shadow-sm ring-1 ring-navy-900/10"
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-navy-950/90 to-transparent px-4 pb-4 pt-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="flex items-center gap-2 text-sm font-semibold text-white">
                <Camera className="h-4 w-4 text-gold-400" />
                {item.alt}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-navy-900/15 bg-white p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
          <Clapperboard className="h-6 w-6" />
        </span>
        <h3 className="font-display text-xl font-bold uppercase tracking-wide text-navy-900">
          Vídeos, eventos e ações sociais em breve
        </h3>
        <p className="max-w-xl text-sm leading-relaxed text-navy-900/65">
          A galeria está pronta para receber fotos e vídeos reais da Quinto Set:
          treinamentos, jogos, eventos, ações sociais e bastidores. Conforme o
          projeto crescer, este espaço ganhará vida.
        </p>
      </div>
    </>
  );
}
