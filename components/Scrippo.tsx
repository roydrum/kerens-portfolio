"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCRIPPO_ITEMS = [
    {
        num: "01",
        title: "Explore",
        heading: "Explore library",
        text: "A shared workspace where you and your team can browse every saved reference. Each video is analyzed and searchable by client, tags, or free search - including queries like “face,” with results based on what’s seen, said, or contextually related."
    },
    {
        num: "02",
        title: "Video page",
        heading: "Frame-by-frame collaboration",
        text: "A dedicated page for each reference video with timeline comments, second-by-second notes, and teammate tagging - built for fast reviews and shared decisions."
    },
    {
        num: "03",
        title: "New client setup",
        heading: "Client context, captured",
        text: "Upload brand docs (tone of voice, brand book, values, etc.) and Scrippo extracts key information to pre-fill the client profile. Add a brief to create a project, and the tool matches client + brief to generate more relevant scripts."
    },
    {
        num: "04",
        title: "Script output",
        heading: "Scripts tied to real references",
        text: "Generate UGC scripts directly from a chosen reference, with structured sections (hook, body, CTA, titles) linked to the source video."
    },
    {
        num: "05",
        title: "Script refinement",
        heading: "Iterate instantly with the LLM",
        text: "Refine the script inside the tool - adjust tone, pacing, structure, or angles - while keeping the reference video as the anchor."
    }
];

