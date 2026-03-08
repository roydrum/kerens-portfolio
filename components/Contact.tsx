"use client";

import { useState } from "react";

export function Contact() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "virus" | "quota">("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                setErrorMessage(result.error || "Something went wrong");
                if (response.status === 429) setStatus("quota");
                else if (result.error === "Virus detected in attachment") setStatus("virus");
                else setStatus("error");
                return;
            }

            setStatus("success");
            setErrorMessage(null);
            setTimeout(() => {
                setStatus("idle");
                (e.target as HTMLFormElement).reset();
            }, 5000);
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
        }
    };


    const handleCVClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // We now route to the new CV page instead of requiring an immediate PDF drop
    };

    return (
        <section id="contact-section" className="relative z-[70] w-full bg-[#ef4444] border-t border-white/10 pt-20 pb-24 md:pt-32 md:pb-32 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">

                {/* Left Column: Contact Info */}
                <div className="flex-1 shrink-0 flex flex-col items-start">
                    <h2
                        className="text-white text-7xl md:text-8xl lg:text-[10rem] font-bold uppercase tracking-tight leading-[0.85] mb-8"
                        style={{ fontFamily: "var(--font-din-condensed)", letterSpacing: "-0.02em" }}
                    >
                        Say<br />Hello.
                    </h2>

                    <p className="text-white/70 text-lg md:text-xl font-medium mb-12 max-w-sm" style={{ fontFamily: "var(--font-geist-sans)" }}>
                        Got a project in mind, need a creative strategist, or just want to chat? Reach out!
                    </p>

                    <div className="flex flex-col gap-8 w-full">
                        {/* Direct Contacts */}
                        <div className="flex flex-col gap-4">
                            <a
                                href="mailto:kerenboshi@gmail.com"
                                className="text-white/60 hover:text-white transition-colors text-xl flex items-center gap-3 w-fit"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                kerenboshi@gmail.com
                            </a>
                            <a
                                href="https://linkedin.com/in/kerenboshi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/60 hover:text-[#0077b5] transition-colors text-xl flex items-center gap-3 w-fit"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                Linkedin
                            </a>
                        </div>

                        {/* CV View Button */}
                        <div className="flex flex-col items-center group mt-4 w-fit">
                            <a
                                href="/cv"
                                className="inline-flex items-center justify-center gap-2 bg-white text-[#ef4444] px-8 py-4 pt-5 rounded-full font-bold text-xl hover:bg-[#0a0a0a] hover:text-white transition-all duration-300 w-full sm:w-auto shadow-sm uppercase"
                                style={{ fontFamily: "var(--font-din-condensed)", letterSpacing: "0.05em" }}
                            >
                                View CV
                                <svg
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    className="group-hover:translate-x-1 transition-transform duration-300 shrink-0"
                                    style={{ width: "1.2em", height: "1.2em", transform: "translateY(-0.15em)" }}
                                >
                                    <path
                                        d="M6 4L10 8L6 12"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>
                            <a
                                href="/keren_boshi_cv.pdf"
                                target="_blank"
                                className="text-white/80 hover:text-white text-sm tracking-wider mt-3 transition-colors text-center w-full"
                                style={{ fontFamily: "var(--font-geist-sans)" }}
                            >
                                Download CV
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="flex-[1.5] w-full bg-[#e33737] p-8 md:p-12 rounded-3xl border border-white/10 shadow-lg">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name Input */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-white/60 text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-din-condensed)" }}>Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="bg-transparent border-b border-white/20 pb-2 text-white text-lg placeholder:text-white/40 focus:outline-none focus:border-white transition-all duration-300 autofill:shadow-[0_0_0_1000px_#e33737_inset] autofill:text-white placeholder:transition-opacity focus:placeholder:opacity-0"
                                    placeholder="Jane Doe"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-white/60 text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-din-condensed)" }}>Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="bg-transparent border-b border-white/20 pb-2 text-white text-lg placeholder:text-white/40 focus:outline-none focus:border-white transition-all duration-300 autofill:shadow-[0_0_0_1000px_#e33737_inset] autofill:text-white placeholder:transition-opacity focus:placeholder:opacity-0"
                                    placeholder="jane@example.com"
                                />
                            </div>
                        </div>

                        {/* Subject Input */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="subject" className="text-white/60 text-sm font-semibold uppercase tracking-wider mt-4" style={{ fontFamily: "var(--font-din-condensed)" }}>Subject *</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                className="bg-transparent border-b border-white/20 pb-2 text-white text-lg placeholder:text-white/40 focus:outline-none focus:border-white transition-all duration-300 placeholder:transition-opacity focus:placeholder:opacity-0"
                                placeholder="What's this about?"
                            />
                        </div>

                        {/* Message Input */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-white/60 text-sm font-semibold uppercase tracking-wider mt-4" style={{ fontFamily: "var(--font-din-condensed)" }}>Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={4}
                                className="bg-transparent border-b border-white/20 pb-2 text-white text-lg placeholder:text-white/40 focus:outline-none focus:border-white transition-all duration-300 resize-none placeholder:transition-opacity focus:placeholder:opacity-0"
                                placeholder="Tell me more..."
                            />
                        </div>


                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={status === "submitting" || status === "success"}
                            className="mt-6 flex justify-center items-center bg-white text-[#ef4444] px-6 py-3 rounded-full font-bold text-lg hover:bg-[#0a0a0a] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase shadow-sm w-full sm:w-auto"
                            style={{ fontFamily: "var(--font-din-condensed)", letterSpacing: "0.05em" }}
                        >
                            {status === "idle" && "Send Message"}
                            {status === "submitting" && "Sending..."}
                            {status === "success" && "Message Sent!"}
                            {status === "virus" && "Virus Detected!"}
                            {status === "quota" && "Capacity Reached"}
                            {status === "error" && (errorMessage ? errorMessage : "Error - Try Again")}
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
}
