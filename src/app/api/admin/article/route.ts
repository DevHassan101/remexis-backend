import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import path from 'path';
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const title = formData.get('title')?.toString() || '';
        const category = formData.get('category')?.toString() || '';
        const description = formData.get('description')?.toString() || '';
        const publishDateStr = formData.get('publishDate')?.toString() || '';
        const banner = formData.get('banner');
        // Hard-coded banner for now

        // Validate required fields
        const data = { title, category, description, publishDateStr, banner };
        const requiredFields = {
            title: 'Title is required',
            category: 'Category is required',
            description: 'Description is required',
            publishDateStr: 'Publish date is required',
            banner: 'Banner is required'
        };

        for (const [field, errorMessage] of Object.entries(requiredFields)) {
            if (!data[field]) {
                return NextResponse.json(
                    { error: errorMessage },
                    { status: 400 }
                );
            }
        }



        // Check if user already exists
        const existingArticle = await prisma.article.findUnique({
            where: { title }
        })

        if (existingArticle) {
            return NextResponse.json(
                { error: "Article already exists" },
                { status: 400 }
            )
        }

        let bannerUrl = null;
        if (banner && banner.size > 0) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!allowedTypes.includes(banner.type)) {
                return NextResponse.json(
                    { message: 'Invalid file type. Only JPG, JPEG, and PNG are allowed.' },
                    { status: 400 }
                );
            }

            if (banner.size > 1 * 1024 * 1024) {
                return NextResponse.json(
                    { message: 'File size exceeds 1MB limit.' },
                    { status: 400 }
                );
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

        // Convert publishDate to Date if Prisma expects DateTime
        const publishDate = new Date(publishDateStr);

        const article = await prisma.article.create({
            data: {
                title: title,
                slug: title,
                category,
                description,
                publishDate,
                banner: bannerUrl
            },
        });

        return NextResponse.json(
            {
                message: "Article created successfully",
                article: {
                    id: article.id,
                    title: article.title,
                    //   category: article.category,
                    description: article.description,
                    publishDate: article.publishDate,
                    banner: article.banner
                }
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Article error:", error);
        return NextResponse.json(
            { error: "Internal server error", issue: error },
            { status: 500 }
        );
    }
}


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