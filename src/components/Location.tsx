import { MapPin, Clock3, CarFront, Phone } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const HOURS = [
  "Segunda a Quinta: 9h às 20h",
  "Sexta-feira: 9h às 17h30",
  "Urgências: sob agendamento",
];

const FACILITIES = [
  "Estacionamento na rua e calçada",
  "Estrutura acessível",
  "Atendimento de urgência",
];

export default function Location() {
  return (
    <section id="localizacao" className="relative py-[88px] lg:py-[140px] bg-warm-white">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <AnimatedSection className="max-w-[640px] mb-14">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-500 mb-5">
            Visite a Concept
          </p>
          <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.1] tracking-[-0.025em] font-medium text-ink-950 text-balance">
            Perto de você, no Centro de Camboriú
          </h2>
        </AnimatedSection>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <AnimatedSection className="lg:col-span-5 mb-10 lg:mb-0">
            <dl className="space-y-8">
              <div>
                <dt className="flex items-center gap-2.5 text-[0.8125rem] font-semibold text-ink-950 mb-2.5">
                  <MapPin size={16} strokeWidth={1.75} className="text-gold-500" />
                  Endereço
                </dt>
                <dd className="text-[0.9375rem] leading-[1.6] text-ink-500 pl-[26px]">
                  R. Francisco Barreto, 17 - Centro, Camboriú - SC, 88340-401
                </dd>
              </div>

              <div>
                <dt className="flex items-center gap-2.5 text-[0.8125rem] font-semibold text-ink-950 mb-2.5">
                  <Clock3 size={16} strokeWidth={1.75} className="text-gold-500" />
                  Horários
                </dt>
                <dd className="pl-[26px]">
                  <ul className="space-y-1.5">
                    {HOURS.map((hour) => (
                      <li key={hour} className="text-[0.9375rem] text-ink-500">
                        {hour}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>

              <div>
                <dt className="flex items-center gap-2.5 text-[0.8125rem] font-semibold text-ink-950 mb-2.5">
                  <CarFront size={16} strokeWidth={1.75} className="text-gold-500" />
                  Facilidades
                </dt>
                <dd className="pl-[26px]">
                  <ul className="space-y-1.5">
                    {FACILITIES.map((item) => (
                      <li key={item} className="text-[0.9375rem] text-ink-500">
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>

              <div className="pt-8 border-t border-ink-100">
                <dt className="flex items-center gap-2.5 text-[0.8125rem] font-semibold text-ink-950 mb-2.5">
                  <Phone size={16} strokeWidth={1.75} className="text-gold-500" />
                  Contato direto
                </dt>
                <dd className="pl-[26px]">
                  <a
                    href="tel:+554791208176"
                    className="block text-[1.375rem] font-medium tracking-[-0.02em] text-ink-950 hover:text-gold-500 transition-colors"
                  >
                    (47) 9120-8176
                  </a>
                  <span className="text-[0.8125rem] text-ink-400">
                    Comercial e WhatsApp
                  </span>
                </dd>
              </div>
            </dl>
          </AnimatedSection>

          <AnimatedSection className="lg:col-span-7">
            <div className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[520px] rounded-[24px] overflow-hidden border border-ink-100">
              <iframe
                title="Localização da Concept Implantes Dentários"
                src="https://www.google.com/maps?q=R.+Francisco+Barreto,+17+-+Centro,+Cambori%C3%BA+-+SC,+88340-401&output=embed"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
