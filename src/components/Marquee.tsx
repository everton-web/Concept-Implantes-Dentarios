const ITEMS = [
  "Implantes Dentários",
  "Harmonização Orofacial",
  "Próteses & Protocolo",
  "Lentes de Contato Dental",
  "Clareamento",
  "Endodontia",
  "Estética do Sorriso",
  "Odontopediatria",
  "Cirurgia Oral",
];

export default function Marquee() {
  return (
    <section
      aria-label="Especialidades da clínica"
      className="relative py-6 bg-ink-900 border-y border-white/[0.06] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-ink-900 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-ink-900 to-transparent"
      />

      <div className="flex w-max animate-[marquee_46s_linear_infinite] motion-reduce:animate-none">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex items-center shrink-0" aria-hidden={dup === 1}>
            {ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-8 px-8">
                <span className="text-[0.9375rem] font-medium text-ink-400 whitespace-nowrap">
                  {item}
                </span>
                <span aria-hidden className="w-1 h-1 rounded-full bg-gold-500/50" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
