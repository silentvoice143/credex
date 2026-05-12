import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma";

export async function GET(
    req: Request,
    context: {
        params: Promise<{
            slug: string;
        }>;
    }
) {
    try {
        const { slug } = await context.params;

        const report =
            await prisma.auditReport.findUnique({
                where: {
                    slug,
                },
            });

        if (!report) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Report not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            report: report.report,
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