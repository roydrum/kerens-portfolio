"use client";

import { useState } from "react";

export function Contact() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [fileName, setFileName] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        // Simulate network request since we don't have a backend yet
        setTimeout(() => {
            setStatus("success");
            // Reset after showing success state
            setTimeout(() => {
                setStatus("idle");
                (e.target as HTMLFormElement).reset();
                setFileName(null);
            }, 3000);
        }, 1500);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName(null);
        }
    };

    const handleCVClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // If href points to a non-existent file, alert the user so they know to upload it
        if ((e.currentTarget.getAttribute("href") || "").startsWith("#")) {
            e.preventDefault();
            alert("Please upload your CV as 'keren_boshi_cv.pdf' to the public/ folder.");
        }
    };

    return (
        <section id="contact" className="relative z-[70] w-full bg-[#0a0a0a] border-t border-white/10 pt-20 pb-24 md:pt-32 md:pb-32 px-6 md:px-12 lg:px-24">
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
                                linkedin.com/in/kerenboshi
                            </a>
                        </div>

                        {/* CV Download Button */}
                        <a
                            href="#upload_cv_to_public_folder"
                            onClick={handleCVClick}
                            className="group mt-4 inline-flex items-center justify-center gap-3 bg-white text-[#0a0a0a] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#ef4444] hover:text-white transition-all duration-300 w-full sm:w-auto"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Download CV
                        </a>
                    </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="flex-[1.5] w-full bg-[#111111] p-8 md:p-12 rounded-3xl border border-white/5">
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
                                    className="bg-transparent border-b border-white/20 pb-2 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-[#ef4444] transition-colors"
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
                                    className="bg-transparent border-b border-white/20 pb-2 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-[#ef4444] transition-colors"
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
                                className="bg-transparent border-b border-white/20 pb-2 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-[#ef4444] transition-colors"
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
                                className="bg-transparent border-b border-white/20 pb-2 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-[#ef4444] transition-colors resize-none"
                                placeholder="Tell me more..."
                            />
                        </div>

                        {/* File Upload (Optional) */}
                        <div className="flex flex-col gap-2 mt-4">
                            <label className="text-white/60 text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-din-condensed)" }}>Attachment (Optional)</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="attachment"
                                    name="attachment"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="flex items-center gap-4 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white/50 text-base font-medium">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                                    <span className="truncate">{fileName || "Choose a file..."}</span>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={status === "submitting" || status === "success"}
                            className="mt-8 bg-[#ef4444] text-white px-8 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-[#0a0a0a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                            style={{ fontFamily: "var(--font-din-condensed)", letterSpacing: "0.05em" }}
                        >
                            {status === "idle" && "Send Message"}
                            {status === "submitting" && "Sending..."}
                            {status === "success" && "Message Sent!"}
                            {status === "error" && "Error - Try Again"}
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
}
