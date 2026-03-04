"use client";

import { useEffect, useRef, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CREATIVE_PROJECTS, CreativeMedia } from "@/lib/creativeManagement";

gsap.registerPlugin(ScrollTrigger);

/* ─── Video Player (reused pattern from case studies) ─── */
function VideoPlayer({ src, caption }: { src: string; caption?: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = false;
        v.play().catch(() => { });
    };

    const handleMouseLeave = () => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = true;
        v.pause();
    };

    return (
        <div>
            <div
                className="relative overflow-hidden rounded-xl cursor-pointer"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <video
                    ref={videoRef}
                    src={src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full block"
                    style={{ aspectRatio: "9/16", objectFit: "cover" }}
                />
            </div>
            {caption && (
                <p className="text-white/50 text-xs mt-3 text-center">{caption}</p>
            )}
        </div>
    );
}

/* ─── Hive Gallery ─── */
function HiveGallery({ media }: { media: CreativeMedia[] }) {
    return (
        <div className="hive-gallery">
            {media.map((item, i) => {
                const isEmpty = !item.src;

                return (
                    <div key={i} className="hive-cell">
                        {isEmpty ? (
                            <div className="hive-placeholder">
                                <div className="hive-placeholder-icon">
                                    {item.type === "video" ? (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                                            <polygon points="5 3 19 12 5 21" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                                            <rect x="3" y="3" width="18" height="18" rx="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <path d="M21 15l-5-5L5 21" />
                                        </svg>
                                    )}
                                </div>
                                {item.caption && (
                                    <span className="text-white/30 text-xs mt-2">{item.caption}</span>
                                )}
                            </div>
                        ) : item.type === "video" ? (
                            <video
                                src={item.src}
                                muted
                                autoPlay
                                loop
                                playsInline
                                preload="metadata"
                                style={{ width: "100%", height: "auto", display: "block" }}
                            />
                        ) : (
                            <img
                                src={item.src}
                                alt={item.caption || `Gallery item ${i + 1}`}
                                style={{ width: "100%", height: "auto", display: "block" }}
                                loading="lazy"
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

/* ─── Video Grid ─── */
function VideoGrid({ media }: { media: CreativeMedia[] }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {media.map((item, i) => {
                const isEmpty = !item.src;

                return isEmpty ? (
                    <div key={i}>
                        <div
                            className="relative overflow-hidden rounded-xl flex flex-col items-center justify-center"
                            style={{
                                aspectRatio: "9/16",
                                background: "rgba(255,255,255,0.06)",
                                border: "1px dashed rgba(255,255,255,0.15)",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                            }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-white/20 mb-3">
                                <polygon points="5 3 19 12 5 21" />
                            </svg>
                            <span className="text-white/20 text-xs">Video placeholder</span>
                        </div>
                        {item.caption && (
                            <p className="text-white/50 text-xs mt-3 text-center">{item.caption}</p>
                        )}
                    </div>
                ) : (
                    <VideoPlayer key={i} src={item.src} caption={item.caption} />
                );
            })}
        </div>
    );
}

/* ─── Detail Page ─── */
export default function CreativeManagementPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    const { slug } = use(params);
    const project = CREATIVE_PROJECTS.find((p) => p.slug === slug);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
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

    if (!project || !project.detail) {
        notFound();
    }

    const { detail } = project;

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen"
            style={{ background: "#ef4444" }}
        >
            {/* Back link */}
            <div className="mx-auto max-w-[1200px] px-6 md:px-12 pt-8">
                <Link
                    href="/#creative-management"
                    className="inline-flex items-center gap-2 text-white/50 text-sm uppercase tracking-wider hover:text-white transition-colors duration-300"
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
                    Back to Creative Management
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
                    {project.number}
                </span>
                <h1
                    className="text-white font-bold uppercase tracking-tight leading-[0.9] mb-3"
                    style={{
                        fontFamily: "var(--font-din-condensed)",
                        fontSize: "clamp(2.5rem, 7vw, 6rem)",
                    }}
                >
                    {project.title}
                </h1>
                <h2
                    className="text-white/60 font-bold uppercase tracking-tight leading-[1.1] mb-6"
                    style={{
                        fontFamily: "var(--font-din-condensed)",
                        fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                    }}
                >
                    {project.subtitle}
                </h2>
                <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-[720px]">
                    {project.summary}
                </p>
            </div>

            {/* Gallery / Video Grid */}
            <div
                ref={(el) => { contentRefs.current[0] = el; }}
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
                    {detail.galleryType === "hive" ? "Gallery" : "Productions"}
                </h3>

                {detail.galleryType === "hive" ? (
                    <HiveGallery media={detail.media} />
                ) : (
                    <VideoGrid media={detail.media} />
                )}
            </div>

            {/* Bottom back link */}
            <div className="mx-auto max-w-[1200px] px-6 md:px-12 pb-16">
                <Link
                    href="/#creative-management"
                    className="inline-flex items-center gap-2 text-white/50 text-sm uppercase tracking-wider hover:text-white transition-colors duration-300"
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
                    Back to Creative Management
                </Link>
            </div>
        </section>
    );
}
