"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SPECIALTIES = [
  "Implantodontia",
  "Prótese protocolo",
  "Facetas e lentes",
  "Harmonização orofacial",
  "Clareamento dental",
  "Endodontia",
  "Cirurgia oral menor",
  "Odontopediatria",
];

const INTERVAL_MS = 2600;

/** Selo do Hero: troca a especialidade em destaque em ciclo. */
export default function SpecialtyTicker() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % SPECIALTIES.length),
      INTERVAL_MS
    );
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-gold-200">
      {/* Leitores de tela recebem a lista completa, sem o ciclo. */}
      <span className="sr-only">{SPECIALTIES.join(", ")} em Camboriú</span>

      {/* A largura acompanha a palavra atual direto pelo fluxo do texto (sem
          animação de layout por JS), então "em Camboriú" nunca é sobreposto. */}
      <span aria-hidden className="inline-flex items-center gap-[0.35em]">
        <span className="relative inline-flex overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={SPECIALTIES[index]}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0, position: "absolute" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="whitespace-nowrap"
            >
              {SPECIALTIES[index]}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="whitespace-nowrap">em Camboriú</span>
      </span>
    </span>
  );
}
