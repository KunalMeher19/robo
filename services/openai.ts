import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateBrandStrategy(
  brandName: string,
  description: string,
  vibe: string
) {
  const prompt = `
    You are a creative brand strategist. Create a brand identity for a brand named "${brandName}".
    Description: ${description}
    Vibe: ${vibe}

    Return a JSON object with the following structure:
    {
      "tagline": "string",
      "colors": ["hex_code_1", "hex_code_2", "hex_code_3", "hex_code_4", "hex_code_5"],
      "typography": [
        { "fontFamily": "string", "usage": "Headings" },
        { "fontFamily": "string", "usage": "Body" }
      ],
      "socialPosts": [
        { "caption": "string" },
        { "caption": "string" },
        { "caption": "string" }
      ],
      "logoPrompt": "A detailed DALL-E 3 prompt for a minimal, modern logo for this brand. The prompt should be descriptive and suitable for high-quality generation.",
      "socialImagePrompt": "A detailed DALL-E 3 prompt for a high-quality, photorealistic social media lifestyle image featuring the brand's vibe."
    }
  `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4-turbo-preview',
    response_format: { type: 'json_object' },
  });

  const content = completion.choices[0].message.content;
  if (!content) throw new Error('No content generated');

  return JSON.parse(content);
}

export async function generateImage(prompt: string) {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
    quality: "standard",
  });

  return response.data?.[0]?.url || '';
}
