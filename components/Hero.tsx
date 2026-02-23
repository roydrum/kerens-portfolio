"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CanvasMorph, TextLayout } from "./CanvasMorph";
import { AsteriskReveal } from "./AsteriskReveal";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const kerenRef = useRef<HTMLSpanElement>(null);
  const boshiRef = useRef<HTMLSpanElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasMorphRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const asteriskCharRef = useRef<HTMLSpanElement>(null);

  const [textLayout, setTextLayout] = useState<TextLayout | null>(null);

  // Phase 4: progress ref (GSAP writes, R3F reads per-frame)
  const phase4ProgressRef = useRef(0);
  const [phase4Active, setPhase4Active] = useState(false);
  const [asteriskScreen, setAsteriskScreen] = useState<{
    x: number; y: number; fontSize: number; spanWidth: number; spanHeight: number;
  } | null>(null);

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
        !asteriskCharRef.current
      ) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const kerenRect = kerenRef.current.getBoundingClientRect();
      const boshiRect = boshiRef.current.getBoundingClientRect();

      // Phase 2 translations
      const boshiMoveY = kerenRect.bottom - boshiRect.bottom;
      const textCanvasMoveX = (vw / 2) - kerenRect.left;

      // Measure the true visual center Y of the * glyph using Canvas 2D font metrics.
      // The * glyph sits near the ascender, so getBoundingClientRect center is too low.
      function glyphCenterY(spanRect: DOMRect): number {
        const c = document.createElement("canvas");
        const ctx2d = c.getContext("2d")!;
        ctx2d.font = `bold ${textLayout!.fontSizePx}px 'DIN Condensed'`;
        const m = ctx2d.measureText("*");
        // Font metrics give us the glyph bounds relative to the baseline.
        // fontBoundingBoxAscent = distance from baseline to top of the em box.
        // The baseline within the span is at: spanRect.top + fontBoundingBoxAscent
        // The glyph's visual center = baseline - glyphAscent + (glyphAscent+glyphDescent)/2
        //                            = baseline - (glyphAscent - glyphDescent) / 2
        const baseline = spanRect.top + m.fontBoundingBoxAscent;
        return baseline - (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;
      }

      // Compute approximate asterisk position NOW so Canvas pre-mounts & warms up.
      // Will be updated with live measurement at Phase 4 onEnter.
      const asteriskRect = asteriskCharRef.current.getBoundingClientRect();
      const approxX = asteriskRect.left + asteriskRect.width / 2 + textCanvasMoveX;
      const approxY = glyphCenterY(asteriskRect);
      setAsteriskScreen({
        x: approxX,
        y: approxY,
        fontSize: textLayout.fontSizePx,
        spanWidth: asteriskRect.width,
        spanHeight: asteriskRect.height,
      });

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

        // Instant swap: WebGL particles → HTML text at Phase 1→2 boundary
        if (canvasMorphRef.current && subtitleRef.current) {
          tl.fromTo(canvasMorphRef.current, { opacity: 1 }, { opacity: 0, duration: 0.001 }, 0);
          tl.fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.001 }, 0);
        }

        // Phase 2: Boshi up, subtitle wrapper slides right
        tl.to(boshiRef.current, { y: boshiMoveY, ease: "none", duration: 1 }, 0);
        tl.to(canvasWrapperRef.current, { x: textCanvasMoveX, ease: "none", duration: 1 }, 0);

        // ── Phase 4: WebGL asterisk reveal (separate canvas) ──
        const phase4tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: () => `top+=${vh * 3} top`,
            end: () => `+=${vh}`,
            scrub: true,
            onEnter: () => {
              // Live-measure the ACTUAL * position (Phase 2 is complete)
              const rect = asteriskCharRef.current!.getBoundingClientRect();
              setAsteriskScreen({
                x: rect.left + rect.width / 2,
                y: glyphCenterY(rect),
                fontSize: textLayout.fontSizePx,
                spanWidth: rect.width,
                spanHeight: rect.height,
              });
              setPhase4Active(true);
            },
            onEnterBack: () => {
              setPhase4Active(true);
            },
            onLeaveBack: () => {
              setPhase4Active(false);
              phase4ProgressRef.current = 0;
            },
          }
        });

        // Hide the HTML * at Phase 4 start
        phase4tl.to(asteriskCharRef.current, { opacity: 0, duration: 0.001 }, 0);

        // Drive progress ref 0→1
        const progressProxy = { value: 0 };
        phase4tl.to(progressProxy, {
          value: 1,
          ease: "none",
          duration: 1,
          onUpdate: () => {
            phase4ProgressRef.current = progressProxy.value;
          },
        }, 0);

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

      {/* Canvas wrapper — carries particles + subtitle, translated during Phase 2 */}
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

      {/* Phase 4: Separate WebGL canvas for asterisk reveal (z-50, above everything) */}
      {asteriskScreen && (
        <AsteriskReveal
          screenX={asteriskScreen.x}
          screenY={asteriskScreen.y}
          fontSize={asteriskScreen.fontSize}
          spanWidth={asteriskScreen.spanWidth}
          spanHeight={asteriskScreen.spanHeight}
          progressRef={phase4ProgressRef}
          visible={phase4Active}
        />
      )}
    </section>
  );
}
