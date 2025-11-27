import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Loader } from '@/components/ui/Loader';
import { GenerationRequest } from '@/types';
import { motion } from 'framer-motion';

interface BrandFormProps {
    onSubmit: (data: GenerationRequest) => void;
    isLoading: boolean;
}

export function BrandForm({ onSubmit, isLoading }: BrandFormProps) {
    const [formData, setFormData] = useState<GenerationRequest>({
        brandName: '',
        description: '',
        vibe: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Card className="w-full max-w-xl mx-auto glass border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Create Your Brand Identity
                </CardTitle>
                <p className="text-white/70 mt-2">Fill in the details below to generate your unique brand</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-2"
                    >
                        <label htmlFor="brandName" className="text-sm font-semibold text-white/90">
                            Brand Name
                        </label>
                        <Input
                            id="brandName"
                            placeholder="e.g. Zenith"
                            value={formData.brandName}
                            onChange={(e) =>
                                setFormData({ ...formData, brandName: e.target.value })
                            }
                            required
                            disabled={isLoading}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-white/40"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-2"
                    >
                        <label htmlFor="description" className="text-sm font-semibold text-white/90">
                            Description
                        </label>
                        <Input
                            id="description"
                            placeholder="e.g. A futuristic coffee shop serving robot-brewed espresso"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            required
                            disabled={isLoading}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-white/40"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                    >
                        <label htmlFor="vibe" className="text-sm font-semibold text-white/90">
                            Vibe / Style
                        </label>
                        <Input
                            id="vibe"
                            placeholder="e.g. Minimalist, Cyberpunk, Organic"
                            value={formData.vibe}
                            onChange={(e) =>
                                setFormData({ ...formData, vibe: e.target.value })
                            }
                            required
                            disabled={isLoading}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-white/40"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader className="mr-2" /> Generating Your Brand...
                                </>
                            ) : (
                                '✨ Generate Brand Identity'
                            )}
                        </Button>
                    </motion.div>
                </form>
            </CardContent>
        </Card>
    );
}
