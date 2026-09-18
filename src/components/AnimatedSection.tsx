interface Props {
  children: React.ReactNode;
  className?: string;
  /** Stagger, in seconds, mapped onto the scroll reveal range. */
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: Props) {
  return (
    <div
      className={`reveal ${className}`}
      style={{ "--reveal-offset": delay * 40 } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
