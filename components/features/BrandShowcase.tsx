import { BrandIdentity } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
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
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as any } }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-12 w-full max-w-7xl mx-auto mt-12"
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

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4">
                {/* Left Column - Brand Assets */}
                <div className="space-y-8">
                    {/* Logo Section */}
                    <motion.div variants={item}>
                        <Card className="border-white/10 hover:border-blue-500/30 transition-all duration-300 glow-blue-hover">
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
                        <Card className="border-white/10 hover:border-blue-500/30 transition-all duration-300 glow-blue-hover">
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

                    {/* Typography Section */}
                    <motion.div variants={item}>
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
                                        <p className="text-2xl text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                                            The quick brown fox jumps
                                        </p>
                                    </motion.div>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Right Column - Social Media */}
                <div className="space-y-6">
                    <motion.div variants={item}>
                        <h3 className="text-3xl font-bold text-white mb-6 text-center" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            Social Media Strategy
                        </h3>

                        {/* 2-Column Grid for Posts */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {data.socialPosts.map((post, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.5 + i * 0.15 }}
                                    className="space-y-3"
                                >
                                    {/* Post Card */}
                                    <Card className="border-white/10 hover:border-blue-500/30 transition-all duration-300 overflow-hidden">
                                        <CardContent className="p-0">
                                            {/* Image */}
                                            {post.imageUrl && (
                                                <div className="relative aspect-square overflow-hidden bg-white/5">
                                                    <img
                                                        src={post.imageUrl}
                                                        alt={`Social post ${i + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}

                                            {/* Caption */}
                                            <div className="p-4 bg-white/5">
                                                <div className="flex items-start gap-3 mb-3">
                                                    {data.logoUrl && (
                                                        <img
                                                            src={data.logoUrl}
                                                            alt="Brand logo"
                                                            className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                                                        />
                                                    )}
                                                    <div className="flex-1">
                                                        <p className="text-sm font-bold text-white">{data.brandName}</p>
                                                        <p className="text-xs text-gray-400">@{data.brandName.toLowerCase().replace(/\s+/g, '')}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-300 line-clamp-3">{post.caption}</p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Copy Buttons */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={async () => {
                                                if (post.imageUrl) {
                                                    await navigator.clipboard.writeText(post.imageUrl);
                                                }
                                            }}
                                            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all duration-300 text-xs text-gray-400 hover:text-white flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Image
                                        </button>
                                        <button
                                            onClick={async () => {
                                                await navigator.clipboard.writeText(post.caption);
                                            }}
                                            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all duration-300 text-xs text-gray-400 hover:text-white flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Caption
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
