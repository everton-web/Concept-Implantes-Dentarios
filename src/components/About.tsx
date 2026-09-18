import AnimatedSection from "./AnimatedSection";

const STATS = [
  { value: "7+", label: "Anos de prática clínica" },
  { value: "9", label: "Áreas de atuação integrada" },
  { value: "100%", label: "Cuidado personalizado" },
];

export default function About() {
  return (
    <section id="sobre" className="relative py-[88px] lg:py-[140px] bg-warm-white">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          <AnimatedSection className="lg:col-span-7">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-500 mb-5">
              Sobre a Concept
            </p>
            <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.1] tracking-[-0.025em] font-medium text-ink-950 text-balance mb-7">
              Um olhar que vai além da boca
            </h2>

            <div className="space-y-5 text-[1.0625rem] leading-[1.7] text-ink-600 max-w-[62ch]">
              <p>
                Você já deixou de sorrir, ou sentiu vergonha ao sentar na
                cadeira do dentista? Aqui, a consulta começa pela escuta. Com
                especialização em Implantodontia e neurociência aplicada ao
                cuidado, tratamos cada paciente como único: suas dores, seus
                medos, seus desejos e o seu tempo.
              </p>
              <p className="text-ink-950 font-medium">
                O resultado são pacientes que chegam com medo e saem com vontade
                de sorrir de novo.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.12} className="lg:col-span-5 mt-12 lg:mt-0">
            <dl className="grid grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-0 lg:divide-y lg:divide-ink-100 lg:border-t lg:border-ink-100">
              {STATS.map((stat) => (
                <div key={stat.label} className="lg:py-6">
                  <dd className="text-[clamp(2rem,3.5vw,2.75rem)] font-medium tracking-[-0.03em] text-ink-950 leading-none mb-2">
                    {stat.value}
                  </dd>
                  <dt className="text-[0.8125rem] leading-[1.4] text-ink-500">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
