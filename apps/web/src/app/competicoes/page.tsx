import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import { ArrowRight, Medal, Rocket, Trophy } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { img } from "@/data/images";

export const metadata: Metadata = {
  title: "Competições",
  description:
    "O futuro competitivo da Quinto Set: a formação atual prepara as bases para que os alunos representem a escolinha em competições de voleibol.",
};

const timeline = [
  {
    period: "Hoje",
    title: "Formamos",
    text: "Fundamentos, disciplina e desenvolvimento construídos treino a treino. As bases de tudo que vem pela frente.",
  },
  {
    period: "Amanhã",
    title: "Competiremos",
    text: "A formação abre caminho para que os alunos representem a Quinto Set em competições — quando o projeto estiver pronto para isso.",
  },
  {
    period: "Futuro",
    title: "Escreveremos história",
    text: "Grandes histórias começam antes do primeiro título. A Quinto Set está construindo exatamente esse começo.",
  },
];

export default function CompeticoesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Competições"
        title="Nosso futuro competitivo"
        description="A Quinto Set está começando em 2026. Hoje formamos. Amanhã, competiremos."
      />

      <section className="bg-cream-50 py-20 sm:py-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-navy-950 p-10 sm:p-16">
              <div
                aria-hidden
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url('${img.spike}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/88 to-navy-950/60" />
              <div className="relative max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
                  <Medal className="h-3.5 w-3.5" />
                  Um projeto construído para competir
                </span>
                <h2 className="mt-6 text-balance font-display text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Uma nova geração começa aqui.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-cream-100/75 sm:text-lg">
                  A Quinto Set não possui títulos nem história competitiva
                  ainda. Possui algo mais valioso: um começo. Cada treino, cada
                  fundamento aprendido e cada jovem transformado constroem as
                  bases de um futuro competitivo sólido.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-20">
            <SectionHeading
              eyebrow="Caminho"
              title="Do primeiro treino à competição"
              align="center"
            />

            <div className="mt-14 flex flex-col gap-6 lg:flex-row lg:items-stretch">
              {timeline.map((item, index) => (
                <Fragment key={item.period}>
                  <Reveal delay={index * 100} className="flex-1">
                    <div className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-navy-900/10 transition-all hover:-translate-y-1 hover:shadow-lg">
                      <span className="inline-flex w-fit rounded-md bg-navy-950 px-3 py-1 font-display text-xs font-bold uppercase tracking-widest text-gold-400">
                        {item.period}
                      </span>
                      <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-wide text-navy-900">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-navy-900/65">
                        {item.text}
                      </p>
                    </div>
                  </Reveal>
                  {index < timeline.length - 1 && (
                    <Reveal
                      delay={index * 100 + 50}
                      className="hidden lg:flex lg:items-center"
                    >
                      <ArrowRight className="h-8 w-8 shrink-0 text-gold-500" />
                    </Reveal>
                  )}
                </Fragment>
              ))}
            </div>
          </div>

          <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-navy-900/20 ring-1 ring-navy-900/10">
                <Image
                  src={img.women}
                  alt="Partida de vôlei"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal direction="right" delay={120}>
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-950 text-gold-400">
                <Trophy className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-navy-900 sm:text-3xl">
                Grandes histórias começam antes do primeiro título.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-900/70">
                Existe um caminho. Nós oferecemos a oportunidade. Cada jovem
                que entra na Quinto Set com a disposição de aprender já está
                dando o primeiro passo de algo que pode se tornar enorme.
              </p>
              <p className="mt-4 text-base leading-relaxed text-navy-900/70">
                Quando o momento chegar, a Quinto Set competirá com a estrutura,
                a disciplina e a educação que foram construídas desde o
                primeiro dia.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/matricula">
                  Fazer parte dessa história
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/treinamentos" variant="outline">
                  <Rocket className="h-4 w-4" />
                  <span className="text-navy-900">Ver treinamentos</span>
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
