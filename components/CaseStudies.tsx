"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INTRO_COPY = `A selection of projects where I led creative strategy and production systems across multiple markets — from validating product features through performance creative, to building research-driven messaging frameworks, to creating scalable multi-market playbooks and GenAI-powered workflow tools. Each case study highlights my role, the approach, and the outcomes.`;

interface CaseStudy {
    number: string;
    client: string;
    title: string;
    description: string;
}

const CASE_STUDIES: CaseStudy[] = [
    {
        number: "01",
        client: "Vimeo Create",
        title: "Lock Screen Video Feature Validation",
        description:
            "I led a TikTok and Meta campaign for an unreleased feature to validate demand before development. I owned the script, storyboard, casting direction, editing guidelines, and iteration strategy. The campaign reached ~70M views, drove record user interest and clicks, and increased in-app searches for the feature — helping support the decision to build it.",
    },
    {
        number: "02",
        client: "Wolt",
        title: "Multi-Market Creative System (8 Markets)",
        description:
            "I built a multi-market strategy and testing plan to drive first-time orders and app downloads while staying strongly on-brand. I wrote scripts, briefed creators, guided motion designers, and led feedback and iteration when performance data was available. The system scaled two creative pillars across markets with localization rules, improving CTR and CVR and enabling a consistent production cadence.",
    },
    {
        number: "03",
        client: "Flo",
        title: "Menopause Research to Multi-Market Creative Strategy (FR/DE vs US)",
        description:
            "I led research comparing cultural barriers, language, and symptom awareness gaps across France and Germany versus the US. I translated the insights into a platform-native strategy with localized messaging routes, respectful humor, and clear creative formats designed to normalize the topic without talking down to women. The output was an actionable strategy teams could execute from, with testing guidance.",
    },
    {
        number: "04",
        client: "Scrippo",
        title: "GenAI Workflow Tool for UGC Script Development",
        description:
            "I designed and built Scrippo in Cursor to help marketers turn scattered social video references into production-ready UGC scripts. The tool captures links, analyzes and catalogs them (hook type, structure, tone, angle, industry), then outputs a script tied to a reference video, with an embedded LLM to refine the script. I owned the product workflow, UX/UI, build, onboarding, and iteration based on user feedback.",
    },
    {
        number: "05",
        client: "Bitpanda",
        title: "Multi-Market Creative Strategy System (14 Markets)",
        description:
            "I owned a 14-market strategy built around trust-building — both in messaging and in visual guidelines (credible casting, clean visuals, professional tone). I created the testing plan, scripts, localization rules, and execution guidance, and recommended women-focused angles as a growth lever. The result was a scalable system that maintained consistency and credibility across markets while enabling iterative improvement.",
    },
];

export function CaseStudies() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const introRef = useRef<HTMLParagraphElement>(null);
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

            // Staggered card animations
            cardRefs.current.forEach((card, i) => {
                if (!card) return;

                const numberEl = card.querySelector(".case-number");
                const contentEl = card.querySelector(".case-content");
                const lineEl = card.querySelector(".case-line");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                });

                // Line draws in
                if (lineEl) {
                    tl.fromTo(
                        lineEl,
                        { scaleX: 0 },
                        { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
                        0
                    );
                }

                // Number fades in
                if (numberEl) {
                    tl.fromTo(
                        numberEl,
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
                        0.15
                    );
                }

                // Content slides up
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
            ref={sectionRef}
            className="relative w-full overflow-hidden"
            style={{ background: "#ef4444", position: "relative", zIndex: 60 }}
        >
            {/* Intro block */}
            <div className="mx-auto max-w-[1200px] px-6 md:px-12 pt-[12vh] pb-[6vh]">
                <h2
                    ref={headingRef}
                    className="text-white font-bold uppercase tracking-tight leading-[0.9] mb-8 md:mb-12"
                    style={{
                        fontFamily: "var(--font-din-condensed)",
                        fontSize: "clamp(3rem, 8vw, 7rem)",
                        opacity: 0,
                    }}
                >
                    Case Studies
                </h2>
                <p
                    ref={introRef}
                    className="text-white/80 text-base md:text-lg leading-relaxed max-w-[720px]"
                    style={{ opacity: 0 }}
                >
                    {INTRO_COPY}
                </p>
            </div>

            {/* Case study cards */}
            <div className="mx-auto max-w-[1200px] px-6 md:px-12 pb-[12vh]">
                {CASE_STUDIES.map((study, i) => (
                    <div
                        key={study.number}
                        ref={(el) => { cardRefs.current[i] = el; }}
                        className="case-card mb-0"
                    >
                        {/* Separator line */}
                        <div
                            className="case-line h-[1px] w-full mb-8 md:mb-10"
                            style={{
                                background: "rgba(255,255,255,0.25)",
                                transformOrigin: "left center",
                            }}
                        />

                        <div className="flex flex-col md:flex-row gap-4 md:gap-12 pb-10 md:pb-14">
                            {/* Number */}
                            <div className="case-number shrink-0">
                                <span
                                    className="text-white/30 font-bold leading-none"
                                    style={{
                                        fontFamily: "var(--font-din-condensed)",
                                        fontSize: "clamp(2.5rem, 5vw, 4rem)",
                                    }}
                                >
                                    {study.number}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="case-content flex-1">
                                <h3
                                    className="text-white font-bold uppercase tracking-tight leading-[1] mb-2"
                                    style={{
                                        fontFamily: "var(--font-din-condensed)",
                                        fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                                    }}
                                >
                                    {study.client}
                                </h3>
                                <h4
                                    className="text-white/60 font-bold uppercase tracking-tight leading-[1.1] mb-4 md:mb-5"
                                    style={{
                                        fontFamily: "var(--font-din-condensed)",
                                        fontSize: "clamp(1rem, 2vw, 1.3rem)",
                                    }}
                                >
                                    {study.title}
                                </h4>
                                <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-[640px]">
                                    {study.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
