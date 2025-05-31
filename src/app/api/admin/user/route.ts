import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(
            {message: "Users retrieved successfully", users: users},
            {status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            {message: "Something went wrong", issue: error},
            {status: 500}
        )
    }
}