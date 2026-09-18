import AnimatedSection from "./AnimatedSection";

const PHRASE = "Um novo sorriso começa com um novo jeito de cuidar.";
/** A partir desta palavra o texto acende em dourado. */
const HIGHLIGHT_FROM = 5;

export default function Brand() {
  const words = PHRASE.split(" ");

  return (
    <section className="relative py-[120px] lg:py-[200px] bg-ink-950">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <blockquote className="scrub-quote max-w-[1040px] mx-auto text-center text-[clamp(2.5rem,6.4vw,5.5rem)] leading-[1.04] tracking-[-0.035em] font-medium text-balance mb-12">
          {words.map((word, i) => (
            <span
              key={i}
              className={`scrub-word ${i >= HIGHLIGHT_FROM ? "text-gold-300" : "text-white"}`}
              style={{ "--i": i, "--n": words.length } as React.CSSProperties}
            >
              {word}
              {i < words.length - 1 && " "}
            </span>
          ))}
        </blockquote>

        <AnimatedSection>
          <p className="text-[1.0625rem] leading-[1.7] text-ink-400 max-w-[560px] mx-auto text-center">
            Estrutura completa, tecnologia de ponta e a escuta atenta que guia
            cada atendimento na Concept Implantes Dentários.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
