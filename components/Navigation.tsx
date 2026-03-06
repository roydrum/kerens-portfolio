"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MENU_LINKS = [
    {
        category: "Case Studies",
        href: "/#case-studies",
        items: [
            { label: "Vimeo", href: "/case-studies/vimeo-create" },
            { label: "Wolt", href: "/case-studies/wolt" },
            { label: "Flo", href: "/case-studies/flo" },
            { label: "Bitpanda", href: "/case-studies/bitpanda" },
        ],
    },
    {
        category: "Creative Management",
        href: "/#creative-management",
        items: [
            { label: "BAU paid social", href: "/#creative-management" },
            { label: "Summer 2023", href: "/creative-management/summer-2023" },
            { label: "Back to school", href: "/creative-management/back-to-school" },
            { label: "Production", href: "/creative-management/productions" },
        ],
    },
    {
        isSingle: true,
        label: "Scrippo",
        href: "/#scrippo",
    },
    {
        isSingle: true,
        label: "Illustrations",
        href: "/#illustrations",
    },
    {
        isSingle: true,
        label: "CV",
        href: "/cv",
    },
    {
        isSingle: true,
        label: "Contact",
        href: "/#contact-section",
    },
];

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const pathname = usePathname();
    const isHomePage = pathname === "/";

    const menuRef = useRef<HTMLElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // SVG Line Refs for the 2-line burger to X animation
    const line1Ref = useRef<SVGLineElement>(null);
    const line2Ref = useRef<SVGLineElement>(null);

    // Timeline for open/close animation
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // 1. ScrollTrigger to show/hide the hamburger button (only on Homepage)
    useEffect(() => {
        if (!isHomePage) {
            // If not on homepage, always show the button
            setIsVisible(true);
            return;
        }

        const caseStudiesSection = document.getElementById("case-studies");
        if (!caseStudiesSection || !buttonRef.current) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: caseStudiesSection,
                start: "top 20%", // When the top of Case Studies hits 20% down the viewport
                onEnter: () => setIsVisible(true),
                onLeaveBack: () => setIsVisible(false),
            });
        });

        return () => ctx.revert();
    }, [isHomePage]);

    // 2. Setup the GSAP Timeline for opening the menu
    useEffect(() => {
        if (!panelRef.current || !overlayRef.current || !line1Ref.current || !line2Ref.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ paused: true });

            // Turn burger into X
            tl.to(line1Ref.current, { y: 6, rotation: 45, transformOrigin: "50% 50%", duration: 0.3, ease: "power2.inOut" }, 0);
            tl.to(line2Ref.current, { y: -6, rotation: -45, transformOrigin: "50% 50%", duration: 0.3, ease: "power2.inOut" }, 0);

            // Fade in overlay
            tl.to(overlayRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.4, ease: "power2.out" }, 0);

            // Slide in panel
            tl.to(panelRef.current, { x: "0%", duration: 0.6, ease: "power4.out" }, 0);

            // Stagger nav groups/links
            const groups = gsap.utils.toArray(".nav-group");
            tl.fromTo(groups,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
                0.3
            );

            tlRef.current = tl;
        }, menuRef);

        return () => ctx.revert();
    }, []);

    // 3. Play or reverse the timeline based on state
    useEffect(() => {
        if (tlRef.current) {
            if (isOpen) {
                tlRef.current.play();
                document.body.style.overflow = "hidden"; // Prevent background scrolling
            } else {
                tlRef.current.reverse();
                document.body.style.overflow = "";
            }
        }
    }, [isOpen]);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // If it's a hash link on the current page, handle it manually for better reliability
        if (href.includes("#") && (href.startsWith("/#") || href.startsWith("#"))) {
            const targetId = href.split("#")[1];
            const isSamePage = pathname === "/" || href.startsWith("#");

            if (isSamePage) {
                e.preventDefault();
                setIsOpen(false);

                // Small delay to allow menu animation to start closing
                setTimeout(() => {
                    const element = document.getElementById(targetId);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                }, 100);
                return;
            }
        }
        setIsOpen(false);
    };

    return (
        <nav ref={menuRef} className="z-[100] relative">

            {/* Hamburger Button */}
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-6 right-6 md:top-8 md:right-12 z-[110] w-12 h-12 rounded-full flex items-center justify-center bg-[#ef4444] border border-white/20 shadow-xl transition-all duration-500"
                style={{
                    opacity: isVisible || isOpen ? 1 : 0,
                    pointerEvents: isVisible || isOpen ? "auto" : "none",
                    transform: isVisible || isOpen ? "translateY(0)" : "translateY(-20px)"
                }}
                aria-label="Toggle Menu"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <line ref={line1Ref} x1="4" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line ref={line2Ref} x1="4" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            {/* Dark Overlay mapped over entire screen to dismiss on click */}
            <div
                ref={overlayRef}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-[101] bg-black/40 backdrop-blur-sm pointer-events-none"
                style={{ opacity: 0 }}
            />

            {/* Slide-out Panel */}
            <div
                ref={panelRef}
                className="fixed top-0 right-0 bottom-0 z-[105] w-full md:w-[400px] h-[100dvh] bg-[#ef4444] shadow-2xl flex flex-col pt-24 px-10 md:px-12 pb-6 overflow-y-auto"
                style={{ transform: "translateX(100%)" }}
                role="dialog"
                aria-modal="true"
            >
                <div className="flex flex-col gap-3">
                    {MENU_LINKS.map((group, idx) => (
                        <div key={idx} className="nav-group flex flex-col gap-0.5">
                            {group.isSingle ? (
                                <Link
                                    href={group.href || "#"}
                                    onClick={(e) => handleLinkClick(e, group.href || "#")}
                                    className="text-white text-xl md:text-2xl font-bold hover:text-white/70 transition-colors inline-block uppercase mb-1"
                                    style={{ fontFamily: "var(--font-din-condensed)", letterSpacing: "0.02em" }}
                                >
                                    {group.label}
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={group.href || "#"}
                                        onClick={(e) => handleLinkClick(e, group.href || "#")}
                                        className="text-white text-xl md:text-2xl font-bold hover:text-white/70 transition-colors inline-block uppercase mb-1"
                                        style={{ fontFamily: "var(--font-din-condensed)", letterSpacing: "0.02em" }}
                                    >
                                        {group.category}
                                    </Link>
                                    <ul className="flex flex-col gap-1.5 pl-3 border-l-[1.5px] border-white/20">
                                        {group.items?.map((item, itemIdx) => (
                                            <li key={itemIdx}>
                                                <Link
                                                    href={item.href}
                                                    onClick={(e) => handleLinkClick(e, item.href)}
                                                    className="text-white/80 text-lg md:text-xl font-medium hover:text-white transition-colors inline-block"
                                                    style={{ fontFamily: "var(--font-din-condensed)", letterSpacing: "0.02em" }}
                                                >
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </nav>
    );
}
