import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateImage } from '@/services/openai';

// Set max duration to 60s for Pro users, but this endpoint is designed to be fast enough for Free tier (usually <10s)
// or at least isolated so one failure doesn't kill the whole process.
export const maxDuration = 60;

const generateImageSchema = z.object({
    prompt: z.string().min(1),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { prompt } = generateImageSchema.parse(body);

        const imageUrl = await generateImage(prompt);

        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error('Image generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate image' },
            { status: 500 }
        );
    }
}
