"use client";

import React from "react";

interface SectionTransitionProps {
    children: React.ReactNode;
}

export function SectionTransition({ children }: SectionTransitionProps) {
    const childrenArray = React.Children.toArray(children);

    if (childrenArray.length !== 2) {
        return <>{children}</>;
    }

    return (
        /*
         * Outer: fills the full viewport height, scrolls horizontally
         * with scroll-snap so each panel snaps into place.
         */
        <div
            style={{
                display: "flex",
                width: "100vw",
                height: "100vh",
                overflowX: "scroll",
                overflowY: "hidden",
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
            }}
        >
            {/* Panel 1: Case Studies — full viewport, scrolls vertically inside */}
            <div
                style={{
                    flex: "0 0 100vw",
                    width: "100vw",
                    height: "100vh",
                    overflowY: "auto",
                    overflowX: "hidden",
                    scrollSnapAlign: "start",
                }}
            >
                {childrenArray[0]}
            </div>

            {/* Panel 2: Creative Management — full viewport, scrolls vertically inside */}
            <div
                style={{
                    flex: "0 0 100vw",
                    width: "100vw",
                    height: "100vh",
                    overflowY: "auto",
                    overflowX: "hidden",
                    scrollSnapAlign: "start",
                }}
            >
                {childrenArray[1]}
            </div>
        </div>
    );
}
