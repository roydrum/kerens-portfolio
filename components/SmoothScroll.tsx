"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollTriggerSync({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Handle initial hash scroll if arriving from another page
    const handleInitialHash = () => {
      const hash = window.location.hash;
      if (hash) {
        // Small delay to ensure content and GSAP/ScrollTrigger are ready
        setTimeout(() => {
          const target = document.querySelector(hash) as HTMLElement;
          if (target) {
            lenis.scrollTo(target, {
              offset: 0,
              duration: 1.2,
              immediate: false
            });
          }
        }, 800);
      }
    };

    handleInitialHash();

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
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
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
