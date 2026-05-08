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
