import { CLINICA, SITE_URL } from "@/data/site";
import { QUESTIONS } from "@/data/faq";

/**
 * Dados estruturados (schema.org) para o Google entender a página como uma
 * clínica odontológica local: endereço, horários, contato e perguntas
 * frequentes. A nota do Google não entra aqui de propósito: avaliações
 * publicadas pela própria empresa não são aceitas para rich results.
 */
export default function StructuredData() {
  const { endereco } = CLINICA;

  const clinica = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${SITE_URL}/#clinica`,
    name: CLINICA.nome,
    description: CLINICA.descricao,
    url: SITE_URL,
    logo: `${SITE_URL}/marca/logo-concept.png`,
    image: `${SITE_URL}/og/concept.jpg`,
    telephone: CLINICA.telefone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: endereco.rua,
      addressLocality: endereco.cidade,
      addressRegion: endereco.estado,
      postalCode: endereco.cep,
      addressCountry: endereco.pais,
    },
    areaServed: ["Camboriú", "Balneário Camboriú", "Itajaí"],
    openingHoursSpecification: CLINICA.horarios.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dias,
      opens: h.abre,
      closes: h.fecha,
    })),
    medicalSpecialty: "Dentistry",
    availableService: CLINICA.especialidades.map((nome) => ({
      "@type": "MedicalProcedure",
      name: nome,
    })),
    sameAs: [CLINICA.instagram, CLINICA.google],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QUESTIONS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      {[clinica, faq].map((dados, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON gerado aqui mesmo, sem dados de usuário; `<` é escapado
          // para que nenhum texto feche a tag script.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(dados).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
