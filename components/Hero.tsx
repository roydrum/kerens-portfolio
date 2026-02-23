"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CanvasMorph } from "./CanvasMorph";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const kerenRef = useRef<HTMLSpanElement>(null);
  const boshiRef = useRef<HTMLSpanElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We need to wait for layout to settle, optionally after fonts load.
    // The exact same font load promise used in CanvasMorph helps here.
    const initAnimations = async () => {
      await document.fonts.load("bold 12px 'DIN Condensed'");

      if (!kerenRef.current || !boshiRef.current || !canvasWrapperRef.current || !containerRef.current) return;

      const kerenRect = kerenRef.current.getBoundingClientRect();
      const boshiRect = boshiRef.current.getBoundingClientRect();

      // Phase 2 translations:
      // BOSHI moves up to align the bottom baselines.
      const boshiMoveY = kerenRect.bottom - boshiRect.bottom;

      // The text canvas moves right so the "S" is perfectly centered.
      // Currently, the "S" starts at kerenRect.left.
      // We want to move it to (window.innerWidth / 2).
      const textCanvasMoveX = (window.innerWidth / 2) - kerenRect.left;

      let ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: () => `top+=${window.innerHeight} top`, // Start after Phase 1 finishes
            end: () => `+=${window.innerHeight * 2}`, // End over 200vh
            scrub: true,
          }
        });

        // Add Phase 2: Boshi up, Canvas right (halfway through the remaining height, so next 100vh)
        tl.to(boshiRef.current, { y: boshiMoveY, ease: "none", duration: 1 }, 0);
        tl.to(canvasWrapperRef.current, { x: textCanvasMoveX, ease: "none", duration: 1 }, 0);

        // Add Phase 3: Fade everything out (the final 100vh)
        tl.to([kerenRef.current, boshiRef.current, canvasWrapperRef.current], {
          opacity: 0,
          ease: "none",
          duration: 1
        });

      }, containerRef);

      return () => ctx.revert();
    };

    // Small delay to ensure exact layout before calc
    setTimeout(initAnimations, 100);

  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "400vh" }}
      aria-label="Hero"
    >
      <div className="fixed inset-0 z-0 bg-graph-paper" />

      {/* Structural Grid Layout (Fluid 24-Column on Desktop) */}
      <div className="fixed inset-0 pointer-events-none flex flex-col md:grid md:grid-cols-[repeat(24,minmax(0,1fr))] md:auto-rows-[calc(100vw/24)] p-4 md:p-0 justify-between pb-[10vh] md:pb-0 z-10 w-full h-full">

        {/* Background Graphic: Removed per user request */}

        {/* Left Side: KEREN */}
        <div className="flex flex-col items-start md:col-start-[3] md:col-span-12 md:row-start-[4] mt-[5vh] md:mt-0 z-10">
          <span
            ref={kerenRef}
            className="text-white text-[clamp(7rem,35vw,22vw)] md:text-[23vw] font-bold uppercase leading-[0.8] tracking-tighter select-none"
            style={{ fontFamily: 'var(--font-din-condensed)' }}
          >
            Keren
          </span>
        </div>

        {/* Right Side: BOSHI */}
        <span
          ref={boshiRef}
          className="text-white text-[clamp(7rem,35vw,22vw)] md:text-[23vw] font-bold uppercase leading-[0.8] tracking-tighter select-none self-end md:self-start md:col-start-[14] md:row-start-[6] -translate-x-2 md:translate-x-0 -translate-y-[10vh] md:translate-y-0 z-10"
          style={{ fontFamily: 'var(--font-din-condensed)' }}
        >
          Boshi
        </span>
      </div>

      {/* Replaces all previous SVG effect logic */}
      <div ref={canvasWrapperRef} className="fixed inset-0 pointer-events-none z-20">
        <CanvasMorph />
      </div>
    </section>
  );
}
