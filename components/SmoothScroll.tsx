"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollTriggerSync({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();
  const pathname = usePathname();

  // 1. Handle Scroll-to-Anchor on Navigation
  useEffect(() => {
    if (!lenis) return;

    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
        lenis.scrollTo(hash, { immediate: true, force: true });

        // Safety pass
        setTimeout(() => {
          ScrollTrigger.refresh();
          lenis.scrollTo(hash, { immediate: true, force: true });
        }, 500);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [lenis, pathname]);

  // 2. Sync GSAP with Lenis
  useEffect(() => {
    if (!lenis) return;

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const root = lenis.rootElement ?? document.body;
    ScrollTrigger.scrollerProxy(root, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) lenis.scrollTo(value, { immediate: true });
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    const updateRaf = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(updateRaf);
      // DO NOT call lenis.destroy() here as ReactLenis manages the instance
    };
  }, [lenis]);

  return <>{children}</>;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <ScrollTriggerSync>{children}</ScrollTriggerSync>
    </ReactLenis>
  );
}
