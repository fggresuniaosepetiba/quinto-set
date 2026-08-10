import {
  Clock,
  GraduationCap,
  Shield,
  Users,
  Activity,
  Rocket,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { img } from "@/data/images";

const impacts = [
  {
    icon: Clock,
    title: "Tempo pós-escola",
    text: "Uma alternativa saudável e construtiva para as tardes e o tempo livre.",
  },
  {
    icon: GraduationCap,
    title: "Estímulo à educação",
    text: "A escola é parte da filosofia. O desempenho escolar é valorizado.",
  },
  {
    icon: Shield,
    title: "Disciplina",
    text: "Rotina, compromisso e responsabilidade construídos dentro da quadra.",
  },
  {
    icon: Users,
    title: "Vínculos e amizade",
    text: "Convivência, respeito e trabalho em equipe entre os jovens da comunidade.",
  },
  {
    icon: Activity,
    title: "Saúde e bem-estar",
    text: "Atividade física regular, qualidade de vida e desenvolvimento do corpo.",
  },
  {
    icon: Rocket,
    title: "Novas possibilidades",
    text: "Um novo horizonte para quem sonha com o esporte — ou com qualquer outra coisa.",
  },
];

export function SocialImpact() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `url('${img.youthGame}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/85 to-navy-950"
      />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Impacto Social"
            title="O esporte é o começo. A transformação é o objetivo."
            align="center"
            dark
          />
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-cream-100/75 sm:text-lg">
            A Quinto Set nasceu para oferecer inclusão esportiva a jovens e
            adolescentes, usando o vôlei como ferramenta de desenvolvimento,
            disciplina, educação e convivência — uma alternativa real para a
            comunidade do Cesarão.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {impacts.map((impact, index) => (
            <Reveal key={impact.title} delay={index * 60}>
              <div className="group h-full rounded-xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:bg-white/[0.06]">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-400/10 text-gold-400 ring-1 ring-gold-400/20 transition-colors group-hover:bg-gold-400 group-hover:text-navy-950">
                  <impact.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold uppercase tracking-wide text-white">
                  {impact.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-100/65">
                  {impact.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
