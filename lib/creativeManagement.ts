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
                { src: "/creative-management/bau/01-FoodPorn.mp4", type: "video", caption: "Food Porn" },
                { src: "/creative-management/bau/Concept 1_1x1.png", type: "image", caption: "BAU Concept" },
                { src: "/creative-management/bau/Screenshot 2026-03-04 at 13.45.23.png", type: "image", caption: "Campaign overview" },
                { src: "/creative-management/bau/02-SplitScreen.mp4", type: "video", caption: "Split Screen" },
                { src: "/creative-management/bau/HF Efteling 1080x1350 Family.png", type: "image", caption: "Efteling Partnership" },
                { src: "/creative-management/bau/HF_PawPatrol_PaidSocial_1080x1080_DE.jpeg", type: "image", caption: "Paw Patrol Partnership" },
                { src: "/creative-management/bau/03-3 Animated Dishes.mp4", type: "video", caption: "Animated Dishes" },
                { src: "/creative-management/bau/water dish.jpeg", type: "image", caption: "Dish visual" },
                { src: "/creative-management/bau/Screenshot 2023-11-01 at 20.18.59.png", type: "image", caption: "Campaign results" },
                { src: "/creative-management/bau/HF_Disney_Partnership_Organic_1.mp4", type: "video", caption: "Disney Partnership" },
                { src: "/creative-management/bau/Screenshot 2023-11-01 at 20.19.26.png", type: "image", caption: "Performance metrics" },
                { src: "/creative-management/bau/1- do it for likes_14.mp4", type: "video", caption: "Do It For Likes" },
                { src: "/creative-management/bau/Paid social HF - FoodPorn - Meat preference loop.mp4", type: "video", caption: "Meat Preference Loop" },
                { src: "/creative-management/bau/4-5 - 1.mp4", type: "video", caption: "BAU 4:5 Format" },
                { src: "/creative-management/bau/Peak_Low-Cal 9x16.mp4", type: "video", caption: "Low-Cal Peak" },
                { src: "/creative-management/bau/Salmon 1080x1350.mp4", type: "video", caption: "Salmon" },
                { src: "/creative-management/bau/9-16_MoD_RTB_EN_Convenience_1_4-5.mp4", type: "video", caption: "Convenience RTB 1" },
                { src: "/creative-management/bau/9-16_MoD_RTB_EN_Convenience_2_4-5.mp4", type: "video", caption: "Convenience RTB 2" },
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
                { src: "/creative-management/summer-2023/Summer23-FoodForYourSummerMood-V1_9-16.mp4", type: "video", caption: "Food For Your Summer Mood" },
                { src: "/creative-management/summer-2023/Screenshot 2023-09-15 at 12.17.36.png", type: "image", caption: "Campaign overview" },
                { src: "/creative-management/summer-2023/Screenshot 2023-09-20 at 14.19.21.png", type: "image", caption: "Performance results" },
                { src: "/creative-management/summer-2023/DC-19266 - Made for Summer - 9-16 - Concept 2 - v06.mp4", type: "video", caption: "Made for Summer" },
                { src: "/creative-management/summer-2023/Screenshot 2023-10-31 at 14.13.19.png", type: "image", caption: "Campaign visual" },
                { src: "/creative-management/summer-2023/Screenshot 2023-10-31 at 14.14.31.png", type: "image", caption: "Campaign visual" },
                { src: "/creative-management/summer-2023/Screenshot 2023-10-31 at 14.15.57.png", type: "image", caption: "Campaign visual" },
                { src: "/creative-management/summer-2023/Screenshot 2023-10-31 at 14.16.07.png", type: "image", caption: "Campaign visual" },
                { src: "/creative-management/summer-2023/Screenshot 2023-10-31 at 14.16.48.png", type: "image", caption: "Campaign visual" },
                { src: "/creative-management/summer-2023/Screenshot 2023-10-31 at 14.16.56.png", type: "image", caption: "Campaign visual" },
                { src: "/creative-management/summer-2023/Screenshot 2023-10-31 at 14.17.45.png", type: "image", caption: "Campaign visual" },
                { src: "/creative-management/summer-2023/Screenshot 2023-10-31 at 14.17.51.png", type: "image", caption: "Campaign visual" },
                { src: "/creative-management/summer-2023/Screenshot 2023-11-01 at 10.20.59.png", type: "image", caption: "Results snapshot" },
                { src: "/creative-management/summer-2023/Screenshot 2023-11-01 at 10.21.05.png", type: "image", caption: "Results snapshot" },
                { src: "/creative-management/summer-2023/Screenshot 2023-11-01 at 10.21.16.png", type: "image", caption: "Results snapshot" },
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
                { src: "/creative-management/back-to-school/BTS23.mp4", type: "video", caption: "Back to School 2023" },
                { src: "/creative-management/back-to-school/Preview image 4.jpg", type: "image", caption: "Campaign preview" },
                { src: "/creative-management/back-to-school/Preview image 5.jpg", type: "image", caption: "Campaign preview" },
                { src: "/creative-management/back-to-school/B2S22-EverydayValue-4-5 - v05.mp4", type: "video", caption: "Everyday Value" },
                { src: "/creative-management/back-to-school/PS_Mature markets.mp4", type: "video", caption: "Mature Markets" },
                { src: "/creative-management/back-to-school/PS_Startup markets.mp4", type: "video", caption: "Startup Markets" },
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
                { src: "/creative-management/productions/GirlsThatGetIt.mp4", type: "video", caption: "Girls That Get It" },
                { src: "/creative-management/productions/NobodysGonnaKnow.mp4", type: "video", caption: "Nobody's Gonna Know" },
                { src: "/creative-management/productions/LifeHack.mp4", type: "video", caption: "Life Hack" },
                { src: "/creative-management/productions/Loading.mp4", type: "video", caption: "Loading" },
                { src: "/creative-management/productions/DanceMarmar.mp4", type: "video", caption: "Dance Marmar" },
                { src: "/creative-management/productions/MustHaves.mp4", type: "video", caption: "Must Haves" },
                { src: "/creative-management/productions/ThisApp.mp4", type: "video", caption: "This App" },
                { src: "/creative-management/productions/Timer.mp4", type: "video", caption: "Timer" },
                { src: "/creative-management/productions/WhoCan.mp4", type: "video", caption: "Who Can" },
                { src: "/creative-management/productions/Branding.mp4", type: "video", caption: "Branding" },
                { src: "/creative-management/productions/Dimentions.mp4", type: "video", caption: "Dimentions" },
                { src: "/creative-management/productions/Marmar.mp4", type: "video", caption: "Marmar" },
                { src: "/creative-management/productions/ProductsYouNeed.mp4", type: "video", caption: "Products You Need" },
                { src: "/creative-management/productions/Raven.mp4", type: "video", caption: "Raven" },
                { src: "/creative-management/productions/NoTime.mp4", type: "video", caption: "No Time" },
                { src: "/creative-management/productions/WrongLink.mp4", type: "video", caption: "Wrong Link" },
            ],
        },
    },
];
