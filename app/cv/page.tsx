"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CVPage() {
    return (
        <main className="min-h-screen bg-[#f8f8f8] text-[#0a0a0a] pt-24 pb-32 px-6 md:px-12 lg:px-24">
            {/* Back to Home Navigation */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-7xl mx-auto mb-12"
            >
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[#0a0a0a]/60 hover:text-[#0a0a0a] group transition-colors uppercase tracking-wider text-sm font-semibold"
                    style={{ fontFamily: "var(--font-din-condensed)" }}
                >
                    <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="group-hover:-translate-x-1 transition-transform duration-300 shrink-0"
                        style={{ width: "1.1em", height: "1.1em", transform: "translateY(-0.15em)" }}
                    >
                        <path
                            d="M10 12L6 8L10 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Back to Home
                </Link>
            </motion.div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0 rounded-3xl overflow-hidden border border-black/10 shadow-2xl">

                {/* Left Sidebar (Red Section in Original CV) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full lg:w-[320px] xl:w-[380px] bg-[#ef4444] text-white p-10 flex flex-col shrink-0"
                >
                    <div className="mb-12">
                        <h1
                            className="text-6xl uppercase font-bold leading-[0.85] tracking-tight mb-2"
                            style={{ fontFamily: "var(--font-din-condensed)" }}
                        >
                            Keren<br />Boshi Messiah
                        </h1>
                        <p className="text-white/90 text-xl font-medium" style={{ fontFamily: "var(--font-geist-sans)" }}>
                            Creative Strategy
                        </p>
                        <p className="text-white/80 text-sm mt-1">
                            Creative Production, Multi-market Campaigns, GenAI Workflows
                        </p>
                    </div>

                    <div className="mb-12 rounded-full overflow-hidden w-48 h-48 border-4 border-[#e03a3a] shadow-inner self-start relative">
                        <Image
                            src="/keren-cv-profile.png"
                            alt="Keren Boshi Messiah"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 192px, 192px"
                            priority
                        />
                    </div>

                    <div className="flex flex-col gap-8 flex-1">

                        {/* Contact Info */}
                        <div className="flex flex-col gap-2 text-white">
                            <a href="tel:+972506918143" className="hover:text-white/80 transition-colors">+972 506918143</a>
                            <a href="mailto:kerenboshi@gmail.com" className="hover:text-white/80 transition-colors">kerenboshi@gmail.com</a>
                            <p>Berlin</p>
                        </div>

                        {/* Download Button (Prominent in sidebar) */}
                        <div className="mt-8">
                            <a
                                href="/keren_boshi_cv.pdf"
                                target="_blank"
                                className="group inline-flex items-center justify-center gap-2 bg-white text-[#ef4444] px-6 py-3 rounded-full font-bold text-lg hover:bg-[#0a0a0a] hover:text-white transition-all duration-300 w-full shadow-sm uppercase"
                                style={{ fontFamily: "var(--font-din-condensed)", letterSpacing: "0.05em" }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                Download PDF
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Right Main Content Area */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="flex-1 bg-white p-8 md:p-12 lg:p-16 flex flex-col gap-12"
                >
                    {/* Summary */}
                    <section>
                        <h2 className="text-[#ef4444] text-xl font-bold uppercase tracking-wider mb-4 border-b border-black/10 pb-2" style={{ fontFamily: "var(--font-din-condensed)" }}>
                            Summary
                        </h2>
                        <p className="text-[#0a0a0a]/70 leading-relaxed text-sm md:text-base">
                            Senior Creative Strategist with 10+ years in design and marketing and deep experience leading multi-market creative production for global brands. Managed teams of up to 20 across strategy, motion, and design, owning end-to-end processes from concept and scripting through production, post-production, iteration, and performance optimization. Strong cross-functional partner to marketing and client teams. Built a Cursor-developed GenAI tool for marketers that catalogs creative references and accelerates UGC script writing and creative development.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Core Strengths */}
                        <section>
                            <h2 className="text-[#ef4444] text-xl font-bold uppercase tracking-wider mb-4 border-b border-black/10 pb-2" style={{ fontFamily: "var(--font-din-condensed)" }}>
                                Core Strengths
                            </h2>
                            <ul className="flex flex-col gap-4 text-sm md:text-base">
                                <li className="flex gap-3">
                                    <span className="text-[#ef4444] mt-1">✦</span>
                                    <div>
                                        <strong className="text-[#0a0a0a] block">Creative leadership</strong>
                                        <span className="text-[#0a0a0a]/60">Concept-to-production ownership, quality bar, brand consistency</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-[#ef4444] mt-1">✦</span>
                                    <div>
                                        <strong className="text-[#0a0a0a] block">Multi-market systems</strong>
                                        <span className="text-[#0a0a0a]/60">Scalable processes, localization-ready frameworks, high-volume delivery</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-[#ef4444] mt-1">✦</span>
                                    <div>
                                        <strong className="text-[#0a0a0a] block">Performance creative</strong>
                                        <span className="text-[#0a0a0a]/60">CTR, view-through rate, conversion-focused iteration loops</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-[#ef4444] mt-1">✦</span>
                                    <div>
                                        <strong className="text-[#0a0a0a] block">Team leadership</strong>
                                        <span className="text-[#0a0a0a]/60">Hiring, org scaling, mentoring, structured feedback and development</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-[#ef4444] mt-1">✦</span>
                                    <div>
                                        <strong className="text-[#0a0a0a] block">GenAI workflows and product building</strong>
                                        <span className="text-[#0a0a0a]/60">Cursor-based tool development, user onboarding, iteration</span>
                                    </div>
                                </li>
                            </ul>
                        </section>

                        {/* Tools */}
                        <section>
                            <h2 className="text-[#ef4444] text-xl font-bold uppercase tracking-wider mb-4 border-b border-black/10 pb-2" style={{ fontFamily: "var(--font-din-condensed)" }}>
                                Tools
                            </h2>
                            <div className="flex flex-col gap-6 text-sm md:text-base">
                                <div>
                                    <strong className="text-[#0a0a0a] block mb-2">Hands on</strong>
                                    <ul className="text-[#0a0a0a]/60 space-y-1">
                                        <li>Photoshop (expert)</li>
                                        <li>Illustrator (expert)</li>
                                        <li>ChatGPT</li>
                                        <li>Cursor</li>
                                    </ul>
                                </div>
                                <div>
                                    <strong className="text-[#0a0a0a] block mb-2">Workflow leadership</strong>
                                    <ul className="text-[#0a0a0a]/60 space-y-1">
                                        <li>After Effects / Premiere Pro / Figma</li>
                                        <li className="text-[#0a0a0a]/40 italic text-sm">(directed teams using these tools)</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Experience Timeline */}
                    <section>
                        <h2 className="text-[#ef4444] text-xl font-bold uppercase tracking-wider mb-6 border-b border-black/10 pb-2" style={{ fontFamily: "var(--font-din-condensed)" }}>
                            Experience
                        </h2>

                        <div className="flex flex-col gap-10">

                            {/* Foap */}
                            <div className="relative pl-6 border-l border-black/10 before:absolute before:left-[-5px] before:top-2 before:w-2.5 before:h-2.5 before:bg-[#ef4444] before:rounded-full">
                                <div className="mb-2 text-[#0a0a0a]/50 text-sm">October 2024 - March 2025</div>
                                <h3 className="text-lg font-bold text-[#0a0a0a]">Foap <span className="text-[#0a0a0a]/60 font-normal">(Poland, remote)</span></h3>
                                <p className="text-[#ef4444] mb-4">Creative Hub Lead (Strategy + Motion + Design)</p>

                                <p className="text-[#0a0a0a]/70 text-sm mb-4">
                                    Led a Creative Hub combining strategy, motion design, and production delivery for multi-market UGC and performance marketing campaigns. Owned creative systems end-to-end from concept and scripting through production, post-production, iteration, and delivery across markets.
                                </p>
                                <ul className="text-[#0a0a0a]/70 text-sm flex flex-col gap-2 list-disc pl-4 mb-4">
                                    <li>Managed and scaled a multi-discipline hub (up to 20) across strategy, motion, and design, setting the creative quality bar, production standards, and feedback culture.</li>
                                    <li>Led strategy and creative development for P&G (Braun, Gillette, Pantene, Oral-B, Clearblue, Head & Shoulders, Old Spice), Wolt (14 markets), Bitpanda (14 markets), and additional EU brands.</li>
                                    <li>Built localization-ready frameworks and performance learning loops to improve CTR, view-through rate, and conversions over time.</li>
                                    <li>Directed execution through design and motion teams (AE/Premiere/Figma), providing creative direction, detailed notes, and QA for platform safety zones and brand consistency.</li>
                                    <li>Partnered closely with client services and stakeholders to align business goals, creative direction, and delivery timelines across markets.</li>
                                </ul>
                                <div className="bg-black/5 p-4 rounded-lg">
                                    <strong className="text-[#0a0a0a] text-sm block mb-1">Selected Impact</strong>
                                    <p className="text-[#0a0a0a]/70 text-sm">Scaled multi-market production across 14 markets while maintaining localized relevance through structured frameworks and testing learnings.</p>
                                </div>
                            </div>

                            {/* HelloFresh */}
                            <div className="relative pl-6 border-l border-black/10 before:absolute before:left-[-5px] before:top-2 before:w-2.5 before:h-2.5 before:bg-[#ef4444] before:rounded-full">
                                <div className="mb-2 text-[#0a0a0a]/50 text-sm">Jan 2023 - October 2024</div>
                                <h3 className="text-lg font-bold text-[#0a0a0a]">HelloFresh <span className="text-[#0a0a0a]/60 font-normal">(Berlin)</span></h3>
                                <p className="text-[#ef4444] mb-4">Lead of Online Creative</p>

                                <p className="text-[#0a0a0a]/70 text-sm mb-4">
                                    Led centralized creative supporting paid social, display, and lifecycle marketing, with focus on production systems and performance iteration.
                                </p>
                                <ul className="text-[#0a0a0a]/70 text-sm flex flex-col gap-2 list-disc pl-4">
                                    <li>Managed designers and project management, improving cross-team collaboration and delivery consistency.</li>
                                    <li>Built structured creative processes and iteration loops to improve ad performance (CTR, view-through, conversion).</li>
                                    <li>Supported scaling through clearer briefing standards, stronger QA, and repeatable creative patterns.</li>
                                </ul>
                            </div>

                            {/* Vimeo */}
                            <div className="relative pl-6 border-l border-black/10 before:absolute before:left-[-5px] before:top-2 before:w-2.5 before:h-2.5 before:bg-[#ef4444] before:rounded-full">
                                <div className="mb-2 text-[#0a0a0a]/50 text-sm">2019 - 2022</div>
                                <h3 className="text-lg font-bold text-[#0a0a0a]">Vimeo <span className="text-[#0a0a0a]/60 font-normal">(Israel)</span></h3>
                                <p className="text-[#ef4444] mb-4">Creative Marketing Manager</p>

                                <p className="text-[#0a0a0a]/70 text-sm mb-4">
                                    Owned social creative development and production for performance marketing, combining concepting, scripting, production coordination, and optimization.
                                </p>
                                <ul className="text-[#0a0a0a]/70 text-sm flex flex-col gap-2 list-disc pl-4 mb-4">
                                    <li>Led designers and animators, supported hiring and onboarding, and managed cross-functional delivery.</li>
                                    <li>Developed platform-native concepts and scripts and guided iterations based on performance insights.</li>
                                </ul>
                                <div className="bg-black/5 p-4 rounded-lg">
                                    <strong className="text-[#0a0a0a] text-sm block mb-1">Selected Impact</strong>
                                    <p className="text-[#0a0a0a]/70 text-sm">Validated demand for an unreleased Vimeo feature – ~50M views and record click volume requesting the feature, influencing product prioritization.</p>
                                </div>
                            </div>

                            {/* 888 Holdings */}
                            <div className="relative pl-6 border-l border-black/10 before:absolute before:left-[-5px] before:top-2 before:w-2.5 before:h-2.5 before:bg-[#ef4444] before:rounded-full">
                                <div className="mb-2 text-[#0a0a0a]/50 text-sm">2014 - 2019</div>
                                <h3 className="text-lg font-bold text-[#0a0a0a]">888 Holdings <span className="text-[#0a0a0a]/60 font-normal">(Israel)</span></h3>
                                <p className="text-[#ef4444] mb-4">Marketing and UI Designer</p>

                                <p className="text-[#0a0a0a]/70 text-sm mb-4">
                                    Designed UX/UI and marketing assets across digital touchpoints, collaborating with conversion and marketing teams.
                                </p>
                                <ul className="text-[#0a0a0a]/70 text-sm flex flex-col gap-2 list-disc pl-4">
                                    <li>Designed UX and UI for web experiences and supported conversion-oriented improvements.</li>
                                    <li>Produced CRM and marketing creative across channels.</li>
                                </ul>
                            </div>

                            {/* Product work */}
                            <div className="relative pl-6 border-l border-black/10 before:absolute before:left-[-5px] before:top-2 before:w-2.5 before:h-2.5 before:bg-[#ef4444] before:rounded-full">
                                <div className="mb-2 text-[#0a0a0a]/50 text-sm">2023 - 2024</div>
                                <h3 className="text-lg font-bold text-[#0a0a0a]">Product work and GenAI</h3>
                                <p className="text-[#ef4444] mb-4">GenAI tool for marketers <span className="text-[#0a0a0a]/60 font-normal italic">(built with Cursor)</span></p>

                                <ul className="text-[#0a0a0a]/70 text-sm flex flex-col gap-2 list-disc pl-4">
                                    <li>Built and designed a tool that helps marketing teams turn inspiration into production-ready UGC scripts.</li>
                                    <li>Collects references shared by marketers (examples and inspirations), analyzes them, and catalogs them into a structured library.</li>
                                    <li>Enables teams to quickly retrieve relevant references by category or need, then supports writing scripts for new UGC ads using the curated reference set.</li>
                                    <li>Reduces time to find relevant references and speeds up UGC concepting + script writing through a searchable, structured library.</li>
                                    <li>Owned the product design and build in Cursor, plus onboarding of an initial client and iteration based on real user feedback.</li>
                                </ul>
                            </div>

                        </div>
                    </section>

                    {/* Education & Languages */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-black/10">
                        <section>
                            <h2 className="text-[#ef4444] text-xl font-bold uppercase tracking-wider mb-4 border-b border-black/10 pb-2" style={{ fontFamily: "var(--font-din-condensed)" }}>
                                Education
                            </h2>
                            <ul className="flex flex-col gap-4 text-sm">
                                <li>
                                    <strong className="text-[#0a0a0a] block">Dr. Eldad Rom</strong>
                                    <span className="text-[#0a0a0a]/60">Managing Skills Course (2020)</span>
                                </li>
                                <li>
                                    <strong className="text-[#0a0a0a] block">UXV - UX Course</strong>
                                    <span className="text-[#0a0a0a]/60">Tel Florentin, John Bryce (2018)</span>
                                </li>
                                <li>
                                    <strong className="text-[#0a0a0a] block">BA in Communication Design</strong>
                                    <span className="text-[#0a0a0a]/60">Holon Institute of Technology (HIT) (2009)<br />Majored in Interactive Design</span>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-[#ef4444] text-xl font-bold uppercase tracking-wider mb-4 border-b border-black/10 pb-2" style={{ fontFamily: "var(--font-din-condensed)" }}>
                                Languages
                            </h2>
                            <ul className="flex flex-col gap-4 text-sm">
                                <li>
                                    <strong className="text-[#0a0a0a] block">Hebrew</strong>
                                    <span className="text-[#0a0a0a]/60">Native</span>
                                </li>
                                <li>
                                    <strong className="text-[#0a0a0a] block">English</strong>
                                    <span className="text-[#0a0a0a]/60">Full professional proficiency</span>
                                </li>
                            </ul>
                        </section>
                    </div>

                </motion.div>

            </div>
        </main>
    );
}
