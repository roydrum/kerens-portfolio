"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CanvasMorph, TextLayout } from "./CanvasMorph";
import { AsteriskReveal } from "./AsteriskReveal";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function MobileIntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -50,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'bottom 65%',
            end: 'bottom 10%',
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center px-8 py-24"
      style={{ backgroundColor: '#ef4444' }}
      aria-label="Intro"
    >
      <p
        ref={textRef}
        className="text-white text-xl leading-relaxed text-center font-medium max-w-sm opacity-0"
      >
        Hi, I&apos;m Keren - a creative strategist who&apos;s worked in-house at Vimeo and HelloFresh, and in agency roles on brands like Wolt, Bitpanda, Pantene, Pampers, Nivea and many more. I have a BA in Communication Design and a strong design background, which keeps my strategy grounded in what will actually ship visually. I also love building: I developed an AI tool for marketers end-to-end, and I&apos;m vibe coding this portfolio in Cursor.
      </p>
    </section>
  );
}

function MobileHero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section
        className="relative w-full flex flex-col items-center pt-[15vh] pb-[10vh] overflow-hidden"
        style={{
          backgroundColor: '#ffd0d0',
          '--scroll-offset': `${scrollY}px`
        } as React.CSSProperties}
        aria-label="Hero Mobile"
      >
        {/* Halftone Background Layer */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.26] bg-no-repeat bg-top"
          style={{
            backgroundImage: "url('/dots.png')",
            backgroundSize: '100% auto',
            height: '300%',
            top: '-50%',
            transform: `translateY(calc(var(--scroll-offset) * -0.5))`
          }}
        />

        {/* Circular Portrait */}
        <div className="relative z-10 w-[65vw] max-w-[300px] aspect-square rounded-full overflow-hidden mb-8">
          <Image
            src="/HeroProfile.png"
            alt="Keren Boshi"
            width={800}
            height={800}
            className="w-full h-full object-cover object-top"
            priority
          />
        </div>

        {/* Centered Typography */}
        <div className="relative z-10 flex flex-col items-center w-full px-6">
          <h1
            className="text-white font-bold uppercase leading-[0.9] tracking-tighter text-center"
            style={{ fontFamily: 'var(--font-din-condensed)', fontSize: '16vw' }}
          >
            KEREN BOSHI
          </h1>

          <div className="bg-[#cf504c] px-6 py-2 mt-4 inline-flex items-center gap-3">
            <span
              className="font-bold text-white leading-none translate-y-[0.15em]"
              style={{ fontSize: '2rem', fontFamily: 'var(--font-din-condensed)' }}
            >
              *
            </span>
            <span
              className="text-white font-bold tracking-widest uppercase leading-none translate-y-[0.2em]"
              style={{ fontFamily: 'var(--font-din-condensed)', fontSize: '1.1rem' }}
            >
              CREATIVE STRATEGIST
            </span>
          </div>
        </div>
      </section>

      <MobileIntroSection />
    </>
  );
}



