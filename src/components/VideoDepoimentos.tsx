"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

type Video = {
  slug: string;
  titulo: string;
  descricao: string;
  duracao: string;
};

// Arquivos em /public/videos/<slug>.webm|.mp4 e <slug>-poster.webp.
const VIDEOS: Video[] = [
  {
    slug: "depoimento-entrega",
    titulo: "A reação no dia da entrega",
    descricao: "Reabilitação oral",
    duracao: "1:00",
  },
  {
    slug: "depoimento-sorriso",
    titulo: "Um sorriso de volta",
    descricao: "Depoimento de paciente",
    duracao: "0:10",
  },
];

/**
 * Depoimentos em vídeo dentro de um iPhone desenhado em CSS. A lista ao
 * lado troca o vídeo; ao escolher um item, ele toca do início e com som
 * (o clique libera o áudio). Sem interação, o primeiro roda mudo em loop,
 * como prévia.
 */
export default function VideoDepoimentos() {
  const [ativo, setAtivo] = useState(0);
  const [mudo, setMudo] = useState(true);
  const [tocando, setTocando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = VIDEOS[ativo];

  const mudoRef = useRef(mudo);
  const primeiraVez = useRef(true);

  useEffect(() => {
    mudoRef.current = mudo;
  }, [mudo]);

  // A prévia muda só roda com o aparelho na tela, e pausa ao sair dela: o
  // vídeo não é baixado enquanto a pessoa ainda está no topo da página.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          if (v.paused && mudoRef.current) v.play().catch(() => {});
        } else if (!v.paused) {
          v.pause();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // Troca de vídeo: recarrega a fonte e toca. Se o navegador recusar tocar
  // com som, volta para a prévia muda (o botão de som continua disponível).
  // `muted` é ajustado direto no elemento: o React não sincroniza essa prop.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (primeiraVez.current) {
      primeiraVez.current = false;
      return;
    }
    v.load();
    v.muted = mudoRef.current;
    setProgresso(0);
    v.play().catch(() => {
      v.muted = true;
      setMudo(true);
      v.play().catch(() => setTocando(false));
    });
  }, [ativo]);

  /** Sai da prévia muda: volta ao início e toca com som. */
  function assistirComSom() {
    const v = videoRef.current;
    if (!v) return;
    setMudo(false);
    mudoRef.current = false;
    v.muted = false;
    v.loop = false;
    v.currentTime = 0;
    v.play().catch(() => {});
  }

  /** Play/pause. Na prévia muda, o primeiro toque já começa com som. */
  function alternarPlay() {
    const v = videoRef.current;
    if (!v) return;
    if (mudo) assistirComSom();
    else if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

  function escolher(i: number) {
    if (i === ativo) {
      alternarPlay();
      return;
    }
    setMudo(false);
    mudoRef.current = false;
    if (videoRef.current) videoRef.current.muted = false;
    setAtivo(i);
  }

  function alternarSom() {
    const v = videoRef.current;
    if (!v) return;
    const novo = !mudo;
    setMudo(novo);
    mudoRef.current = novo;
    v.muted = novo;
    if (!novo && v.paused) v.play().catch(() => {});
  }

  function aoTerminar() {
    // Com som, segue para o próximo depoimento; em prévia muda, fica em loop.
    if (!mudo) setAtivo((i) => (i + 1) % VIDEOS.length);
  }

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      {/* Lista */}
      <div className="lg:col-span-6 order-2 lg:order-1">
        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-400 mb-5">
          Depoimentos em vídeo
        </p>
        <h3 className="text-[clamp(1.625rem,2.8vw,2.25rem)] leading-[1.15] tracking-[-0.02em] font-medium text-white text-balance mb-4">
          Quem viveu a transformação conta como foi
        </h3>
        <p className="text-[1rem] leading-[1.7] text-ink-400 mb-9 max-w-[46ch]">
          Escolha um depoimento para assistir com som.
        </p>

        <ol className="border-t border-white/[0.1]">
          {VIDEOS.map((item, i) => {
            const selecionado = i === ativo;
            return (
              <li key={item.slug} className="border-b border-white/[0.1]">
                <button
                  onClick={() => escolher(i)}
                  aria-current={selecionado}
                  className="group relative w-full grid grid-cols-[2.75rem_1fr_auto] items-center gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                >
                  <span
                    className={`flex items-center justify-center w-11 h-11 rounded-full border transition-colors ${
                      selecionado
                        ? "bg-gold-300 border-gold-300 text-ink-950"
                        : "border-white/[0.16] text-white/80 group-hover:border-gold-300/60 group-hover:text-gold-200"
                    }`}
                  >
                    {selecionado && tocando && !mudo ? (
                      <Pause size={16} strokeWidth={2} aria-hidden />
                    ) : (
                      <Play size={16} strokeWidth={2} className="ml-0.5" aria-hidden />
                    )}
                  </span>
                  <span>
                    <span
                      className={`block text-[1.0625rem] font-medium leading-snug transition-colors ${
                        selecionado ? "text-white" : "text-white/75 group-hover:text-white"
                      }`}
                    >
                      {item.titulo}
                    </span>
                    <span className="block text-[0.8125rem] text-ink-400 mt-0.5">
                      {item.descricao}
                    </span>
                  </span>
                  <span className="text-[0.8125rem] tabular-nums text-ink-400">
                    {item.duracao}
                  </span>

                  {/* Progresso do vídeo ativo, sobre a linha divisória. */}
                  {selecionado && (
                    <span
                      aria-hidden
                      className="absolute left-0 -bottom-px h-px bg-gold-300"
                      style={{ width: `${progresso * 100}%` }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* iPhone */}
      <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
        <div className="relative w-[272px] sm:w-[300px]">
          {/* Brilho dourado bem difuso atrás do aparelho. */}
          <div
            aria-hidden
            className="absolute -inset-16 rounded-full bg-[radial-gradient(closest-side,rgba(252,219,159,0.12),transparent)] blur-2xl"
          />
          {/* Moldura: aro metálico + borda preta + tela. */}
          <div className="relative aspect-[9/19.5] rounded-[3.1rem] p-[3px] bg-[linear-gradient(145deg,#6b6457,#2a2824_28%,#1a1917_60%,#57503f)] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
            {/* Botões laterais */}
            <span aria-hidden className="absolute -left-[3px] top-[22%] h-8 w-[3px] rounded-l bg-[#3a3731]" />
            <span aria-hidden className="absolute -left-[3px] top-[31%] h-14 w-[3px] rounded-l bg-[#3a3731]" />
            <span aria-hidden className="absolute -right-[3px] top-[27%] h-20 w-[3px] rounded-r bg-[#3a3731]" />

            <div className="relative h-full w-full rounded-[2.95rem] bg-black p-[9px]">
              <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-ink-900">
                <video
                  ref={videoRef}
                  muted={mudo}
                  loop={mudo}
                  playsInline
                  preload="none"
                  poster={`/videos/${video.slug}-poster.webp`}
                  onPlay={() => setTocando(true)}
                  onPause={() => setTocando(false)}
                  onEnded={aoTerminar}
                  onTimeUpdate={(e) => {
                    const v = e.currentTarget;
                    if (v.duration) setProgresso(v.currentTime / v.duration);
                  }}
                  onClick={alternarPlay}
                  aria-label={`${video.titulo}. ${video.descricao}.`}
                  className="absolute inset-0 h-full w-full object-cover cursor-pointer"
                >
                  <source src={`/videos/${video.slug}.webm`} type="video/webm" />
                  <source src={`/videos/${video.slug}.mp4`} type="video/mp4" />
                </video>

                {/* Dynamic Island */}
                <span
                  aria-hidden
                  className="absolute top-[10px] left-1/2 -translate-x-1/2 h-[26px] w-[88px] rounded-full bg-black"
                />

                {/* Botão central grande: aparece na prévia muda e quando o
                    vídeo está pausado. Fácil de acertar com o polegar. */}
                {(mudo || !tocando) && (
                  <button
                    onClick={alternarPlay}
                    aria-label={mudo ? `Assistir com som: ${video.titulo}` : "Continuar vídeo"}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/25 transition-colors hover:bg-black/15 focus-visible:outline-none group/play"
                  >
                    <span className="relative flex items-center justify-center w-[76px] h-[76px] rounded-full bg-gold-300 text-ink-950 shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-transform duration-200 group-hover/play:scale-105 group-active/play:scale-95 group-focus-visible/play:ring-4 group-focus-visible/play:ring-gold-300/40">
                      <span aria-hidden className="absolute inset-0 rounded-full bg-gold-300/40 animate-ping [animation-duration:2.4s]" />
                      <Play size={30} strokeWidth={2} fill="currentColor" className="relative ml-1" aria-hidden />
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-[0.8125rem] font-medium text-white">
                      {mudo ? "Assistir com som" : "Continuar"}
                    </span>
                  </button>
                )}

                {/* Base: legenda, progresso e controles de 44px. */}
                <div className="absolute inset-x-0 bottom-0 pt-20 pb-4 px-4 bg-[linear-gradient(to_top,rgba(0,0,0,0.78),rgba(0,0,0,0.35)_45%,transparent)] pointer-events-none">
                  <span className="block text-[0.9375rem] font-medium text-white leading-snug">
                    {video.titulo}
                  </span>
                  <span className="block text-[0.75rem] text-white/70 mb-3">
                    {video.descricao}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={alternarPlay}
                      aria-label={tocando && !mudo ? "Pausar" : "Reproduzir"}
                      className="pointer-events-auto shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 active:scale-95 transition"
                    >
                      {tocando && !mudo ? (
                        <Pause size={18} fill="currentColor" aria-hidden />
                      ) : (
                        <Play size={18} fill="currentColor" className="ml-0.5" aria-hidden />
                      )}
                    </button>
                    <span aria-hidden className="relative flex-1 h-[3px] rounded-full bg-white/20 overflow-hidden">
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-gold-300"
                        style={{ width: `${progresso * 100}%` }}
                      />
                    </span>
                    <button
                      onClick={alternarSom}
                      aria-label={mudo ? "Ativar som" : "Desativar som"}
                      className="pointer-events-auto shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 active:scale-95 transition"
                    >
                      {mudo ? <VolumeX size={18} aria-hidden /> : <Volume2 size={18} aria-hidden />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
