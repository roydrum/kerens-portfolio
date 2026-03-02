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
    },
    {
        slug: "scrippo",
        number: "04",
        client: "Scrippo",
        title: "GenAI Workflow Tool for UGC Script Development",
        summary:
            "I designed and built Scrippo in Cursor to help marketers turn scattered social video references into production-ready UGC scripts. The tool captures links, analyzes and catalogs them (hook type, structure, tone, angle, industry), then outputs a script tied to a reference video, with an embedded LLM to refine the script. I owned the product workflow, UX/UI, build, onboarding, and iteration based on user feedback.",
    },
    {
        slug: "bitpanda",
        number: "05",
        client: "Bitpanda",
        title: "Multi-Market Creative Strategy System (14 Markets)",
        summary:
            "I owned a 14-market strategy built around trust-building - both in messaging and in visual guidelines (credible casting, clean visuals, professional tone). I created the testing plan, scripts, localization rules, and execution guidance, and recommended women-focused angles as a growth lever. The result was a scalable system that maintained consistency and credibility across markets while enabling iterative improvement.",
    },
];
