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

  // Disable browser's default scroll restoration to avoid conflicts with Lenis
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Handle hash scroll on route change (e.g. going back to home from a detail page)
  useEffect(() => {
    if (!lenis || pathname !== "/") return;

    const hash = window.location.hash;
    if (hash) {
      // Temporarily hide the content to prevent the "flash" of the Hero section
      document.documentElement.style.visibility = "hidden";

      const scrollTarget = () => {
        const target = document.querySelector(hash) as HTMLElement;
        if (target) {
          lenis.scrollTo(target, { immediate: true });
          ScrollTrigger.refresh();

          // Small buffer to let GSAP/ScrollTrigger settle
          requestAnimationFrame(() => {
            document.documentElement.style.visibility = "";
          });
          return true;
        }
        return false;
      };

      if (!scrollTarget()) {
        const observer = new MutationObserver(() => {
          if (scrollTarget()) observer.disconnect();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        const timeout = setTimeout(() => {
          document.documentElement.style.visibility = "";
          observer.disconnect();
        }, 1500);
        return () => {
          document.documentElement.style.visibility = "";
          observer.disconnect();
          clearTimeout(timeout);
        };
      }
    } else {
      // Reset visibility if no hash
      document.documentElement.style.visibility = "";
    }
  }, [pathname, lenis]);

  useEffect(() => {
    if (!lenis) return;

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
