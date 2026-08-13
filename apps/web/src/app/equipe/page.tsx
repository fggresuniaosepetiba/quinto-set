import type { Metadata } from "next";
import { Award, HeartHandshake, Target, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import DirectorsChart from "@/components/equipe/DirectorsChart";

export const metadata: Metadata = {
  title: "Equipe",
  description:
    "Conheça a estrutura da Quinto Set Escolinha de Vôlei. A direção executiva e a liderança comprometida com o desenvolvimento dos jovens do Cesarão.",
};

const culture = [
  {
    icon: Users,
    title: "Formação em primeiro lugar",
    text: "Cada profissional da Quinto Set atua com foco no desenvolvimento dos jovens — dentro e fora da quadra.",
  },
  {
    icon: Target,
    title: "Compromisso com a comunidade",
    text: "Uma equipe que entende o impacto social do esporte e trabalha para transformar o Cesarão.",
  },
  {
    icon: Award,
    title: "Esporte com responsabilidade",
    text: "Organização, transparência e acompanhamento próximo dos alunos e das famílias.",
  },
];

export default function EquipePage() {
  return (
    <>
      <PageHeader
        eyebrow="Equipe"
        title="Pessoas que fazem o quinto set acontecer"
        description="Conheça a liderança da Quinto Set. Uma equipe comprometida com a formação esportiva, educacional e social dos jovens do Cesarão."
      />

      <section className="bg-cream-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Organograma"
            title="Direção executiva"
            align="center"
          />
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-navy-900/65 sm:text-base">
            As três lideranças que conduzem o projeto no dia a dia. Clique em
            uma foto para ampliar. Abaixo, a equipe que se formará com o
            crescimento da escolinha.
          </p>

          <DirectorsChart />

          <div className="mt-16 text-center">
            <SectionHeading
              eyebrow="Nossa cultura"
              title="O espírito da nossa equipe"
              align="center"
            />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {culture.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <div className="h-full rounded-xl bg-white p-7 shadow-sm ring-1 ring-navy-900/10 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-950 text-gold-400">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold uppercase tracking-wide text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-navy-950 p-10 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="flex items-center gap-4">
                <HeartHandshake className="h-8 w-8 shrink-0 text-gold-400" />
                <p className="max-w-md text-sm leading-relaxed text-cream-100/80">
                  Quer contribuir com a Quinto Set como voluntário ou
                  profissional? Entre em contato com a equipe.
                </p>
              </div>
              <a
                href="/contato"
                className="inline-flex shrink-0 items-center justify-center rounded-md bg-gold-400 px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-navy-950 transition-colors hover:bg-gold-300"
              >
                Falar com a equipe
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
