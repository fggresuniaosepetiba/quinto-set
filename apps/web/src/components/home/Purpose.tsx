import { ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { img } from "@/data/images";

const pillars = [
  {
    title: "Inclusão de verdade",
    text: "Jovens que nunca tocaram em uma bola são bem-vindos. Não existe teste obrigatório de entrada.",
  },
  {
    title: "Esporte como caminho",
    text: "Disciplina, convivência, superação e desenvolvimento dentro e fora da quadra.",
  },
  {
    title: "Educação em primeiro lugar",
    text: "A formação exige vínculo com a escola. Um atleta também precisa ser preparado para a vida.",
  },
];

export function Purpose() {
  return (
    <section id="proposito" className="bg-cream-50 py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl shadow-navy-900/20 ring-1 ring-navy-900/10">
                <img
                  src={img.youth}
                  alt="Jovens praticando vôlei em equipe"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-8 -right-4 hidden rounded-xl bg-navy-950 px-6 py-5 shadow-xl ring-1 ring-gold-400/30 sm:block">
                <p className="font-display text-2xl font-bold uppercase leading-none text-gold-400">
                  O quinto set
                </p>
                <p className="mt-2 max-w-[180px] text-xs leading-relaxed text-cream-100/70">
                  O momento em que tudo pode mudar.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Nosso Propósito"
              title="Mais do que formar jogadores. Formar possibilidades."
            />
            <p className="mt-6 text-base leading-relaxed text-navy-900/75 sm:text-lg">
              No vôlei, o quinto set é o momento em que tudo pode mudar. É o
              set da decisão — o que exige coragem, concentração, disciplina e
              união. A Quinto Set nasceu com essa filosofia.
            </p>
            <p className="mt-4 text-base leading-relaxed text-navy-900/70">
              Um jovem pode chegar sem saber jogar, aprender, evoluir, competir
              e até descobrir um novo caminho. Aqui, cada atleta é visto como
              um projeto de futuro.
            </p>

            <ul className="mt-8 space-y-5">
              {pillars.map((pillar) => (
                <li key={pillar.title} className="flex gap-4">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
                    <Zap className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold uppercase tracking-wide text-navy-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-navy-900/65">
                      {pillar.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/sobre"
              className="mt-10 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-gold-600 transition-colors hover:text-gold-700"
            >
              Conheça a Quinto Set
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
