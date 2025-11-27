import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface NavbarProps {
    showCreateButton: boolean;
    onCreateNew: () => void;
}

export function Navbar({ showCreateButton, onCreateNew }: NavbarProps) {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="w-5 h-5 text-blue-400" />
                        </motion.div>
                        <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            Brand<span className="gradient-text">AI</span>
                        </h1>
                    </div>

                    {/* Create New Brand Button */}
                    {showCreateButton && (
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onCreateNew}
                            className="px-5 py-2 rounded-xl glass text-gray-300 hover:text-white hover:border-blue-500/50 transition-all duration-300 font-medium border border-white/10 text-sm"
                        >
                            + Create New Brand
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.nav>
    );
}
