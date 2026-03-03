export interface CaseStudyVideo {
    src: string;
    views: string;
    caption?: string;
}

export interface CaseStudyDetail {
    context: string;
    whatIDid: string[];
    strategy: string;
    results: { stat: string; label: string }[];
    heroVideo?: CaseStudyVideo;
    iterationVideos?: CaseStudyVideo[];
    deck?: { label: string; slides: string[] };
}

export interface CaseStudy {
    slug: string;
    number: string;
    client: string;
    title: string;
    summary: string;
    detail?: CaseStudyDetail;
}

export const CASE_STUDIES: CaseStudy[] = [
    {
        slug: "vimeo-create",
        number: "01",
        client: "Vimeo Create",
        title: "Lock Screen Video Feature Validation",
        summary:
            "I led a TikTok and Meta campaign for an unreleased feature to validate demand before development. I owned the script, storyboard, casting direction, editing guidelines, and iteration strategy. The campaign reached ~70M views, drove record user interest and clicks, and increased in-app searches for the feature - helping support the decision to build it.",
        detail: {
            context:
                "Vimeo Create wanted to test demand for a potential new feature - Lock Screen Video - before investing in building it. The goal was to validate real user intent through performance creative.",
            whatIDid: [
                "Wrote the script and storyboard",
                "Cast talent and directed performance",
                "Defined editing guidelines (pacing, clarity, structure)",
                "Led iteration strategy and feedback to create multiple top-performing versions",
            ],
            strategy:
                "Treat the feature as real and measure intent - optimize for strong view-through, clicks, and in-app search behavior.",
            results: [
                { stat: "~70M", label: "Total views across all videos" },
                { stat: "Record", label: "Click interest achieved" },
                { stat: "Significant", label: "Lift in in-app feature searches" },
            ],
            heroVideo: {
                src: "/videos/vimeo/25-6M.mp4",
                views: "25.6M views",
                caption: "Original hero video - highest performer",
            },
            iterationVideos: [
                {
                    src: "/videos/vimeo/3-8M.mp4",
                    views: "3.8M views",
                    caption: "Iteration - adjusted pacing and hook structure",
                },
                {
                    src: "/videos/vimeo/1-2M.mp4",
                    views: "1.2M views",
                    caption: "Iteration - alternate casting direction",
                },
                {
                    src: "/videos/vimeo/1-1M.mp4",
                    views: "1.1M views",
                    caption: "Iteration - refined CTA clarity",
                },
            ],
        },
    },
    {
        slug: "wolt",
        number: "02",
        client: "Wolt",
        title: "Multi-Market Creative System (8 Markets)",
        summary:
            "I built a multi-market strategy and testing plan to drive first-time orders and app downloads while staying strongly on-brand. I wrote scripts, briefed creators, guided motion designers, and led feedback and iteration when performance data was available. The system scaled two creative pillars across markets with localization rules, improving CTR and CVR and enabling a consistent production cadence.",
        detail: {
            context:
                "Wolt needed multi-market creative to drive first-time orders and app downloads while staying strongly on-brand (logos, brand colors). Later, the focus expanded to more organic-style creative measured through CTR and view-through rates.",
            whatIDid: [
                "Built the multi-market strategy and testing plan",
                "Developed the creative pillars and wrote scripts",
                "Briefed creators and guided production execution",
                "Directed motion designers and provided post-production feedback",
                "Analyzed performance and led iterations based on learnings",
            ],
            strategy:
                "A two-pillar system designed to scale while staying platform-native: Edutainment - entertaining formats that showcase Wolt's USPs and options. Visually appealing, trend-led - native-feeling concepts built for attention and retention. Backed by a yearly testing plan that created a continuous learning and ideating loop - each round of creative informed the next.",
            results: [
                { stat: "8 Markets", label: "Scaled with consistent quality and local relevance" },
                { stat: "800+", label: "Assets created quarterly across markets" },
                { stat: "CTR + CVR", label: "Lifted through structured A/B testing across pillars" },
            ],
            deck: {
                label: "Selected slides from the multi-market strategy deck",
                slides: [
                    "/decks/wolt/slides/slide-01.png",
                    "/decks/wolt/slides/slide-05.png",
                    "/decks/wolt/slides/slide-06.png",
                    "/decks/wolt/slides/slide-07.png",
                    "/decks/wolt/slides/slide-10.png",
                ],
            },
            iterationVideos: [
                {
                    src: "/videos/wolt/V1_H2_Wolt_HR_February.mp4",
                    views: "Croatia",
                    caption: "Croatia - branded hook concept",
                },
                {
                    src: "/videos/wolt/v2_Wolt_Helena_HR_December_My priorities_2_processed.mp4",
                    views: "Croatia",
                    caption: "Croatia - organic storytelling format",
                },
                {
                    src: "/videos/wolt/FOAP - Wolt SR %233 CUT6.mp4",
                    views: "Serbia",
                    caption: "Serbia - retail concept",
                },
                {
                    src: "/videos/wolt/MK_Jul25_HitsDifferent1_video_15s_1080x1920_bau_Creator 1_ugc-regular_na_FOAP_food.mp4",
                    views: "North Macedonia",
                    caption: "North Macedonia - food delivery",
                },
                {
                    src: "/videos/wolt/PL_Sep25_SpaDay_video_19s_1080x1920_b2s_Creator 1_ugc-regular_na_FOAP_wm-retail.mp4",
                    views: "Poland",
                    caption: "Poland - retail concept",
                },
                {
                    src: "/videos/wolt/RS_Aug25_WoltYourWay1_video_16s_1080x1920_generic_Creator 1_ugc-regular_na_FOAP_wm-retail.mp4",
                    views: "Serbia",
                    caption: "Serbia - Wolt Your Way retail",
                },
                {
                    src: "/videos/wolt/CS_Sep25_Keyhole_video_15s_1080x1920_generic_Creator 1_ugc-regular_Globus_FOAP_wm-retail 2.mp4",
                    views: "Czechia",
                    caption: "Czechia - retail with Globus",
                },
                {
                    src: "/videos/wolt/wolt + maria hook 1-.mp4",
                    views: "Croatia",
                    caption: "Croatia - Maria hook concept",
                },
            ],
        },
    },
    {
        slug: "flo",
        number: "03",
        client: "Flo",
        title: "Menopause Research to Multi-Market Creative Strategy (FR/DE vs US)",
        summary:
            "I led research comparing cultural barriers, language, and symptom awareness gaps across France and Germany versus the US. I translated the insights into a platform-native strategy with localized messaging routes, respectful humor, and clear creative formats designed to normalize the topic without talking down to women. The output was an actionable strategy teams could execute from, with testing guidance.",
        detail: {
            context:
                "Flo wanted a strategy that reflects how women talk (and don't talk) about perimenopause and menopause in different markets - especially the differences between France, Germany, and the US.",
            whatIDid: [
                "Researched market context, language, and cultural barriers",
                "Identified gaps in symptom awareness and common misconceptions",
                "Built a messaging framework and creative territories by market",
                "Translated insights into platform-native concepts, hooks, and content formats",
            ],
            strategy:
                "A market-aware creative framework designed for performance and relevance: Education that doesn't feel clinical - simple, relatable \"signs you didn't know\" formats. Humor that builds empathy - light, relatable moments that help normalize symptoms without mocking or belittling women. Myth-busting and reassurance - \"it's not just stress\" style reframes, localized by market.",
            results: [
                { stat: "2 Markets", label: "Localized strategy across FR and DE with comparison to the US market" },
                { stat: "Research-Led", label: "Cultural barriers and awareness gaps mapped per market" },
                { stat: "Actionable", label: "Messaging routes, content formats, and testing directions" },
            ],
            deck: {
                label: "Selected slides from the research and strategy deck (FR/DE vs US)",
                slides: [
                    "/decks/flo/slides/slide-02.png",
                    "/decks/flo/slides/slide-10.png",
                    "/decks/flo/slides/slide-15.png",
                    "/decks/flo/slides/slide-20.png",
                    "/decks/flo/slides/slide-25.png",
                    "/decks/flo/slides/slide-30.png",
                    "/decks/flo/slides/slide-50.png",
                    "/decks/flo/slides/slide-55.png",
                ],
            },
            iterationVideos: [
                {
                    src: "/videos/flo/01-Foap-Flo_FR_From-guessing-to-data.mp4",
                    views: "France",
                    caption: "France - From guessing to data (v1)",
                },
                {
                    src: "/videos/flo/02-Foap-Flo_FR_From-guessing-to-data.mp4",
                    views: "France",
                    caption: "France - From guessing to data (v2)",
                },
                {
                    src: "/videos/flo/01-Foap-Flo_FR_Youre-not-imagining-it.mp4",
                    views: "France",
                    caption: "France - You're not imagining it",
                },
                {
                    src: "/videos/flo/01-Foap-Flo_FR_until-I-tried-Flo.mp4",
                    views: "France",
                    caption: "France - Until I tried Flo",
                },
                {
                    src: "/videos/flo/01-Foap-Flo_DE_From-guessing-to-data.mp4",
                    views: "Germany",
                    caption: "Germany - From guessing to data (v1)",
                },
                {
                    src: "/videos/flo/02-Foap-Flo_DE_From-guessing-to-data.mp4",
                    views: "Germany",
                    caption: "Germany - From guessing to data (v2)",
                },
                {
                    src: "/videos/flo/01-Foap-Flo_DE_Youre-not-imagining-it.mp4",
                    views: "Germany",
                    caption: "Germany - You're not imagining it",
                },
                {
                    src: "/videos/flo/01-Foap-Flo_DE_until-I-tried-Flo.mp4",
                    views: "Germany",
                    caption: "Germany - Until I tried Flo",
                },
            ],
        },
    },
    {
        slug: "bitpanda",
        number: "04",
        client: "Bitpanda",
        title: "Multi-Market Creative Strategy System (14 Markets)",
        summary:
            "I owned a 14-market strategy built around trust-building - both in messaging and in visual guidelines (credible casting, clean visuals, professional tone). I created the testing plan, scripts, localization rules, and execution guidance, and recommended women-focused angles as a growth lever. The result was a scalable system that maintained consistency and credibility across markets while enabling iterative improvement.",
        detail: {
            context:
                "Bitpanda needed performance creative that could scale across markets while staying consistent, compliant, and trustworthy. The challenge was building a system that drives action without feeling \"too salesy\" - especially in a category where trust is everything.",
            whatIDid: [
                "Built the multi-market creative strategy and testing plan",
                "Defined messaging routes and creative territories",
                "Wrote scripts and created execution guidance for production",
                "Localized concepts per market (language, phrasing, product features)",
                "Reviewed outputs, captured learnings, and refined concepts through iteration",
            ],
            strategy:
                "A trust-building approach designed for multi-market performance: Trust-first messaging. Credibility cues in casting and visuals - guidelines to feature people who feel real and trustworthy (e.g., working professionals), with clean visuals that support legitimacy. Audience expansion opportunity - recommended testing women-focused angles and creators as a growth lever.",
            results: [
                { stat: "14 Markets", label: "Scaled with consistent quality across Europe" },
                { stat: "Clarity + Growth", label: "Turned a complex product into clear value props and tested women-led angles to expand audiences." },
                { stat: "Trust-by-Design", label: "Defined a consistent visual standard - clean composition, premium styling, and a professional tone - while keeping the content authentic and platform-native." },
            ],
            deck: {
                label: "Selected slides from the multi-market creative strategy deck",
                slides: [
                    "/decks/bitpanda/slides/slide-02.png",
                    "/decks/bitpanda/slides/slide-10.png",
                    "/decks/bitpanda/slides/slide-12.png",
                    "/decks/bitpanda/slides/slide-15.png",
                    "/decks/bitpanda/slides/slide-20.png",
                    "/decks/bitpanda/slides/slide-22.png",
                    "/decks/bitpanda/slides/slide-25.png",
                ],
            },
            iterationVideos: [
                {
                    src: "/videos/bitpanda/01-Foap-Bitpanda_UK_Max_9x16.mp4",
                    views: "UK",
                    caption: "UK - Max",
                },
                {
                    src: "/videos/bitpanda/Bitpanda-UK-UGC-concept-2-Hook-1_1_processed.mp4",
                    views: "UK",
                    caption: "UK - UGC concept hook",
                },
                {
                    src: "/videos/bitpanda/02-Foap-Bitpanda_DE_Lennart_9x16_processed.mp4",
                    views: "Germany",
                    caption: "Germany - Lennart",
                },
                {
                    src: "/videos/bitpanda/V1B_01-Foap-Bitpanda_DE-Nikita_1.mp4",
                    views: "Germany",
                    caption: "Germany - Nikita",
                },
                {
                    src: "/videos/bitpanda/02-Foap-Bitpanda_ES_Fernando_9x16.mp4",
                    views: "Spain",
                    caption: "Spain - Fernando",
                },
                {
                    src: "/videos/bitpanda/04-Foap-Bitpanda_FR_9x16.mp4",
                    views: "France",
                    caption: "France",
                },
                {
                    src: "/videos/bitpanda/02-Foap-Bitpanda_IT_Gabriel_9x16.mp4",
                    views: "Italy",
                    caption: "Italy - Gabriel",
                },
                {
                    src: "/videos/bitpanda/02-Foap-Bitpanda_PT_Joao_9x16.mp4",
                    views: "Portugal",
                    caption: "Portugal - Joao",
                },
                {
                    src: "/videos/bitpanda/03-Foap-Bitpanda_CH_Katja_9x16.mp4",
                    views: "Switzerland",
                    caption: "Switzerland - Katja",
                },
                {
                    src: "/videos/bitpanda/01-Foap-Bitpanda-2.0112.1-HU-Kevin-V1.mp4",
                    views: "Hungary",
                    caption: "Hungary - Kevin",
                },
                {
                    src: "/videos/bitpanda/01-Foap-Bitpanda_HR-2.0112.1-Joshua-V1-.mp4",
                    views: "Croatia",
                    caption: "Croatia - Joshua",
                },
                {
                    src: "/videos/bitpanda/02-Foap-Bitpanda_HR-2.0112.1-Antonio-V1-.mp4",
                    views: "Croatia",
                    caption: "Croatia - Antonio",
                },
            ],
        },
    },
];
