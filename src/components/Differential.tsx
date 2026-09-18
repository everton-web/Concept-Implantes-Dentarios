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
    <section id="diferenciais" className="relative -mt-px bg-ink-950 overflow-hidden">
      {/* Foto vertical: no mobile vem antes do texto; no desktop ocupa a metade
          direita e se dissolve no fundo escuro, deixando a Dra. Simone livre. */}
      <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:absolute lg:inset-y-0 lg:right-0 lg:w-[58%] lg:aspect-auto">
        <Image
          src="/marca/dra-simone-consultorio.webp"
          alt="Dra. Simone em atendimento no consultório da Concept"
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover object-[50%_18%]"
        />
        <div
          aria-hidden
          className="lg:hidden absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950 to-transparent"
        />
        <div
          aria-hidden
          className="hidden lg:block absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-ink-950 via-ink-950/70 to-transparent"
        />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16 py-[72px] lg:py-[140px] lg:min-h-[100svh] lg:flex lg:items-center">
        <div className="lg:max-w-[500px]">
          <AnimatedSection>
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-400 mb-5">
              Por que escolher a Concept
            </p>
            <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.1] tracking-[-0.025em] font-medium text-white text-balance mb-12">
              Um atendimento que faz{" "}
              <span className="text-gold-300">diferença</span>
            </h2>
          </AnimatedSection>

          <div className="border-t border-white/[0.12]">
            {PILLARS.map((pillar, i) => (
              <AnimatedSection key={pillar.title} delay={i * 0.08}>
                <article className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-6 border-b border-white/[0.12]">
                  <span
                    aria-hidden
                    className="pt-[3px] text-[0.8125rem] font-semibold tabular-nums tracking-[0.04em] text-gold-400"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.0625rem] font-semibold text-white mb-1.5">
                      {pillar.title}
                    </h3>
                    <p className="text-[0.9375rem] leading-[1.65] text-ink-300">
                      {pillar.description}
                    </p>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
