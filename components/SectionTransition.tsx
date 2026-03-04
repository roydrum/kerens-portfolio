"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionTransitionProps {
    children: React.ReactNode;
}

export function SectionTransition({ children }: SectionTransitionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const panel1Ref = useRef<HTMLDivElement>(null);
    const panel2Ref = useRef<HTMLDivElement>(null);

    const [childrenArray, setChildrenArray] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        setChildrenArray(React.Children.toArray(children));
    }, [children]);

    useEffect(() => {
        if (!containerRef.current || !panel1Ref.current || !panel2Ref.current || childrenArray.length !== 2) return;

        const ctx = gsap.context(() => {
            // panel2 starts off-screen to the right
            gsap.set(panel2Ref.current, { xPercent: 100 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: panel1Ref.current,
                    // Pin starts when the bottom of panel1 hits the bottom of the viewport
                    start: "bottom bottom",
                    // The scroll distance over which the wipe occurs
                    end: "+=1500", // A fixed scroll distance for smooth scrubbing
                    scrub: 1,
                    // Pin the overall container to lock vertical scrolling during the wipe
                    pin: containerRef.current,
                    anticipatePin: 1,
                }
            });

            // Slide panel1 out to the left and panel2 in from the right
            tl.to(panel1Ref.current, { xPercent: -100, ease: "none" }, 0)
                .to(panel2Ref.current, { xPercent: 0, ease: "none" }, 0);

            // Cleanup
            return () => {
                tl.kill();
            };
        }, containerRef);

        return () => ctx.revert();
    }, [childrenArray]);

    if (childrenArray.length !== 2) {
        return <>{children}</>;
    }

    return (
        <div ref={containerRef} className="relative w-full overflow-hidden bg-[#ef4444]">
            {/* Child 1: Natively scrolls vertically */}
            <div ref={panel1Ref} className="w-full relative">
                {childrenArray[0]}
            </div>

            {/* Child 2: Pulled up by 100vh so its top perfectly aligns with the top of the viewport
                at the exact time the bottom of panel1 hits the bottom of the viewport. */}
            <div
                ref={panel2Ref}
                className="w-full relative"
                style={{ marginTop: "-100vh", height: "auto", minHeight: "100vh" }}
            >
                {childrenArray[1]}
            </div>
        </div>
    );
}
