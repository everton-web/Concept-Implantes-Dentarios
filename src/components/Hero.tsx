"use client";

import { ArrowUpRight } from "lucide-react";

const BADGES = ["CRO-SC 19661", "7+ anos de dedicação", "Centro de Camboriú - SC"];

export default function Hero({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <section className="relative min-h-[100svh] flex items-center gradient-mesh overflow-hidden">
      <div
        aria-hidden
        className="animate-fade absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-[760px] max-h-[760px] rounded-full bg-[radial-gradient(circle,rgba(252,219,159,0.10),transparent_65%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-[1200px] w-full px-6 md:px-10 lg:px-16 pt-[120px] pb-24 lg:py-0">
        <div className="max-w-[760px]">
          <div
            style={{ animationDelay: "0.1s" }}
            className="animate-rise inline-flex items-center gap-2.5 mb-8 px-3.5 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.04]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-300" />
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-gold-200">
              Implantodontia e reabilitação oral em Camboriú
            </span>
          </div>

          <h1
            style={{ animationDelay: "0.2s" }}
            className="animate-rise text-[clamp(2.75rem,6vw,5.25rem)] leading-[1.02] tracking-[-0.03em] font-medium text-white text-balance mb-7"
          >
            Tudo muda quando você volta a{" "}
            <span className="relative inline-block text-gold-300">
              sorrir sem medo
              <span
                aria-hidden
                className="animate-line absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-gold-400 to-transparent"
              />
            </span>
            .
          </h1>

          <p
            style={{ animationDelay: "0.35s" }}
            className="animate-rise text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-[1.65] text-ink-300 max-w-[620px] mb-10"
          >
            Odontologia humanizada, acolhedora e sem julgamentos. Especialista em
            devolver a sua mastigação, segurança e autoestima com implantes
            dentários modernos, no seu tempo, do seu jeito.
          </p>

          <div style={{ animationDelay: "0.45s" }} className="animate-rise mb-14">
            <button
              onClick={onOpenForm}
              className="group inline-flex items-center justify-center gap-2 h-[54px] px-8 bg-gold-300 text-ink-950 font-semibold rounded-[12px] hover:bg-gold-200 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-500"
            >
              Agende sua consulta
              <ArrowUpRight
                size={17}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
              />
            </button>
          </div>

          <ul
            style={{ animationDelay: "0.6s" }}
            className="animate-fade flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            {BADGES.map((badge, i) => (
              <li key={badge} className="flex items-center gap-2.5">
                {i > 0 && (
                  <span aria-hidden className="hidden sm:block w-px h-3.5 bg-white/[0.14] -ml-4" />
                )}
                <span className="text-[0.8125rem] font-medium text-ink-400">
                  {badge}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
