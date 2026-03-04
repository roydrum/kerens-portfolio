"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionTransitionProps {
    children: React.ReactNode;
}

export function SectionTransition({ children }: SectionTransitionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [childrenArray, setChildrenArray] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        setChildrenArray(React.Children.toArray(children));
    }, [children]);

    useEffect(() => {
        if (!wrapperRef.current || childrenArray.length !== 2) return;

        const sections = gsap.utils.toArray<HTMLElement>(wrapperRef.current.children);
        if (sections.length !== 2) return;

        const section1 = sections[0]; // Case Studies
        const section2 = sections[1]; // Creative Management

        // Initial setup for the horizontal layout
        gsap.set(section1, { width: "100%", x: "0%" });
        gsap.set(section2, { width: "100%", x: "100%", position: "absolute", top: 0, left: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${window.innerWidth}`, // Scroll duration equals screen width
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                // Adjust z-index during pin if needed
                onEnter: () => gsap.set(containerRef.current, { zIndex: 50 }),
                onLeave: () => gsap.set(containerRef.current, { zIndex: 1 }),
                onEnterBack: () => gsap.set(containerRef.current, { zIndex: 50 }),
                onLeaveBack: () => gsap.set(containerRef.current, { zIndex: 1 }),
            }
        });

        // The horizontal transition animation
        tl.to(section1, { x: "-100%", ease: "none" }, 0)
            .to(section2, { x: "0%", ease: "none" }, 0);

        return () => {
            tl.kill();
        };
    }, [childrenArray]);

    return (
        <div ref={containerRef} className="relative w-full overflow-hidden bg-[#ef4444]">
            <div ref={wrapperRef} className="relative flex w-full h-full">
                {children}
            </div>
        </div>
    );
}