export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const kerenRef = useRef<HTMLSpanElement>(null);
  const boshiRef = useRef<HTMLSpanElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasMorphRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const asteriskCharRef = useRef<HTMLSpanElement>(null);
  const graphPaperRef = useRef<HTMLDivElement>(null);
  const textGridRef = useRef<HTMLDivElement>(null);
  const staticProfileRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);


  const [textLayout, setTextLayout] = useState<TextLayout | null>(null);

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    if (!textLayout || isMobile) return;

    const initAnimations = async () => {
      await document.fonts.load("bold 12px 'DIN Condensed'");

      if (
        !kerenRef.current || !boshiRef.current ||
        !canvasWrapperRef.current || !containerRef.current ||
        !asteriskCharRef.current || !staticProfileRef.current
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

      // Compute approximate asterisk position NOW so Canvas pre-mount & warms up.
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
        // Phase 1: Fade out static portrait as particles morph (0 -> 80vh)
        // End at 80% of vh so it's definitely gone before Phase 2 triggers at 100vh.
        const morphTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${vh * 0.8}`,
            scrub: true,
          }
        });
        morphTl.to(staticProfileRef.current, { opacity: 0, ease: "none" });

        // Phase 2: Particle swap and slide (100vh -> 300vh)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: () => `top+=${vh} top`,
            end: () => `+=${vh * 2}`,
            scrub: true,
            onEnter: () => {
              // Hard-guarantee the portrait is invisible when subtitle appears
              if (staticProfileRef.current) gsap.set(staticProfileRef.current, { opacity: 0 });
            },
            onLeaveBack: () => {
              // When scrolling back into Phase 1, restore portrait so morphTl can animate it
              if (staticProfileRef.current) gsap.set(staticProfileRef.current, { opacity: 1 });
            },
          }
        });

        // Instant swap: WebGL particles → HTML text at the END of Phase 2 (after slide)
        // canvasMorphRef fades out over the last portion of Phase 2 so it completes
        // before/as subtitle appears. This prevents portrait particles + text co-existing.
        if (canvasMorphRef.current && subtitleRef.current) {
          // Canvas fades out over the last 20% of Phase 2 (duration 0.2 of timeline 0-2)
          tl.to(canvasMorphRef.current, { opacity: 0, duration: 0.2, ease: "none" }, 1.8);
          // Subtitle appears only at the very end of Phase 2
          tl.fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.001 }, 2.0);
        }

        // Phase 2: Boshi up first, then subtitle wrapper slides right
        tl.to(boshiRef.current, { y: boshiMoveY, ease: "none", duration: 1 }, 0);
        tl.to(canvasWrapperRef.current, { x: textCanvasMoveX, ease: "none", duration: 1 }, 1);

        // ── Phase 4: WebGL asterisk reveal + Intro Text [NEW] ──
        const phase4tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: () => `top+=${vh * 3} top`,
            end: () => `+=${vh * 2.5}`, // Extended duration for reading text
            scrub: true,
            onEnter: () => {
              if (!asteriskCharRef.current) return;
              const rect = asteriskCharRef.current.getBoundingClientRect();
              setAsteriskScreen({
                x: rect.left + rect.width / 2,
                y: glyphCenterY(rect),
                fontSize: textLayout!.fontSizePx,
                spanWidth: rect.width,
                spanHeight: rect.height,
              });
              setPhase4Active(true);
            },
            onEnterBack: () => {
              setPhase4Active(true);
              if (graphPaperRef.current) gsap.set(graphPaperRef.current, { opacity: 1 });
              if (textGridRef.current) gsap.set(textGridRef.current, { opacity: 1 });
              if (canvasWrapperRef.current) gsap.set(canvasWrapperRef.current, { opacity: 1 });
            },
            onLeave: () => {
              // Final exit: Fade out everything including the red screen and intro text
              if (graphPaperRef.current) gsap.set(graphPaperRef.current, { opacity: 0 });
              if (textGridRef.current) gsap.set(textGridRef.current, { opacity: 0 });
              if (canvasWrapperRef.current) gsap.set(canvasWrapperRef.current, { opacity: 0 });
              if (introTextRef.current) gsap.set(introTextRef.current, { opacity: 0 });
            },
            onLeaveBack: () => {
              if (graphPaperRef.current) gsap.set(graphPaperRef.current, { opacity: 1 });
              if (textGridRef.current) gsap.set(textGridRef.current, { opacity: 1 });
              if (canvasWrapperRef.current) gsap.set(canvasWrapperRef.current, { opacity: 1 });
              setPhase4Active(false);
            },
          }
        });

        // Hide the HTML * at Phase 4 start
        phase4tl.to(asteriskCharRef.current, { opacity: 0, duration: 0.001 }, 0);

        // Drive asterisk expansion 0→1
        const progressProxy = { value: 0 };
        phase4tl.to(progressProxy, {
          value: 1,
          ease: "none",
          duration: 0.4,
          onUpdate: () => {
            phase4ProgressRef.current = progressProxy.value;
          },
        }, 0);

        // Intro text reveal
        phase4tl.fromTo(introTextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, 0.4);

        // Final fade out
        phase4tl.to([introTextRef.current, graphPaperRef.current, canvasWrapperRef.current], { opacity: 0, duration: 0.1 }, 0.9);

      }, containerRef);

      return () => ctx.revert();
    };

    setTimeout(initAnimations, 150);

  }, [textLayout, isMobile]);

  if (!mounted) return <section style={{ height: "100vh" }} />;

  if (isMobile) return <MobileHero />;

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "600vh", backgroundColor: "#ffd0d0" }}
      aria-label="Hero"
    >


      <div ref={graphPaperRef} className="fixed inset-0 z-0 bg-hero-grid-v2" />

      {/* Static Fallback Image for Desktop */}
      <div ref={staticProfileRef} className="fixed inset-0 z-[5] pointer-events-none flex items-end justify-center">
        <div className="relative w-full h-[85vh] bottom-[-2px]">
          <Image
            src="/KerenCutout.png"
            alt="Keren Boshi"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>

      {/* Structural Grid Layout */}
      <div ref={textGridRef} className="fixed inset-0 pointer-events-none flex flex-col md:grid md:grid-cols-[repeat(24,minmax(0,1fr))] md:auto-rows-[calc(100vw/24)] p-4 md:p-0 justify-between pb-[10vh] md:pb-0 z-10 w-full h-full">
        <div className="flex flex-col items-start md:col-start-[3] md:col-span-12 md:row-start-[4] mt-[5vh] md:mt-0 z-10">
          <span
            ref={kerenRef}
            className="text-white text-[clamp(6rem,35vw,22vw)] md:text-[23vw] font-bold uppercase leading-[0.8] tracking-tighter select-none"
            style={{ fontFamily: 'var(--font-din-condensed)' }}
          >
            Keren
          </span>
        </div>
        <span
          ref={boshiRef}
          className="text-white text-[clamp(6rem,35vw,22vw)] md:text-[23vw] font-bold uppercase leading-[0.8] tracking-tighter select-none self-end md:self-start md:col-start-[14] md:row-start-[6] -translate-x-2 md:translate-x-0 -translate-y-[5vh] md:translate-y-0 z-10"
          style={{ fontFamily: 'var(--font-din-condensed)' }}
        >
          Boshi
        </span>
      </div>

      {/* Canvas wrapper - carries particles + subtitle, translated during Phase 2 */}
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
            <span style={{ color: "white" }}>{" "}CREATIVE STRATEGIST</span>
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

      {/* [NEW] Intro Text for Desktop (Fades in during Phase 5 over the solid red background) */}
      <div 
        ref={introTextRef} 
        className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center px-[15vw] opacity-0"
      >
        <p className="text-white text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight max-w-5xl tracking-tight text-center">
          Hi, I’m Keren - a creative strategist who’s worked in-house at Vimeo and HelloFresh, and in agency roles on brands like Wolt, Bitpanda, Pantene, Pampers, Nivea and many more. I have a BA in Communication Design and a strong design background, which keeps my strategy grounded in what will actually ship visually. I also love building: I developed an AI tool for marketers end-to-end, and I’m vibe coding this portfolio in Cursor.
        </p>
      </div>
    </section>
  );
}
