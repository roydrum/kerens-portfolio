"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CREATIVE_PROJECTS, CREATIVE_INTRO } from "@/lib/creativeManagement";

gsap.registerPlugin(ScrollTrigger);

export function CreativeManagement() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const introRef = useRef<HTMLParagraphElement>(null);
    const subHeadingRef = useRef<HTMLHeadingElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

            // Animate the sub-heading
            if (subHeadingRef.current) {
                gsap.fromTo(
                    subHeadingRef.current,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: subHeadingRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            // Staggered card animations
            cardRefs.current.forEach((card) => {
                if (!card) return;

                const numberEl = card.querySelector(".cm-number");
                const contentEl = card.querySelector(".cm-content");
                const lineEl = card.querySelector(".cm-line");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                });

                if (lineEl) {
                    tl.fromTo(
                        lineEl,
                        { scaleX: 0 },
                        { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
                        0
                    );
                }

                if (numberEl) {
                    tl.fromTo(
                        numberEl,
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
                        0.15
                    );
                }

                if (contentEl) {
                    tl.fromTo(
                        contentEl,
                        { y: 40, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                        0.25
                    );
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="creative-management"
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
                    Creative Management
                </h2>
            </div>

            {/* Intro copy - scrolls normally */}
            <div className="relative z-[5] mx-auto max-w-[1200px] px-6 md:px-12 pb-[4vh]">
                <p
                    ref={introRef}
                    className="text-white/80 text-base md:text-lg leading-relaxed max-w-[960px]"
                    style={{ opacity: 0 }}
                >
                    {CREATIVE_INTRO}
                </p>
            </div>

            {/* Selected Projects sub-heading */}
            <div className="relative z-[5] mx-auto max-w-[1200px] px-6 md:px-12 pb-[4vh]">
                <h3
                    ref={subHeadingRef}
                    className="text-white/50 font-bold uppercase tracking-tight"
                    style={{
                        fontFamily: "var(--font-din-condensed)",
                        fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                        opacity: 0,
                    }}
                >
                    Selected Projects
                </h3>
            </div>

            {/* Project cards */}
            <div className="mx-auto max-w-[1200px] px-6 md:px-12 pb-[12vh]">
                {CREATIVE_PROJECTS.map((project, i) => {
                    const hasDetail = !!project.detail;
                    const CardWrapper = hasDetail ? Link : "div";
                    const cardProps = hasDetail
                        ? { href: `/creative-management/${project.slug}` }
                        : {};

                    return (
                        <CardWrapper
                            key={project.number}
                            {...(cardProps as any)}
                            className={`block ${hasDetail ? "group cursor-pointer" : ""}`}
                        >
                            <div
                                ref={(el) => { cardRefs.current[i] = el; }}
                                className="cm-card mb-0"
                            >
                                {/* Separator line */}
                                <div
                                    className="cm-line h-[1px] w-full mb-8 md:mb-10"
                                    style={{
                                        background: "rgba(255,255,255,0.25)",
                                        transformOrigin: "left center",
                                    }}
                                />

                                <div className="flex flex-col md:flex-row gap-4 md:gap-12 pb-10 md:pb-14">
                                    {/* Number */}
                                    <div className="cm-number shrink-0">
                                        <span
                                            className="text-white/30 font-bold leading-none"
                                            style={{
                                                fontFamily: "var(--font-din-condensed)",
                                                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                                            }}
                                        >
                                            {project.number}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="cm-content flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3
                                                className="text-white font-bold uppercase tracking-tight leading-[1] group-hover:text-white/90 transition-colors"
                                                style={{
                                                    fontFamily: "var(--font-din-condensed)",
                                                    fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                                                }}
                                            >
                                                {project.title}
                                            </h3>
                                            {hasDetail && (
                                                <svg
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    className="text-white group-hover:translate-x-1 transition-all duration-300 shrink-0"
                                                    style={{ width: "1.1em", height: "1.1em", transform: "translateY(-0.25em)" }}
                                                >
                                                    <path
                                                        d="M6 4L10 8L6 12"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <h4
                                            className="text-white/60 font-bold uppercase tracking-tight leading-[1.1] mb-4 md:mb-5"
                                            style={{
                                                fontFamily: "var(--font-din-condensed)",
                                                fontSize: "clamp(1rem, 2vw, 1.3rem)",
                                            }}
                                        >
                                            {project.subtitle}
                                        </h4>
                                        <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-[640px]">
                                            {project.summary}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardWrapper>
                    );
                })}
            </div>
        </section>
    );
}
