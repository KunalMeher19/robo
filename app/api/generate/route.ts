import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateBrandStrategy, generateImage } from '@/services/openai';

const generateSchema = z.object({
    brandName: z.string().min(1),
    description: z.string().min(10),
    vibe: z.string().min(1),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { brandName, description, vibe } = generateSchema.parse(body);

        // 1. Generate Strategy (Text & Prompts)
        const strategy = await generateBrandStrategy(brandName, description, vibe);

        // 2. Generate Images in Parallel (1 logo + 3 social images)
        const [logoUrl, ...socialImageUrls] = await Promise.all([
            generateImage(strategy.logoPrompt),
            generateImage(strategy.socialImagePrompt),
            generateImage(strategy.socialImagePrompt),
            generateImage(strategy.socialImagePrompt),
        ]);

        // 3. Construct Response
        const response = {
            brandName,
            description,
            vibe,
            ...strategy,
            logoUrl,
            socialPosts: strategy.socialPosts.map((post: any, index: number) => ({
                ...post,
                imageUrl: socialImageUrls[index],
            })),
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate brand identity' },
            { status: 500 }
        );
    }
}
