"use client";

import { useState, useEffect, useRef, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { CASE_STUDIES } from "@/lib/caseStudies";

gsap.registerPlugin(ScrollTrigger);

function VideoPlayer({
    src,
    views,
    caption,
    onClick,
}: {
    src: string;
    views: string;
    caption?: string;
    onClick?: () => void;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(false);

    // Derived poster path
    const poster = src.includes('/videos/')
        ? src.replace('/videos/', '/videos/').split('/').slice(0, -1).join('/') + '/posters/' + src.split('/').pop()?.replace('.mp4', '.jpg')
        : undefined;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" }
        );

        if (videoRef.current) observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, [src]);

    // Autoplay once the src is set and metadata is ready
    useEffect(() => {
        if (!isInView) return;
        const v = videoRef.current;
        if (!v) return;
        const tryPlay = () => { v.muted = true; v.play().catch(() => {}); };
        if (v.readyState >= 1) {
            tryPlay();
        } else {
            v.addEventListener("loadedmetadata", tryPlay, { once: true });
        }
    }, [isInView]);

    const handleMouseEnter = () => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = false;
    };

    const handleMouseLeave = () => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = true;
    };

    return (
        <div className="h-full">
            <div
                className="relative h-full overflow-hidden rounded-xl cursor-zoom-in bg-white/5"
                style={{
                    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
            >
                <video
                    ref={videoRef}
                    src={isInView ? src : undefined}
                    poster={poster}
                    muted
                    loop
                    playsInline
                    preload={isInView ? "metadata" : "none"}
                    className="w-full block transition-opacity duration-500"
                    style={{
                        aspectRatio: "9/16",
                        objectFit: "cover",
                        opacity: isInView ? 1 : 0.5
                    }}
                />
                {/* View count badge */}
                <div
                    className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{
                        background: "rgba(0,0,0,0.5)",
                        backdropFilter: "blur(8px)",
                        color: "white",
                    }}
                >
                    {views}
                </div>
            </div>
        </div>
    );
}

