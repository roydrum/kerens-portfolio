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
    const root = lenis.rootElement ?? document.body;
    ScrollTrigger.scrollerProxy(root, {
      scrollTop(value) {
        if (arguments.length) lenis.scrollTo(value);
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return root.getBoundingClientRect();
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
