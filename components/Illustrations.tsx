"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ILLUSTRATIONS_INTRO, ILLUSTRATION_ITEMS } from "@/lib/illustrations";

gsap.registerPlugin(ScrollTrigger);

export function Illustrations() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const introRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animate the heading
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

            // Animate the intro paragraph
            if (introRef.current) {
                gsap.fromTo(
                    introRef.current,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: introRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="illustrations"
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
                    Illustrations
                </h2>
            </div>

            {/* Intro copy - scrolls normally */}
            <div className="relative z-[5] mx-auto max-w-[1200px] px-6 md:px-12 pb-[4vh]">
                <p
                    ref={introRef}
                    className="text-white/80 text-base md:text-lg leading-relaxed max-w-[960px]"
                    style={{ opacity: 0 }}
                >
                    {ILLUSTRATIONS_INTRO}
                </p>
            </div>

            <div className="mx-auto max-w-[1200px] px-6 md:px-12 pb-[12vh]">
                {ILLUSTRATION_ITEMS.length > 0 ? (
                    <div className="grid-gallery">
                        {ILLUSTRATION_ITEMS.map((item, i) => (
                            <div key={i} className="grid-gallery-item">
                                <img
                                    src={item.src}
                                    alt={item.caption || `Illustration ${i + 1}`}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-white/20 rounded-2xl">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-white/30 mb-4">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <p className="text-white/50 text-center text-lg font-medium">Coming Soon</p>
                        <p className="text-white/30 text-center text-sm mt-2 max-w-sm">No illustration files have been uploaded to the public/illustrations folder yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
