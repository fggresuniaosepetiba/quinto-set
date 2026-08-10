import { Container } from "@/components/ui/Container";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 20%, #f0c040 0, transparent 45%), radial-gradient(circle at 10% 90%, #1b6ac8 0, transparent 40%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(100deg, rgba(0,20,60,.6), rgba(0,20,60,.4)), url('https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=1920&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Container className="relative">
        <p className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.3em] text-gold-400">
          {eyebrow}
        </p>
        <h1 className="text-balance font-display text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-100/75 sm:text-lg">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
