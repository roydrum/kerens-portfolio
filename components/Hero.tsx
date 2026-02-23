"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CanvasMorph, TextLayout } from "./CanvasMorph";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const kerenRef = useRef<HTMLSpanElement>(null);
  const boshiRef = useRef<HTMLSpanElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasMorphRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const asteriskCharRef = useRef<HTMLSpanElement>(null);
  const revealSvgRef = useRef<SVGSVGElement>(null);
  const asteriskShapeRef = useRef<SVGTextElement>(null);

  const [textLayout, setTextLayout] = useState<TextLayout | null>(null);

  const handleTextLayout = useCallback((layout: TextLayout) => {
    setTextLayout(layout);
  }, []);

  useEffect(() => {
    if (!textLayout) return;

    const initAnimations = async () => {
      await document.fonts.load("bold 12px 'DIN Condensed'");

      if (
        !kerenRef.current || !boshiRef.current ||
        !canvasWrapperRef.current || !containerRef.current ||
        !revealSvgRef.current || !asteriskShapeRef.current ||
        !asteriskCharRef.current
      ) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const kerenRect = kerenRef.current.getBoundingClientRect();
      const boshiRect = boshiRef.current.getBoundingClientRect();

      // Phase 2 translations
      const boshiMoveY = kerenRect.bottom - boshiRect.bottom;
      const textCanvasMoveX = (vw / 2) - kerenRect.left;

      // Set up SVG viewBox
      const svgEl = revealSvgRef.current;
      const textEl = asteriskShapeRef.current;
      svgEl.setAttribute("viewBox", `0 0 ${vw} ${vh}`);
      textEl.style.fontSize = `${textLayout.fontSizePx}px`;

      // Get the blur filter element
      const blurEl = svgEl.querySelector("#goo-blur") as SVGFEGaussianBlurElement | null;
      const turbEl = svgEl.querySelector("#goo-turb") as SVGFETurbulenceElement | null;
      const dispEl = svgEl.querySelector("#goo-disp") as SVGFEDisplacementMapElement | null;

      // Store the measured position (will be set at Phase 4 start)
      let asteriskX = 0;
      let asteriskY = 0;

      let ctx = gsap.context(() => {
        // ── Phases 1→2 timeline (scrubbed over 200vh) ──
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: () => `top+=${vh} top`,
            end: () => `+=${vh * 2}`,
            scrub: true,
          }
        });

        // Instant swap: WebGL → HTML at Phase 1→2 boundary
        if (canvasMorphRef.current && subtitleRef.current) {
          tl.fromTo(canvasMorphRef.current, { opacity: 1 }, { opacity: 0, duration: 0.001 }, 0);
          tl.fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.001 }, 0);
        }

        // Phase 2: Boshi up, subtitle wrapper slides right
        tl.to(boshiRef.current, { y: boshiMoveY, ease: "none", duration: 1 }, 0);
        tl.to(canvasWrapperRef.current, { x: textCanvasMoveX, ease: "none", duration: 1 }, 0);

        // ── Phase 4: Liquid asterisk reveal ──
        gsap.set(svgEl, { opacity: 0 });

        // Phase 4 ScrollTrigger — measures * position at onEnter (Phase 2 is done by then)
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: () => `top+=${vh * 3} top`,
          end: () => `+=${vh}`,
          onEnter: () => {
            // Phase 2 is complete — measure the ACTUAL screen position of the * now
            const rect = asteriskCharRef.current!.getBoundingClientRect();
            asteriskX = rect.left + rect.width / 2;
            asteriskY = rect.top + rect.height / 2;

            // Position the SVG asterisk at the exact measured spot
            textEl.setAttribute("x", String(asteriskX));
            textEl.setAttribute("y", String(asteriskY));

            // Kill and rebuild the phase4 timeline with the correct origin
            if (phase4tl) phase4tl.kill();
            buildPhase4Timeline();
          },
          onLeaveBack: () => {
            // Reset when scrolling back before Phase 4
            gsap.set(svgEl, { opacity: 0 });
            gsap.set(textEl, { scale: 1, attr: { "stroke-width": 0 } });
            if (blurEl) blurEl.setAttribute("stdDeviation", "0");
            if (dispEl) dispEl.setAttribute("scale", "0");
            if (turbEl) turbEl.setAttribute("baseFrequency", "0.015 0.06");
          },
        });

        let phase4tl: gsap.core.Timeline | null = null;

        function buildPhase4Timeline() {
          phase4tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: () => `top+=${vh * 3} top`,
              end: () => `+=${vh}`,
              scrub: true,
            }
          });

          // Show SVG, hide HTML *
          phase4tl.fromTo(svgEl, { opacity: 0 }, { opacity: 1, duration: 0.001 }, 0);
          phase4tl.to(asteriskCharRef.current, { opacity: 0, duration: 0.001 }, 0);

          // Scale up the asterisk with fattening stroke
          phase4tl.fromTo(textEl,
            { scale: 1, attr: { "stroke-width": 0 } },
            {
              scale: 80,
              attr: { "stroke-width": 50 },
              svgOrigin: `${asteriskX} ${asteriskY}`,
              ease: "power2.in",
              duration: 1,
            },
            0
          );

          // Gooey blur for liquid feel
          if (blurEl) {
            const blurProxy = { val: 0 };
            phase4tl.to(blurProxy, {
              val: 18,
              ease: "power1.in",
              duration: 1,
              onUpdate: () => {
                blurEl.setAttribute("stdDeviation", String(blurProxy.val));
              },
            }, 0);
          }

          // Dripping displacement — kicks in as the asterisk expands
          if (dispEl && turbEl) {
            const dripProxy = { scale: 0, freq: 0.015 };
            phase4tl.to(dripProxy, {
              scale: 60,
              freq: 0.008,
              ease: "power1.in",
              duration: 1,
              onUpdate: () => {
                dispEl.setAttribute("scale", String(dripProxy.scale));
                turbEl.setAttribute("baseFrequency", `${dripProxy.freq} 0.06`);
              },
            }, 0);
          }
        }

      }, containerRef);

      return () => ctx.revert();
    };

    setTimeout(initAnimations, 150);

  }, [textLayout]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "500vh" }}
      aria-label="Hero"
    >
      <div className="fixed inset-0 z-0 bg-graph-paper" />

      {/* Structural Grid Layout */}
      <div className="fixed inset-0 pointer-events-none flex flex-col md:grid md:grid-cols-[repeat(24,minmax(0,1fr))] md:auto-rows-[calc(100vw/24)] p-4 md:p-0 justify-between pb-[10vh] md:pb-0 z-10 w-full h-full">
        <div className="flex flex-col items-start md:col-start-[3] md:col-span-12 md:row-start-[4] mt-[5vh] md:mt-0 z-10">
          <span
            ref={kerenRef}
            className="text-white text-[clamp(7rem,35vw,22vw)] md:text-[23vw] font-bold uppercase leading-[0.8] tracking-tighter select-none"
            style={{ fontFamily: 'var(--font-din-condensed)' }}
          >
            Keren
          </span>
        </div>
        <span
          ref={boshiRef}
          className="text-white text-[clamp(7rem,35vw,22vw)] md:text-[23vw] font-bold uppercase leading-[0.8] tracking-tighter select-none self-end md:self-start md:col-start-[14] md:row-start-[6] -translate-x-2 md:translate-x-0 -translate-y-[10vh] md:translate-y-0 z-10"
          style={{ fontFamily: 'var(--font-din-condensed)' }}
        >
          Boshi
        </span>
      </div>

      {/* Canvas wrapper — carries subtitle after Phase 2 translation */}
      <div ref={canvasWrapperRef} className="fixed inset-0 pointer-events-none z-20">
        <div ref={canvasMorphRef}>
          <CanvasMorph onTextLayout={handleTextLayout} />
        </div>

        {textLayout && (
          <span
            ref={subtitleRef}
            className="fixed pointer-events-none z-20 font-bold uppercase select-none"
            style={{
              fontFamily: "var(--font-din-condensed)",
              fontSize: `${textLayout.fontSizePx}px`,
              left: `${textLayout.startX - textLayout.asteriskWidth}px`,
              top: `${textLayout.startY}px`,
              opacity: 0,
              whiteSpace: "nowrap",
              lineHeight: 1,
            }}
          >
            <span ref={asteriskCharRef} style={{ color: "#ef4444" }}>*</span>
            <span style={{ color: "white" }}>{" "}SENIOR CREATIVE STRATEGIST</span>
          </span>
        )}
      </div>

      {/* Phase 4: SVG asterisk with gooey liquid filter — pure asterisk shape, no circle */}
      <svg
        ref={revealSvgRef}
        className="fixed inset-0 z-50 pointer-events-none"
        style={{ width: "100vw", height: "100vh", opacity: 0, overflow: "visible" }}
      >
        <defs>
          <filter id="goo" x="-100%" y="-100%" width="400%" height="400%" colorInterpolationFilters="sRGB">
            <feGaussianBlur id="goo-blur" in="SourceGraphic" stdDeviation="0" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10"
              result="goo"
            />
            {/* Turbulence noise — stretched vertically for dripping direction */}
            <feTurbulence
              id="goo-turb"
              type="fractalNoise"
              baseFrequency="0.015 0.06"
              numOctaves={4}
              seed={2}
              result="noise"
            />
            {/* Displacement — distorts the goo edges using noise → drips */}
            <feDisplacementMap
              id="goo-disp"
              in="goo"
              in2="noise"
              scale={0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <text
          ref={asteriskShapeRef}
          fill="#ef4444"
          stroke="#ef4444"
          strokeWidth="0"
          strokeLinejoin="round"
          strokeLinecap="round"
          paintOrder="stroke fill"
          textAnchor="middle"
          dominantBaseline="central"
          filter="url(#goo)"
          style={{
            fontFamily: "var(--font-din-condensed)",
            fontWeight: 700,
          }}
        >
          *
        </text>
      </svg>
    </section>
  );
}
