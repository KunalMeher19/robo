import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Download, Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface NavbarProps {
    showCreateButton: boolean;
    onCreateNew: () => void;
}

export function Navbar({ showCreateButton, onCreateNew }: NavbarProps) {
    const { data: brandData } = useSelector((state: RootState) => state.brand);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        if (!brandData || isDownloading) return;
        setIsDownloading(true);

        try {
            const zip = new JSZip();
            const folder = zip.folder(brandData.brandName.replace(/\s+/g, '_')) || zip;

            // 1. Create Text File
            const textContent = `
BRAND IDENTITY: ${brandData.brandName}
----------------------------------------
Tagline: ${brandData.tagline}
Vibe: ${brandData.vibe}
Description: ${brandData.description}

COLOR PALETTE
----------------------------------------
${brandData.colors.join('\n')}

TYPOGRAPHY
----------------------------------------
${brandData.typography.map(f => `${f.usage}: ${f.fontFamily}`).join('\n')}

SOCIAL MEDIA STRATEGY
----------------------------------------
${brandData.socialPosts.map((post, i) => `
POST ${i + 1}
Caption: ${post.caption}
`).join('\n')}
    `.trim();

            folder.file('brand_details.txt', textContent);

            // 2. Download Images
            const downloadImage = async (url: string, filename: string) => {
                try {
                    // Use proxy to bypass CORS
                    const response = await fetch(`/api/proxy-image?url=${encodeURIComponent(url)}`);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const blob = await response.blob();
                    folder.file(filename, blob);
                } catch (error) {
                    console.error(`Failed to download ${filename}`, error);
                }
            };

            const promises = [];

            if (brandData.logoUrl) {
                promises.push(downloadImage(brandData.logoUrl, 'logo.png'));
            }

            brandData.socialPosts.forEach((post, i) => {
                if (post.imageUrl) {
                    promises.push(downloadImage(post.imageUrl, `social_post_${i + 1}.png`));
                }
            });

            await Promise.all(promises);

            // 3. Generate Zip
            const content = await zip.generateAsync({ type: 'blob' });
            saveAs(content, `${brandData.brandName.replace(/\s+/g, '_')}_BrandKit.zip`);
        } catch (error) {
            console.error('Download failed:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="w-5 h-5 text-blue-400" />
                        </motion.div>
                        <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            Brand<span className="gradient-text">AI</span>
                        </h1>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {brandData && (
                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDownload}
                                disabled={isDownloading}
                                className="p-2 sm:px-5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white transition-all duration-300 font-medium text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20"
                                title="Download Brand Kit"
                            >
                                {isDownloading ? (
                                    <Loader2 className="w-5 h-5 sm:w-4 sm:h-4 animate-spin" />
                                ) : (
                                    <Download className="w-5 h-5 sm:w-4 sm:h-4" />
                                )}
                                <span className="hidden sm:inline">
                                    {isDownloading ? 'Downloading...' : 'Download Brand Kit'}
                                </span>
                            </motion.button>
                        )}

                        {showCreateButton && (
                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onCreateNew}
                                className="p-2 sm:px-5 sm:py-2 rounded-xl glass text-gray-300 hover:text-white hover:border-blue-500/50 transition-all duration-300 font-medium border border-white/10 text-sm flex items-center gap-2"
                                title="Create New Brand"
                            >
                                <span className="text-xl sm:text-sm leading-none sm:leading-normal font-bold">+</span>
                                <span className="hidden sm:inline">Create New Brand</span>
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
