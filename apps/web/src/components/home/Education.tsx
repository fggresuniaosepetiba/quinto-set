import { BookOpen, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { img } from "@/data/images";

const points = [
  {
    title: "Vínculo com a escola",
    text: "O aluno deve estar matriculado em instituição de ensino — ou comprovar a conclusão dos estudos.",
  },
  {
    title: "Boas notas valorizadas",
    text: "O desempenho escolar e a evolução no aprendizado são reconhecidos dentro do projeto.",
  },
  {
    title: "Formação para a vida",
    text: "Acreditamos que um atleta também precisa estar preparado para escolher o próprio futuro.",
  },
];

export function Education() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('${img.education}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/92 to-navy-950/75" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.25em] text-gold-400">
              Educação
            </p>
            <h2 className="text-balance font-display text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Antes do atleta,
              <span className="block text-gold-400">o ser humano.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/80 sm:text-lg">
              O esporte abre portas — a educação sustenta o caminho. A Quinto
              Set valoriza o vínculo do aluno com a escola e acredita que o
              desempenho escolar anda junto com a evolução em quadra.
            </p>
            <blockquote className="mt-8 border-l-4 border-gold-400 pl-5">
              <p className="font-display text-lg font-semibold uppercase leading-snug text-cream-100 sm:text-xl">
                &quot;Queremos formar jogadores. Mas, acima de tudo, pessoas
                capazes de escolher o próprio futuro.&quot;
              </p>
            </blockquote>
            <div className="mt-6 flex items-center gap-4 pl-5">
              <span
                aria-hidden
                className="h-px w-10 bg-gold-400/60"
              />
              <div className="leading-none">
                <p className="font-hand text-3xl text-gold-300 sm:text-4xl">
                  Marlon Silva
                </p>
                <p className="mt-2 font-display text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-cream-100/60">
                  Diretor Executivo Geral
                </p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-5">
            {points.map((point, index) => (
              <Reveal key={point.title} delay={index * 100}>
                <div className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-gold-400/40">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold-400/10 text-gold-400 ring-1 ring-gold-400/20">
                    {index === 0 ? (
                      <BookOpen className="h-5 w-5" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5" />
                    )}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold uppercase tracking-wide text-white">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-cream-100/70">
                      {point.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
