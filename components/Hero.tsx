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

      {/* Background Graphic: Giant Asterisk */}
      <svg
        viewBox="0 0 100 100"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        className="fixed bottom-[10vh] left-[5vw] md:-bottom-[1rem] md:left-[15rem] w-[50vw] h-[50vw] md:w-[20rem] md:h-[20rem] z-[5] pointer-events-none opacity-100"
        aria-hidden="true"
      >
        <g transform="translate(50 50)">
          <rect x="-10" y="-50" width="20" height="100" rx="4" />
          <rect x="-10" y="-50" width="20" height="100" rx="4" transform="rotate(60)" />
          <rect x="-10" y="-50" width="20" height="100" rx="4" transform="rotate(120)" />
        </g>
      </svg>

      {/* Foreground Typography */}
      <div className="fixed inset-0 z-10 pointer-events-none flex flex-col md:block p-4 md:p-0 justify-between pb-[10vh] md:pb-0">

        {/* Left Side: KEREN + Badge */}
        <div className="flex flex-col items-start md:absolute md:top-[12rem] md:left-[4rem] mt-[5vh] md:mt-0">
          <span
            className="text-white text-[clamp(7rem,35vw,22vw)] md:text-[23vw] font-bold uppercase leading-[0.8] tracking-tighter select-none"
            style={{ fontFamily: 'var(--font-din-condensed)' }}
          >
            Keren
          </span>
        </div>

        {/* Right Side: BOSHI */}
        <span
          className="text-white text-[clamp(7rem,35vw,22vw)] md:text-[23vw] font-bold uppercase leading-[0.8] tracking-tighter select-none self-end md:absolute md:top-[22rem] md:right-[4rem] -translate-x-2 md:translate-x-0 -translate-y-[10vh] md:translate-y-0"
          style={{ fontFamily: 'var(--font-din-condensed)' }}
        >
          Boshi
        </span>
      </div>

      <div
        ref={portraitWrapRef}
        className="fixed bottom-0 left-1/2 z-20 -translate-x-1/2 w-[140%] md:w-auto flex justify-center"
        style={{ filter: "url(#smoke-dissolve)" }}
      >
        <img
          src="/KerenCutout.png"
          alt="Keren"
          className="max-h-[80vh] md:max-h-[90vh] w-auto object-contain object-bottom translate-y-[5vh] md:translate-y-0"
        />
      </div>
    </section>
  );
}
