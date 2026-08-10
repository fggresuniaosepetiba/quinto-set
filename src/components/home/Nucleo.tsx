import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

const stats = [
  { value: 2026, label: "Ano de fundação" },
  { static: "Grátis", label: "Matrícula e treinos", staticLabel: true },
  { static: "SUB-14 → SUB-19", label: "Formação completa", staticLabel: true },
  { value: 1, label: "Núcleo formador inicial" },
];

export function Nucleo() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 30%, #1b6ac8 0, transparent 45%), radial-gradient(circle at 90% 80%, #f0c040 0, transparent 35%)",
        }}
      />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
              <MapPin className="h-3.5 w-3.5" />
              Núcleo formador
            </span>
            <h2 className="mt-6 text-balance font-display text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              A Quinto Set começa no{" "}
              <span className="text-gold-400">Cesarão</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-100/75 sm:text-lg">
              No Conjunto Otacílio Câmara, os treinamentos acontecem aos
              sábados, reunindo a comunidade em torno do esporte. Este é o
              ponto de partida — e o coração do projeto.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, index) =>
            stat.static ? (
              <Reveal key={stat.label} delay={index * 90}>
                <div className="flex h-44 w-full flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center transition-colors hover:border-gold-400/40 hover:bg-white/[0.06] sm:h-52">
                  <span className="font-display text-xl font-bold leading-snug text-gold-400 sm:text-2xl">
                    {stat.static}
                  </span>
                  <span className="mt-3 text-sm font-semibold uppercase tracking-widest text-cream-100/70">
                    {stat.label}
                  </span>
                </div>
              </Reveal>
            ) : (
              <Reveal key={stat.label} delay={index * 90}>
                <div className="flex h-44 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-center transition-colors hover:border-gold-400/40 hover:bg-white/[0.06] sm:h-52">
                  <Counter value={stat.value!} label={stat.label} />
                </div>
              </Reveal>
            ),
          )}
        </div>
      </Container>
    </section>
  );
}
