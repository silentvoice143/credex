import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

import { auditFormSchema } from "@/libs/validation/audit-form";
import { prisma } from "@/libs/prisma";

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
});

const TOOL_LABELS: Record<string, string> = {
    claude: "Claude",
    chatgpt: "ChatGPT",
    cursor: "Cursor",
    github_copilot: "GitHub Copilot",
    perplexity: "Perplexity",
};

export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log(body, "body-------body");

        const validated = auditFormSchema.safeParse(body);

        if (!validated.success) {
            return NextResponse.json(
                {
                    success: false,
                    errors: validated.error.flatten(),
                },
                { status: 400 }
            );
        }

        const data = validated.data;

        const totalMonthlySpend = data.tools.reduce(
            (acc, tool) =>
                acc + Number(tool.monthlySpend || 0),
            0
        );

        const projectedAnnualSpend =
            totalMonthlySpend * 12;

        let estimatedMonthlySavings = 0;

        const recommendations = data.tools.map((tool) => {
            let recommendation = "Keep current plan";

            let monthlySavings = 0;

            let reason =
                "Current setup appears reasonable for the selected usage.";

            if (
                tool.name === "claude" &&
                data.tools.some(
                    (t) => t.name === "chatgpt"
                ) &&
                data.useCase === "Content Creation"
            ) {
                recommendation =
                    "Consider consolidating content workflows into ChatGPT Team";

                monthlySavings = Math.floor(
                    Number(tool.monthlySpend) * 0.3
                );

                reason =
                    "Claude and ChatGPT overlap significantly for content creation tasks.";
            }

            estimatedMonthlySavings += monthlySavings;

            return {
                tool:
                    TOOL_LABELS[tool.name] ||
                    tool.name,

                currentPlan: tool.plan,

                recommendation,

                monthlySavings,

                reason,
            };
        });

        const estimatedAnnualSavings =
            estimatedMonthlySavings * 12;

        const auditResult = {
            slug: data.slug,

            teamSize: data.teamSize,

            useCase: data.useCase,

            totalMonthlySpend,

            projectedAnnualSpend,

            estimatedMonthlySavings,

            estimatedAnnualSavings,

            recommendations,
        };

        let aiSummary = "";

        try {
            const response =
                await anthropic.messages.create({
                    model: "claude-sonnet-4-20250514",

                    max_tokens: 300,

                    messages: [
                        {
                            role: "user",

                            content: `
You are an AI infrastructure cost consultant.

Write a concise executive summary for this AI spend audit.

Focus on:
- overspending patterns
- duplicate tooling
- optimization opportunities
- realistic recommendations

Audit Result:
${JSON.stringify(auditResult, null, 2)}
                            `,
                        },
                    ],
                });

            aiSummary =
                response.content[0]?.type === "text"
                    ? response.content[0].text
                    : "";
        } catch (err) {
            console.error(err);

            aiSummary =
                "Your organization may benefit from consolidating overlapping AI tooling and reviewing current subscription efficiency.";
        }

        const finalReport = {
            ...auditResult,
            aiSummary,
        };

        // SAVE REPORT
        await prisma.auditReport.upsert({
            where: {
                slug: data.slug,
            },

            update: {
                teamSize: data.teamSize,

                useCase: data.useCase,

                totalMonthlySpend,

                projectedAnnualSpend,

                estimatedMonthlySavings,

                estimatedAnnualSavings,

                recommendations,

                aiSummary,

                rawPayload: body,

                report: finalReport,
            },

            create: {
                slug: data.slug as string,

                teamSize: data.teamSize,

                useCase: data.useCase,

                totalMonthlySpend,

                projectedAnnualSpend,

                estimatedMonthlySavings,

                estimatedAnnualSavings,

                recommendations,

                aiSummary,

                rawPayload: body,

                report: finalReport,
            },
        });

        return NextResponse.json({
            success: true,
            report: finalReport,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}