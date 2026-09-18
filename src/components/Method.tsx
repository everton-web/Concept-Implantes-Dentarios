import Image from "next/image";
import { HeartHandshake, BrainCircuit, HandCoins } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const STEPS = [
  {
    icon: HeartHandshake,
    number: "01",
    title: "Escuta atenta, sem pressa",
    description:
      "Antes de qualquer procedimento, você fala sobre seus medos, seu histórico e seus desejos. Aqui ninguém é apressado nem julgado.",
  },
  {
    icon: BrainCircuit,
    number: "02",
    title: "Neurociência aplicada ao cuidado",
    description:
      "Técnicas de relaxamento, ambiente calmo e anestesia de ponta para anular a ansiedade, pensado para quem tem medo ou trauma de dentista.",
  },
  {
    icon: HandCoins,
    number: "03",
    title: "Planejamento que cabe no seu bolso",
    description:
      "Condições facilitadas e transparência total desde a primeira avaliação, para o tratamento caber no orçamento da sua família.",
  },
];

export default function Method() {
  return (
    <section id="metodo" className="relative py-[88px] lg:py-[140px] bg-cream">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          <AnimatedSection className="lg:col-span-4 mb-12 lg:mb-0">
            <div className="lg:sticky lg:top-[120px]">
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-500 mb-5">
                O método Concept
              </p>
              <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.1] tracking-[-0.025em] font-medium text-ink-950 text-balance">
                Por que aqui o atendimento faz diferença
              </h2>

              <div className="img-reveal hidden lg:block relative mt-10 aspect-[4/5] rounded-[20px] overflow-hidden bg-ink-100">
                <Image
                  src="/marca/dra-simone-estudo.webp"
                  alt="Dra. Simone estudando o planejamento de um caso com modelo odontológico"
                  fill
                  sizes="30vw"
                  className="parallax-img object-cover object-[60%_center]"
                />
              </div>
            </div>
          </AnimatedSection>

          <div className="lg:col-span-8">
            <ol className="space-y-4">
              {STEPS.map((step, i) => (
                <AnimatedSection key={step.number} delay={i * 0.1}>
                  <li className="group relative flex gap-6 sm:gap-8 p-7 sm:p-9 rounded-[20px] bg-warm-white border border-ink-100/70 hover:border-gold-300 transition-all duration-300">
                    <div className="shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-[14px] bg-ink-950 text-white transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-ink-950">
                        <step.icon size={21} strokeWidth={1.75} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 mb-2.5">
                        <span className="text-[0.6875rem] font-bold tracking-[0.1em] text-gold-500">
                          {step.number}
                        </span>
                        <h3 className="text-[1.125rem] sm:text-[1.25rem] font-semibold text-ink-950 leading-snug">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-[0.9375rem] leading-[1.7] text-ink-500 max-w-[58ch]">
                        {step.description}
                      </p>
                    </div>
                  </li>
                </AnimatedSection>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
