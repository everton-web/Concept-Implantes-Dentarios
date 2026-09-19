"use client";

import { useEffect, useRef, useState } from "react";
import type { ImplantScene } from "./implant3d/scene";

const STEPS = [
  {
    title: "Pino de titânio",
    description:
      "Instalado no osso com planejamento e anestesia, ele faz o papel da raiz que foi perdida.",
  },
  {
    title: "Conector",
    description:
      "Depois da cicatrização, une o pino à parte visível e deixa tudo firme para a mastigação.",
  },
  {
    title: "Coroa",
    description:
      "Feita sob medida na cor e no formato dos seus dentes, completa o sorriso.",
  },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Progresso da montagem a partir da posição da seção.
 * Desktop: a seção é alta e o palco fica fixo; conta o tempo em que ele está parado.
 * Mobile: a seção atravessa a tela normalmente.
 */
function scrollProgress(section: HTMLElement, pinned: boolean) {
  const rect = section.getBoundingClientRect();
  const vh = window.innerHeight;
  if (pinned) {
    return clamp01(-rect.top / (rect.height - vh));
  }
  const cover = (vh - rect.top) / (vh + rect.height);
  return clamp01((cover - 0.18) / (0.62 - 0.18));
}

export default function ImplantScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!section || !stage || !canvas) return;

    let scene: ImplantScene | null = null;
    let loading = false;
    let frame = 0;
    let disposed = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)");

    // Só baixa o three.js quando a seção chega perto da tela.
    const loadIfNear = async () => {
      if (scene || loading) return;
      const rect = section.getBoundingClientRect();
      const margin = 600;
      if (rect.top > window.innerHeight + margin || rect.bottom < -margin) return;
      loading = true;
      try {
        const { createImplantScene } = await import("./implant3d/scene");
        if (disposed) return;
        scene = createImplantScene(canvas);
        scene.resize(stage.clientWidth, stage.clientHeight);
        draw();
        setReady(true);
      } catch {
        // Sem WebGL: o texto continua completo e o painel fica vazio.
      }
    };

    function draw() {
      frame = 0;
      if (!scene) return;
      scene.setProgress(reduced ? 1 : scrollProgress(section!, desktop.matches));
      scene.render();
    }
    const onScroll = () => {
      loadIfNear();
      if (scene && !frame) frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      if (!scene) return;
      scene.resize(stage.clientWidth, stage.clientHeight);
      onScroll();
    };

    loadIfNear();
    window.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(resize);
    ro.observe(stage);

    return () => {
      disposed = true;
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      scene?.dispose();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="implante-title"
      className="implant-scroll relative -mt-px bg-ink-950 lg:h-[260vh]"
    >
      <div className="lg:sticky lg:top-0 lg:h-[100svh] flex items-center py-[88px] lg:py-0">
        <div className="mx-auto max-w-[1200px] w-full px-6 md:px-10 lg:px-16 lg:grid lg:grid-cols-12 lg:gap-14 lg:items-center">
          <div className="lg:col-span-5 mb-12 lg:mb-0">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-400 mb-5">
              Como funciona o implante
            </p>
            <h2
              id="implante-title"
              className="text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.1] tracking-[-0.025em] font-medium text-white text-balance mb-10"
            >
              Três peças, <span className="text-gold-300">um sorriso inteiro</span>
            </h2>

            <ol className="border-t border-white/[0.12]">
              {STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className={`implant-step implant-step-${i + 1} grid grid-cols-[2.5rem_1fr] gap-x-4 py-6 border-b border-white/[0.12]`}
                >
                  <span className="pt-[3px] text-[0.8125rem] font-semibold tabular-nums tracking-[0.04em] text-gold-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.0625rem] font-semibold text-white mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-[0.9375rem] leading-[1.65] text-ink-300">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-7">
            <div
              ref={stageRef}
              role="img"
              aria-label="Implante dentário em 3D: pino de titânio, conector e coroa se encaixando entre dois dentes"
              className="relative aspect-[4/5] sm:aspect-[5/5] lg:aspect-auto lg:h-[min(78svh,680px)] rounded-[28px] overflow-hidden bg-[radial-gradient(ellipse_85%_75%_at_55%_22%,#f6f7f9_0%,#cfd3da_50%,#7f8591_100%)]"
            >
              <canvas
                ref={canvasRef}
                className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
