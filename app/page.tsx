'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setBrandData, updateLogoUrl, updateSocialImage, setLoading, setError, resetBrand } from '@/store/brandSlice';
import { useState } from 'react';
import { BrandForm } from '@/components/features/BrandForm';
import { BrandShowcase } from '@/components/features/BrandShowcase';
import { LoadingTracker } from '@/components/features/LoadingTracker';
import { Navbar } from '@/components/layout/Navbar';
import { GenerationRequest } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingStep {
  id: string;
  label: string;
  status: 'pending' | 'loading' | 'completed';
}

export default function Home() {
  const dispatch = useDispatch();
  const { data: brandData, error } = useSelector((state: RootState) => state.brand);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([]);

  const updateStepStatus = (stepId: string, status: 'loading' | 'completed') => {
    setLoadingSteps(prev =>
      prev.map(step => (step.id === stepId ? { ...step, status } : step))
    );
  };

  const handleGenerate = async (request: GenerationRequest) => {
    setIsLoading(true);
    dispatch(setError(null));

    // Initialize loading steps
    setLoadingSteps([
      { id: 'strategy', label: 'Developing brand strategy...', status: 'loading' },
      { id: 'tagline', label: 'Crafting tagline...', status: 'pending' },
      { id: 'colors', label: 'Selecting color palette...', status: 'pending' },
      { id: 'typography', label: 'Choosing typography...', status: 'pending' },
      { id: 'logo', label: 'Designing logo...', status: 'pending' },
      { id: 'social', label: 'Creating social media assets...', status: 'pending' },
    ]);

    try {
      // 1. Generate Strategy (Text)
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) throw new Error('Failed to generate brand strategy');

      const data = await response.json();

      // Update UI with text data immediately
      dispatch(setBrandData(data));

      // Mark text steps as completed
      updateStepStatus('strategy', 'completed');
      updateStepStatus('tagline', 'completed');
      updateStepStatus('colors', 'completed');
      updateStepStatus('typography', 'completed');

      // Start image generation
      updateStepStatus('logo', 'loading');
      updateStepStatus('social', 'loading');

      // 2. Generate Images in Parallel
      const imagePromises = [];

      // Logo Generation
      if (data.logoPrompt) {
        imagePromises.push(
          fetch('/api/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: data.logoPrompt }),
          })
            .then(res => res.json())
            .then(imgData => {
              if (imgData.imageUrl) {
                dispatch(updateLogoUrl(imgData.imageUrl));
                updateStepStatus('logo', 'completed');
              }
            })
            .catch(console.error)
        );
      }

      // Social Images Generation
      if (data.socialImagePrompt) {
        // Generate 3 social images
        for (let i = 0; i < 3; i++) {
          imagePromises.push(
            fetch('/api/generate-image', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ prompt: data.socialImagePrompt }),
            })
              .then(res => res.json())
              .then(imgData => {
                if (imgData.imageUrl) {
                  dispatch(updateSocialImage({ index: i, imageUrl: imgData.imageUrl }));
                }
              })
              .catch(console.error)
          );
        }
      }

      // Wait for all images (or at least trigger them)
      await Promise.all(imagePromises);

      updateStepStatus('social', 'completed');

      // Small delay to ensure UI updates are smooth
      setTimeout(() => {
        setLoadingSteps([]);
        setIsLoading(false);
      }, 500);

    } catch (err) {
      console.error(err);
      dispatch(setError(err instanceof Error ? err.message : 'Something went wrong'));
      setLoadingSteps([]);
      setIsLoading(false);
    }
  };

  const handleCreateNew = () => {
    dispatch(resetBrand());
  };

  return (
    <>
      {/* Navbar */}
      <Navbar showCreateButton={!!brandData && !isLoading} onCreateNew={handleCreateNew} />

      <main className="min-h-screen pt-16 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
          {/* Content */}
          <AnimatePresence mode="wait">
            {!brandData ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="pt-20"
              >
                {/* Hero Section */}
                <div className="text-center mb-16">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto font-light mb-8"
                  >
                    Generate a complete brand identity in seconds with AI
                  </motion.p>

                  {/* Decorative line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
                  />
                </div>

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
                className="pt-8"
              >
                <BrandShowcase data={brandData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
