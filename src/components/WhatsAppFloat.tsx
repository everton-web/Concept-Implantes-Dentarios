"use client";

import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppFloat({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <button
      onClick={onOpenForm}
      aria-label="Agende sua consulta pelo WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:bg-[#1FBE5A] hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#25D366]"
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping motion-reduce:hidden"
        style={{ animationDuration: "2.4s" }}
      />
      <WhatsAppIcon size={28} className="relative" />
    </button>
  );
}
