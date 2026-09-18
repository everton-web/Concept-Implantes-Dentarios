import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

const STATS = [
  { value: "7+", label: "Anos de prática clínica" },
  { value: "9", label: "Áreas de atuação integrada" },
  { value: "100%", label: "Cuidado personalizado" },
];

export default function About() {
  return (
    <section id="sobre" className="relative -mt-px pb-[88px] lg:pb-[140px] bg-ink-950">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          <AnimatedSection className="lg:col-span-5 mb-14 lg:mb-0">
            <figure className="relative max-w-[440px] mx-auto lg:max-w-none">
              <div
                className="img-reveal relative aspect-[4/5] rounded-[24px] overflow-hidden bg-ink-900"
                style={{ "--reveal-radius": "24px" } as React.CSSProperties}
              >
                <Image
                  src="/marca/dra-simone-estudo.webp"
                  alt="Dra. Simone H. estudando o planejamento de um caso com modelo odontológico"
                  fill
                  sizes="(max-width: 1024px) 440px, 40vw"
                  className="parallax-img object-cover object-[65%_center]"
                />
              </div>
              <figcaption className="mt-5 flex items-center gap-4">
                <span aria-hidden className="w-9 h-[2px] bg-gold-400 shrink-0" />
                <span className="text-[0.8125rem] text-ink-400">
                  <span className="font-semibold text-white">Dra. Simone H.</span>
                  {" · "}Responsável técnica · CRO-SC 19661
                </span>
              </figcaption>
            </figure>
          </AnimatedSection>

          <AnimatedSection delay={0.12} className="lg:col-span-7">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-400 mb-5">
              Sobre a Concept
            </p>
            <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.1] tracking-[-0.025em] font-medium text-white text-balance mb-7">
              Um olhar que vai além da boca
            </h2>

            <div className="space-y-5 text-[1.0625rem] leading-[1.7] text-ink-300 max-w-[62ch] mb-12">
              <p>
                Você já deixou de sorrir, ou sentiu vergonha ao sentar na
                cadeira do dentista? Aqui, a consulta começa pela escuta. Com
                especialização em Implantodontia e neurociência aplicada ao
                cuidado, tratamos cada paciente como único: suas dores, seus
                medos, seus desejos e o seu tempo.
              </p>
              <p className="text-white font-medium">
                O resultado são pacientes que chegam com medo e saem com vontade
                de sorrir de novo.
              </p>
            </div>

            <dl className="grid grid-cols-3 gap-6 pt-8 border-t border-white/[0.12]">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="text-[0.8125rem] leading-[1.4] text-ink-400">
                    {stat.label}
                  </dt>
                  <dd className="text-[clamp(2rem,3.5vw,2.75rem)] font-medium tracking-[-0.03em] text-gold-300 leading-none mb-2">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
