This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Link: https://www.figma.com/design/XpIMidXvhoV4Ek6ryghcdz/REMEXIS-WEBSITE?node-id=0-1&p=f&t=PIybCG5PoUsxUvCS-0

Core Platform Features
• Homepage:
Large hero background image (we have two collage images—vivid and faded—let’s try to create mockups of both which ever goes better, then we will use it for the UI).
— Professional, clean, healthcare-themed design.

• Healthcare Professional Access:
o The main users are healthcare professionals seeking AI-generated information about remedies.(simple portal/interface for searching and retrieving AI-generated natural medicine remedies)
o No patient portal.

• AI Assistant:
o Integrated using Google's Gemini API.
o Supplementary models like Perplexity or PubMed will be explored for Valid references.
o Intelligent post-processing to improve AI responses and to add proper citations when needed.

• Natural Medicine Article Feed:
o Public section where users can access a feed of natural medicine articles.
o Enriches site engagement and keeps users coming back.

• Supp.AI Integration:
o Allow users to search supplement data via Supp.AI (pending confirmation on API access).
o Placement is to be decided (free or later in the paid section).
• Scalability for Subscription Model:
o While the MVP will be free/public, infrastructure will be set up with the flexibility to introduce paid subscriptions later.

• Admin Area:
o Minimal admin panel to manage article feeds, users, or minor content (subject to clarification if needed now or later).
o Very basic for now, more advanced later if needed.

Tech stacks and requirements

1. Framework Next.js 15
2. Styling TailwindCSS
3. AI Assistant Google Gemini API (REST API)
4. Admin Auth (MVP) NextAuth.js / static credential
5. Database Prisma
6. Hosting Vercel
7. Analytics Plausible / Vercel Analytics
8. Payment (future-proof) Stripe