export default function CaseStudyPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    const { slug } = use(params);
    const study = CASE_STUDIES.find((s) => s.slug === slug);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Header animation
            if (headerRef.current) {
                gsap.fromTo(
                    headerRef.current,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        delay: 0.1,
                    }
                );
            }

            // Content sections stagger in
            contentRefs.current.forEach((el) => {
                if (!el) return;
                gsap.fromTo(
                    el,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    if (!study || !study.detail) {
        notFound();
    }

    const { detail } = study;

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen"
            style={{ background: "#ef4444" }}
        >
            {/* Back link */}
            <div className="mx-auto max-w-[1200px] px-6 md:px-12 pt-8">
                <Link
                    href="/#case-studies"
                    className="inline-flex items-center gap-2 text-white text-sm uppercase tracking-wider hover:text-white/80 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-din-condensed)" }}
                >
                    <svg viewBox="0 0 16 16" fill="none" style={{ width: "1em", height: "1em", transform: "translateY(-0.15em)" }}>
                        <path
                            d="M10 12L6 8L10 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Back to Case Studies
                </Link>
            </div>

            {/* Header */}
            <div
                ref={headerRef}
                className="mx-auto max-w-[1200px] px-6 md:px-12 pt-10 pb-12"
                style={{ opacity: 0 }}
            >
                <span
                    className="text-white/25 font-bold leading-none block mb-4"
                    style={{
                        fontFamily: "var(--font-din-condensed)",
                        fontSize: "clamp(3rem, 6vw, 5rem)",
                    }}
                >
                    {study.number}
                </span>
                <h1
                    className="text-white font-bold uppercase tracking-tight leading-[0.9] mb-3"
                    style={{
                        fontFamily: "var(--font-din-condensed)",
                        fontSize: "clamp(2.5rem, 7vw, 6rem)",
                    }}
                >
                    {study.client}
                </h1>
                <h2
                    className="text-white/60 font-bold uppercase tracking-tight leading-[1.1]"
                    style={{
                        fontFamily: "var(--font-din-condensed)",
                        fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                    }}
                >
                    {study.title}
                </h2>
            </div>

            {/* Content grid */}
            <div className="mx-auto max-w-[1200px] px-6 md:px-12 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                    {/* Context */}
                    <div
                        ref={(el) => { contentRefs.current[0] = el; }}
                        style={{ opacity: 0 }}
                    >
                        <h3
                            className="text-white font-bold uppercase tracking-tight mb-4"
                            style={{
                                fontFamily: "var(--font-din-condensed)",
                                fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                            }}
                        >
                            Context
                        </h3>
                        <p className="text-white/70 text-sm md:text-base leading-relaxed">
                            {detail.context}
                        </p>
                    </div>

                    {/* What I did */}
                    <div
                        ref={(el) => { contentRefs.current[1] = el; }}
                        style={{ opacity: 0 }}
                    >
                        <h3
                            className="text-white font-bold uppercase tracking-tight mb-4"
                            style={{
                                fontFamily: "var(--font-din-condensed)",
                                fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                            }}
                        >
                            What I Did
                        </h3>
                        <ul className="space-y-2">
                            {detail.whatIDid.map((item, i) => (
                                <li
                                    key={i}
                                    className="text-white/70 text-sm md:text-base leading-relaxed flex items-start gap-3"
                                >
                                    <span className="text-white/30 mt-1 shrink-0">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Strategy */}
                    <div
                        ref={(el) => { contentRefs.current[2] = el; }}
                        style={{ opacity: 0 }}
                    >
                        <h3
                            className="text-white font-bold uppercase tracking-tight mb-4"
                            style={{
                                fontFamily: "var(--font-din-condensed)",
                                fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                            }}
                        >
                            Strategy
                        </h3>
                        <p className="text-white/70 text-sm md:text-base leading-relaxed">
                            {detail.strategy}
                        </p>
                    </div>
                </div>
            </div>

            {/* Results - full width horizontal */}
            <div
                ref={(el) => { contentRefs.current[3] = el; }}
                className="mx-auto max-w-[1200px] px-6 md:px-12 pb-20"
                style={{ opacity: 0 }}
            >
                <div
                    className="h-[1px] w-full mb-12"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                />
                <h3
                    className="text-white font-bold uppercase tracking-tight mb-10"
                    style={{
                        fontFamily: "var(--font-din-condensed)",
                        fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                    }}
                >
                    Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {detail.results.map((r, i) => (
                        <div key={i}>
                            <span
                                className="text-white font-bold block leading-none mb-2"
                                style={{
                                    fontFamily: "var(--font-din-condensed)",
                                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                                }}
                            >
                                {r.stat}
                            </span>
                            <span className="text-white/50 text-sm md:text-base">
                                {r.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* All videos */}
            {(detail.heroVideo || (detail.iterationVideos && detail.iterationVideos.length > 0)) && (
                <div
                    ref={(el) => { contentRefs.current[4] = el; }}
                    className="mx-auto max-w-[1200px] px-6 md:px-12 pb-20"
                    style={{ opacity: 0 }}
                >
                    <div
                        className="h-[1px] w-full mb-12"
                        style={{ background: "rgba(255,255,255,0.15)" }}
                    />
                    <h3
                        className="text-white font-bold uppercase tracking-tight mb-10"
                        style={{
                            fontFamily: "var(--font-din-condensed)",
                            fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                        }}
                    >
                        Assets
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {detail.heroVideo && (
                            <VideoPlayer {...detail.heroVideo} onClick={() => setSelectedAsset(detail.heroVideo!.src)} />
                        )}
                        {detail.iterationVideos?.map((vid, i) => (
                            <VideoPlayer key={i} {...vid} onClick={() => setSelectedAsset(vid.src)} />
                        ))}
                    </div>
                </div>
            )}

            {/* Strategy Deck Slides */}
            {detail.deck && (
                <div
                    ref={(el) => { contentRefs.current[5] = el; }}
                    className="mx-auto max-w-[1200px] px-6 md:px-12 pb-20"
                    style={{ opacity: 0 }}
                >
                    <div
                        className="h-[1px] w-full mb-12"
                        style={{ background: "rgba(255,255,255,0.15)" }}
                    />
                    <h3
                        className="text-white font-bold uppercase tracking-tight mb-4"
                        style={{
                            fontFamily: "var(--font-din-condensed)",
                            fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                        }}
                    >
                        Strategy Deck
                    </h3>
                    <p className="text-white/50 text-sm mb-8">{detail.deck.label}</p>
                    <div className="flex gap-5 overflow-x-auto pb-4" style={{ scrollSnapType: "x mandatory" }}>
                        {detail.deck.slides.map((slide, i) => (
                            <div
                                key={i}
                                className="shrink-0 rounded-lg overflow-hidden"
                                style={{
                                    width: "min(80vw, 600px)",
                                    scrollSnapAlign: "start",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                                }}
                            >
                                <img
                                    src={slide}
                                    alt={`Strategy deck slide ${i + 1}`}
                                    className="w-full h-auto block"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Bottom back link */}
            <div className="mx-auto max-w-[1200px] px-6 md:px-12 pb-16">
                <Link
                    href="/#case-studies"
                    className="inline-flex items-center gap-2 text-white text-sm uppercase tracking-wider hover:text-white/80 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-din-condensed)" }}
                >
                    <svg viewBox="0 0 16 16" fill="none" style={{ width: "1em", height: "1em", transform: "translateY(-0.15em)" }}>
                        <path
                            d="M10 12L6 8L10 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Back to Case Studies
                </Link>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedAsset && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                        onClick={() => setSelectedAsset(null)}
                    >
                        <motion.div
                            className="relative w-full h-full flex items-center justify-center"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            {selectedAsset.endsWith('.mp4') ? (
                                <video
                                    src={selectedAsset}
                                    autoPlay
                                    muted={false}
                                    loop
                                    controls
                                    className="max-w-full max-h-full rounded-lg shadow-2xl"
                                />
                            ) : (
                                <img
                                    src={selectedAsset}
                                    alt="Asset Large"
                                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                />
                            )}
                            <button
                                className="absolute top-4 right-4 p-4 text-white hover:text-white/70 transition-colors"
                                onClick={() => setSelectedAsset(null)}
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
