import type { Metadata } from "next";
import { Mail, MapPin, Landmark, MessageCircleQuestion } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Quinto Set Escolinha de Vôlei. Cesarão, Rio de Janeiro. Informações de inscrição podem ser obtidas através da AMOCOC.",
};

const info = [
  {
    icon: MapPin,
    title: "Localização",
    text: "Cesarão, Rio de Janeiro. Os treinamentos acontecem em diferentes locais, sempre na comunidade.",
  },
  {
    icon: Landmark,
    title: "Inscrições",
    text: "As informações de inscrição podem ser obtidas através da AMOCOC — Associação de Moradores do Conjunto Otacílio Câmara.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Dúvidas",
    text: "Matrícula, aula experimental, voluntariado, imprensa ou parcerias: fale com a equipe da Quinto Set.",
  },
  {
    icon: Mail,
    title: "E-mail",
    text: siteConfig.email,
  },
];

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contato"
        title="Fale com a Quinto Set"
        description="Cesarão, Rio de Janeiro. Dúvidas sobre inscrição, aulas, voluntariado ou parcerias — estamos prontos para conversar."
      />

      <section className="bg-cream-50 py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <div className="space-y-5">
                {info.map((item, index) => (
                  <Reveal key={item.title} delay={index * 70}>
                    <div className="flex gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-navy-900/10">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-950 text-gold-400">
                        <item.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold uppercase tracking-wide text-navy-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-navy-900/65">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={100}>
              <div className="rounded-2xl bg-white p-6 shadow-lg shadow-navy-900/10 ring-1 ring-navy-900/10 sm:p-10">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
