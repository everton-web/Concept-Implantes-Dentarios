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
    <section id="diferenciais" className="relative bg-ink-950">
      {/* Cantos na cor da seção anterior: a foto entra com o topo em arco. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-16 lg:h-24 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 62% 100% at 50% 100%, transparent 99%, var(--color-warm-white) 100%)",
        }}
      />
      {/* Imagem de fundo em tela cheia, fixada enquanto o conteúdo rola por cima. */}
      <div className="relative h-[100svh] min-h-[620px]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <Image
            src="/marca/clinica-wide.webp"
            alt="Consultório da Concept Implantes Dentários durante o atendimento"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-ink-950/55"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink-950 to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent"
          />

          <div className="relative h-full flex items-center justify-center px-6">
            <AnimatedSection className="text-center max-w-[720px]">
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-gold-200/90 mb-6">
                Por que escolher a Concept?
              </p>
              <h2 className="text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.08] tracking-[-0.03em] font-medium text-white text-balance">
                Um atendimento que faz{" "}
                <em className="font-serif italic font-normal text-gold-300">
                  diferença
                </em>
              </h2>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Pilares sobem sobre a imagem conforme a rolagem avança. */}
      <div className="relative -mt-[38svh] pb-[88px] lg:pb-[140px]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
            {PILLARS.map((pillar, i) => (
              <AnimatedSection key={pillar.title} delay={i * 0.08}>
                <article className="relative h-full p-7 lg:p-8 rounded-[16px] bg-ink-900/80 backdrop-blur-md border border-white/[0.12]">
                  <span
                    aria-hidden
                    className="absolute top-0 left-7 lg:left-8 w-9 h-[2px] bg-gold-400"
                  />
                  <h3 className="text-[1.125rem] font-semibold text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-[0.9375rem] leading-[1.65] text-ink-300">
                    {pillar.description}
                  </p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
