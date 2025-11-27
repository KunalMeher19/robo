import { BrandIdentity } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { SocialMockup } from './SocialMockup';
import { CopyButton } from '@/components/ui/CopyButton';
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
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-12 w-full max-w-6xl mx-auto mt-12"
        >
            {/* Header Section */}
            <motion.div variants={item} className="text-center space-y-4 px-4">
                <div className="flex items-center justify-center gap-3">
                    <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {data.brandName}
                    </h2>
                    <CopyButton text={data.brandName} />
                </div>
                <div className="flex items-center justify-center gap-3">
                    <p className="text-2xl sm:text-3xl text-gray-400 font-light italic">"{data.tagline}"</p>
                    <CopyButton text={data.tagline} />
                </div>
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
                />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
                {/* Logo Section */}
                <motion.div variants={item}>
                    <Card className="h-full border-white/10 hover:border-blue-500/30 transition-all duration-300 glow-blue-hover">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-white text-xl">Logo Concept</CardTitle>
                            {data.logoUrl && <CopyButton text={data.logoUrl} />}
                        </CardHeader>
                        <CardContent className="flex items-center justify-center p-8">
                            {data.logoUrl ? (
                                <motion.div
                                    className="relative group"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                                    <img
                                        src={data.logoUrl}
                                        alt="Logo"
                                        className="relative w-64 h-64 object-contain rounded-2xl"
                                    />
                                </motion.div>
                            ) : (
                                <div className="w-64 h-64 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500">
                                    No Logo
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Colors Section */}
                <motion.div variants={item}>
                    <Card className="h-full border-white/10 hover:border-blue-500/30 transition-all duration-300 glow-blue-hover">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-white text-xl">Color Palette</CardTitle>
                            <CopyButton text={data.colors.join(', ')} />
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-5 gap-3">
                                {data.colors.map((color, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        className="space-y-2 text-center cursor-pointer group"
                                    >
                                        <div className="relative">
                                            <div
                                                className="w-full aspect-square rounded-2xl shadow-lg border-2 border-white/10 hover:border-white/30 transition-all duration-300"
                                                style={{ backgroundColor: color }}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <CopyButton text={color} className="bg-black/50" />
                                            </div>
                                        </div>
                                        <span className="text-xs font-mono text-gray-400 block">{color}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Typography Section */}
            <motion.div variants={item} className="px-4">
                <Card className="border-white/10 hover:border-blue-500/30 transition-all duration-300 glow-blue-hover">
                    <CardHeader>
                        <CardTitle className="text-white text-xl">Typography</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        {data.typography.map((font, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 + i * 0.2 }}
                                whileHover={{ x: 10 }}
                                className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm text-gray-400 font-medium">{font.usage}</p>
                                    <CopyButton text={font.fontFamily} />
                                </div>
                                <p className="text-xl font-bold text-white mb-3">{font.fontFamily}</p>
                                <p className="text-3xl text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
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
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ delay: 1.5 + i * 0.2, type: "spring" }}
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            className="relative group"
                        >
                            <SocialMockup
                                brandName={data.brandName}
                                caption={post.caption}
                                imageUrl={post.imageUrl}
                                logoUrl={data.logoUrl}
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <CopyButton text={post.caption} className="bg-black/70" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
