'use client';

import { useState } from 'react';
import { BrandForm } from '@/components/features/BrandForm';
import { BrandShowcase } from '@/components/features/BrandShowcase';
import { LoadingTracker } from '@/components/features/LoadingTracker';
import { BrandIdentity, GenerationRequest } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';

interface LoadingStep {
  id: string;
  label: string;
  status: 'pending' | 'loading' | 'completed';
}

export default function Home() {
  const [brandData, setBrandData] = useState<BrandIdentity | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([]);

  const updateStepStatus = (stepId: string, status: 'loading' | 'completed') => {
    setLoadingSteps(prev =>
      prev.map(step => (step.id === stepId ? { ...step, status } : step))
    );
  };

  const handleGenerate = async (request: GenerationRequest) => {
    setIsLoading(true);
    setError(null);

    // Initialize loading steps
    setLoadingSteps([
      { id: 'strategy', label: 'Generating brand strategy...', status: 'loading' },
      { id: 'tagline', label: 'Creating tagline...', status: 'pending' },
      { id: 'colors', label: 'Selecting color palette...', status: 'pending' },
      { id: 'typography', label: 'Choosing typography...', status: 'pending' },
      { id: 'logo', label: 'Generating logo...', status: 'pending' },
      { id: 'social', label: 'Creating social media images...', status: 'pending' },
    ]);

    try {
      // Simulate step progression
      setTimeout(() => updateStepStatus('strategy', 'completed'), 1000);
      setTimeout(() => {
        updateStepStatus('tagline', 'loading');
        setTimeout(() => updateStepStatus('tagline', 'completed'), 500);
      }, 1000);
      setTimeout(() => {
        updateStepStatus('colors', 'loading');
        setTimeout(() => updateStepStatus('colors', 'completed'), 500);
      }, 1500);
      setTimeout(() => {
        updateStepStatus('typography', 'loading');
        setTimeout(() => updateStepStatus('typography', 'completed'), 500);
      }, 2000);
      setTimeout(() => updateStepStatus('logo', 'loading'), 2500);
      setTimeout(() => updateStepStatus('social', 'loading'), 5000);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('Failed to generate brand identity');
      }

      const data = await response.json();

      // Complete all steps
      updateStepStatus('logo', 'completed');
      updateStepStatus('social', 'completed');

      // Small delay before showing results
      setTimeout(() => {
        setBrandData(data);
        setLoadingSteps([]);
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoadingSteps([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Loading Tracker */}
      <LoadingTracker steps={loadingSteps} isVisible={isLoading} />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
            className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full glass glow-blue-hover transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
            </motion.div>
            <span className="text-sm font-medium text-gray-300">AI-Powered Brand Creation</span>
            <Zap className="w-4 h-4 text-blue-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Brand<span className="gradient-text">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto font-light"
          >
            Generate a complete brand identity in seconds with AI
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-8 mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
          />
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
                  <div className="inline-block px-6 py-3 rounded-xl glass border border-red-500/30 text-red-400">
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setBrandData(null)}
                  className="px-6 py-3 rounded-xl glass text-gray-300 hover:text-white hover:border-blue-500/50 transition-all duration-300 font-medium glow-blue-hover border border-white/10"
                >
                  ← Create New Brand
                </motion.button>
              </div>
              <BrandShowcase data={brandData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
