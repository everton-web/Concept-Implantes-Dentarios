"use client";

import Image from "next/image";
import WhatsAppIcon from "./WhatsAppIcon";
import {
  Sparkles,
  Layers,
  Gem,
  Sun,
  ShieldCheck,
  Blend,
  Stethoscope,
  Baby,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const OTHERS = [
  {
    icon: Sparkles,
    eyebrow: "Estética & bem-estar",
    title: "Harmonização Orofacial",
    description:
      "Procedimentos sutis que valorizam seus traços naturais, com harmonia e segurança.",
  },
  {
    icon: Layers,
    eyebrow: "Reabilitação oral",
    title: "Próteses Dentárias",
    description:
      "Soluções fixas e removíveis com encaixe anatômico para conforto no dia a dia.",
  },
  {
    icon: Gem,
    eyebrow: "Estética dental",
    title: "Lentes de Contato Dental",
    description:
      "Lâminas ultrafinas que corrigem cor, forma e alinhamento para um sorriso novo.",
  },
  {
    icon: Sun,
    eyebrow: "Luminosidade",
    title: "Clareamento Dental",
    description:
      "Técnicas seguras e supervisionadas para um sorriso mais branco, sem sensibilidade.",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Alívio & preservação",
    title: "Endodontia",
    description:
      "Tratamento de canal com tecnologia mecanizada, delicadeza e conforto em cada etapa.",
  },
  {
    icon: Blend,
    eyebrow: "Harmonia gengival",
    title: "Estética Branca e Vermelha",
    description:
      "Equilíbrio milimétrico entre gengiva e dentes para um sorriso harmonioso.",
  },
  {
    icon: Stethoscope,
    eyebrow: "Procedimentos seguros",
    title: "Cirurgia Oral Menor",
    description:
      "Pequenas intervenções com técnica precisa e acompanhamento pós-operatório próximo.",
  },
  {
    icon: Baby,
    eyebrow: "Cuidado familiar",
    title: "Odontopediatria",
    description:
      "Atendimento lúdico e paciente para crianças crescerem sem medo de dentista.",
  },
];

export default function Specialties({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <section id="especialidades" className="relative py-[88px] lg:py-[140px] bg-warm-white">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <AnimatedSection className="max-w-[640px] mb-14 lg:mb-20">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-500 mb-5">
            Especialidades
          </p>
          <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.1] tracking-[-0.025em] font-medium text-ink-950 text-balance mb-5">
            Nove áreas de atuação, um só cuidado
          </h2>
          <p className="text-[1.0625rem] leading-[1.7] text-ink-500">
            Do implante ao primeiro dentinho do seu filho: tratamentos
            integrados, planejados para o seu caso.
          </p>
        </AnimatedSection>

        {/* Destaque: implantes */}
        <AnimatedSection className="mb-6">
          <article className="relative overflow-hidden rounded-[28px] bg-ink-950 p-3 sm:p-4 lg:grid lg:grid-cols-2 lg:items-center lg:gap-4">
            {/* Sorriso real depois da prótese protocolo, emoldurado e nítido,
                sem esfumado. Vem primeiro no mobile; à direita no desktop. */}
            <figure className="relative aspect-[16/10] rounded-[20px] overflow-hidden lg:order-2">
              <Image
                src="/hero/sorriso-protocolo.webp"
                alt="Sorriso de paciente depois da prótese protocolo sobre implantes"
                fill
                unoptimized
                className="object-cover"
              />
              <figcaption className="absolute left-4 bottom-4 px-3 py-1.5 rounded-full bg-ink-950/75 backdrop-blur-md text-[0.75rem] font-medium text-white">
                Caso real · Prótese protocolo
              </figcaption>
            </figure>

            <div className="relative px-5 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-8 lg:p-12">
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-400 mb-5">
                Especialidade principal
              </p>
              <h3 className="text-[clamp(1.875rem,3.2vw,2.75rem)] leading-[1.1] tracking-[-0.025em] font-medium text-white mb-5">
                Implantes Dentários
              </h3>
              <p className="text-[1.0625rem] leading-[1.7] text-ink-300 max-w-[48ch] mb-8">
                Implantes unitários, múltiplos e prótese protocolo sobre
                implantes. Recupere a mastigação firme e a segurança ao
                sorrir, com planejamento digital e técnica de precisão.
              </p>
              <button
                onClick={onOpenForm}
                className="group inline-flex items-center justify-center gap-2 h-[52px] px-7 bg-gold-300 text-ink-950 font-semibold rounded-[12px] hover:bg-gold-200 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-500"
              >
                Agende sua consulta
                <WhatsAppIcon size={17} />
              </button>
            </div>
          </article>
        </AnimatedSection>

        {/* Demais especialidades */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OTHERS.map((item, i) => (
            <AnimatedSection key={item.title} delay={(i % 4) * 0.06}>
              <article className="group h-full p-6 rounded-[18px] bg-white/70 border border-ink-100/70 hover:border-ink-200 hover:bg-white transition-all duration-300 hover:shadow-[0_18px_50px_rgba(16,16,16,0.06)]">
                <item.icon
                  size={22}
                  strokeWidth={1.75}
                  className="text-gold-500 mb-5"
                />
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-ink-400 mb-2">
                  {item.eyebrow}
                </p>
                <h3 className="text-[1.0625rem] font-semibold text-ink-950 mb-2.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[0.875rem] leading-[1.6] text-ink-500">
                  {item.description}
                </p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
