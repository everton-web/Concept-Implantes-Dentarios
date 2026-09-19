"use client";

import Image from "next/image";
import SmileMosaic from "./SmileMosaic";
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
    <section className="relative min-h-[100svh] flex flex-col lg:justify-center bg-ink-950 overflow-hidden">
      {/* Mosaico isométrico de sorrisos em movimento. No desktop ocupa a
          metade direita; no mobile, o topo. */}
      <div
        style={{ animationDelay: "0.1s" }}
        className="animate-fade relative h-[340px] sm:h-[440px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[58vw]"
      >
        <SmileMosaic />

        {/* Símbolo da Concept sobre as fotos, como uma marca d'água dourada:
            translúcido, com um halo difuso, flutuando devagar. */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[44%] lg:left-[60%] lg:top-1/2 -translate-x-1/2 -translate-y-1/2 w-[58%] max-w-[240px] sm:max-w-[320px] lg:w-[46%] lg:max-w-[440px] pointer-events-none"
        >
          <div className="hero-symbol">
            <Image
              src="/marca/simbolo-concept.webp"
              alt=""
              width={520}
              height={427}
              priority
              unoptimized
              className="block w-full h-auto opacity-[0.45] mix-blend-screen drop-shadow-[0_0_28px_rgba(252,219,159,0.35)]"
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1200px] w-full px-6 md:px-10 lg:px-16 -mt-16 sm:-mt-24 pb-14 lg:mt-0 lg:py-24">
        <div className="max-w-[560px]">
          <Image
            src="/marca/logo-concept.png"
            alt="Concept Implantes Dentários"
            width={391}
            height={180}
            priority
            style={{ animationDelay: "0.02s" }}
            className="animate-rise block h-[40px] sm:h-[48px] lg:h-[54px] w-auto mb-7"
          />
          <div
            style={{ animationDelay: "0.05s" }}
            className="animate-rise inline-flex items-center gap-2.5 mb-8 px-3.5 py-1.5 rounded-full border border-white/[0.12] bg-ink-950/60 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-300" />
            <SpecialtyTicker />
          </div>

          <h1
            style={{ animationDelay: "0.2s" }}
            className="animate-rise text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[1.04] tracking-[-0.03em] font-medium text-white text-balance mb-6"
          >
            Tudo muda quando você volta a{" "}
            <span className="whitespace-nowrap">
              <span className="relative inline-block text-gold-300">
                sorrir sem medo
                <span
                  aria-hidden
                  className="animate-line absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-gold-400 to-transparent"
                />
              </span>
              .
            </span>
          </h1>

          <p
            style={{ animationDelay: "0.35s" }}
            className="animate-rise text-[clamp(1.0625rem,1.3vw,1.1875rem)] leading-[1.65] text-ink-300 max-w-[500px] mb-9"
          >
            Odontologia humanizada, acolhedora e sem julgamentos. Especialista em
            devolver a sua mastigação, segurança e autoestima com implantes
            dentários modernos, no seu tempo, do seu jeito.
          </p>

          <div
            style={{ animationDelay: "0.45s" }}
            className="animate-rise flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8"
          >
            <button
              onClick={onOpenForm}
              className="group inline-flex items-center justify-center gap-2 h-[54px] px-8 bg-gold-300 text-ink-950 font-semibold rounded-[12px] hover:bg-gold-200 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-500 self-start"
            >
              Agende sua consulta
              <WhatsAppIcon size={18} />
            </button>
            <GoogleRating />
          </div>

          <dl
            style={{ animationDelay: "0.65s" }}
            className="animate-fade mt-14 grid grid-cols-3 gap-6 pt-8 border-t border-white/[0.1]"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="text-[0.75rem] leading-[1.4] text-ink-400">{stat.label}</dt>
                <dd className="text-[clamp(1.375rem,2.2vw,1.875rem)] font-medium tracking-[-0.02em] text-white leading-none mb-2">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
