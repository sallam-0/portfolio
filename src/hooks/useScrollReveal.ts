import { useEffect, useRef, useState } from "react";

/**
 * Hook that watches an element via IntersectionObserver and sets `visible`
 * when it enters the viewport. Once visible, it stays visible (no un-reveal).
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  rootMargin = "0px 0px -12% 0px",
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, visible };
}
