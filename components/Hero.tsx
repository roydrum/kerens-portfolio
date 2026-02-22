"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

const SMOKE_WISPS = 14;

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitWrapRef = useRef<HTMLDivElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const container = containerRef.current;
    const portraitWrap = portraitWrapRef.current;
    const turbulence = turbulenceRef.current;
    const displacement = displacementRef.current;
    const smoke = smokeRef.current;
    const scroller = lenis?.rootElement ?? document.body;

    if (!container || !portraitWrap || !turbulence || !displacement || !smoke || !scroller) return;

    const scrollConfig = { trigger: container, scroller, start: "top top", end: "bottom top", scrub: true };

    const smokeDissolveTarget = { opacity: 0, ease: "power2.inOut", scrollTrigger: scrollConfig };

    gsap.fromTo(portraitWrap, { opacity: 1 }, smokeDissolveTarget);

    // Also fade out the background smoke wisps completely
    gsap.to(smokeRef.current, { opacity: 0, ease: "power2.inOut", scrollTrigger: scrollConfig });

    gsap.fromTo(
      turbulence,
      { attr: { baseFrequency: "0.001 0.001" } },
      { attr: { baseFrequency: "0.15 0.15" }, ease: "none", scrollTrigger: scrollConfig }
    );

    gsap.fromTo(
      displacement,
      { attr: { scale: 0 } },
      { attr: { scale: 280 }, ease: "none", scrollTrigger: scrollConfig }
    );

    const wisps = smoke.querySelectorAll(".smoke-wisp");
    wisps.forEach((wisp, i) => {
      const yEnd = -220 - (i % 4) * 80;
      const scaleEnd = 2.2 + (i % 5) * 0.4;
      const opacityEnd = 0.35 + (i % 4) * 0.12;
      gsap.fromTo(
        wisp,
        { opacity: 0, y: 0, scale: 0.6 },
        { opacity: opacityEnd, y: yEnd, scale: scaleEnd, ease: "none", scrollTrigger: scrollConfig }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [lenis]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "min(100vh, 56.25vw)" }}
      aria-label="Hero"
    >
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id="smoke-dissolve" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.001 0.001"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="fixed inset-0 z-0 bg-graph-paper" />

      <div ref={smokeRef} className="pointer-events-none fixed inset-0 z-[18] overflow-hidden" aria-hidden>
        {Array.from({ length: SMOKE_WISPS }).map((_, i) => (
          <div
            key={i}
            className="smoke-wisp absolute rounded-full bg-white/50"
            style={{
              width: 100 + (i % 5) * 50,
              height: 80 + (i % 4) * 40,
              left: `${35 + (i % 7) * 6}%`,
              bottom: `${8 + (i % 5) * 4}%`,
              filter: "blur(50px)",
              transform: "translateY(0) scale(0.6)",
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 z-10 flex items-center justify-between px-4 md:px-16 pointer-events-none -mt-32 sm:-mt-16" aria-hidden="true">
        <span
          className="text-white text-[22vw] sm:text-[20vw] font-bold uppercase leading-none tracking-tight select-none -translate-y-8 md:-translate-y-10"
          style={{
            fontFamily: 'var(--font-din-condensed)',
            WebkitTextStroke: '6px white'
          }}
        >
          Keren
        </span>
        <span
          className="text-white text-[22vw] sm:text-[20vw] font-bold uppercase leading-none tracking-tight select-none translate-y-10 md:translate-y-16 -ml-[4vw] md:-ml-[6vw]"
          style={{
            fontFamily: 'var(--font-din-condensed)',
            WebkitTextStroke: '6px white'
          }}
        >
          Boshi
        </span>
      </div>

      <div
        ref={portraitWrapRef}
        className="fixed bottom-0 left-1/2 z-20 -translate-x-1/2"
        style={{ filter: "url(#smoke-dissolve)" }}
      >
        <img
          src="/KerenCutout.png"
          alt="Keren"
          className="max-h-[90vh] w-auto object-contain object-bottom"
        />
      </div>
    </section>
  );
}
