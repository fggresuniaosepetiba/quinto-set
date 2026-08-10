import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SponsorsMarquee } from "@/components/home/SponsorsMarquee";

export function Sponsors() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-navy-900 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Patrocinadores & Apoiadores"
          title="Marcas e instituições que acreditam no esporte como transformação"
          align="center"
          dark
        />
      </Container>
      <div className="mt-12">
        <SponsorsMarquee />
      </div>
      <Container className="mt-12 text-center">
        <p className="text-sm text-cream-100/60">
          Sua marca pode estar aqui.{" "}
          <a
            href="/patrocine"
            className="font-semibold text-gold-400 underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
          >
            Apoie a Quinto Set
          </a>
        </p>
      </Container>
    </section>
  );
}
