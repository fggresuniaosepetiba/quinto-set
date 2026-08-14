import Image from "next/image";
import Link from "next/link";
import { MapPin, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site";
import {
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "A Quinto Set", href: "/sobre" },
  { label: "Treinamentos", href: "/treinamentos" },
  { label: "Equipe", href: "/equipe" },
  { label: "Competições", href: "/competicoes" },
  { label: "Galeria", href: "/galeria" },
  { label: "Matrícula", href: "/matricula" },
  { label: "Patrocine", href: "/patrocine" },
  { label: "Contato", href: "/contato" },
];

const founders = [
  {
    name: "AMOCOC",
    description: "Associação de Moradores do Conjunto Otacílio Câmara",
    logo: "/sponsors/amococ-logo.jpeg",
  },
  {
    name: "União de Sepetiba",
    description: "Grêmio Recreativo Escola de Samba União de Sepetiba",
    logo: "/sponsors/logo-escola.jpeg",
  },
];

const socials = [
  { label: "Instagram", href: "", Icon: InstagramIcon },
  { label: "TikTok", href: "", Icon: TiktokIcon },
  { label: "YouTube", href: "", Icon: YoutubeIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 text-cream-100">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-16 w-16" />
              <div className="leading-none">
                <p className="font-display text-xl font-bold uppercase tracking-wide text-white">
                  Quinto Set
                </p>
                <p className="mt-1.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-gold-400">
                  Escolinha de Vôlei
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-100/70">
              Escolinha social de vôlei no Cesarão. O esporte abre portas — a
              educação sustenta o caminho. Matrícula gratuita, inclusão de
              verdade.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ label, href, Icon }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream-100/80 transition-colors hover:border-gold-400 hover:text-gold-300"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ) : (
                  <span
                    key={label}
                    title={`${label} — em breve`}
                    aria-label={`${label} — em breve`}
                    className="flex h-10 w-10 cursor-default items-center justify-center rounded-full border border-white/10 text-cream-100/40 transition-colors hover:border-gold-400/40 hover:text-gold-300/60"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                ),
              )}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
              Navegação
            </h3>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {footerLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-100/70 transition-colors hover:text-gold-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
              Iniciativa criada e apoiada por
            </h3>
            <ul className="mt-5 space-y-4">
              {founders.map((founder) => (
                <li key={founder.name} className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 ring-1 ring-white/15">
                    <Image
                      src={founder.logo}
                      alt={`Logo da ${founder.name}`}
                      width={96}
                      height={96}
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <span>
                    <span className="block font-display text-sm font-semibold uppercase tracking-wide text-white">
                      {founder.name}
                    </span>
                    <span className="block text-xs text-cream-100/55">
                      {founder.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-cream-100/50">
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos
            reservados.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-cream-100/60">
            <MapPin className="h-3.5 w-3.5 text-gold-400" />
            {siteConfig.location}
          </p>
          <p className="text-xs uppercase tracking-widest text-cream-100/40">
            O jogo muda aqui
            <Sparkles className="ml-1 inline h-3 w-3 text-gold-400" />
          </p>
        </Container>
      </div>
    </footer>
  );
}
