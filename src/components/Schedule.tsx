"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import AnimatedSection from "./AnimatedSection";

const BENEFITS = [
  "Avaliação completa e transparente",
  "Condições de pagamento facilitadas",
  "Atendimento de urgência odontológica",
];

export default function Schedule({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <section id="agendar" className="relative py-[88px] lg:py-[140px] bg-warm-white">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-[28px] bg-cream border border-ink-100 p-8 sm:p-12 lg:p-16">
            <div
              aria-hidden
              className="absolute -top-1/3 -right-1/4 w-[520px] h-[520px] rounded-full bg-gold-100/70 blur-3xl"
            />

            <div className="relative lg:grid lg:grid-cols-12 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-500 mb-5">
                  Primeiro passo
                </p>
                <h2 className="text-[clamp(2rem,3.4vw,3rem)] leading-[1.1] tracking-[-0.025em] font-medium text-ink-950 text-balance mb-6">
                  Agende sua consulta sem compromisso
                </h2>
                <p className="text-[1.0625rem] leading-[1.7] text-ink-600 max-w-[52ch] mb-9">
                  Deixe seu nome e WhatsApp, nossa equipe retorna para encontrar
                  o melhor horário para você. Sem pressa, sem julgamento, só
                  escuta e um plano claro para o seu sorriso.
                </p>

                <ul className="space-y-3.5">
                  {BENEFITS.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gold-300 shrink-0">
                        <Check size={12} strokeWidth={2.5} className="text-ink-950" />
                      </span>
                      <span className="text-[0.9375rem] text-ink-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 mt-10 lg:mt-0">
                <div className="relative aspect-[4/5] max-w-[420px] mx-auto lg:max-w-none mb-6 rounded-[20px] overflow-hidden bg-ink-100">
                  <Image
                    src="/marca/dra-simone-modelo.webp"
                    alt="Dra. Simone explicando o tratamento com um modelo odontológico"
                    fill
                    sizes="(max-width: 1024px) 420px, 35vw"
                    className="object-cover object-top"
                  />
                </div>
                <button
                  onClick={onOpenForm}
                  className="group w-full inline-flex items-center justify-center gap-2 h-[56px] px-8 bg-ink-950 text-white font-semibold rounded-[12px] hover:bg-ink-800 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-500"
                >
                  Agende sua consulta
                  <WhatsAppIcon size={18} />
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
