import Image from "next/image";
import { GOOGLE } from "@/data/google";

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

/** Estrelas preenchidas proporcionalmente à nota (4,5 → quatro e meia). */
function Stars({ nota }: { nota: number }) {
  return (
    <span className="relative inline-flex" aria-hidden>
      <span className="flex gap-0.5 text-white/20">
        {Array.from({ length: 5 }, (_, i) => <Star key={i} />)}
      </span>
      <span
        className="absolute inset-0 flex gap-0.5 overflow-hidden text-gold-300"
        style={{ width: `${(nota / 5) * 100}%` }}
      >
        {Array.from({ length: 5 }, (_, i) => <Star key={i} />)}
      </span>
    </span>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 20 20" className="w-4 h-4 shrink-0" fill="currentColor">
      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  );
}

/** Selo com a nota real do Google; leva ao perfil da clínica. */
export default function GoogleRating({ className = "" }: { className?: string }) {
  const nota = GOOGLE.nota.toLocaleString("pt-BR", { minimumFractionDigits: 1 });

  return (
    <a
      href={GOOGLE.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Nota ${nota} de 5 no Google. Ver no Google.`}
      className={`group inline-flex items-center gap-3.5 ${className}`}
    >
      <span className="flex -space-x-2.5">
        {["/hero/avatar-1.webp", "/hero/avatar-2.webp"].map((src) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-ink-950"
          />
        ))}
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white ring-2 ring-ink-950">
          <GoogleG size={20} />
        </span>
      </span>
      <span>
        <Stars nota={GOOGLE.nota} />
        <span className="block mt-1 text-[0.8125rem] text-ink-300 group-hover:text-white transition-colors">
          <span className="font-semibold text-white">{nota}</span> no Google
        </span>
      </span>
    </a>
  );
}
