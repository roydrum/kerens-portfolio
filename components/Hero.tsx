"use client";

import { CanvasMorph } from "./CanvasMorph";

export function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "200vh" }}
      aria-label="Hero"
    >
      <div className="fixed inset-0 z-0 bg-graph-paper" />

      {/* Structural Grid Layout (Fluid 24-Column on Desktop) */}
      <div className="fixed inset-0 pointer-events-none flex flex-col md:grid md:grid-cols-[repeat(24,minmax(0,1fr))] md:auto-rows-[calc(100vw/24)] p-4 md:p-0 justify-between pb-[10vh] md:pb-0 z-10 w-full h-full">

        {/* Background Graphic: Removed per user request */}

        {/* Left Side: KEREN */}
        <div className="flex flex-col items-start md:col-start-[3] md:col-span-12 md:row-start-[4] mt-[5vh] md:mt-0 z-10">
          <span
            className="text-white text-[clamp(7rem,35vw,22vw)] md:text-[23vw] font-bold uppercase leading-[0.8] tracking-tighter select-none"
            style={{ fontFamily: 'var(--font-din-condensed)' }}
          >
            Keren
          </span>
        </div>

        {/* Right Side: BOSHI */}
        <span
          className="text-white text-[clamp(7rem,35vw,22vw)] md:text-[23vw] font-bold uppercase leading-[0.8] tracking-tighter select-none self-end md:self-start md:col-start-[14] md:row-start-[6] -translate-x-2 md:translate-x-0 -translate-y-[10vh] md:translate-y-0 z-10"
          style={{ fontFamily: 'var(--font-din-condensed)' }}
        >
          Boshi
        </span>
      </div>

      {/* Replaces all previous SVG effect logic */}
      <CanvasMorph />
    </section>
  );
}
