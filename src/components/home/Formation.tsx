import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { img } from "@/data/images";

const values = [
  "Educação",
  "Disciplina",
  "Respeito",
  "Responsabilidade",
  "Trabalho em equipe",
  "Amizade",
  "Superação",
  "Liderança",
];

export function Formation() {
  return (
    <section className="bg-cream-50 py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="left">
            <SectionHeading
              eyebrow="Formação Esportiva"
              title="Uma escolinha com cara de centro de formação"
            />
            <p className="mt-6 text-base leading-relaxed text-navy-900/75 sm:text-lg">
              A Quinto Set oferece formação completa em voleibol: fundamentos,
              desenvolvimento técnico e físico, preparação para competição,
              disciplina e convivência — tudo dentro de uma metodologia própria
              de formação.
            </p>
            <p className="mt-4 text-base leading-relaxed text-navy-900/70">
              Cada aluno é acompanhado na sua evolução, e os responsáveis
              recebem feedback do desenvolvimento físico, esportivo, social e
              educacional.
            </p>
            <p className="mt-4 text-base leading-relaxed text-navy-900/70">
              Não é preciso saber jogar. O caminho começa no primeiro treino —
              e é construído a cada semana.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2.5">
              {values.map((value) => (
                <li
                  key={value}
                  className="rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-wider text-gold-700"
                >
                  {value}
                </li>
              ))}
            </ul>

            <Link
              href="/treinamentos"
              className="mt-10 inline-flex items-center gap-2 rounded-md bg-navy-950 px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-gold-400 transition-colors hover:bg-navy-900"
            >
              Conheça os treinamentos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal direction="right" delay={120}>
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-4 sm:space-y-5">
                <div className="overflow-hidden rounded-xl shadow-lg shadow-navy-900/15 ring-1 ring-navy-900/10">
                  <img
                    src={img.quadra}
                    alt="Atleta de vôlei em quadra"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-xl shadow-lg shadow-navy-900/15 ring-1 ring-navy-900/10">
                  <img
                    src={img.beach}
                    alt="Jovem praticando vôlei"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8 sm:space-y-5 sm:pt-10">
                <div className="overflow-hidden rounded-xl shadow-lg shadow-navy-900/15 ring-1 ring-navy-900/10">
                  <img
                    src={img.player}
                    alt="Manchete de vôlei em treino"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-xl shadow-lg shadow-navy-900/15 ring-1 ring-navy-900/10">
                  <img
                    src={img.hit}
                    alt="Ataque de vôlei"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
