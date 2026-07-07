import { useEffect } from 'react';

export function useRevealOnScroll(ready = true): void {
  useEffect(() => {
    if (!ready) return;

    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    elements.forEach((el) => {
      const delay = el.getAttribute('data-reveal-delay');
      if (delay) {
        (el as HTMLElement).style.transitionDelay = `${delay}ms`;
      }
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ready]);
}
