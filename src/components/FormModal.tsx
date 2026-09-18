"use client";

import { useState, useEffect } from "react";
import { X, Loader2, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "554791208176";

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function FormModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Informe seu nome";
    if (form.phone.replace(/\D/g, "").length < 10)
      e.phone = "Informe um WhatsApp válido";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setStatus("sending");

    // TODO: enviar para o Google Sheets via endpoint seguro antes de redirecionar.
    await new Promise((r) => setTimeout(r, 900));

    setStatus("sent");

    const text = encodeURIComponent(
      `Olá! Sou ${form.name.trim()} e gostaria de agendar uma consulta.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setForm({ name: "", phone: "" });
      setStatus("idle");
      setErrors({});
    }, 300);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-title"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[440px] bg-white rounded-[20px] shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-ink-400 hover:text-ink-950 hover:bg-ink-50 rounded-lg transition-colors z-10"
              aria-label="Fechar"
            >
              <X size={18} strokeWidth={1.75} />
            </button>

            {status === "sent" ? (
              <div className="p-10 text-center">
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1FBE5A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h2 id="form-title" className="text-[1.375rem] font-medium text-ink-950 mb-3">
                  Tudo certo, {form.name.trim().split(" ")[0]}!
                </h2>
                <p className="text-[0.9375rem] text-ink-500 leading-[1.6] mb-7">
                  Abrimos o WhatsApp para você continuar a conversa. Se a janela
                  não abrir, toque no botão abaixo.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Sou ${form.name.trim()} e gostaria de agendar uma consulta.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-[48px] px-7 bg-[#25D366] text-white font-semibold rounded-[10px] hover:bg-[#1FBE5A] transition-colors"
                >
                  Abrir o WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="p-8 sm:p-10">
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-500 mb-2.5">
                  Agende sua consulta
                </p>
                <h2 id="form-title" className="text-[1.5rem] leading-tight font-medium text-ink-950 mb-2">
                  O primeiro passo é a escuta.
                </h2>
                <p className="text-[0.9375rem] text-ink-500 leading-[1.6] mb-7">
                  Deixe seu nome e WhatsApp. Retornamos para encontrar o melhor
                  horário para você.
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-[0.8125rem] font-semibold text-ink-950 mb-2">
                      Nome
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Como podemos te chamar?"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`w-full h-[48px] px-4 rounded-[10px] border bg-white text-ink-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all text-[0.9375rem] ${errors.name ? "border-red-300" : "border-ink-100"}`}
                    />
                    {errors.name && <p className="mt-1.5 text-[0.75rem] text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-[0.8125rem] font-semibold text-ink-950 mb-2">
                      WhatsApp
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="numeric"
                      placeholder="(00) 00000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: maskPhone(e.target.value) })}
                      className={`w-full h-[48px] px-4 rounded-[10px] border bg-white text-ink-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all text-[0.9375rem] ${errors.phone ? "border-red-300" : "border-ink-100"}`}
                    />
                    {errors.phone && <p className="mt-1.5 text-[0.75rem] text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group mt-7 w-full inline-flex items-center justify-center gap-2 h-[52px] bg-ink-950 text-white text-[0.9375rem] font-semibold rounded-[10px] hover:bg-ink-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-500 disabled:opacity-50"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Agende sua consulta
                      <ArrowUpRight
                        size={16}
                        strokeWidth={2}
                        className="transition-transform duration-150 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                      />
                    </>
                  )}
                </button>

                <p className="mt-4 text-[0.75rem] leading-[1.5] text-ink-400 text-center">
                  Seus dados são usados apenas para o contato sobre o
                  agendamento, conforme a LGPD.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
