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
        <Card className="w-full max-w-xl mx-auto bg-white/70 backdrop-blur-xl border-slate-200 shadow-xl">
            <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Create Your Brand
                </CardTitle>
                <p className="text-slate-600 mt-2 font-light">Fill in the details to generate your unique identity</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="space-y-2"
                    >
                        <label htmlFor="brandName" className="text-sm font-semibold text-slate-700">
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
                            className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="space-y-2"
                    >
                        <label htmlFor="description" className="text-sm font-semibold text-slate-700">
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
                            className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="space-y-2"
                    >
                        <label htmlFor="vibe" className="text-sm font-semibold text-slate-700">
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
                            className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <Button
                            type="submit"
                            variant="gradient"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-6 text-base shadow-lg hover:shadow-xl"
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
