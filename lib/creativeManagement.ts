export interface CreativeMedia {
    src: string;
    type: "image" | "video";
    caption?: string;
}

export interface CreativeProjectDetail {
    galleryType: "hive" | "video-grid";
    media: CreativeMedia[];
}

export interface CreativeProject {
    slug: string;
    number: string;
    title: string;
    subtitle: string;
    summary: string;
    detail?: CreativeProjectDetail;
}

export const CREATIVE_INTRO = `I lead creative teams and production systems that turn strategy into high-volume, high-quality execution - across markets, channels, and formats. My work spans campaign planning, cross-team partnerships, and managing both remote and on-location productions, with a focus on platform-native performance creative.`;

export const CREATIVE_PROJECTS: CreativeProject[] = [
    {
        slug: "bau-paid-social",
        number: "01",
        title: "BAU Paid Social",
        subtitle: "HelloFresh - 14 Markets",
        summary:
            "Business-as-usual (BAU) ads were the backbone of our paid social engine. I led the daily system that delivered fresh creative across 14 markets while keeping a strict quality bar - on-brand, consistent, and built on learnings from past performance. Each asset was localized to fit market nuances (language, cultural cues, and what resonates locally), so the work scaled without feeling generic. Alongside BAU, I also led creative for brand partnerships and co-marketing activations with partners such as Paw Patrol, Disney, Efteling, and others, ensuring the collaborations stayed true to both brands while performing across channels.",
        detail: {
            galleryType: "hive",
            media: [
                // Placeholder slots - replace src with actual paths when media is ready
                { src: "", type: "image", caption: "BAU asset 1" },
                { src: "", type: "video", caption: "BAU video 1" },
                { src: "", type: "image", caption: "BAU asset 2" },
                { src: "", type: "image", caption: "BAU asset 3" },
                { src: "", type: "video", caption: "BAU video 2" },
                { src: "", type: "image", caption: "BAU asset 4" },
            ],
        },
    },
    {
        slug: "summer-2023",
        number: "02",
        title: "Summer 2023",
        subtitle: '"Food for your summer mood" + "Made for Summer"',
        summary:
            "I led two campaign routes that reframed summer as a conversion opportunity: light, shareable meals for social moments, and POV-style BBQ content built for seasonal behavior. The result was strong performance despite typical summer seasonality headwinds.",
        detail: {
            galleryType: "hive",
            media: [
                // Placeholder slots - replace src with actual paths when media is ready
                { src: "", type: "image", caption: "Campaign visual 1" },
                { src: "", type: "image", caption: "Campaign visual 2" },
                { src: "", type: "video", caption: "Campaign video 1" },
                { src: "", type: "image", caption: "Campaign visual 3" },
                { src: "", type: "video", caption: "Campaign video 2" },
                { src: "", type: "image", caption: "Campaign visual 4" },
            ],
        },
    },
    {
        slug: "back-to-school",
        number: "03",
        title: "Back to School",
        subtitle: "Integrated Campaign",
        summary:
            "I led an end-to-end seasonal campaign across paid social, display, CRM, affiliates, and reactivation. We produced thousands of assets with a unified message adapted by channel, and aligned closely with offline teams to ensure consistent touchpoints. Performance was driven by structured testing, resulting in strong conversion efficiency and low acquisition costs.",
        detail: {
            galleryType: "hive",
            media: [
                // Placeholder slots - replace src with actual paths when media is ready
                { src: "", type: "image", caption: "Campaign asset 1" },
                { src: "", type: "video", caption: "Campaign video 1" },
                { src: "", type: "image", caption: "Campaign asset 2" },
                { src: "", type: "image", caption: "Campaign asset 3" },
                { src: "", type: "video", caption: "Campaign video 2" },
                { src: "", type: "image", caption: "Campaign asset 4" },
            ],
        },
    },
    {
        slug: "productions",
        number: "04",
        title: "Productions",
        subtitle: "TikTok-First Performance Creative",
        summary:
            "As creative lead for social ads (especially TikTok), I built a fast production and iteration workflow designed to stay native to the platform - not over-designed. This included remote creator productions (scripts, guidelines, feedback) and local shoots (research, planning, copy, logistics, capture). We produced multiple hook variations per concept, then worked with paid social to analyze results and iterate on winners.",
        detail: {
            galleryType: "video-grid",
            media: [
                // Placeholder slots - replace src with actual paths when media is ready
                { src: "", type: "video", caption: "Production 1" },
                { src: "", type: "video", caption: "Production 2" },
                { src: "", type: "video", caption: "Production 3" },
                { src: "", type: "video", caption: "Production 4" },
                { src: "", type: "video", caption: "Production 5" },
                { src: "", type: "video", caption: "Production 6" },
            ],
        },
    },
];
