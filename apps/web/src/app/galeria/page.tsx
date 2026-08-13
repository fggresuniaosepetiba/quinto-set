import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Gallery } from "@/components/gallery/Gallery";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Galeria da Quinto Set Escolinha de Vôlei: fotos e vídeos de treinamentos, jogos, eventos, ações sociais e bastidores.",
};

export default function GaleriaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Galeria"
        title="Imagens de um projeto em construção"
        description="Treinamentos, jogos, comunidade e bastidores. As imagens reais da Quinto Set serão publicadas aqui conforme a história for escrita."
      />
      <section className="bg-cream-50 py-20 sm:py-24">
        <Container>
          <Gallery />
        </Container>
      </section>
    </>
  );
}
