"use client";

import Image from "next/image";
import WhatsAppIcon from "./WhatsAppIcon";
import SpecialtyTicker from "./SpecialtyTicker";
import GoogleRating from "./GoogleRating";

const STATS = [
  { value: "7+", label: "Anos de prática clínica" },
  { value: "9", label: "Áreas de atuação" },
  { value: "CRO-SC", label: "19661 · Responsável técnica" },
];

export default function Hero({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <section className="relative min-h-[100svh] flex flex-col bg-ink-950 overflow-hidden">
      {/* Fachada tratada na própria imagem: dessaturada, esmaecida e com uma
          queda longa (smootherstep) até o #101010, só a placa em dourado.
          Sem máscara CSS, então não há linha de emenda. O texto começa sobre
          a parte já esmaecida, unindo foto e conteúdo numa peça só. */}
      <div
        style={{ animationDelay: "0.1s" }}
        className="animate-hero-photo absolute inset-x-0 top-0 h-[62svh] min-h-[360px] sm:h-auto sm:min-h-0 sm:aspect-[2000/545]"
      >
        <Image
          src="/marca/fachada-hero.webp"
          alt="Fachada da Concept Implantes Dentários, com a placa dourada da clínica"
          fill
          priority
          unoptimized
          className="object-cover object-[48%_0%]"
        />
      </div>

      <div className="relative flex-1 flex flex-col items-center text-center mx-auto max-w-[1200px] w-full px-6 md:px-10 lg:px-16 pt-[max(33svh,230px)] sm:pt-[clamp(210px,17vw,330px)] pb-14">
        <div
          style={{ animationDelay: "0.05s" }}
          className="animate-rise inline-flex items-center gap-2.5 mb-8 px-3.5 py-1.5 rounded-full border border-white/[0.12] bg-ink-950/60 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-300" />
          <SpecialtyTicker />
        </div>

        <h1
          style={{ animationDelay: "0.2s" }}
          className="animate-rise max-w-[980px] text-[clamp(2.5rem,5.2vw,4.75rem)] leading-[1.04] tracking-[-0.03em] font-medium text-white text-balance mb-6"
        >
          Tudo muda quando você volta a{" "}
          <span className="whitespace-nowrap">
            <span className="relative inline-block text-gold-300">
              sorrir sem medo
              <span
                aria-hidden
                className="animate-line absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-transparent via-gold-400 to-transparent"
              />
            </span>
            .
          </span>
        </h1>

        <p
          style={{ animationDelay: "0.35s" }}
          className="animate-rise text-[clamp(1.0625rem,1.3vw,1.1875rem)] leading-[1.65] text-ink-300 max-w-[600px] mb-9"
        >
          Odontologia humanizada, acolhedora e sem julgamentos. Especialista em
          devolver a sua mastigação, segurança e autoestima com implantes
          dentários modernos, no seu tempo, do seu jeito.
        </p>

        <div style={{ animationDelay: "0.45s" }} className="animate-rise">
          <button
            onClick={onOpenForm}
            className="group inline-flex items-center justify-center gap-2 h-[54px] px-8 bg-gold-300 text-ink-950 font-semibold rounded-[12px] hover:bg-gold-200 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-500"
          >
            Agende sua consulta
            <WhatsAppIcon size={18} />
          </button>
        </div>

        <div style={{ animationDelay: "0.55s" }} className="animate-rise mt-7">
          <GoogleRating />
        </div>

        <dl
          style={{ animationDelay: "0.65s" }}
          className="animate-fade mt-14 w-full max-w-[640px] grid grid-cols-3 gap-6 pt-8 border-t border-white/[0.1]"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse items-center">
              <dt className="text-[0.75rem] leading-[1.4] text-ink-400">{stat.label}</dt>
              <dd className="text-[clamp(1.375rem,2.2vw,1.875rem)] font-medium tracking-[-0.02em] text-white leading-none mb-2">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
