import { Option } from "@/components/shared/custom-select";

export const useCaseOptions = [
    {
        label: "Content Creation",
        value: "Content Creation",
    },
    {
        label: "Code Assistance",
        value: "Code Assistance",
    },
    {
        label: "Customer Support",
        value: "Customer Support",
    },
    {
        label: "Data Analysis",
        value: "Data Analysis",
    },
    {
        label: "Research",
        value: "Research",
    },
    {
        label: "Other",
        value: "Other",
    },
];

export type UseCase =
    | ""
    | "Content Creation"
    | "Code Assistance"
    | "Customer Support"
    | "Data Analysis"
    | "Research"
    | "Other";

export const aiTools = [
    {
        label: "ChatGPT",
        value: "chatgpt",
        plans: [
            { label: "Free", value: "free" },
            { label: "Plus", value: "plus" },
            { label: "Team", value: "team" },
            { label: "Enterprise", value: "enterprise" },
        ],
    },

    {
        label: "Claude",
        value: "claude",
        plans: [
            { label: "Free", value: "free" },
            { label: "Pro", value: "pro" },
            { label: "Team", value: "team" },
            { label: "Enterprise", value: "enterprise" },
        ],
    },

    {
        label: "Perplexity",
        value: "perplexity",
        plans: [
            { label: "Free", value: "free" },
            { label: "Pro", value: "pro" },
            { label: "Enterprise", value: "enterprise" },
        ],
    },

    {
        label: "GitHub Copilot",
        value: "github_copilot",
        plans: [
            { label: "Free", value: "free" },
            { label: "Pro", value: "pro" },
            { label: "Business", value: "business" },
            { label: "Enterprise", value: "enterprise" },
        ],
    },

    {
        label: "Cursor",
        value: "cursor",
        plans: [
            { label: "Free", value: "free" },
            { label: "Pro", value: "pro" },
            { label: "Teams", value: "teams" },
            { label: "Enterprise", value: "enterprise" },
        ],
    },

    {
        label: "Midjourney",
        value: "midjourney",
        plans: [
            { label: "Basic", value: "basic" },
            { label: "Standard", value: "standard" },
            { label: "Pro", value: "pro" },
            { label: "Mega", value: "mega" },
        ],
    },
];
