"use client";

import { CreativeManagement } from "@/components/CreativeManagement";
import Link from "next/link";

export default function CreativeManagementPage() {
    return (
        <main className="min-h-screen bg-[#ef4444] pt-20">
            <div className="mx-auto max-w-[1200px] px-6 md:px-12 mb-8">
                <Link
                    href="/"
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
                    Back to Home
                </Link>
            </div>
            <CreativeManagement />
        </main>
    );
}
