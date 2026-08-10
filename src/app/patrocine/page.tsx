import type { Metadata } from "next";
import {
  HeartHandshake,
  Megaphone,
  TrendingUp,
  Users,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SponsorsMarquee } from "@/components/home/SponsorsMarquee";
import { SponsorForm } from "@/components/patrocine/SponsorForm";

export const metadata: Metadata = {
  title: "Patrocine",
  description:
    "Apoie a Quinto Set Escolinha de Vôlei. Empresas e instituições podem contribuir com a formação esportiva e social de jovens do Cesarão, Rio de Janeiro.",
};

const benefits = [
  {
    icon: HeartHandshake,
    title: "Impacto social real",
    text: "Associe sua marca a um projeto que transforma a vida de jovens e adolescentes pelo esporte.",
  },
  {
    icon: Megaphone,
    title: "Marca em evidência",
    text: "Visibilidade da sua marca na comunicação oficial e na identidade da Quinto Set.",
  },
  {
    icon: TrendingUp,
    title: "Propósito que engaja",
    text: "Conecte sua empresa a uma causa de inclusão, educação e desenvolvimento comunitário.",
  },
  {
    icon: Users,
    title: "Comunidade envolvida",
    text: "Apoie diretamente famílias e jovens do Cesarão — uma audiência autêntica e engajada.",
  },
  {
    icon: Sparkles,
    title: "Construção de legado",
    text: "Faça parte da história de uma iniciativa que pretende crescer do Cesarão para o mundo.",
  },
  {
    icon: Lightbulb,
    title: "Parcerias flexíveis",
    text: "Apoio financeiro, materiais, equipamentos, voluntariado ou parceria institucional.",
  },
];

export default function PatrocinePage() {
  return (
    <>
      <PageHeader
        eyebrow="Para Empresas"
        title="Apoie uma história que está começando"
        description="A Quinto Set é uma escolinha social de vôlei no Cesarão. Sua empresa pode ajudar a transformar o esporte em oportunidade para dezenas de jovens."
      />

      <section className="bg-cream-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Por que apoiar"
            title="Uma marca que apoia o esporte apoia o futuro"
            align="center"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 60}>
                <div className="group h-full rounded-xl bg-white p-7 shadow-sm ring-1 ring-navy-900/10 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-950 text-gold-400 transition-colors group-hover:bg-gold-400 group-hover:text-navy-950">
                    <benefit.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold uppercase tracking-wide text-navy-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
                    {benefit.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-navy-900 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Patrocinadores & Apoiadores"
            title="Quem já faz parte dessa história"
            description="Instituições e empresas que apoiam a criação e o desenvolvimento da Quinto Set."
            align="center"
            dark
          />
        </Container>
        <div className="mt-12">
          <SponsorsMarquee />
        </div>
      </section>

      <section className="bg-cream-50 py-20 sm:py-24">
        <Container>
          <div id="contato" className="grid gap-10 scroll-mt-28 rounded-2xl bg-white p-8 shadow-lg shadow-navy-900/10 ring-1 ring-navy-900/10 sm:p-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Quer apoiar a Quinto Set?"
                title="Vamos conversar"
                description="Preencha o formulário e a equipe da Quinto Set entrará em contato para apresentar as possibilidades de apoio e parceria."
              />
              <div className="mt-8 space-y-4 text-sm text-navy-900/70">
                <p className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-gold-500" />
                  Apoio direto à formação de jovens do Cesarão
                </p>
                <p className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-gold-500" />
                  Transparência e comunicação próxima com o parceiro
                </p>
                <p className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-gold-500" />
                  Parcerias desenhadas para cada empresa
                </p>
              </div>
            </div>
            <SponsorForm />
          </div>
        </Container>
      </section>
    </>
  );
}
