export interface Director {
  name: string;
  role: string;
  photo: string;
}

export const directors: Director[] = [
  {
    name: "João Ribeiro",
    role: "Presidente Executivo",
    photo: "/diretores/joao-ribeiro.jpg",
  },
  {
    name: "Nego Léo",
    role: "Vice-Presidente Executivo",
    photo: "/diretores/nego-leo.jpeg",
  },
  {
    name: "Marlon Silva",
    role: "Diretor Executivo Geral",
    photo: "/diretores/marlon-silva.jpg",
  },
];
