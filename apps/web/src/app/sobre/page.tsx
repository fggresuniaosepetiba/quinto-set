import type { Metadata } from "next";
import { ScrollText, Users, GraduationCap, Globe2 } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { img } from "@/data/images";

export const metadata: Metadata = {
  title: "A Quinto Set",
  description:
    "Conheça a Quinto Set Escolinha de Vôlei: inclusão esportiva, educação e formação de jovens e adolescentes no Cesarão, Rio de Janeiro.",
};

const pillars = [
  {
    icon: Users,
    title: "Inclusão",
    text: "Jovens de 14 a 19 anos, no masculino e no feminino, que nunca tiveram contato com o vôlei são bem-vindos. Não existe teste obrigatório de entrada.",
  },
  {
    icon: GraduationCap,
    title: "Educação",
    text: "O vínculo com a escola é parte do projeto. Formamos atletas preparados para o esporte — e para a vida.",
  },
  {
    icon: ScrollText,
    title: "Formação",
    text: "Fundamentos, desenvolvimento físico, disciplina e convivência construídos a cada treino, com acompanhamento da evolução de cada aluno.",
  },
  {
    icon: Globe2,
    title: "Futuro",
    text: "O núcleo do Cesarão é o ponto de partida. A visão é crescer em novos polos e unidades — uma rede de formação esportiva.",
  },
];

export default function SobrePage() {
  return (
    <>
      <PageHeader
        eyebrow="A Quinto Set"
        title="Um projeto social nascido do esporte"
        description="A Quinto Set Escolinha de Vôlei nasceu da união entre a AMOCOC e a União de Sepetiba para oferecer inclusão esportiva e formação a jovens e adolescentes do Cesarão."
      />

      <section className="bg-cream-50 py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative">
                <div className="overflow-hidden rounded-2xl shadow-2xl shadow-navy-900/20 ring-1 ring-navy-900/10">
                  <img
                    src={img.youthGame}
                    alt="Jovens jogando vôlei"
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <SectionHeading
                eyebrow="Nossa história"
                title="Mais do que uma escolinha. Uma porta de entrada para possibilidades."
              />
              <p className="mt-6 text-base leading-relaxed text-navy-900/75 sm:text-lg">
                A Quinto Set nasceu com uma missão que vai muito além de
                ensinar voleibol. A proposta é usar o esporte como ferramenta
                de desenvolvimento, disciplina, educação, convivência e
                transformação social.
              </p>
              <p className="mt-4 text-base leading-relaxed text-navy-900/70">
                A formação de atletas é importante, e o alto rendimento é uma
                possibilidade futura. Mas o principal pilar é o impacto social:
                oferecer uma alternativa saudável para o período pós-escola,
                promovendo esporte, educação e desenvolvimento.
              </p>
              <p className="mt-4 text-base leading-relaxed text-navy-900/70">
                O projeto foi criado e é apoiado pela{" "}
                <strong className="font-semibold text-navy-900">
                  AMOCOC
                </strong>{" "}
                — Associação de Moradores do Conjunto Otacílio Câmara — e pelo{" "}
                <strong className="font-semibold text-navy-900">
                  Grêmio Recreativo Escola de Samba União de Sepetiba
                </strong>
                , com autonomia própria e identidade própria.
              </p>
            </Reveal>
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 80}>
                <div className="group h-full rounded-xl bg-white p-7 shadow-sm ring-1 ring-navy-900/10 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-950 text-gold-400 transition-colors group-hover:bg-gold-400 group-hover:text-navy-950">
                    <pillar.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold uppercase tracking-wide text-navy-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
                    {pillar.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
