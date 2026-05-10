"use client"
import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const data = {
    success: true,
    report: {
        totalMonthlySpend: 84000,
        projectedAnnualSpend: 1008000,
        estimatedMonthlySavings: 6600,
        estimatedAnnualSavings: 79200,
        recommendations: [
            {
                tool: "Claude",
                currentPlan: "pro",
                recommendation:
                    "Consider consolidating content workflows into ChatGPT Team",
                monthlySavings: 6600,
                reason:
                    "Claude and ChatGPT overlap significantly for content creation tasks.",
            },
            {
                tool: "ChatGPT",
                currentPlan: "team",
                recommendation: "Keep current plan",
                monthlySavings: 0,
                reason:
                    "Current setup appears reasonable for the selected usage.",
            },
            {
                tool: "GitHub Copilot",
                currentPlan: "business",
                recommendation: "Keep current plan",
                monthlySavings: 0,
                reason:
                    "Current setup appears reasonable for the selected usage.",
            },
        ],
        aiSummary:
            "Your organization may benefit from consolidating overlapping AI tooling and reviewing current subscription efficiency.",
    },
};

const toolIcons: Record<string, string> = {
    Claude: "✦",
    ChatGPT: "⬡",
    "GitHub Copilot": "◎",
};

const toolColors: Record<
    string,
    {
        bg: string;
        border: string;
        badge: string;
        text: string;
    }
> = {
    Claude: {
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/30",
        badge: "text-yellow-400",
        text: "text-yellow-900",
    },
    ChatGPT: {
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/30",
        badge: "text-emerald-400",
        text: "text-emerald-900",
    },
    "GitHub Copilot": {
        bg: "bg-violet-400/10",
        border: "border-violet-400/30",
        badge: "text-violet-400",
        text: "text-violet-900",
    },
};

const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(n);