export function Scrippo() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const galleryRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);

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

            // Stagger animation for the text blocks (Intro section)
            contentRefs.current.forEach((block: HTMLDivElement | null, i: number) => {
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

            // Horizontal Gallery Animation
            const validSlides = slideRefs.current.filter((slide): slide is HTMLDivElement => slide !== null);
            if (containerRef.current && galleryRef.current && validSlides.length > 0) {
                const totalSlides = validSlides.length;

                // Calculate total width to scroll
                const totalWidth = galleryRef.current.scrollWidth;
                const centeringX = totalWidth - window.innerWidth + (window.innerWidth * 0.1);

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 5%",
                        end: () => `+=${centeringX * 2}`, // Increase scroll distance for better control
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // Instead of one big move, we break it into steps to allow "holds"
                validSlides.forEach((slide, i) => {
                    const textBlock = textRefs.current[i];

                    // Calculate the X position needed to center this specific slide
                    // We account for the padding/gap in the gallery
                    const slideOffset = slide.offsetLeft;
                    const slideWidth = slide.offsetWidth;
                    const targetX = slideOffset - (window.innerWidth - slideWidth) / 2;

                    // Move to this slide
                    tl.to(galleryRef.current, {
                        x: -targetX,
                        ease: "power2.inOut",
                        duration: 1
                    });

                    // Hold this slide (text animation happens during transition/hold)
                    if (textBlock) {
                        tl.fromTo(textBlock,
                            { opacity: 0, x: 30 },
                            { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
                            "-=0.5" // Start slightly before reaching the center
                        );
                    }

                    // Explicit hold duration
                    tl.to({}, { duration: 0.8 });
                });
            }
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
                className="sticky top-0 z-50 w-full pt-[8vh] pb-[4vh]"
                style={{ background: "#ef4444" }}
            >
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <h2
                        ref={headingRef}
                        className="text-white font-bold uppercase tracking-tight leading-[0.9]"
                        style={{
                            fontFamily: "var(--font-din-condensed)",
                            fontSize: "clamp(3rem, 8vw, 7rem)",
                        }}
                    >
                        Scrippo
                    </h2>
                </div>
            </div>

            {/* Content Container */}
            <div className="relative z-[5] mx-auto max-w-[1200px] px-6 md:px-12 pb-[12vh] flex flex-col gap-16 lg:gap-24">
                {/* Intro Text */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                    <div className="flex flex-col gap-12">
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
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col gap-12">
                        <div ref={addToRefs} style={{ opacity: 0 }}>
                            <h4 className="text-white font-bold uppercase tracking-tight mb-4 text-xl" style={{ fontFamily: "var(--font-din-condensed)", fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>
                                What Scrippo Does
                            </h4>
                            <ul className="space-y-6">
                                <li className="text-white/80 text-base md:text-lg leading-relaxed flex items-start gap-3">
                                    <span className="text-white/30 mt-[0.3em] shrink-0">•</span>
                                    <div>
                                        <strong className="text-white block mb-1">Capture, Organize, Generate</strong>
                                        Share a link, organize seamlessly, and generate high-performing scripts based on proven references.
                                    </div>
                                </li>
                                <li className="text-white/80 text-base md:text-lg leading-relaxed flex items-start gap-3">
                                    <span className="text-white/30 mt-[0.3em] shrink-0">•</span>
                                    <div>
                                        <strong className="text-white block mb-1">AI-Powered</strong>
                                        Analysis, search, and generation powered by custom LLM integrations.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Horizontal Media Gallery */}
            <div ref={containerRef} className="relative w-full h-[115vh] overflow-visible flex flex-col justify-start pt-[15vh] z-30">
                <div className="absolute top-0 left-0 w-full flex flex-col items-center pointer-events-none z-[1] translate-y-24">
                    <div className="h-[1px] w-full max-w-[1200px] bg-white/10 mb-8 opacity-50" />
                    <p className="text-white/50 text-sm uppercase tracking-widest font-semibold text-center">Product Features</p>
                </div>

                <div className="w-full overflow-visible mt-32">
                    <div
                        ref={galleryRef}
                        className="flex flex-row items-center gap-[40vw] px-[30vw]"
                    >
                        {SCRIPPO_ITEMS.map((item, idx) => (
                            <div
                                key={item.num}
                                ref={(el: HTMLDivElement | null) => { slideRefs.current[idx] = el; }}
                                className="flex-shrink-0 flex flex-col lg:flex-row items-center lg:items-center gap-6 lg:gap-16"
                            >
                                {/* Image Container */}
                                <div
                                    className="relative flex-shrink-0 w-auto h-[45vh] lg:h-[55vh] group/img cursor-zoom-in"
                                    onClick={() => setSelectedImage(`/scrippo/${item.num}.png`)}
                                >
                                    <div className="h-full relative inline-block">
                                        <img
                                            src={`/scrippo/${item.num}.png`}
                                            alt={item.title}
                                            className="h-full w-auto object-contain block rounded-lg shadow-2xl transition-transform duration-500 group-hover/img:scale-[1.02]"
                                        />
                                        <div className="absolute top-4 right-4 z-[70]">
                                            <div className="bg-white p-1.5 rounded-full text-[#ef4444] opacity-0 group-hover/img:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/img:translate-y-0 shadow-2xl">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                    <polyline points="9 21 3 21 3 15"></polyline>
                                                    <line x1="21" y1="3" x2="14" y2="10"></line>
                                                    <line x1="3" y1="21" x2="10" y2="14"></line>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Text Container */}
                                <div
                                    ref={(el: HTMLDivElement | null) => { textRefs.current[idx] = el; }}
                                    className="max-w-[380px] flex flex-col gap-3 md:gap-5 text-white"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-white/40 font-bold text-xl" style={{ fontFamily: "var(--font-din-condensed)" }}>{item.num}</span>
                                        <div className="h-[1px] w-10 bg-white/20" />
                                        <span className="text-white/60 uppercase tracking-[0.2em] text-[10px] font-black">{item.title}</span>
                                    </div>
                                    <h3
                                        className="text-white font-bold uppercase tracking-tight leading-[1.1]"
                                        style={{ fontFamily: "var(--font-din-condensed)", fontSize: "clamp(1.8rem, 6vw, 3.2rem)" }}
                                    >
                                        {item.heading}
                                    </h3>
                                    <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="relative w-full h-full flex items-center justify-center"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <img
                                src={selectedImage}
                                alt="Scrippo Interface Large"
                                className="max-w-full max-h-full object-contain"
                            />
                            <button
                                className="absolute top-4 right-4 p-4 text-white hover:text-white/70 transition-colors"
                                onClick={() => setSelectedImage(null)}
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section >
    );
}
