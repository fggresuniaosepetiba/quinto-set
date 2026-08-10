export type Sponsor = {
  id: string;
  name: string;
  role: "instituição" | "apoiador" | "patrocinador";
  logo: string;
  fill?: boolean;
};

export const sponsors: Sponsor[] = [
  {
    id: "amococ",
    name: "AMOCOC",
    role: "instituição",
    logo: "/sponsors/amococ-logo.jpeg",
  },
  {
    id: "uniaodsepetiba",
    name: "União de Sepetiba",
    role: "instituição",
    logo: "/sponsors/logo-escola.jpeg",
  },
  {
    id: "trinary",
    name: "Trinary Solutions",
    role: "apoiador",
    logo: "/sponsors/logo-trinary.png",
  },
  {
    id: "daniel",
    name: "Daniel Thompson Comunicação & Design",
    role: "apoiador",
    logo: "/sponsors/logo_daniel_black.png",
  },
  {
    id: "viv",
    name: "Instituto VIV",
    role: "patrocinador",
    logo: "/sponsors/viv-logo.jpeg",
  },
  {
    id: "hunwxe",
    name: "Hunwxê Zó Nitazoji",
    role: "apoiador",
    logo: "/sponsors/hunwxe-logo.jpeg",
    fill: true,
  },
  {
    id: "ubuntu",
    name: "Instituto Ubuntu",
    role: "apoiador",
    logo: "/sponsors/logo-ubuntu.png",
  },
];
