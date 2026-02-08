import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            setTimeout(onComplete, 1000); // Wait for exit animation
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#F5F5F0]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    <motion.h1
                        className="text-4xl md:text-6xl font-serif text-[#1A1A1A] tracking-widest"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        P l e a s e &nbsp; w a i t . . .
                    </motion.h1>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
