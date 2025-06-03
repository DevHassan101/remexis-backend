import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
    try {
        const articles = await prisma.article.findMany();
        return NextResponse.json(
            { message: 'articles retrieved successfully', articles: articles },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Something went wrong', issue: error },
            { status: 200 }
        )
    }
}