"use client";

import { useState, useEffect, useRef } from "react";
import { X, Loader2 } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "554791208176";

/** Apps Script que grava cada lead na planilha (colunas: data, nome, telefone).
 *  Usado só como reserva, se a rota /api/lead não existir na hospedagem. */
const LEADS_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbzcpDfqd7qVBDoWt8aXo3U_p9901OinKlAKfIvuO0hLAO-ghVeTDfYFb5OidKinoFJm/exec";

/**
 * Envia o lead pela rota do site, que filtra robôs e grava na planilha.
 * A reserva (gravar direto no Apps Script) só entra quando a rota não
 * chegou a ser atendida: erro de rede ou rota inexistente (404/405). Se a
 * rota respondeu, ela já tentou gravar; tentar de novo duplicaria a linha.
 * `keepalive` garante o envio mesmo com a pessoa já indo para o WhatsApp.
 */
async function sendLead(nome: string, telefone: string, empresa: string, inicio: number) {
  const direto = () =>
    fetch(LEADS_WEBHOOK, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      body: new URLSearchParams({ Nome: nome, Telefone: telefone }),
    }).catch(() => {});

  try {
    const r = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({ nome, telefone, empresa, inicio }),
    });
    if (r.status === 404 || r.status === 405) await direto();
  } catch {
    await direto();
  }
}

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
  const [form, setForm] = useState({ name: "", lastName: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Anti-robô: campo-isca invisível e o momento em que o formulário abriu.
  const [isca, setIsca] = useState("");
  const abertoEm = useRef(0);

  useEffect(() => {
    if (isOpen) abertoEm.current = Date.now();
  }, [isOpen]);

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

  const nomeCompleto = `${form.name.trim()} ${form.lastName.trim()}`.trim();

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Informe seu nome";
    if (!form.lastName.trim()) e.lastName = "Informe seu sobrenome";
    if (form.phone.replace(/\D/g, "").length < 10)
      e.phone = "Informe um WhatsApp válido";
    return e;
  }

  // Trava contra duplo envio (duplo clique, Enter repetido).
  const enviando = useRef(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (enviando.current) return;
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    enviando.current = true;

    const text = encodeURIComponent(
      `Olá! Sou ${nomeCompleto} e gostaria de agendar uma consulta.`
    );
    const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    // O WhatsApp abre JÁ, ainda dentro do clique: qualquer espera antes
    // faria o navegador (sobretudo o Safari) bloquear a nova aba.
    const aba = window.open(whatsapp, "_blank");

    // Na planilha, nome e sobrenome vão juntos numa coluna só. O envio
    // segue em segundo plano (keepalive) enquanto a pessoa vai ao WhatsApp.
    const envio = sendLead(nomeCompleto, form.phone, isca, abertoEm.current);

    // Evento para o GTM (conversão no Google Ads / Analytics). Sem dados
    // pessoais: só o nome do evento e a origem.
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ event: "generate_lead", form_id: "agendamento" });

    setStatus("sent");

    // Nova aba bloqueada mesmo assim: leva esta aba para o WhatsApp depois
    // que o lead sair (no máximo 2,5 s de espera).
    if (!aba) {
      Promise.race([envio, new Promise((r) => setTimeout(r, 2500))]).then(() => {
        window.location.href = whatsapp;
      });
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setForm({ name: "", lastName: "", phone: "" });
      setStatus("idle");
      setErrors({});
      setIsca("");
      enviando.current = false;
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
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Sou ${nomeCompleto} e gostaria de agendar uma consulta.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-[48px] px-7 bg-[#25D366] text-white font-semibold rounded-[10px] hover:bg-[#1FBE5A] transition-colors"
                >
                  Abrir o WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="relative p-8 sm:p-10">
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

                {/* Campo-isca: invisível para pessoas e leitores de tela;
                    robôs que preenchem tudo acabam preenchendo este. */}
                <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
                  <label htmlFor="empresa">Empresa</label>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={isca}
                    onChange={(e) => setIsca(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="name" className="block text-[0.8125rem] font-semibold text-ink-950 mb-2">
                        Nome
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="given-name"
                        autoCapitalize="words"
                        maxLength={60}
                        placeholder="Seu nome"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`w-full h-[48px] px-4 rounded-[10px] border bg-white text-ink-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all text-[0.9375rem] ${errors.name ? "border-red-300" : "border-ink-100"}`}
                      />
                      {errors.name && <p className="mt-1.5 text-[0.75rem] text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-[0.8125rem] font-semibold text-ink-950 mb-2">
                        Sobrenome
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        autoComplete="family-name"
                        autoCapitalize="words"
                        maxLength={60}
                        placeholder="Seu sobrenome"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        className={`w-full h-[48px] px-4 rounded-[10px] border bg-white text-ink-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all text-[0.9375rem] ${errors.lastName ? "border-red-300" : "border-ink-100"}`}
                      />
                      {errors.lastName && <p className="mt-1.5 text-[0.75rem] text-red-500">{errors.lastName}</p>}
                    </div>
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
                      <WhatsAppIcon size={17} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
