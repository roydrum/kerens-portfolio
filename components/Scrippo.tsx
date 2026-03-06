"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Scrippo() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animate the main heading
            if (headingRef.current) {
                gsap.fromTo(
                    headingRef.current,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            // Stagger animation for the text blocks
            contentRefs.current.forEach((block, i) => {
                if (!block) return;
                gsap.fromTo(
                    block,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        delay: i * 0.1,
                        scrollTrigger: {
                            trigger: block,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !contentRefs.current.includes(el)) {
            contentRefs.current.push(el);
        }
    };

    return (
        <section
            id="scrippo"
            ref={sectionRef}
            className="relative w-full"
            style={{ background: "#ef4444", position: "relative", zIndex: 60 }}
        >
            {/* Heading - sticky */}
            <div
                className="sticky top-0 z-10 mx-auto max-w-[1200px] px-6 md:px-12 pt-[8vh] pb-[4vh]"
                style={{ background: "#ef4444" }}
            >
                <h2
                    ref={headingRef}
                    className="text-white font-bold uppercase tracking-tight leading-[0.9]"
                    style={{
                        fontFamily: "var(--font-din-condensed)",
                        fontSize: "clamp(3rem, 8vw, 7rem)",
                        opacity: 0,
                    }}
                >
                    Scrippo
                </h2>
            </div>

            {/* Content Container */}
            <div className="relative z-[5] mx-auto max-w-[1200px] px-6 md:px-12 pb-[12vh] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* Left Column: Copy */}
                <div className="flex flex-col gap-12">
                    {/* Intro */}
                    <div ref={addToRefs} style={{ opacity: 0 }}>
                        <h3 className="text-white font-bold uppercase tracking-tight mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-din-condensed)", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                            Inspiration
                            <svg viewBox="0 0 16 16" fill="none" className="text-white/40 shrink-0" style={{ width: "0.8em", height: "0.8em", transform: "translateY(-0.05em)" }}>
                                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Scripts
                        </h3>
                        <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                            <strong>Scrippo</strong> is a tool I built from scratch - I defined the workflow, designed the UX/UI, and built it in Cursor. It’s live and already has users.
                        </p>
                    </div>

                    {/* The Problem */}
                    <div ref={addToRefs} style={{ opacity: 0 }}>
                        <h4 className="text-white font-bold uppercase tracking-tight mb-4 text-xl" style={{ fontFamily: "var(--font-din-condensed)", fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>
                            The Problem
                        </h4>
                        <ul className="space-y-4">
                            <li className="text-white/80 text-base md:text-lg leading-relaxed flex items-start gap-3">
                                <span className="text-white/30 mt-[0.3em] shrink-0">•</span>
                                <div><strong>Inspiration gets lost:</strong> phones full of screen recordings and links you never find again.</div>
                            </li>
                            <li className="text-white/80 text-base md:text-lg leading-relaxed flex items-start gap-3">
                                <span className="text-white/30 mt-[0.3em] shrink-0">•</span>
                                <div><strong>UGC scripting doesn’t scale:</strong> strong scripts require trend fluency and are hard (and expensive) to produce in volume.</div>
                            </li>
                            <li className="text-white/80 text-base md:text-lg leading-relaxed flex items-start gap-3">
                                <span className="text-white/30 mt-[0.3em] shrink-0">•</span>
                                <div><strong>Teams need speed:</strong> lots of angles and scripts fast, without losing quality.</div>
                            </li>
                        </ul>
                    </div>

                    {/* What Scrippo Does */}
                    <div ref={addToRefs} style={{ opacity: 0 }}>
                        <h4 className="text-white font-bold uppercase tracking-tight mb-4 text-xl" style={{ fontFamily: "var(--font-din-condensed)", fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>
                            What Scrippo Does
                        </h4>
                        <p className="text-white/90 text-base md:text-lg mb-6 leading-relaxed">
                            Scrippo turns scattered references into a structured library and a script workflow.
                        </p>
                        <ul className="space-y-6">
                            <li className="text-white/80 text-base md:text-lg leading-relaxed flex items-start gap-3">
                                <span className="text-white/30 mt-[0.3em] shrink-0">•</span>
                                <div>
                                    <strong className="text-white block mb-1">Capture</strong>
                                    Share a link from Instagram, TikTok, X, or LinkedIn. Optionally add tags and connect it to a client.
                                </div>
                            </li>
                            <li className="text-white/80 text-base md:text-lg leading-relaxed flex items-start gap-3">
                                <span className="text-white/30 mt-[0.3em] shrink-0">•</span>
                                <div>
                                    <strong className="text-white block mb-1">Organize + collaborate</strong>
                                    Scrippo analyzes the video and saves it into a searchable team library (workspaces). Review, comment on a timeline, and tag teammates.
                                </div>
                            </li>
                            <li className="text-white/80 text-base md:text-lg leading-relaxed flex items-start gap-3">
                                <span className="text-white/30 mt-[0.3em] shrink-0">•</span>
                                <div>
                                    <strong className="text-white block mb-1">Generate scripts (client + brief based)</strong>
                                    Define clients and upload briefs. Pick a reference and generate a script for that specific brief.
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Outputs & AI */}
                    <div ref={addToRefs} style={{ opacity: 0 }}>
                        <div className="mb-12">
                            <h4 className="text-white font-bold uppercase tracking-tight mb-4" style={{ fontFamily: "var(--font-din-condensed)", fontSize: "clamp(1.2rem, 2vw, 1.4rem)" }}>
                                Outputs
                            </h4>
                            <ul className="space-y-4">
                                <li className="text-white/80 text-base md:text-lg leading-relaxed flex items-start gap-3">
                                    <span className="text-white/30 mt-[0.3em] shrink-0">•</span>
                                    <div>A searchable reference library (tagged + analyzed)</div>
                                </li>
                                <li className="text-white/80 text-base md:text-lg leading-relaxed flex items-start gap-3">
                                    <span className="text-white/30 mt-[0.3em] shrink-0">•</span>
                                    <div>UGC scripts: hook, body, CTA, titles - linked to the reference video</div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold uppercase tracking-tight mb-4" style={{ fontFamily: "var(--font-din-condensed)", fontSize: "clamp(1.2rem, 2vw, 1.4rem)" }}>
                                How AI is used
                            </h4>
                            <p className="text-white/80 text-base md:text-lg leading-relaxed">
                                The built-in LLM powers analysis, search, recommendations based on the brief, script generation, and script refinement.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: 16:9 Media Gallery */}
                <div className="flex flex-col gap-6 lg:mt-24">
                    <p className="text-white/50 text-sm uppercase tracking-widest font-semibold mb-2">Product Gallery</p>

                    {/* Placeholder Grid (Replace contents later) */}
                    <div className="grid grid-cols-1 gap-6">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div
                                key={item}
                                className="w-full relative rounded-xl overflow-hidden bg-white/5 border border-white/15 flex items-center justify-center flex-col"
                                style={{ aspectRatio: "16/9" }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12 text-white/30 mb-4">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                                <p className="text-white/50 text-sm font-medium">Scrippo Screenshot #{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
