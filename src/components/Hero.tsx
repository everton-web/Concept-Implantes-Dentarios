"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import SpecialtyTicker from "./SpecialtyTicker";
import { CASOS } from "@/data/casos";

const STATS = [
  { value: "7+", label: "Anos de prática clínica" },
  { value: "9", label: "Áreas de atuação" },
  { value: "CRO-SC", label: "19661 · Responsável técnica" },
];

const CASO_DESTAQUE = CASOS[0];

/**
 * Pacientes reais depois do tratamento, alternando com fade. Os originais têm
 * 1080×1350: o quadro nunca passa de ~520px de largura, então mesmo em tela
 * retina a foto não é ampliada. Servidas sem nova compressão (unoptimized).
 */
const PACIENTES = [
  {
    src: "/hero/paciente-1.webp",
    alt: "Paciente sorrindo na cadeira, segurando o celular com a foto do sorriso antes do tratamento",
  },
  {
    src: "/hero/paciente-2.webp",
    alt: "Paciente sorrindo depois das facetas em porcelana",
  },
  {
    src: "/hero/paciente-3.webp",
    alt: "Sorriso de paciente depois das facetas",
  },
  {
    src: "/hero/paciente-4.webp",
    alt: "Paciente sorrindo de perfil no consultório",
  },
];

export default function Hero({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <section className="relative min-h-[100svh] flex flex-col bg-ink-950 overflow-hidden">
      <div
        aria-hidden
        className="animate-fade absolute top-[-15%] right-[-10%] w-[60vw] h-[60vw] max-w-[760px] max-h-[760px] rounded-full bg-[radial-gradient(circle,rgba(252,219,159,0.09),transparent_65%)] blur-2xl"
      />

      <div className="relative flex-1 flex flex-col mx-auto max-w-[1200px] w-full px-6 md:px-10 lg:px-16 pt-16 pb-10 lg:pt-20 lg:pb-12">
        <div className="flex-1 flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          <div className="lg:flex-1 max-w-[620px]">
            <div
              style={{ animationDelay: "0.05s" }}
              className="animate-rise inline-flex items-center gap-2.5 mb-7 px-3.5 py-1.5 rounded-full border border-white/[0.12] bg-ink-950/60 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold-300" />
              <SpecialtyTicker />
            </div>

            <Image
              src="/marca/logo-concept.png"
              alt="Concept Implantes Dentários"
              width={391}
              height={180}
              priority
              style={{ animationDelay: "0.1s" }}
              className="animate-rise block h-[40px] sm:h-[48px] lg:h-[56px] w-auto mb-7"
            />

            <h1
              style={{ animationDelay: "0.2s" }}
              className="animate-rise text-[clamp(2.5rem,4.3vw,4.125rem)] leading-[1.04] tracking-[-0.03em] font-medium text-white text-balance mb-6"
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
              className="animate-rise text-[clamp(1.0625rem,1.3vw,1.1875rem)] leading-[1.65] text-ink-300 max-w-[520px] mb-9"
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
          </div>

          {/* Quadro retrato com os pacientes. */}
          <figure
            style={{ animationDelay: "0.15s" }}
            className="animate-hero-photo relative w-full max-w-[440px] lg:w-[min(38vw,500px)] lg:max-w-none mx-auto lg:mx-0 shrink-0"
          >
            <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-ink-900 ring-1 ring-gold-300/20 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]">
              {PACIENTES.map((foto, i) => (
                <Image
                  key={foto.src}
                  src={foto.src}
                  alt={i === 0 ? foto.alt : ""}
                  aria-hidden={i === 0 ? undefined : true}
                  width={1080}
                  height={1350}
                  priority={i === 0}
                  unoptimized
                  className="hero-slide absolute inset-0 h-full w-full object-cover"
                  style={{ "--slide": i } as React.CSSProperties}
                />
              ))}
            </div>
            <figcaption className="absolute left-4 bottom-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-950/70 backdrop-blur-md text-[0.75rem] font-medium text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-300" aria-hidden />
              Pacientes reais da Concept
            </figcaption>
          </figure>
        </div>

        {/* Rodapé do Hero: números à esquerda, caso real à direita. */}
        <div
          style={{ animationDelay: "0.6s" }}
          className="animate-fade mt-14 lg:mt-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
        >
          <dl className="grid grid-cols-3 gap-6 sm:gap-10 max-w-[560px]">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="text-[0.75rem] leading-[1.4] text-ink-400">{stat.label}</dt>
                <dd className="text-[clamp(1.375rem,2.2vw,1.875rem)] font-medium tracking-[-0.02em] text-white leading-none mb-2">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href="#sorrisos"
            className="group flex items-center gap-4 w-full sm:w-auto sm:max-w-[340px] p-2.5 pr-5 rounded-[18px] bg-warm-white text-ink-950 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 transition-transform duration-300"
          >
            <span className="relative shrink-0 w-[76px] h-[76px] rounded-[12px] overflow-hidden bg-ink-100">
              <Image
                src={CASO_DESTAQUE.imagens[0]}
                alt={`Antes e depois, ${CASO_DESTAQUE.titulo}`}
                fill
                sizes="76px"
                className="object-cover"
              />
            </span>
            <span className="min-w-0">
              <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-gold-500 mb-1">
                Transformações reais
              </span>
              <span className="block text-[0.9375rem] font-medium leading-snug">
                Veja os casos de antes e depois
              </span>
            </span>
            <ArrowUpRight
              size={18}
              strokeWidth={2}
              className="shrink-0 ml-auto text-ink-500 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
