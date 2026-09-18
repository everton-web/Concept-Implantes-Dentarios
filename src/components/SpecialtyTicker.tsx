"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SPECIALTIES = [
  "Implantodontia",
  "Prótese protocolo",
  "Facetas e lentes de contato",
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

      <span aria-hidden className="inline-flex items-center gap-[0.35em]">
        <motion.span
          layout
          transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
          className="relative inline-flex overflow-hidden"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={SPECIALTIES[index]}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="whitespace-nowrap"
            >
              {SPECIALTIES[index]}
            </motion.span>
          </AnimatePresence>
        </motion.span>
        <motion.span layout transition={{ layout: { duration: 0.35 } }}>
          em Camboriú
        </motion.span>
      </span>
    </span>
  );
}
