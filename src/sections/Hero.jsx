import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-[#F3eee8] px-4 md:px-0" data-bgcolor="#F3eee8">

            {/* Pink 'Art' Watermark Background - Based on Reference */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-40">
                <span className="text-[40vw] md:text-[35vw] font-serif text-accent-pink leading-none translate-y-20">CS</span>
            </div>

            {/* Main Content Layer */}
            <div className="z-10 relative flex flex-col items-center justify-center h-full w-full px-4">

                {/* Top Block: Welcome to the */}
                <motion.h1
                    className="text-[10vw] md:text-[6vw] font-serif font-light text-[#1A1A1A] leading-none mb-[0.5vw] text-center"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.9] }}
                >
                    Welcome to the
                </motion.h1>

                {/* Middle Block: playground (left) + Bio (right/center) */}
                <div className="active relative w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 my-[-2vw]">

                    <motion.span
                        className="text-[12vw] md:text-[8vw] font-serif font-normal text-[#1A1A1A] leading-none text-center"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.6, 0.01, 0.05, 0.9] }}
                    >
                        portfolio
                    </motion.span>

                    <motion.div
                        className="relative z-20 md:mt-4 max-w-[250px] md:max-w-[200px] text-xs md:text-xs font-sans text-center md:text-left text-[#1A1A1A]/70 px-4 md:px-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        ( Hi! I'm Trisit, a student and Developer. Welcome to my digital garden. )
                    </motion.div>

                </div>

                {/* 'of' Circle */}
                <motion.div
                    className="relative my-2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <span className="text-[8vw] md:text-[4vw] font-serif italic border border-[#1A1A1A] rounded-full px-4 md:px-6 py-1 md:py-2">of</span>
                </motion.div>

                {/* Bottom Block: chungi yoo */}
                <div className="flex flex-col items-center mt-[-1vw]">
                    <motion.h2
                        className="text-[18vw] md:text-[12vw] font-serif font-medium text-[#1A1A1A] leading-[0.8] text-center"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: [0.6, 0.01, 0.05, 0.9] }}
                    >
                        Trisit
                    </motion.h2>
                </div>

                {/* Role */}
                <motion.p
                    className="mt-8 text-lg md:text-2xl font-serif text-[#1A1A1A] text-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    coding, but make it chill
                </motion.p>
            </div>

            {/* Infinite Marquee - Kept low opacity as background texture */}
            <div className="absolute bottom-4 w-full overflow-hidden whitespace-nowrap z-0 opacity-20 hidden md:block">
                <div className="inline-block animate-marquee">
                    <span className="text-8xl font-serif text-transparent stroke-text mx-4">
                        • INTERACTIVE • CREATIVE • DESIGN •
                    </span>
                </div>
            </div>

        </section>
    );
};

export default Hero;
