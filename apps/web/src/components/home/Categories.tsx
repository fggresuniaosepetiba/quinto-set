import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { img } from "@/data/images";

const categories = [
  {
    code: "SUB-14",
    age: "14 anos",
    concept: "O primeiro contato com a formação. Bases do vôlei e do espírito de equipe.",
    image: img.women,
  },
  {
    code: "SUB-16",
    age: "15 a 16 anos",
    concept: "Consolidação dos fundamentos e desenvolvimento físico em ritmo de evolução.",
    image: img.quadra,
  },
  {
    code: "SUB-18",
    age: "17 a 18 anos",
    concept: "Refinamento técnico, leitura de jogo e preparação para a competição.",
    image: img.hit,
  },
  {
    code: "SUB-19",
    age: "19 anos",
    concept: "O passo final da formação. Pronto para competir — e para a vida.",
    image: img.player,
  },
];

export function Categories() {
  return (
    <section className="bg-cream-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Categorias"
          title="Formação para cada fase do crescimento"
          description="A Quinto Set atende jovens e adolescentes de 14 a 19 anos, no masculino e no feminino — com espaço para turmas mistas."
          align="center"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal key={category.code} delay={index * 80}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy-900/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy-900/15">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={category.image}
                    alt={`Categoria ${category.code} da Quinto Set`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-md bg-gold-400 px-2.5 py-1 font-display text-sm font-bold uppercase tracking-wider text-navy-950">
                    {category.code}
                  </span>
                  <span className="absolute bottom-3 left-4 font-display text-xs font-semibold uppercase tracking-widest text-white">
                    {category.age}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex-1 text-sm leading-relaxed text-navy-900/70">
                    {category.concept}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                    Masculino · Feminino
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
