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

/* Rosca do pino: linhas inclinadas ao longo do corpo cônico. */
const THREADS = Array.from({ length: 9 }, (_, i) => {
  const y = 346 + i * 19;
  const half = 33 - i * 1.6;
  return { x1: 200 - half, y1: y + 5, x2: 200 + half, y2: y - 5 };
});

/**
 * Implante montando ao rolar. A seção é alta e o palco fica fixo (sticky);
 * a view timeline da seção move cada peça até o lugar. Sem suporte a scroll
 * timelines, o implante aparece montado e os três passos ficam visíveis.
 */
export default function ImplantScroll() {
  return (
    <section
      aria-labelledby="implante-title"
      className="implant-scroll relative -mt-px bg-ink-950 lg:h-[260vh]"
    >
      <div className="lg:sticky lg:top-0 lg:h-[100svh] flex items-center py-[88px] lg:py-0">
        <div className="mx-auto max-w-[1200px] w-full px-6 md:px-10 lg:px-16 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="lg:col-span-6 mb-12 lg:mb-0">
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

          <div className="lg:col-span-6 flex justify-center">
            <svg
              viewBox="0 0 400 600"
              className="w-full max-w-[360px] lg:max-w-[440px] h-auto overflow-visible"
              role="img"
              aria-label="Ilustração de um implante dentário: pino no osso, conector e coroa"
            >
              <defs>
                <linearGradient id="implant-gold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FCDB9F" />
                  <stop offset="100%" stopColor="#D4A843" />
                </linearGradient>
                <linearGradient id="implant-crown" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#EDE6D8" />
                </linearGradient>
              </defs>

              {/* Brilho atrás do dente montado. */}
              <circle
                className="implant-glow"
                cx="200"
                cy="250"
                r="150"
                fill="#FCDB9F"
                opacity="0.08"
              />

              {/* Pino de titânio */}
              <g className="implant-part implant-screw">
                <path
                  d="M166 332 L234 332 L221 508 Q200 530 179 508 Z"
                  fill="#2A2B30"
                  stroke="url(#implant-gold)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                {THREADS.map((t, i) => (
                  <line
                    key={i}
                    {...t}
                    stroke="url(#implant-gold)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ))}
              </g>

              {/* Osso e gengiva, na frente do pino para ele parecer instalado. */}
              <path
                d="M40 352 C110 336 150 346 200 346 C250 346 290 336 360 352 L360 580 L40 580 Z"
                fill="#1E1F23"
                fillOpacity="0.72"
                stroke="#55565E"
                strokeWidth="1.5"
              />
              <path
                d="M40 352 C110 336 150 346 200 346 C250 346 290 336 360 352"
                fill="none"
                stroke="#E0BE6A"
                strokeOpacity="0.55"
                strokeWidth="2"
              />

              {/* Conector */}
              <g className="implant-part implant-abutment">
                <path
                  d="M176 334 L224 334 L214 290 L186 290 Z"
                  fill="#3D3E44"
                  stroke="url(#implant-gold)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <line x1="182" y1="312" x2="218" y2="312" stroke="url(#implant-gold)" strokeWidth="1.5" />
              </g>

              {/* Coroa */}
              <g className="implant-part implant-crown">
                <path
                  d="M146 300 C136 258 134 214 158 192 C174 178 188 188 200 183 C212 188 226 178 242 192 C266 214 264 258 254 300 C236 314 164 314 146 300 Z"
                  fill="url(#implant-crown)"
                  stroke="url(#implant-gold)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M172 214 C178 204 188 202 194 206"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
