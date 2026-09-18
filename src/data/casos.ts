export interface Caso {
  slug: string;
  titulo: string;
  categoria: string;
  /**
   * Composições antes/depois em `public/casos/<slug>/`.
   * A primeira imagem é a capa do card.
   */
  imagens: string[];
}

const fotos = (slug: string, total: number) =>
  Array.from({ length: total }, (_, i) => `/casos/${slug}/${i + 1}.webp`);

export const CASOS: Caso[] = [
  {
    slug: "faceta-1",
    titulo: "Facetas em porcelana",
    categoria: "Estética do sorriso",
    imagens: fotos("faceta-1", 4),
  },
  {
    slug: "faceta-2",
    titulo: "Facetas em porcelana",
    categoria: "Estética do sorriso",
    imagens: fotos("faceta-2", 7),
  },
  {
    slug: "protese-protocolo",
    titulo: "Prótese protocolo",
    categoria: "Reabilitação oral",
    imagens: fotos("protese-protocolo", 4),
  },
  {
    slug: "protocolo-superior-facetas-inferior",
    titulo: "Protocolo superior com facetas inferiores",
    categoria: "Reabilitação completa",
    imagens: fotos("protocolo-superior-facetas-inferior", 4),
  },
  {
    slug: "botox",
    titulo: "Toxina botulínica",
    categoria: "Harmonização orofacial",
    imagens: fotos("botox", 6),
  },
];
