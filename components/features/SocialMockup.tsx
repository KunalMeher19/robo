import { Card } from '@/components/ui/Card';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

interface SocialMockupProps {
    imageUrl?: string;
    caption: string;
    brandName: string;
    logoUrl?: string;
}

export function SocialMockup({ imageUrl, caption, brandName, logoUrl }: SocialMockupProps) {
    return (
        <Card className="max-w-sm mx-auto overflow-hidden bg-white border-gray-200">
            {/* Header */}
            <div className="flex items-center p-3 space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    {logoUrl ? <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" /> : null}
                </div>
                <span className="text-sm font-semibold">{brandName.toLowerCase().replace(/\s+/g, '')}</span>
            </div>

            {/* Image */}
            <div className="aspect-square bg-gray-100 w-full relative">
                {imageUrl ? (
                    <img src={imageUrl} alt="Social Post" className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        No Image
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="p-3">
                <div className="flex justify-between mb-2">
                    <div className="flex space-x-4">
                        <Heart className="w-6 h-6" />
                        <MessageCircle className="w-6 h-6" />
                        <Send className="w-6 h-6" />
                    </div>
                    <Bookmark className="w-6 h-6" />
                </div>
                <div className="text-sm">
                    <span className="font-semibold mr-2">{brandName.toLowerCase().replace(/\s+/g, '')}</span>
                    {caption}
                </div>
            </div>
        </Card>
    );
}
