/**
 * Dados institucionais usados em metadados, sitemap e dados estruturados.
 * Quando o domínio próprio entrar no ar, basta definir NEXT_PUBLIC_SITE_URL
 * na Vercel (ex.: https://www.conceptimplantes.com.br).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://concept-site-kappa.vercel.app"
).replace(/\/$/, "");

export const CLINICA = {
  nome: "Concept Implantes Dentários",
  descricao:
    "Clínica odontológica em Camboriú, SC. Implantes dentários, prótese protocolo, facetas, harmonização orofacial e mais, com atendimento humanizado e sem julgamentos.",
  telefone: "+55 47 9120-8176",
  endereco: {
    rua: "R. Francisco Barreto, 17",
    bairro: "Centro",
    cidade: "Camboriú",
    estado: "SC",
    cep: "88340-401",
    pais: "BR",
  },
  horarios: [
    { dias: ["Monday", "Tuesday", "Wednesday", "Thursday"], abre: "09:00", fecha: "20:00" },
    { dias: ["Friday"], abre: "09:00", fecha: "17:30" },
  ],
  instagram: "https://www.instagram.com/conceptimplantesdentarios/",
  google: "https://share.google/I0LmZe4REnkQxmmxf",
  responsavelTecnica: "Dra. Simone H. · CRO-SC 19661",
  especialidades: [
    "Implantes dentários",
    "Prótese protocolo",
    "Facetas e lentes de contato dental",
    "Harmonização orofacial",
    "Clareamento dental",
    "Endodontia",
    "Estética branca e vermelha",
    "Cirurgia oral menor",
    "Odontopediatria",
  ],
};
