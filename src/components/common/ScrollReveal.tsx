'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    // Add js-ready class to enable reveal animations (prevents hydration mismatch)
    document.documentElement.classList.add('js-ready');

    const elements = document.querySelectorAll(
      '[data-reveal]:not([data-revealed])',
    );
    if (!elements.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      for (let i = 0; i < elements.length; i++) {
        (elements[i] as HTMLElement).dataset.revealed = 'true';
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (let i = 0; i < entries.length; i++) {
          if (!entries[i].isIntersecting) continue;
          (entries[i].target as HTMLElement).dataset.revealed = 'true';
          observer.unobserve(entries[i].target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    for (let j = 0; j < elements.length; j++) {
      observer.observe(elements[j]);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
