import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import bcrypt from "bcryptjs"; // or whatever hashing library you're using

export async function PUT(req: NextRequest, { params }) {
    try {
        const { id: userId } = params;

        // Validate user ID
        if (!userId || typeof userId !== 'string' || userId.trim() === '') {
            return NextResponse.json(
                { error: "Invalid or missing user ID" },
                { status: 400 }
            );
        }

        const id = userId.trim();

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id }
        });

        if (!existingUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Parse JSON body instead of FormData
        const body = await req.json();
        const { name, email, password, role } = body;

        // Validate required fields (password is optional for updates)
        if (!name || !email) {
            return NextResponse.json(
                { error: "Name and email are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Check if email already exists for another user
        if (email !== existingUser.email) {
            const emailExists = await prisma.user.findFirst({
                where: {
                    email,
                    id: { not: id }
                }
            });

            if (emailExists) {
                return NextResponse.json(
                    { error: "User with this email already exists" },
                    { status: 400 }
                );
            }
        }

        // Prepare update data
        const updateData = {
            name,
            email,
            role: role || 'ADMIN'
        };

        // Only update password if provided
        if (password) {
            if (password.length < 6) {
                return NextResponse.json(
                    { error: "Password must be at least 6 characters long" },
                    { status: 400 }
                );
            }
            
            // Hash the password before storing
            const hashedPassword = await bcrypt.hash(password, 12);
            updateData.password = hashedPassword;
        }

        // Update user in database
        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData,
        });

        // Return success response (exclude password from response)
        const { password: _, ...userResponse } = updatedUser;

        return NextResponse.json(
            {
                message: "Admin updated successfully",
                user: userResponse
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Update admin user error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}