"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const QUESTIONS = [
  {
    q: "O procedimento de implante dentário dói?",
    a: "Na grande maioria dos casos, não. Utilizamos anestesia local moderna e técnicas de controle de ansiedade baseadas em neurociência. Os pacientes relatam, no máximo, um leve desconforto no pós-operatório, facilmente controlado com medicação.",
  },
  {
    q: "Quanto tempo dura o tratamento de implante?",
    a: "Depende do seu caso. Após a avaliação e o planejamento digital, apresentamos um cronograma claro, da colocação do implante até a prótese definitiva. Cada etapa respeita o tempo de cicatrização do seu organismo.",
  },
  {
    q: "Tenho muito medo de dentista. Vou me sentir acolhido?",
    a: "Sim. O medo de dentista é justamente o que mais nos motiva. A consulta começa pela escuta, em ambiente calmo e sem pressa. Nada é feito sem que você entenda e se sinta seguro com cada passo.",
  },
  {
    q: "Vocês aceitam convênio? Como é o pagamento?",
    a: "O atendimento é particular, o que nos permite dedicar o tempo necessário a cada paciente. Em contrapartida, oferecemos condições de pagamento facilitadas e transparência total desde a primeira avaliação.",
  },
  {
    q: "Preciso de encaminhamento ou exame prévio para a primeira consulta?",
    a: "Não. Na primeira consulta fazemos a avaliação completa e, quando necessário, solicitamos os exames de imagem ali mesmo. Se você já tiver radiografias ou tomografias recentes, é só trazer.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-[88px] lg:py-[140px] bg-cream">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          <AnimatedSection className="lg:col-span-4 mb-10 lg:mb-0">
            <div className="lg:sticky lg:top-[120px]">
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-500 mb-5">
                Dúvidas frequentes
              </p>
              <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.1] tracking-[-0.025em] font-medium text-ink-950 text-balance">
                Tudo o que você precisa saber
              </h2>
            </div>
          </AnimatedSection>

          <div className="lg:col-span-8">
            <div className="divide-y divide-ink-100">
              {QUESTIONS.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <AnimatedSection key={item.q} delay={i * 0.05}>
                    <div>
                      <h3>
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : i)}
                          className="w-full flex items-start justify-between gap-6 py-6 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-4 rounded-lg"
                          aria-expanded={isOpen}
                        >
                          <span className={`text-[1.0625rem] font-medium leading-snug transition-colors duration-200 ${isOpen ? "text-ink-950" : "text-ink-700 group-hover:text-ink-950"}`}>
                            {item.q}
                          </span>
                          <span className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${isOpen ? "bg-ink-950 border-ink-950 text-white rotate-180" : "border-ink-200 text-ink-400 group-hover:border-ink-400"}`}>
                            <ChevronDown size={16} strokeWidth={2} />
                          </span>
                        </button>
                      </h3>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pb-7 pr-14 text-[0.9375rem] leading-[1.75] text-ink-500 max-w-[62ch]">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
