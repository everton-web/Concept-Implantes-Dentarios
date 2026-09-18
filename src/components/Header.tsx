"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Método", href: "#metodo" },
  { label: "Localização", href: "#localizacao" },
  { label: "FAQ", href: "#faq" },
];

export default function Header({ onOpenForm }: { onOpenForm: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16 flex items-center justify-end lg:justify-between h-[80px]">
        <nav className="hidden lg:flex items-center gap-1 -ml-3.5" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-[0.8125rem] font-medium rounded-lg transition-all duration-200 text-ink-400 hover:text-white hover:bg-white/[0.06]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+5547991208176"
            className="flex items-center gap-2 px-3 py-2 text-[0.8125rem] font-medium rounded-lg transition-all duration-200 text-ink-400 hover:text-white"
          >
            <Phone size={15} strokeWidth={1.75} />
            (47) 9120-8176
          </a>
          <button
            onClick={onOpenForm}
            className="group inline-flex items-center gap-2 h-[40px] px-5 text-[0.8125rem] font-semibold rounded-[10px] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-500 bg-white/10 text-white border border-white/20 hover:bg-white/20"
          >
            Agende sua consulta
            <WhatsAppIcon size={15} />
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden relative z-10 p-2 -mr-2 transition-colors ${
            menuOpen ? "text-ink-950" : "text-white"
          }`}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 top-0 bg-warm-white z-40"
          >
            <nav className="flex flex-col px-8 pt-24 gap-0" aria-label="Navegação mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.25 }}
                  className="text-[1.75rem] font-medium text-ink-950 py-3 border-b border-ink-100/60"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-10 flex flex-col gap-4"
              >
                <a
                  href="tel:+5547991208176"
                  className="flex items-center gap-2.5 text-ink-500 font-medium"
                >
                  <Phone size={18} strokeWidth={1.75} />
                  (47) 9120-8176
                </a>
                <button
                  onClick={() => { setMenuOpen(false); onOpenForm(); }}
                  className="inline-flex items-center justify-center gap-2 h-[52px] bg-ink-950 text-white font-semibold rounded-[10px]"
                >
                  Agende sua consulta
                  <WhatsAppIcon size={17} />
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
