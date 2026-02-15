import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
    "Hello",
    "Bonjour",
    "Ciao",
    "Olà",
    "Hallo",
    "Namaste",
    "Konnichiwa",
    "Hola",
    "Zdravstvuyte",
    "Namaste",
];

const Preloader = ({ onComplete }) => {
    const [index, setIndex] = useState(0);
    const [count, setCount] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    useEffect(() => {
        // 1. Text Shuffle Logic
        if (index == words.length - 1) return;
        setTimeout(() => {
            setIndex(index + 1);
        }, index == 0 ? 1000 : 150);
    }, [index]);

    useEffect(() => {
        // 2. Counter Logic
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 700); // Wait for exit animation
                    return 100;
                }
                // Non-linear increment for "real" feel
                const jump = Math.floor(Math.random() * 10) + 1;
                return Math.min(prev + jump, 100);
            });
        }, 150);
        return () => clearInterval(interval);
    }, [onComplete]);

    // Curve for the curtain reveal
    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0 L0 0`;
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="preloader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }} 
                transition={{ duration: 0.5, delay: 0.8 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent pointer-events-none"
            >
                {/* --- THE SHUTTER COLUMNS --- */}
                {/* We create 4 columns that slide up with a stagger */}
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-0 h-full bg-[#141414] z-10 border-r border-[#1F1F1F]"
                        style={{
                            width: '25%',
                            left: `${i * 25}%`
                        }}
                        initial={{ y: 0 }}
                        exit={{
                            y: "-100%",
                            transition: {
                                duration: 0.8,
                                ease: [0.76, 0, 0.24, 1],
                                delay: i * 0.1 
                            }
                        }}
                    />
                ))}

                {/* --- CONTENT LAYER --- */}
                <motion.div
                    className="relative z-20 text-[#F3F0E7] flex flex-col items-center justify-center w-full h-full mix-blend-difference"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                >

                    {/* 1. The Dynamic Greeting */}
                    <div className="flex items-center gap-2 mb-4 overflow-hidden h-8">
                        <motion.span
                            className="w-2 h-2 bg-[#F3F0E7] rounded-full"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className="text-xl font-sans uppercase tracking-widest">
                            {words[index % words.length]}
                        </span>
                    </div>

                    {/* 2. The Giant Counter */}
                    <div className="overflow-hidden">
                        <motion.h1
                            className="text-[15vw] md:text-[20vw] font-serif leading-none tracking-tighter"
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        >
                            {count}
                        </motion.h1>
                    </div>

                    {/* 3. Footer Info */}
                    <div className="absolute bottom-12 w-full px-12 flex justify-between uppercase text-xs tracking-widest opacity-50">
                        <span>Trisit Portfolio</span>
                        <span>©2026</span>
                    </div>

                </motion.div>

                {/* --- SVG CURVE (The "Smile" Reveal) --- */}
                {dimension.width > 0 && (
                    <motion.svg
                        className="absolute top-0 w-full h-[calc(100%+300px)] z-10 fill-[#141414]"
                        initial={{ d: initialPath }}
                        exit={{
                            d: targetPath,
                            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
                        }}
                    />
                )}

            </motion.div>
        </AnimatePresence>
    );
};

export default Preloader;