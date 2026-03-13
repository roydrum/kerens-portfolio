"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ILLUSTRATIONS_INTRO, ILLUSTRATION_ITEMS } from "@/lib/illustrations";

gsap.registerPlugin(ScrollTrigger);

// Mobile carousel: each slide width so center is main, sides show peek of prev/next
const SLIDE_WIDTH_VW = 78;
const PEEK_VW = (100 - SLIDE_WIDTH_VW) / 2; // ~11vw each side

export function Illustrations() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const introRef = useRef<HTMLParagraphElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const check = () => setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

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

    const N = ILLUSTRATION_ITEMS.length;

    // Update active index from horizontal scroll (mobile carousel)
    useEffect(() => {
        const el = carouselRef.current;
        if (!isMobile || N <= 1 || !el) return;

        const onScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = el;
            const maxScroll = scrollWidth - clientWidth;
            if (maxScroll <= 0) {
                setActiveIndex(0);
                return;
            }
            const progress = scrollLeft / maxScroll;
            const index = Math.round(progress * (N - 1));
            setActiveIndex(Math.min(index, N - 1));
        };

        onScroll();
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, [isMobile, N]);

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
                    <>
                        {/* Mobile: horizontal carousel — swipe to see next/prev, center image with peeks */}
                        {isMobile && (
                            <div className="relative -mx-6 md:mx-0">
                                <div
                                    ref={carouselRef}
                                    className="flex overflow-x-auto overflow-y-hidden gap-4 snap-x snap-mandatory scroll-smooth py-4 px-4 md:px-0"
                                    style={{
                                        paddingLeft: `max(1rem, ${PEEK_VW}vw)`,
                                        paddingRight: `max(1rem, ${PEEK_VW}vw)`,
                                        WebkitOverflowScrolling: "touch",
                                    }}
                                >
                                    {ILLUSTRATION_ITEMS.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex-shrink-0 snap-center snap-always cursor-zoom-in flex flex-col items-center"
                                            style={{ width: `${SLIDE_WIDTH_VW}vw`, minWidth: `${SLIDE_WIDTH_VW}vw` }}
                                            onClick={() => setSelectedImage(item.src)}
                                        >
                                            <div className="relative w-full aspect-[3/4] max-h-[70vh] flex items-center justify-center">
                                                <img
                                                    src={item.src}
                                                    alt={item.caption || `Illustration ${i + 1}`}
                                                    loading={i < 4 ? "eager" : "lazy"}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            {item.caption ? (
                                                <p className="text-white/70 text-sm mt-2 text-center line-clamp-2">{item.caption}</p>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center pt-2 pb-4">
                                    <span
                                        className="text-white/60 text-sm tabular-nums"
                                        style={{ fontFamily: "var(--font-din-condensed)" }}
                                    >
                                        {activeIndex + 1} / {N}
                                    </span>
                                </div>
                            </div>
                        )}
                        {/* Desktop: Pinterest-style hive gallery */}
                        {!isMobile && (
                            <div className="hive-gallery">
                                {ILLUSTRATION_ITEMS.map((item, i) => (
                                    <div
                                        key={i}
                                        className="hive-cell cursor-zoom-in group/img"
                                        onClick={() => setSelectedImage(item.src)}
                                    >
                                        <img
                                            src={item.src}
                                            alt={item.caption || `Illustration ${i + 1}`}
                                            loading="lazy"
                                            className="transition-transform duration-500 group-hover/img:scale-[1.05]"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
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
                                alt="Illustration Large"
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
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
        </section>
    );
}
