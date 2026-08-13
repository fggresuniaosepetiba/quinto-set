import { BadgeCheck, HeartHandshake, Wallet } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const freeItems = [
  { icon: BadgeCheck, label: "Matrícula gratuita" },
  { icon: HeartHandshake, label: "Treinamentos gratuitos" },
  { icon: Wallet, label: "Aula gratuita" },
];

const steps = [
  {
    number: "1",
    title: "Preenche o cadastro",
    text: "O responsável inicia a inscrição pelo site, de forma simples e segura.",
  },
  {
    number: "2",
    title: "Recebe a orientação",
    text: "A equipe orienta sobre os próximos passos e a documentação necessária.",
  },
  {
    number: "3",
    title: "Comparece à AMOCOC",
    text: "Vá até a Associação de Moradores do Conjunto Otacílio Câmara.",
  },
  {
    number: "4",
    title: "Confirma a inscrição",
    text: "Com a presença do responsável, a inscrição é validada.",
  },
  {
    number: "5",
    title: "Começa a treinar",
    text: "Bem-vindo à Quinto Set. O caminho começa no primeiro treino.",
  },
];

export function Gratuity() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1673058577973-68b6b6d53ccd?q=80&w=1920&auto=format&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/88 to-navy-950" />

      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.25em] text-gold-400">
              Escolinha social
            </p>
            <h2 className="text-balance font-display text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              O esporte é gratuito.{" "}
              <span className="text-gold-400">A transformação é o objetivo.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cream-100/75 sm:text-lg">
              A Quinto Set é uma escolinha social. Não existe mensalidade nem
              taxa de matrícula — as aulas e os treinamentos são gratuitos para
              os jovens e adolescentes da comunidade.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {freeItems.map((item, index) => (
            <Reveal key={item.label} delay={index * 90}>
              <div className="flex flex-col items-center gap-3 rounded-xl border border-gold-400/25 bg-gold-400/[0.07] px-6 py-8 text-center transition-colors hover:border-gold-400/50 hover:bg-gold-400/[0.12]">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-navy-950">
                  <item.icon className="h-7 w-7" />
                </span>
                <span className="font-display text-lg font-bold uppercase tracking-wide text-white">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <Reveal>
            <div className="text-center">
              <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.25em] text-gold-400">
                Como funciona a matrícula
              </p>
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
                Do cadastro à primeira aula
              </h3>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 80}>
                <div className="relative flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-gold-400/40">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400 font-display text-lg font-bold text-navy-950">
                    {step.number}
                  </span>
                  <h4 className="mt-4 font-display text-base font-bold uppercase tracking-wide text-white">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-cream-100/65">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 flex flex-col items-center gap-4 rounded-xl border border-gold-400/30 bg-gold-400/[0.06] p-6 text-center sm:p-8">
              <p className="max-w-2xl text-sm leading-relaxed text-cream-100/80 sm:text-base">
                <strong className="font-semibold text-white">
                  Importante:
                </strong>{" "}
                o preenchimento do formulário online não confirma a matrícula
                automaticamente. O responsável deve comparecer à AMOCOC para
                validar a inscrição.
              </p>
              <ButtonLink href="/matricula" size="lg">
                Iniciar matrícula gratuita
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
