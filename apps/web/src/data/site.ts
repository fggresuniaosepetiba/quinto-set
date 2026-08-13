export const siteConfig = {
  shortName: "Quinto Set",
  name: "Quinto Set Escolinha de Vôlei",
  tagline: "Do Cesarão para o mundo.",
  concept:
    "O quinto set é o momento em que tudo pode mudar. É o set da decisão — e todo grande jogo tem um momento decisivo.",
  description:
    "Escolinha social de vôlei no Cesarão, Rio de Janeiro. Inclusão esportiva, formação de jovens e adolescentes de 14 a 19 anos e educação como base de tudo. Matrícula gratuita.",
  url: "https://quintoset.com.br",
  email: "contato@quintoset.com.br",
  instagram: "",
  tiktok: "",
  youtube: "",
  location: "Cesarão — Rio de Janeiro",
  institution: "AMOCOC — Associação de Moradores do Conjunto Otacílio Câmara",
  partnerInstitution: "Grêmio Recreativo Escola de Samba União de Sepetiba",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
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
