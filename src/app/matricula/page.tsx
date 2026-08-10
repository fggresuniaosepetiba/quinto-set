import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MatriculaForm } from "@/components/matricula/MatriculaForm";

export const metadata: Metadata = {
  title: "Matrícula",
  description:
    "Matrícula gratuita na Quinto Set Escolinha de Vôlei. Inicie o cadastro online e confirme a inscrição na AMOCOC. Treinamentos aos sábados no Cesarão.",
};

const steps = [
  {
    number: "1",
    title: "Preenche o cadastro",
    text: "Inicie a inscrição pelo site, de forma simples e segura.",
  },
  {
    number: "2",
    title: "Recebe a orientação",
    text: "A equipe orienta sobre os próximos passos e a documentação.",
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
    text: "O caminho começa no primeiro treino, aos sábados.",
  },
];

export default function MatriculaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Matrícula Gratuita"
        title="Faça parte da Quinto Set"
        description="Inicie o cadastro online. O responsável confirma a inscrição na AMOCOC. A matrícula e os treinamentos são gratuitos."
      />

      <section className="bg-cream-50 py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <Reveal>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-navy-900 sm:text-3xl">
                  Como funciona a matrícula
                </h2>
                <p className="mt-4 text-base leading-relaxed text-navy-900/70">
                  O cadastro online é o primeiro passo. O responsável precisa
                  comparecer à AMOCOC para validar e confirmar a inscrição.
                </p>
              </Reveal>

              <div className="mt-8 space-y-5">
                {steps.map((step, index) => (
                  <Reveal key={step.number} delay={index * 70}>
                    <div className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-950 font-display text-lg font-bold text-gold-400">
                        {step.number}
                      </span>
                      <div className="pt-1.5">
                        <h3 className="font-display text-base font-bold uppercase tracking-wide text-navy-900">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-navy-900/65">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={150}>
                <div className="mt-10 rounded-xl border border-gold-500/30 bg-gold-500/10 p-5">
                  <p className="text-sm leading-relaxed text-navy-900/80">
                    <strong className="font-semibold text-navy-900">
                      Aulas gratuitas:
                    </strong>{" "}
                    não existe formulário separado para aula experimental.
                    Basta comparecer e participar. As aulas são gratuitas.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <MatriculaForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
