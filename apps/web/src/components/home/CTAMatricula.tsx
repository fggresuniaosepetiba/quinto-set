import { ArrowRight, CalendarCheck, MessageCircleQuestion } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { img } from "@/data/images";

export function CTAMatricula() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(100deg, rgba(0,20,60,.94) 0%, rgba(0,20,60,.82) 60%, rgba(0,14,38,.92) 100%), url('${img.quadra}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10 text-gold-400">
              <CalendarCheck className="h-6 w-6" />
            </span>
            <h2 className="mt-6 text-balance font-display text-3xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
              Quero fazer uma aula
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cream-100/75 sm:text-lg">
              As aulas são gratuitas — sem formulário separado e sem burocracia.
              Compareça, participe e descubra o que a Quinto Set pode começar
              por você.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream-100/60">
              Treinamentos aos sábados, no Cesarão. Informações detalhadas e
              horários são confirmados no processo de inscrição.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <ButtonLink href="/matricula" size="lg">
                Quero fazer parte
                <ArrowRight className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href="/contato" size="lg" variant="outline">
                <MessageCircleQuestion className="h-5 w-5" />
                Falar com a equipe
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
