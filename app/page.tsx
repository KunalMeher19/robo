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
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">AI-Powered Brand Creation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-slate-900 mb-6 tracking-tight"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Brand<span className="text-blue-600">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl sm:text-2xl text-slate-600 max-w-2xl mx-auto font-light"
          >
            Generate a complete brand identity in seconds
          </motion.p>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {!brandData ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <BrandForm onSubmit={handleGenerate} isLoading={isLoading} />
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center"
                >
                  <div className="inline-block px-6 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700">
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
              transition={{ duration: 0.6 }}
            >
              <div className="mb-10 text-center">
                <button
                  onClick={() => setBrandData(null)}
                  className="px-6 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-white/80 hover:border-slate-300 transition-all font-medium shadow-sm"
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
