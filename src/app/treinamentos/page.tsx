import type { Metadata } from "next";
import { ArrowRight, CalendarDays, ClipboardCheck, Dumbbell, LineChart } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { img } from "@/data/images";

export const metadata: Metadata = {
  title: "Treinamentos",
  description:
    "Formação completa em voleibol para jovens de 14 a 19 anos: fundamentos, desenvolvimento físico, preparação para competição, disciplina e educação.",
};

const trainingPillars = [
  {
    number: "01",
    title: "Fundamentos do vôlei",
    text: "Saque, recepção, levantamento, ataque, bloqueio e defesa trabalhados com método e constância.",
  },
  {
    number: "02",
    title: "Desenvolvimento técnico",
    text: "Aperfeiçoamento dos movimentos e da leitura de jogo, respeitando o ritmo de cada atleta.",
  },
  {
    number: "03",
    title: "Desenvolvimento físico",
    text: "Preparação física adequada à idade, cuidando do corpo e prevenindo lesões.",
  },
  {
    number: "04",
    title: "Preparação para competição",
    text: "Treinamento específico para atletas que desejam competir, com foco em evolução.",
  },
  {
    number: "05",
    title: "Disciplina e convivência",
    text: "Valores como respeito, responsabilidade e trabalho em equipe em cada treino.",
  },
  {
    number: "06",
    title: "Educação e acompanhamento",
    text: "Evolução acompanhada de perto, com feedback para os responsáveis.",
  },
];

const values = [
  { icon: CalendarDays, title: "Aos sábados", text: "Os treinamentos acontecem aos sábados, no Cesarão." },
  { icon: LineChart, title: "Acompanhamento", text: "A evolução de cada aluno é acompanhada pela equipe." },
  { icon: ClipboardCheck, title: "Feedback", text: "Os responsáveis recebem informações sobre o desenvolvimento." },
  { icon: Dumbbell, title: "Formação completa", text: "Física, técnica, social e educacional — de forma integrada." },
];

export default function TreinamentosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Treinamentos"
        title="Formação completa em voleibol"
        description="Uma metodologia própria de formação que combina fundamentos, desenvolvimento físico e preparação para competição com disciplina, educação e convivência."
      />

      <section className="bg-cream-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Como treinamos"
            title="O que faz parte da nossa metodologia"
            align="center"
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trainingPillars.map((pillar, index) => (
              <Reveal key={pillar.number} delay={index * 70}>
                <div className="group h-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-navy-900/10 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <span className="font-display text-5xl font-bold uppercase text-outline-gold transition-all duration-300 group-hover:text-gold-600">
                    {pillar.number}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-wide text-navy-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
                    {pillar.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal direction="left">
              <div className="overflow-hidden rounded-2xl shadow-2xl shadow-navy-900/20 ring-1 ring-navy-900/10">
                <img
                  src={img.men}
                  alt="Jovens treinando vôlei"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>
            <Reveal direction="right" delay={120}>
              <SectionHeading
                eyebrow="Na prática"
                title="Tudo começa no sábado"
              />
              <p className="mt-6 text-base leading-relaxed text-navy-900/75 sm:text-lg">
                Atualmente, os treinamentos acontecem aos sábados. Horários
                específicos e detalhes sobre o dia a dia são confirmados durante
                o processo de inscrição.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {values.map((value) => (
                  <div key={value.title} className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-gold-600">
                      <value.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-bold uppercase tracking-wide text-navy-900">
                        {value.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-navy-900/65">
                        {value.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <ButtonLink href="/matricula" className="mt-10">
                Começar a treinar
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
