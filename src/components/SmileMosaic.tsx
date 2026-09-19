import Image from "next/image";

type Foto = { src: string; w: number; h: number; alt: string };

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

// Cada coluna percorre as 7 fotos numa ordem própria (passo 3 a partir de um
// início diferente), então colunas vizinhas nunca mostram a mesma foto na
// mesma altura e a repetição não salta aos olhos.
const COLUNAS: Foto[][] = Array.from({ length: 5 }, (_, c) =>
  FOTOS.map((_, i) => FOTOS[(c * 2 + i * 3) % FOTOS.length])
);

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
            <div key={c} className="w-[130px] sm:w-[180px] lg:w-[220px] shrink-0">
              <div
                className={`smile-col flex flex-col gap-3 sm:gap-4 ${
                  c % 2 ? "smile-col-down" : "smile-col-up"
                }`}
                style={{ animationDuration: `${70 + c * 8}s` }}
              >
                {[...coluna, ...coluna].map((foto, i) => {
                  const principal = c === 0 && i < coluna.length;
                  return (
                    <div
                      key={i}
                      aria-hidden={!principal}
                      className="relative overflow-hidden rounded-[14px] sm:rounded-[18px] bg-ink-900 ring-1 ring-white/[0.06]"
                    >
                      <Image
                        src={foto.src}
                        width={foto.w}
                        height={foto.h}
                        alt={principal ? foto.alt : ""}
                        unoptimized
                        priority={c < 3 && i < 2}
                        className="block w-full h-auto brightness-[0.9] saturate-[0.92]"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
