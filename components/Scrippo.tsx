"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Scrippo() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const galleryRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

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
            const validImages = imageRefs.current.filter((img): img is HTMLDivElement => img !== null);
            if (containerRef.current && galleryRef.current && validImages.length > 0) {
                const totalImages = validImages.length;

                // Calculate how much we need to scroll horizontally
                // We want the last image's center to be at the screen's center
                const lastImage = validImages[totalImages - 1];
                const lastImageCenter = lastImage.offsetLeft + lastImage.offsetWidth / 2;
                const centeringX = lastImageCenter - window.innerWidth / 2;
                const holdDistance = 600; // Extra scroll distance to "hold" the last image

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 10%",
                        end: () => `+=${centeringX + holdDistance}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // Move to centered position
                tl.to(galleryRef.current, {
                    x: -centeringX,
                    ease: "none",
                    duration: 1
                });

                // Hold for the remaining scroll distance (0.4 relative duration)
                tl.to({}, { duration: 0.4 });
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

            {/* Content Container - Reordered to Text Top, Images Bottom */}
            <div className="relative z-[5] mx-auto max-w-[1200px] px-6 md:px-12 pb-[12vh] flex flex-col gap-16 lg:gap-24">

                {/* Text Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                    {/* Left Column of Text */}
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
                    </div>

                    {/* Right Column of Text */}
                    <div className="flex flex-col gap-12">
                        {/* What Scrippo Does */}
                        <div ref={addToRefs} style={{ opacity: 0 }}>
                            <h4 className="text-white font-bold uppercase tracking-tight mb-4 text-xl" style={{ fontFamily: "var(--font-din-condensed)", fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>
                                What Scrippo Does
                            </h4>
                            <ul className="space-y-6">
                                <li className="text-white/80 text-base md:text-lg leading-relaxed flex items-start gap-3">
                                    <span className="text-white/30 mt-[0.3em] shrink-0">•</span>
                                    <div>
                                        <strong className="text-white block mb-1">Capture</strong>
                                        Share a link from Instagram, TikTok, X, or LinkedIn.
                                    </div>
                                </li>
                                <li className="text-white/80 text-base md:text-lg leading-relaxed flex items-start gap-3">
                                    <span className="text-white/30 mt-[0.3em] shrink-0">•</span>
                                    <div>
                                        <strong className="text-white block mb-1">Organize + collaborate</strong>
                                        Scrippo analyzes the video and saves it into a searchable team library.
                                    </div>
                                </li>
                                <li className="text-white/80 text-base md:text-lg leading-relaxed flex items-start gap-3">
                                    <span className="text-white/30 mt-[0.3em] shrink-0">•</span>
                                    <div>
                                        <strong className="text-white block mb-1">Generate scripts</strong>
                                        Pick a reference and generate a script for a specific brief.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* AI Usage */}
                        <div ref={addToRefs} style={{ opacity: 0 }}>
                            <h4 className="text-white font-bold uppercase tracking-tight mb-4" style={{ fontFamily: "var(--font-din-condensed)", fontSize: "clamp(1.2rem, 2vw, 1.4rem)" }}>
                                How AI is used
                            </h4>
                            <p className="text-white/80 text-base md:text-lg leading-relaxed">
                                The built-in LLM powers analysis, search, recommendations based on the brief, script generation, and script refinement.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Horizontal Media Gallery - Moved out of the text container for robust pinning */}
            <div ref={containerRef} className="relative w-full h-screen overflow-visible flex flex-col justify-center z-30">
                <div className="absolute top-0 left-0 w-full flex flex-col items-center pointer-events-none z-[1] translate-y-24">
                    <div className="h-[1px] w-full max-w-[1200px] bg-white/10 mb-8 opacity-50" />
                    <p className="text-white/50 text-sm uppercase tracking-widest font-semibold">Product Showcase</p>
                </div>

                <div className="w-full overflow-visible mt-24">
                    <div
                        ref={galleryRef}
                        className="flex flex-row items-center gap-12 px-[10vw] md:px-[20vw]"
                    >
                        {[1, 2, 3, 4, 5].map((num, idx) => (
                            <motion.div
                                key={num}
                                ref={(el: HTMLDivElement | null) => { imageRefs.current[idx] = el; }}
                                className="relative flex-shrink-0 w-auto h-[60vh] md:h-[70vh] group/img cursor-zoom-in"
                                onClick={() => setSelectedImage(`/scrippo/0${num}.png`)}
                            >
                                <div className="h-full relative inline-block">
                                    <img
                                        src={`/scrippo/0${num}.png`}
                                        alt={`Scrippo Interface ${num}`}
                                        className="h-full w-auto object-contain block"
                                    />
                                    {/* Tasteful Expand Button - Top Right, Forced on top */}
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
                            </motion.div>
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
                                className="absolute top-0 right-0 p-4 text-white hover:text-white/70 transition-colors"
                                onClick={() => setSelectedImage(null)}
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
