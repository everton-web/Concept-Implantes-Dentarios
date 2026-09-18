import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

const PILLARS = [
  {
    title: "Escuta atenta",
    description:
      "Antes de qualquer procedimento, ouvimos com atenção as suas dores, medos e desejos.",
  },
  {
    title: "Cuidado integral",
    description:
      "Olhar para o paciente como um todo, não apenas para a boca, faz parte da nossa filosofia.",
  },
  {
    title: "Neurociência aplicada",
    description:
      "Técnicas baseadas em neurociência para um atendimento mais acolhedor e menos estressante.",
  },
];

export default function Differential() {
  return (
    <section id="diferenciais" className="relative py-[88px] lg:py-[140px] bg-cream">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Foto em coluna própria: nenhum texto sobre o rosto. */}
          <AnimatedSection className="lg:col-span-5 mb-14 lg:mb-0">
            <figure className="relative">
              <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-ink-100">
                <Image
                  src="/marca/clinica-wide.webp"
                  alt="Dra. Simone em atendimento no consultório da Concept"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-[50%_30%]"
                />
              </div>
              <figcaption className="absolute -bottom-6 left-6 right-6 sm:right-auto flex items-center gap-4 px-5 py-4 rounded-[16px] bg-warm-white shadow-[0_12px_40px_-12px_rgba(23,24,26,0.25)]">
                <span aria-hidden className="w-9 h-[2px] bg-gold-500 shrink-0" />
                <span>
                  <span className="block text-[0.875rem] font-semibold text-ink-950">
                    Dra. Simone H.
                  </span>
                  <span className="block text-[0.75rem] text-ink-500">
                    Responsável técnica · CRO-SC 19661
                  </span>
                </span>
              </figcaption>
            </figure>
          </AnimatedSection>

          <div className="lg:col-span-7">
            <AnimatedSection>
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-500 mb-5">
                Por que escolher a Concept
              </p>
              <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.1] tracking-[-0.025em] font-medium text-ink-950 text-balance mb-12">
                Um atendimento que faz{" "}
                <em className="font-serif italic font-normal text-gold-500">
                  diferença
                </em>
              </h2>
            </AnimatedSection>

            <div className="border-t border-ink-100">
              {PILLARS.map((pillar, i) => (
                <AnimatedSection key={pillar.title} delay={i * 0.08}>
                  <article className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr] gap-x-4 py-7 border-b border-ink-100">
                    <span
                      aria-hidden
                      className="font-serif italic text-[1.75rem] leading-none text-gold-500"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[1.125rem] font-semibold text-ink-950 mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-[0.9375rem] leading-[1.65] text-ink-600 max-w-[52ch]">
                        {pillar.description}
                      </p>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
