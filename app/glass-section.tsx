import type { ReactNode } from 'react';
import { TextReveal } from './text-reveal';
export function GlassSection({
  id,
  title,
  className,
  children,
}: {
  id: string;
  title: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <section className={`${className} overlap-section shared-glass-section`} aria-labelledby={id}>
      <div className="overlap-heading">
        <h2 id={id}>
          <TextReveal>{title}</TextReveal>
        </h2>
      </div>
      {children}
    </section>
  );
}
