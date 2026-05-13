import { api } from "./axios";

// ==============================
// Types
// ==============================

export interface AuditTool {
    name: string;
    plan: string;
    monthlySpend: string;
}

export interface CreateAuditPayload {
    slug: string;
    teamSize: string;
    useCase: string;
    tools: AuditTool[];
}

export interface Recommendation {
    tool: string;
    currentPlan: string;
    recommendation: string;
    monthlySavings: number;
    reason: string;
}

export interface AuditReport {
    slug: string;
    teamSize: number;
    useCase: string;
    totalMonthlySpend: number;
    projectedAnnualSpend: number;
    estimatedMonthlySavings: number;
    estimatedAnnualSavings: number;
    recommendations: Recommendation[];
    aiSummary: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    report?: T;
}

// ==============================
// Create Audit Report
// POST /api/audit
// ==============================

export const createAuditReport = async (
    payload: CreateAuditPayload,
) => {
    const response = await api.post<
        ApiResponse<AuditReport>
    >("/api/audit-report", payload);

    return response.data;
};

// ==============================
// Get Audit Report By Slug
// GET /api/audit/[slug]
// ==============================

export const getAuditReport = async (
    slug: string,
) => {
    const response = await api.get<
        ApiResponse<AuditReport>
    >(`/api/audit-report/${slug}`);

    return response.data;
};