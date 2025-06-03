// app/api/admin/article/[id]/route.js
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma"; // adjust your import path
import { writeFile, mkdir } from "fs/promises";
import { existsSync, unlinkSync } from "fs";
import path from "path";

export async function PUT(req: NextRequest, { params }) {
    try {
        const { id: articleId } = params;

        // Remove the parseInt() since your ID is a string, not a number
        if (!articleId || typeof articleId !== 'string' || articleId.trim() === '') {
            return NextResponse.json(
                { error: "Invalid or missing article ID" },
                { status: 400 }
            );
        }

        // Use the string ID directly
        const id = articleId.trim();

        // Check if article exists
        const existingArticle = await prisma.article.findUnique({
            where: { id } // Use string ID
        });

        if (!existingArticle) {
            return NextResponse.json(
                { error: "Article not found" },
                { status: 404 }
            );
        }

        const formData = await req.formData();

        const title = formData.get('title')?.toString() || '';
        const category = formData.get('category')?.toString() || '';
        const description = formData.get('description')?.toString() || '';
        const publishDateStr = formData.get('publishDate')?.toString() || '';
        const banner = formData.get('banner');

        // Validate required fields
        const data = { title, category, description, publishDateStr };
        const requiredFields = {
            title: 'Title is required',
            category: 'Category is required',
            description: 'Description is required',
            publishDateStr: 'Publish date is required'
        };

        for (const [field, errorMessage] of Object.entries(requiredFields)) {
            if (!data[field]) {
                return NextResponse.json(
                    { error: errorMessage },
                    { status: 400 }
                );
            }
        }

        // Check if title already exists for another article
        if (title !== existingArticle.title) {
            const titleExists = await prisma.article.findFirst({
                where: {
                    title,
                    id: { not: id } // Use string ID
                }
            });

            if (titleExists) {
                return NextResponse.json(
                    { error: "Article with this title already exists" },
                    { status: 400 }
                );
            }
        }

        let bannerUrl = existingArticle.banner; // Keep existing banner by default

        // Handle new banner upload
        if (banner && banner instanceof File && banner.size > 0) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!allowedTypes.includes(banner.type)) {
                return NextResponse.json(
                    { error: 'Invalid file type. Only JPG, JPEG, and PNG are allowed.' },
                    { status: 400 }
                );
            }

            if (banner.size > 1 * 1024 * 1024) {
                return NextResponse.json(
                    { error: 'File size exceeds 1MB limit.' },
                    { status: 400 }
                );
            }

            // Delete old banner file if it exists
            if (existingArticle.banner) {
                const oldFilePath = path.join(process.cwd(), 'public', existingArticle.banner);
                if (existsSync(oldFilePath)) {
                    try {
                        unlinkSync(oldFilePath);
                    } catch (error) {
                        console.warn('Could not delete old banner file:', error);
                    }
                }
            }

            const bytes = await banner.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const timestamp = Date.now();
            const originalName = banner.name.replace(/\s+/g, '-');
            const filename = `${timestamp}-${originalName}`;

            const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'articles');
            if (!existsSync(uploadsDir)) {
                await mkdir(uploadsDir, { recursive: true });
            }

            // Save file
            const filepath = path.join(uploadsDir, filename);
            await writeFile(filepath, buffer);

            // Set the URL that will be stored in database
            bannerUrl = `/uploads/articles/${filename}`;
        }

        // Convert publishDate to Date
        const publishDate = new Date(publishDateStr);

        const updatedArticle = await prisma.article.update({
            where: { id }, // Use string ID
            data: {
                title,
                slug: title,
                category,
                description,
                publishDate,
                banner: bannerUrl
            },
        });

        return NextResponse.json(
            {
                message: "Article updated successfully",
                article: {
                    id: updatedArticle.id,
                    title: updatedArticle.title,
                    category: updatedArticle.category,
                    description: updatedArticle.description,
                    publishDate: updatedArticle.publishDate,
                    banner: updatedArticle.banner
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Update article error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}



export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id: articleId } = params;

        // Remove the parseInt() since your ID is a string, not a number
        if (!articleId || typeof articleId !== 'string' || articleId.trim() === '') {
            return NextResponse.json(
                { error: "Invalid or missing article ID" },
                { status: 400 }
            );
        }

        // Check if article exists
        const existingArticle = await prisma.article.findUnique({
            where: { id: articleId }
        });

        if (!existingArticle) {
            return NextResponse.json(
                { error: "Article not found" },
                { status: 404 }
            );
        }

        // Delete associated banner file if it exists
        if (existingArticle.banner) {
            const filePath = path.join(process.cwd(), 'public', existingArticle.banner);
            if (existsSync(filePath)) {
                try {
                    unlinkSync(filePath);
                } catch (error) {
                    console.warn('Could not delete banner file:', error);
                }
            }
        }

        // Delete article from database
        await prisma.article.delete({
            where: { id: articleId }
        });

        return NextResponse.json(
            { message: "Article deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Delete article error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}