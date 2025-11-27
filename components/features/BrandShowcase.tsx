import { BrandIdentity } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { SocialMockup } from './SocialMockup';
import { motion } from 'framer-motion';

interface BrandShowcaseProps {
    data: BrandIdentity;
}

export function BrandShowcase({ data }: BrandShowcaseProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10 w-full max-w-6xl mx-auto mt-12"
        >
            {/* Header Section */}
            <motion.div variants={item} className="text-center space-y-4 px-4">
                <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {data.brandName}
                </h2>
                <p className="text-2xl sm:text-3xl text-white/80 font-light italic">"{data.tagline}"</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
                {/* Logo Section */}
                <motion.div variants={item}>
                    <Card className="h-full border-white/20 hover:border-white/30 transition-all">
                        <CardHeader>
                            <CardTitle className="text-white text-xl">Logo Concept</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center p-8">
                            {data.logoUrl ? (
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                    <img
                                        src={data.logoUrl}
                                        alt="Logo"
                                        className="relative w-64 h-64 object-contain rounded-2xl shadow-2xl"
                                    />
                                </div>
                            ) : (
                                <div className="w-64 h-64 bg-white/5 rounded-2xl flex items-center justify-center text-white/50">
                                    No Logo
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Colors Section */}
                <motion.div variants={item}>
                    <Card className="h-full border-white/20 hover:border-white/30 transition-all">
                        <CardHeader>
                            <CardTitle className="text-white text-xl">Color Palette</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-5 gap-3">
                                {data.colors.map((color, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className="space-y-2 text-center"
                                    >
                                        <div
                                            className="w-full aspect-square rounded-2xl shadow-lg border-2 border-white/20 hover:scale-110 transition-transform cursor-pointer"
                                            style={{ backgroundColor: color }}
                                        />
                                        <span className="text-xs font-mono text-white/70 block">{color}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Typography Section */}
            <motion.div variants={item} className="px-4">
                <Card className="border-white/20 hover:border-white/30 transition-all">
                    <CardHeader>
                        <CardTitle className="text-white text-xl">Typography</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        {data.typography.map((font, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 + i * 0.2 }}
                                className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                            >
                                <p className="text-sm text-white/60 mb-2 font-medium">{font.usage}</p>
                                <p className="text-xl font-bold text-white mb-3">{font.fontFamily}</p>
                                <p className="text-3xl text-white/90" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    The quick brown fox jumps over the lazy dog
                                </p>
                            </motion.div>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Social Media Section */}
            <motion.div variants={item} className="px-4">
                <h3 className="text-3xl font-bold text-white mb-8 text-center" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Social Media Strategy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.socialPosts.map((post, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5 + i * 0.2 }}
                        >
                            <SocialMockup
                                brandName={data.brandName}
                                caption={post.caption}
                                imageUrl={post.imageUrl}
                                logoUrl={data.logoUrl}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
