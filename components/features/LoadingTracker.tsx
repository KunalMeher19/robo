import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

interface LoadingStep {
    id: string;
    label: string;
    status: 'pending' | 'loading' | 'completed';
}

interface LoadingTrackerProps {
    steps: LoadingStep[];
    isVisible: boolean;
}

export function LoadingTracker({ steps, isVisible }: LoadingTrackerProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 100, y: -20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-6 right-6 z-50 w-80"
                >
                    <div className="glass border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                            Generating Brand...
                        </h3>
                        <div className="space-y-3">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="flex-shrink-0">
                                        {step.status === 'completed' ? (
                                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        ) : step.status === 'loading' ? (
                                            <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                                        ) : (
                                            <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
                                        )}
                                    </div>
                                    <span
                                        className={`text-sm ${step.status === 'completed'
                                                ? 'text-green-400'
                                                : step.status === 'loading'
                                                    ? 'text-blue-400'
                                                    : 'text-gray-500'
                                            }`}
                                    >
                                        {step.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
