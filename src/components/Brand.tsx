import AnimatedSection from "./AnimatedSection";

export default function Brand() {
  return (
    <section className="relative py-[88px] lg:py-[140px] bg-ink-950">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <AnimatedSection className="max-w-[720px] mx-auto text-center">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-400 mb-8">
            Nossa filosofia
          </p>

          <blockquote className="text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.18] tracking-[-0.02em] font-medium text-white text-balance mb-8">
            <span aria-hidden className="text-gold-300/60">&ldquo;</span>
            Um novo sorriso começa com um novo jeito de cuidar.
            <span aria-hidden className="text-gold-300/60">&rdquo;</span>
          </blockquote>

          <p className="text-[1.0625rem] leading-[1.7] text-ink-400 max-w-[560px] mx-auto">
            Estrutura completa, tecnologia de ponta e a escuta atenta que guia
            cada atendimento na Concept Implantes Dentários.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
