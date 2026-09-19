import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SmileMosaic from "@/components/SmileMosaic";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative flex-1 min-h-[100svh] flex items-center bg-ink-950 overflow-hidden">
      {/* Mosaico de sorrisos do Hero ao fundo, bem esmaecido: opacidade
          baixa e um véu radial que concentra o preto atrás do texto. */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.22] grayscale-[0.35]">
          <SmileMosaic fundo />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(16,16,16,0.92)_0%,rgba(16,16,16,0.7)_45%,rgba(16,16,16,0.35)_80%,rgba(16,16,16,0.2)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,16,16,0.85),transparent_22%,transparent_78%,rgba(16,16,16,0.85))]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] w-full px-6 md:px-10 lg:px-16 py-20">
        <div className="max-w-[600px] mx-auto flex flex-col items-center text-center">
          <Link href="/" aria-label="Concept Implantes Dentários, página inicial">
            <Image
              src="/marca/logo-concept.png"
              alt="Concept Implantes Dentários"
              width={391}
              height={180}
              priority
              className="block h-[44px] sm:h-[52px] w-auto mb-12"
            />
          </Link>

          <p className="animate-rise text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-400 mb-5">
            Erro 404
          </p>
          <h1
            style={{ animationDelay: "0.1s" }}
            className="animate-rise text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.06] tracking-[-0.03em] font-medium text-white text-balance mb-6"
          >
            Esta página <span className="text-gold-300">não existe</span>.
          </h1>
          <p
            style={{ animationDelay: "0.2s" }}
            className="animate-rise text-[1.0625rem] leading-[1.7] text-ink-300 max-w-[44ch] mx-auto mb-10"
          >
            O endereço pode ter mudado ou foi digitado com algum erro. Volte ao
            início para conhecer a Concept e agendar sua consulta.
          </p>
          <Link
            href="/"
            style={{ animationDelay: "0.3s" }}
            className="animate-rise group inline-flex items-center justify-center gap-2.5 h-[54px] px-8 bg-gold-300 text-ink-950 font-semibold rounded-[12px] hover:bg-gold-200 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-500"
          >
            <ArrowLeft
              size={18}
              aria-hidden
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
