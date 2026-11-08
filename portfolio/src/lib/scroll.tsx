"use client";
import { useEffect } from "react";

export function LenisProvider() {
  useEffect(() => {
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;

    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

      let raf: number;
      function loop(t: number) {
        lenis!.raf(t);
        raf = requestAnimationFrame(loop);
      }
      raf = requestAnimationFrame(loop);

      // Expose so nav links can use it
      (window as unknown as Record<string, unknown>).__lenis = lenis;

      return () => {
        cancelAnimationFrame(raf);
        lenis?.destroy();
      };
    });
  }, []);

  return null;
}

export function scrollToTarget(id: string) {
  const el = document.getElementById(id.replace("#", ""));
  if (!el) return;
  const lenis = (window as unknown as Record<string, unknown>).__lenis as
    | { scrollTo: (el: HTMLElement, opts: object) => void }
    | undefined;
  if (lenis) {
    lenis.scrollTo(el, { offset: -80, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
