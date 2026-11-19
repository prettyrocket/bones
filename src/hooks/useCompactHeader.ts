import { useEffect, useState } from 'react';

/**
 * True once the page has scrolled past the top, for a header that shrinks.
 *
 * Two thresholds keep it from flickering: shrink past `shrinkAt`, grow back only
 * within `growAt` of the very top. Checked once per animation frame.
 */
export function useCompactHeader(shrinkAt = 120, growAt = 8) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setCompact((was) => (was ? window.scrollY > growAt : window.scrollY > shrinkAt));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [shrinkAt, growAt]);

  return compact;
}

/** Scroll so `id`'s top sits just below the compact header; near the top, go to 0. */
export function scrollToSection(id: string, offset = 80) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y <= 120 ? 0 : y });
}