const AuditReport = () => {
    const { report } = data;
    const [hovered, setHovered] = useState<number | null>(null);

    const savingsPct = Math.round(
        (report.estimatedMonthlySavings / report.totalMonthlySpend) * 100
    );

    const downloadPDF = async () => {
        const element = document.getElementById("audit-report");

        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#0B0F19",
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();

        const imgProps = pdf.getImageProperties(imgData);

        const pdfHeight =
            (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(
            imgData,
            "PNG",
            0,
            0,
            pdfWidth,
            pdfHeight
        );

        pdf.save("ai-spend-audit-report.pdf");
    };

    return (
        <div id="audit-report" className="min-h-screen overflow-x-hidden bg-[#0B0F19] text-slate-200 relative">
            <div className="mx-auto max-w-7xl">
                {/* Noise */}
                <div
                    className="pointer-events-none fixed inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Header */}
                <header className="relative z-10 max-w-6xl mx-auto px-6 pt-16">
                    <div className="pb-10">
                        <div className="inline-block rounded-full border border-slate-500/30 bg-slate-500/10 px-4 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                            AI Spend Audit
                        </div>

                        <h1 className="mt-6 text-5xl md:text-7xl leading-tight tracking-tight text-white font-serif">
                            Spend Intelligence
                            <br />
                            <span className="italic text-emerald-400">Report</span>
                        </h1>

                        <p className="mt-4 font-mono text-sm text-slate-500">
                            Analysed 3 active subscriptions · Identified {savingsPct}%
                            potential monthly savings
                        </p>
                    </div>

                    <div className="h-px bg-gradient-to-r from-emerald-400/50 to-transparent" />
                </header>

                {/* KPI Cards */}
                <section className="relative z-10 max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            label: "Monthly Spend",
                            value: fmt(report.totalMonthlySpend),
                            sub: "current",
                            accent: "text-slate-200",
                        },
                        {
                            label: "Annual Projection",
                            value: fmt(report.projectedAnnualSpend),
                            sub: "at current rate",
                            accent: "text-slate-200",
                        },
                        {
                            label: "Monthly Savings",
                            value: fmt(report.estimatedMonthlySavings),
                            sub: "estimated",
                            accent: "text-emerald-400",
                            glow: true,
                        },
                        {
                            label: "Annual Savings",
                            value: fmt(report.estimatedAnnualSavings),
                            sub: "estimated",
                            accent: "text-emerald-400",
                            glow: true,
                        },
                    ].map((kpi) => (
                        <div
                            key={kpi.label}
                            className={`rounded-xl border p-6 flex flex-col gap-2 ${kpi.glow
                                ? "border-emerald-400/20 bg-emerald-400/5"
                                : "border-white/10 bg-white/5"
                                }`}
                        >
                            <span
                                className={`font-mono text-3xl font-bold tracking-tight ${kpi.accent}`}
                            >
                                {kpi.value}
                            </span>

                            <span className="text-sm text-slate-300">{kpi.label}</span>

                            <span className="font-mono text-[11px] uppercase tracking-widest text-slate-600">
                                {kpi.sub}
                            </span>
                        </div>
                    ))}
                </section>

                {/* AI Summary */}
                <section className="relative z-10 max-w-6xl mx-auto px-6 mt-10 flex gap-4">
                    <span className="text-amber-400 text-xl">◈</span>

                    <p className="border-l border-amber-400/30 pl-4 italic text-slate-400 leading-7">
                        {report.aiSummary}
                    </p>
                </section>

                {/* Savings Bar */}
                <section className="relative z-10 max-w-6xl mx-auto px-6 mt-12">
                    <div className="mb-3 flex items-center justify-between text-xs font-mono uppercase tracking-widest">
                        <span className="text-slate-500">Optimised spend</span>
                        <span className="text-emerald-400">
                            {savingsPct}% recoverable
                        </span>
                    </div>

                    <div className="flex h-9 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                        <div
                            className="bg-slate-500/40 transition-all duration-500"
                            style={{ width: `${100 - savingsPct}%` }}
                        />

                        <div
                            className="flex items-center justify-center bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
                            style={{ width: `${savingsPct}%` }}
                        >
                            <span className="font-mono text-xs font-bold text-emerald-950">
                                {fmt(report.estimatedMonthlySavings)}/mo
                            </span>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center text-xs font-mono text-slate-500">
                        <span className="h-2 w-2 rounded-full bg-slate-500 inline-block mr-2" />
                        Retained

                        <span className="ml-6 h-2 w-2 rounded-full bg-emerald-400 inline-block mr-2" />
                        Savings
                    </div>
                </section>

                {/* Recommendations */}
                <section className="relative z-10 max-w-6xl mx-auto px-6 mt-14">
                    <h2 className="mb-6 text-xs uppercase tracking-[0.18em] font-mono text-slate-600">
                        Recommendations
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {report.recommendations.map((rec, i) => {
                            const color = toolColors[rec.tool];
                            const isHovered = hovered === i;

                            return (
                                <div
                                    key={rec.tool}
                                    onMouseEnter={() => setHovered(i)}
                                    onMouseLeave={() => setHovered(null)}
                                    className={`rounded-2xl border p-6 transition-all duration-200 cursor-default
                ${color.bg}
                ${color.border}
                ${isHovered
                                            ? "translate-y-[-4px] shadow-2xl"
                                            : "shadow-lg"
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`text-3xl ${color.badge}`}>
                                            {toolIcons[rec.tool]}
                                        </div>

                                        <div>
                                            <div className="text-lg font-semibold text-slate-100">
                                                {rec.tool}
                                            </div>

                                            <div
                                                className={`mt-1 inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-widest bg-white/5 ${color.badge}`}
                                            >
                                                {rec.currentPlan}
                                            </div>
                                        </div>

                                        {rec.monthlySavings > 0 && (
                                            <div className="ml-auto text-right">
                                                <span className="block font-mono text-lg font-bold text-emerald-400">
                                                    -{fmt(rec.monthlySavings)}
                                                </span>

                                                <span className="text-[10px] uppercase tracking-widest text-emerald-400/70">
                                                    / month
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="my-5 h-px bg-white/10" />

                                    <p className="italic text-slate-300 leading-7">
                                        {rec.recommendation}
                                    </p>

                                    <p className="mt-3 text-xs font-mono leading-6 text-slate-500">
                                        {rec.reason}
                                    </p>

                                    <div
                                        className={`mt-5 inline-block rounded-full border px-3 py-1 text-[11px] uppercase tracking-wider font-mono ${rec.monthlySavings > 0
                                            ? "border-amber-400/30 bg-amber-400/10 text-amber-400"
                                            : "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                                            }`}
                                    >
                                        {rec.monthlySavings > 0
                                            ? "⚠ Action suggested"
                                            : "✓ No action needed"}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative py-8 z-10 max-w-6xl mx-auto px-6  mt-16 border-t border-white/10 text-xs font-mono tracking-wide text-slate-700">
                    Generated by AI Spend Auditor ·{" "}
                    {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </footer>
            </div>
        </div>
    );
};

export default AuditReport;