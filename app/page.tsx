'use client';

import { useState } from 'react';
import { BrandForm } from '@/components/features/BrandForm';
import { BrandShowcase } from '@/components/features/BrandShowcase';
import { BrandIdentity, GenerationRequest } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [brandData, setBrandData] = useState<BrandIdentity | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (request: GenerationRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('Failed to generate brand identity');
      }

      const data = await response.json();
      setBrandData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass text-white">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Brand Creation</span>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Brand<span className="text-pink-300">AI</span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto font-light">
            Generate a complete brand identity in seconds with the power of AI
          </p>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {!brandData ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <BrandForm onSubmit={handleGenerate} isLoading={isLoading} />
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center"
                >
                  <div className="inline-block px-6 py-3 rounded-xl bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-100">
                    {error}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="showcase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 text-center">
                <button
                  onClick={() => setBrandData(null)}
                  className="px-6 py-3 rounded-xl glass text-white hover:bg-white/20 transition-all font-medium"
                >
                  ← Create New Brand
                </button>
              </div>
              <BrandShowcase data={brandData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
