"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Foto = { src: string; w: number; h: number; alt: string };
type Peca = Foto & { base: number; espelhada: boolean };

const RETRATO = { w: 720, h: 900 };

const FOTOS: Foto[] = [
  { src: "/hero/sorrisos/facetas-lateral.webp", ...RETRATO, alt: "Sorriso com facetas, visto de perfil" },
  { src: "/hero/sorrisos/protocolo.webp", w: 720, h: 453, alt: "Sorriso com prótese protocolo" },
  { src: "/hero/sorrisos/rosto-inclinado.webp", ...RETRATO, alt: "Paciente sorrindo com os dentes novos" },
  { src: "/hero/sorrisos/facetas-frontal.webp", w: 720, h: 446, alt: "Sorriso com facetas, visto de frente" },
  { src: "/hero/sorrisos/lateral-barba.webp", ...RETRATO, alt: "Paciente sorrindo após reabilitação dos dentes superiores" },
  { src: "/hero/sorrisos/protocolo-afastador.webp", w: 720, h: 448, alt: "Arcadas superior e inferior reabilitadas" },
  { src: "/hero/sorrisos/facetas-baixo.webp", ...RETRATO, alt: "Sorriso com facetas, visto de baixo" },
];

// Cada foto entra também espelhada: 14 peças diferentes a partir de 7 fotos.
const PECAS: Peca[] = FOTOS.flatMap((foto, base) => [
  { ...foto, base, espelhada: false },
  { ...foto, base, espelhada: true },
]);

const N_COLUNAS = 3;
// Cópias da lista em cada coluna: com 3, a janela visível fica sempre no
// terço do meio e o loop (translateY de um terço) nunca mostra um vão.
const COPIAS = 3;

function embaralhar<T>(lista: T[]): T[] {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Ordem aleatória em que a mesma foto (normal ou espelhada) nunca fica
 *  colada nela mesma, inclusive na volta do loop. */
function colunaAleatoria(): Peca[] {
  for (let tentativa = 0; tentativa < 200; tentativa++) {
    const ordem = embaralhar(PECAS);
    const ok = ordem.every(
      (p, i) => p.base !== ordem[(i + 1) % ordem.length].base
    );
    if (ok) return ordem;
  }
  return PECAS;
}

// Ordem fixa para o HTML do servidor; no navegador é trocada por uma
// aleatória a cada carregamento, antes do mosaico aparecer.
const ORDEM_INICIAL: Peca[][] = Array.from({ length: N_COLUNAS }, (_, c) =>
  PECAS.map((_, i) => PECAS[(c * 5 + i * 3) % PECAS.length])
);

/**
 * Mosaico isométrico de sorrisos: um plano deitado em 3D com 3 colunas que
 * deslizam na vertical, alternando o sentido. As bordas somem no #101010
 * por máscaras longas, uma por elemento.
 */
export default function SmileMosaic() {
  const [colunas, setColunas] = useState<Peca[][] | null>(null);
  const [fases, setFases] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    setColunas(Array.from({ length: N_COLUNAS }, colunaAleatoria));
    // Cada coluna começa num ponto diferente do próprio ciclo.
    setFases(Array.from({ length: N_COLUNAS }, () => Math.random()));
  }, []);

  const visiveis = colunas ?? ORDEM_INICIAL;

  return (
    <div
      className={`smile-fade-x absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
        colunas ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="smile-fade-y absolute inset-0 overflow-hidden">
        <div className="smile-plane absolute left-[60%] top-[44%] flex gap-4 sm:gap-5">
          {visiveis.map((coluna, c) => {
            const duracao = 150 + c * 20;
            return (
              <div key={c} className="w-[190px] sm:w-[270px] lg:w-[max(360px,26vw)] shrink-0">
                <div
                  className={`flex flex-col gap-4 sm:gap-5 ${
                    c % 2 ? "smile-col-down" : "smile-col-up"
                  }`}
                  style={{
                    animationDuration: `${duracao}s`,
                    animationDelay: `-${(fases[c] * duracao).toFixed(1)}s`,
                  }}
                >
                  {Array.from({ length: COPIAS }).flatMap((_, copia) =>
                    coluna.map((peca, i) => {
                      const principal = c === 0 && copia === 1 && !peca.espelhada;
                      return (
                        <div
                          key={`${copia}-${i}`}
                          aria-hidden={!principal}
                          className="relative overflow-hidden rounded-[16px] sm:rounded-[22px] bg-ink-900 ring-1 ring-white/[0.06]"
                        >
                          <Image
                            src={peca.src}
                            width={peca.w}
                            height={peca.h}
                            alt={principal ? peca.alt : ""}
                            unoptimized
                            loading="eager"
                            className={`block w-full h-auto brightness-[0.9] saturate-[0.92] ${
                              peca.espelhada ? "-scale-x-100" : ""
                            }`}
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
