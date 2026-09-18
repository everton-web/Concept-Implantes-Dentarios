import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

const NAV = [
  { label: "Sobre", href: "#sobre" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Diferenciais", href: "#metodo" },
  { label: "Sorrisos", href: "#sorrisos" },
  { label: "Dúvidas", href: "#faq" },
  { label: "Contato", href: "#localizacao" },
];

export default function Footer() {
  return (
    <footer className="bg-ink-950 pt-16 pb-10">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 pb-14 border-b border-white/[0.08]">
          <div className="lg:col-span-5 mb-12 lg:mb-0">
            <Image
              src="/marca/logo-concept.png"
              alt="Concept Implantes Dentários"
              width={391}
              height={180}
              className="h-[96px] w-auto mb-6"
            />
            <p className="text-[0.9375rem] leading-[1.7] text-ink-400 max-w-[38ch] mb-5">
              Transformando sorrisos em vida, com respeito, escuta e dedicação.
            </p>
            <p className="text-[0.8125rem] text-ink-500">
              Responsável técnica: Dra. Simone H. · CRO-SC 19661
            </p>
          </div>

          <div className="lg:col-span-3 mb-10 lg:mb-0">
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-ink-500 mb-5">
              Navegação
            </h2>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.875rem] text-ink-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-ink-500 mb-5">
              Contato
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} strokeWidth={1.75} className="text-gold-500 shrink-0 mt-0.5" />
                <span className="text-[0.875rem] leading-[1.6] text-ink-300">
                  R. Francisco Barreto, 17 - Centro, Camboriú - SC, 88340-401
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} strokeWidth={1.75} className="text-gold-500 shrink-0" />
                <a
                  href="tel:+554791208176"
                  className="text-[0.875rem] text-ink-300 hover:text-white transition-colors"
                >
                  (47) 9120-8176
                </a>
              </li>
              <li className="flex items-center gap-3">
                <InstagramIcon width={16} height={16} className="text-gold-500 shrink-0" />
                <a
                  href="https://www.instagram.com/conceptimplantesdentarios/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.875rem] text-ink-300 hover:text-white transition-colors"
                >
                  @conceptimplantesdentarios
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="pt-8 text-[0.75rem] text-ink-600">
          &copy; {new Date().getFullYear()} Concept Implantes Dentários. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
}
