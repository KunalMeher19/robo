export interface BrandIdentity {
    brandName: string;
    tagline: string;
    description: string;
    vibe: string;
    colors: string[];
    typography: {
        fontFamily: string;
        usage: string;
    }[];
    logoUrl?: string;
    socialPosts: {
        caption: string;
        imageUrl?: string;
    }[];
}

export interface GenerationRequest {
    brandName: string;
    description: string;
    vibe: string;
}

export type GenerationStatus = 'idle' | 'generating' | 'completed' | 'error';
