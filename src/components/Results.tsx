"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Quote, Info, X, ChevronLeft, ChevronRight, MousePointerClick } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { CASOS, type Caso } from "@/data/casos";
import { AVALIACOES_GOOGLE } from "@/data/google";
import GoogleRating from "./GoogleRating";
import VideoDepoimentos from "./VideoDepoimentos";

const TESTIMONIALS = [
  {
    quote:
      "Eu tinha medo de prótese solta e vergonha de sorrir. Hoje almoço com a minha família sem preocupação nenhuma.",
    name: "Maria Sueli",
    treatment: "Prótese Protocolo Superior",
  },
  {
    quote:
      "Sentia muito medo de sentir dor. A calma e o carinho no atendimento mudaram tudo para mim.",
    name: "Nadia",
    treatment: "Implante Dentário",
  },
];

export default function Results() {
  const [aberto, setAberto] = useState<Caso | null>(null);
  const [indice, setIndice] = useState(0);

  const temFotos = CASOS.some((c) => c.imagens.length > 0);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [aberto]);

  useEffect(() => {
    if (!aberto) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAberto(null);
      if (e.key === "ArrowRight") setIndice((i) => Math.min(i + 1, aberto!.imagens.length - 1));
      if (e.key === "ArrowLeft") setIndice((i) => Math.max(i - 1, 0));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aberto]);

  function abrir(caso: Caso) {
    if (caso.imagens.length === 0) return;
    setIndice(0);
    setAberto(caso);
  }

  return (
    <section id="sorrisos" className="relative py-[88px] lg:py-[140px] bg-ink-950">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <AnimatedSection className="max-w-[640px] mb-14 lg:mb-20">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-400 mb-5">
            Transformações reais
          </p>
          <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.1] tracking-[-0.025em] font-medium text-white text-balance mb-5">
            Sorrisos que contam histórias
          </h2>
          <p className="text-[1.0625rem] leading-[1.7] text-ink-400">
            Casos de reabilitação oral conduzidos com técnica e acolhimento, do
            implante unitário à prótese protocolo.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mb-20 lg:mb-28">
          <VideoDepoimentos />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {TESTIMONIALS.map((item, i) => (
            <AnimatedSection key={item.name} delay={i * 0.1}>
              <figure className="h-full p-8 sm:p-10 rounded-[22px] bg-white/[0.04] border border-white/[0.1]">
                <Quote size={26} strokeWidth={1.5} className="text-gold-400/70 mb-6" aria-hidden />
                <blockquote className="text-[1.0625rem] sm:text-[1.125rem] leading-[1.65] text-white/90 mb-7">
                  {item.quote}
                </blockquote>
                <figcaption className="pt-6 border-t border-white/[0.1]">
                  <p className="text-[0.9375rem] font-semibold text-white">{item.name}</p>
                  <p className="text-[0.8125rem] text-ink-400">{item.treatment}</p>
                </figcaption>
              </figure>
            </AnimatedSection>
          ))}
        </div>

        {/* Avaliações reais do Google. */}
        <AnimatedSection className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-6">
            <h3 className="text-[1.25rem] font-medium text-white">
              O que dizem no Google
            </h3>
            <GoogleRating />
          </div>
          <ul className="grid md:grid-cols-3 gap-4">
            {AVALIACOES_GOOGLE.map((review) => (
              <li
                key={review.texto}
                className="flex flex-col justify-between gap-5 p-6 rounded-[18px] bg-white/[0.03] border border-white/[0.08]"
              >
                <p className="text-[1rem] leading-[1.6] text-white/90">
                  &ldquo;{review.texto}&rdquo;
                </p>
                <p className="flex items-center justify-between text-[0.8125rem] text-ink-400">
                  {review.autor}
                  <span className="text-gold-300 tracking-[0.1em]" aria-label="5 estrelas">
                    ★★★★★
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </AnimatedSection>

        {temFotos && (
          <AnimatedSection>
            {/* Chamada com peso de título: é o convite para abrir a galeria. */}
            <h3 className="flex items-start gap-4 mb-10 max-w-[760px] text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] font-medium text-white text-balance">
              <MousePointerClick
                strokeWidth={1.5}
                className="shrink-0 w-[1em] h-[1em] mt-[0.08em] text-gold-300"
                aria-hidden
              />
              <span>
                Clique nas imagens e veja{" "}
                <span className="text-gold-300">todos os resultados</span> de cada caso.
              </span>
            </h3>
          </AnimatedSection>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {CASOS.map((caso, i) => {
            const capa = caso.imagens[0];
            const clicavel = caso.imagens.length > 0;
            return (
              <AnimatedSection key={caso.slug} delay={(i % 3) * 0.06}>
                <article className="h-full">
                  <button
                    onClick={() => abrir(caso)}
                    disabled={!clicavel}
                    className="group relative w-full aspect-[4/5] rounded-[18px] overflow-hidden bg-ink-900 border border-white/[0.08] text-left disabled:cursor-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                  >
                    {capa ? (
                      <Image
                        src={capa}
                        alt={`Antes e depois, ${caso.titulo}`}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-ink-600 text-[0.75rem]">
                        Antes / Depois
                      </span>
                    )}
                    <span className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink-950 via-ink-950/85 to-transparent">
                      <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-gold-400 mb-1.5">
                        {caso.categoria}
                      </span>
                      <span className="block text-[0.9375rem] font-medium text-white leading-snug">
                        {caso.titulo}
                      </span>
                    </span>
                  </button>
                </article>
              </AnimatedSection>
            );
          })}
        </div>

        {!temFotos && (
          <AnimatedSection>
            <p className="flex items-start gap-2.5 text-[0.8125rem] leading-[1.6] text-ink-500 max-w-[68ch]">
              <Info size={15} strokeWidth={1.75} className="shrink-0 mt-0.5" aria-hidden />
              Os casos reais de antes/depois e os vídeo-depoimentos entram no ar
              após a confirmação das autorizações de uso de imagem.
            </p>
          </AnimatedSection>
        )}
      </div>

      {aberto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/92 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setAberto(null); }}
        >
          <button
            onClick={() => setAberto(null)}
            aria-label="Fechar"
            className="absolute top-5 right-5 p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={22} strokeWidth={1.75} />
          </button>

          <div className="relative w-full max-w-[560px]">
            <div className="relative aspect-[4/5] rounded-[16px] overflow-hidden bg-ink-900">
              <Image
                src={aberto.imagens[indice]}
                alt={`Antes e depois, ${aberto.titulo} (${indice + 1} de ${aberto.imagens.length})`}
                fill
                sizes="560px"
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-between gap-4 mt-5">
              <div>
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-gold-400 mb-1">
                  {aberto.categoria}
                </p>
                <p className="text-[0.9375rem] font-medium text-white">
                  {aberto.titulo}
                </p>
              </div>

              {aberto.imagens.length > 1 && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIndice((i) => Math.max(i - 1, 0))}
                    disabled={indice === 0}
                    aria-label="Anterior"
                    className="p-2 rounded-lg border border-white/15 text-white hover:bg-white/10 disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft size={18} strokeWidth={2} />
                  </button>
                  <span className="text-[0.8125rem] text-ink-400 tabular-nums">
                    {indice + 1}/{aberto.imagens.length}
                  </span>
                  <button
                    onClick={() => setIndice((i) => Math.min(i + 1, aberto.imagens.length - 1))}
                    disabled={indice === aberto.imagens.length - 1}
                    aria-label="Próxima"
                    className="p-2 rounded-lg border border-white/15 text-white hover:bg-white/10 disabled:opacity-30 transition-colors"
                  >
                    <ChevronRight size={18} strokeWidth={2} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
