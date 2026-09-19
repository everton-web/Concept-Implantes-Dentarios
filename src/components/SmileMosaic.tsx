import Image from "next/image";

type Foto = { src: string; w: number; h: number; alt: string };

const FOTOS: Record<string, Foto> = {
  facetasLateral: {
    src: "/hero/sorrisos/facetas-lateral.webp",
    w: 720,
    h: 900,
    alt: "Sorriso com facetas, visto de perfil",
  },
  protocolo: {
    src: "/hero/sorrisos/protocolo.webp",
    w: 720,
    h: 453,
    alt: "Sorriso com prótese protocolo",
  },
  barba: {
    src: "/hero/sorrisos/lateral-barba.webp",
    w: 720,
    h: 900,
    alt: "Paciente sorrindo após reabilitação dos dentes superiores",
  },
  facetasFrontal: {
    src: "/hero/sorrisos/facetas-frontal.webp",
    w: 720,
    h: 446,
    alt: "Sorriso com facetas, visto de frente",
  },
};

// Cada coluna começa numa foto diferente, para nunca haver duas iguais lado a lado.
const COLUNAS: Foto[][] = [
  [FOTOS.facetasLateral, FOTOS.protocolo, FOTOS.barba, FOTOS.facetasFrontal],
  [FOTOS.protocolo, FOTOS.barba, FOTOS.facetasFrontal, FOTOS.facetasLateral],
  [FOTOS.barba, FOTOS.facetasFrontal, FOTOS.facetasLateral, FOTOS.protocolo],
  [FOTOS.facetasFrontal, FOTOS.facetasLateral, FOTOS.protocolo, FOTOS.barba],
];

/**
 * Mosaico isométrico de sorrisos: um plano deitado em 3D com colunas que
 * deslizam na vertical, alternando o sentido. A lista de cada coluna é
 * repetida duas vezes, então o loop (translateY até -50%) não tem emenda.
 * As bordas somem no #101010 por máscaras longas, uma por elemento.
 */
export default function SmileMosaic() {
  return (
    <div className="smile-fade-x absolute inset-0">
      <div className="smile-fade-y absolute inset-0 overflow-hidden">
        <div className="smile-plane absolute left-1/2 top-1/2 flex gap-3 sm:gap-4">
          {COLUNAS.map((coluna, c) => (
            <div key={c} className="w-[150px] sm:w-[210px] lg:w-[250px] shrink-0">
              <div
                className={`smile-col flex flex-col gap-3 sm:gap-4 ${
                  c % 2 ? "smile-col-down" : "smile-col-up"
                }`}
                style={{ animationDuration: `${46 + c * 6}s` }}
              >
                {[...coluna, ...coluna].map((foto, i) => (
                  <div
                    key={i}
                    aria-hidden={c > 0 || i >= coluna.length}
                    className="relative overflow-hidden rounded-[14px] sm:rounded-[18px] bg-ink-900 ring-1 ring-white/[0.06]"
                  >
                    <Image
                      src={foto.src}
                      width={foto.w}
                      height={foto.h}
                      alt={c === 0 && i < coluna.length ? foto.alt : ""}
                      unoptimized
                      priority={c < 2 && i < 2}
                      className="block w-full h-auto brightness-[0.9] saturate-[0.92]"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
