import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const milestones = [
  {
    number: "01",
    title: "Núcleos e polos",
    text: "Novos núcleos de formação em outras comunidades e regiões.",
  },
  {
    number: "02",
    title: "Centros de formação",
    text: "Estruturas dedicadas ao desenvolvimento esportivo de alta qualidade.",
  },
  {
    number: "03",
    title: "Do Cesarão para o mundo",
    text: "Outras cidades, estados — e, futuramente, outros países.",
  },
];

export function Future() {
  return (
    <section className="relative overflow-hidden bg-cream-50 py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="left">
            <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.25em] text-gold-600">
              Visão de futuro
            </p>
            <h2 className="text-balance font-display text-3xl font-bold uppercase leading-tight tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
              Começamos no Cesarão.{" "}
              <span className="text-gold-600">
                Não pretendemos parar aqui.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-900/75 sm:text-lg">
              Hoje existe um núcleo formador. A visão é construir uma rede:
              novos núcleos, polos e unidades que levem o mesmo projeto para
              outras regiões, cidades e estados. Cada jovem alcançado é mais um
              passo nessa caminhada.
            </p>

            <div className="mt-10 space-y-6">
              {milestones.map((milestone, index) => (
                <Reveal key={milestone.number} delay={index * 90}>
                  <div className="flex gap-5">
                    <span className="font-display text-3xl font-bold uppercase text-outline-gold">
                      {milestone.number}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold uppercase tracking-wide text-navy-900">
                        {milestone.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-navy-900/65">
                        {milestone.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <ButtonLink href="/sobre" className="mt-10" variant="outline">
              <span className="text-navy-900">Conheça nossa história</span>
            </ButtonLink>
          </Reveal>

          <Reveal direction="right" delay={120}>
            <div
              className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center"
              aria-hidden
            >
              <span className="absolute inset-0 rounded-full border border-gold-500/40" />
              <span className="absolute inset-[11%] rounded-full border border-navy-900/20" />
              <span className="absolute inset-[22%] rounded-full border border-gold-500/30" />
              <span className="absolute inset-[33%] rounded-full border border-navy-900/15" />

              <span className="absolute left-[6%] top-[20%] h-3 w-3 rounded-full bg-gold-500" />
              <span className="absolute right-[8%] top-[34%] h-2.5 w-2.5 rounded-full bg-navy-500" />
              <span className="absolute bottom-[18%] right-[14%] h-3 w-3 rounded-full bg-gold-600" />
              <span className="absolute bottom-[30%] left-[10%] h-2 w-2 rounded-full bg-navy-400" />
              <span className="absolute right-[2%] top-[55%] h-2 w-2 rounded-full bg-gold-400" />
              <span className="absolute left-[4%] top-[62%] h-2.5 w-2.5 rounded-full bg-navy-600" />
              <span className="absolute bottom-[6%] left-[28%] h-2 w-2 rounded-full bg-gold-500" />

              <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-navy-950 text-center shadow-2xl shadow-navy-900/40 ring-4 ring-gold-400/30">
                <span className="font-display text-2xl font-bold uppercase leading-none text-gold-400">
                  Cesarão
                </span>
                <span className="mt-2 px-6 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cream-100/70">
                  O ponto de partida
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
