import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    number: "01",
    title: "Fundamentos",
    text: "Saque, recepção, levantamento, ataque e defesa — a base sólida de cada jogador.",
  },
  {
    number: "02",
    title: "Desenvolvimento físico",
    text: "Preparação física que acompanha o crescimento e a evolução de cada atleta.",
  },
  {
    number: "03",
    title: "Disciplina",
    text: "Compromisso, rotina e responsabilidade construídos dentro e fora da quadra.",
  },
  {
    number: "04",
    title: "Competição",
    text: "Treinamento específico para quem deseja competir, com foco em evolução real.",
  },
  {
    number: "05",
    title: "Educação",
    text: "A escola é parte do projeto. Formar atletas inteligentes e preparados.",
  },
  {
    number: "06",
    title: "Desenvolvimento social",
    text: "Convivência, respeito e amizade — valores que o esporte ensina para sempre.",
  },
];

export function Methodology() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 90% 10%, #f0c040 0, transparent 40%), radial-gradient(circle at 10% 90%, #1b6ac8 0, transparent 45%)",
        }}
      />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Como formamos"
            title="Nossa metodologia de formação"
            description="Uma abordagem completa que combina fundamentos do voleibol, desenvolvimento técnico, físico, educacional e social."
            align="center"
            dark
          />
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.number} delay={index * 70} className="h-full">
              <div className="group flex h-full flex-col bg-navy-950 p-8 transition-colors duration-300 hover:bg-navy-800">
                <span className="font-display text-5xl font-bold uppercase text-outline-gold transition-all duration-300 group-hover:text-gold-400">
                  {pillar.number}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-wide text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-100/65">
                  {pillar.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
