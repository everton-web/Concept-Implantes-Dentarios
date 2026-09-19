"use client";

import { useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

interface Props {
  antes: string;
  depois: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

/**
 * Comparador antes/depois: "depois" embaixo, "antes" por cima recortado até a
 * alça. O controle é um <input type="range"> invisível sobre a imagem, então
 * funciona com mouse, toque e teclado (setas) sem código de arrastar.
 */
export default function BeforeAfter({ antes, depois, alt, width, height, className = "" }: Props) {
  const [pos, setPos] = useState(50);

  return (
    <div
      className={`relative overflow-hidden select-none has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-gold-300 ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- original em alta; sem recompressão */}
      <img
        src={depois}
        alt={`Depois: ${alt}`}
        width={width}
        height={height}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={antes}
        alt={`Antes: ${alt}`}
        width={width}
        height={height}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-ink-950/70 backdrop-blur-md text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-white">
        Antes
      </span>
      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gold-300 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-950">
        Depois
      </span>

      {/* Linha e alça */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white text-ink-950 shadow-[0_6px_20px_rgba(0,0,0,0.35)]">
          <ChevronsLeftRight size={20} strokeWidth={2} />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Arraste para comparar antes e depois"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 focus-visible:opacity-0"
      />
    </div>
  );
}
