import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const experiences = [
    {
        id: 1,
        year: "2024",
        role: "Senior Frontend Engineer",
        company: "TechFlow Solutions",
        description: "Architecting the next generation of enterprise SaaS. Optimized core rendering engine improving performance by 40%.",
        color: "#E0F2FE", // Sky Blue
        rotate: -2
    },
    {
        id: 2,
        year: "2022",
        role: "Creative Developer",
        company: "Pixel Perfect Agency",
        description: "Blurring the line between websites and art. Created award-winning interactive campaigns for global fashion brands.",
        color: "#FCE7F3", // Pink
        rotate: 1
    },
    {
        id: 3,
        year: "2021",
        role: "Full Stack Developer",
        company: "StartUp Inc.",
        description: "Built the foundation. Scaled backend APIs to handle 100k+ concurrent users while shipping features weekly.",
        color: "#FEF3C7", // Amber
        rotate: -1
    }
];

const Experience = () => {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Determine active card based on scroll or click
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.min(
            Math.floor(latest * experiences.length),
            experiences.length - 1
        );
        setActiveIndex(index);
    });

    const handleClick = (index) => {
        // Scroll to the specific section (this is a bit complex with just sticky, 
        // implies we might just want to set state if we weren't strictly scroll-bound,
        // but for a hybrid, we'll let scroll drive it mostly or just set state visual override)
        setActiveIndex(index);
    };

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-white">
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center transition-colors duration-700 ease-in-out"
                style={{ backgroundColor: experiences[activeIndex]?.color || '#ffffff' }}
            >
                {/* Background Typography */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                    <motion.span
                        key={activeIndex}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        className="text-[20vw] font-serif font-bold text-black/5 select-none whitespace-nowrap"
                    >
                        {experiences[activeIndex].year}
                    </motion.span>
                </div>

                {/* Section Title */}
                <h2 className="absolute top-32 left-6 md:left-12 text-sm font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/60 z-20 mix-blend-multiply">
                    Experience / History
                </h2>

                {/* Card Stack */}
                <div className="relative w-full max-w-md md:max-w-2xl aspect-[3/2] flex items-center justify-center perspective-1000">
                    <div className="relative w-full h-full">
                        {experiences.map((exp, index) => {
                            const isActive = index === activeIndex;
                            const isPast = index < activeIndex;

                            return (
                                <motion.div
                                    key={exp.id}
                                    className="absolute inset-0 bg-white rounded-xl shadow-xl border border-black/5 p-6 md:p-12 flex flex-col justify-between cursor-pointer origin-bottom"
                                    initial={{ scale: 0.9, y: 50, opacity: 0 }}
                                    animate={{
                                        scale: isActive ? 1 : isPast ? 1.1 : 0.8 + (0.05 * (experiences.length - index)),
                                        y: isActive ? 0 : isPast ? -800 : 20 * (index - activeIndex), // Move past cards WAY up
                                        opacity: isActive ? 1 : isPast ? 0 : 0.5, // Fade past cards out
                                        rotate: isActive ? 0 : isPast ? (Math.random() * 10 - 5) : exp.rotate + (index - activeIndex) * 2, // Random toss for past
                                        zIndex: experiences.length - index,
                                        filter: isActive ? 'none' : isPast ? 'blur(0px)' : 'blur(4px)', // No blur for past (it's gone), blur for future
                                        // Force hardware acceleration and crisp text
                                        WebkitFontSmoothing: "antialiased",
                                        backfaceVisibility: "hidden"
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        ease: "easeInOut", // Standard ease for reliable movement
                                        type: "tween", // Avoid spring for large exits to prevent massive overshoots/bouncing back
                                        filter: { duration: 0.3, ease: "linear" }
                                    }}
                                    onClick={() => handleClick(index)}
                                    whileHover={{ scale: isActive ? 1.02 : 0.95 }}
                                >
                                    {/* Paper Texture/Hole punch for 'Note' feel */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-3 md:h-4 bg-black/5 rounded-b-lg mb-4" />
                                    <div className="absolute top-3 md:top-4 left-1/2 -translate-x-1/2 w-2 md:w-3 h-2 md:h-3 bg-black/20 rounded-full" />

                                    <div className="mt-6 md:mt-8">
                                        <div className="flex flex-col gap-2 mb-3 md:mb-4">
                                            <h3 className="text-xl md:text-5xl font-serif text-[#1A1A1A] break-words leading-tight">{exp.role}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs md:text-sm font-sans uppercase tracking-wider text-[#1A1A1A]/50 border border-[#1A1A1A]/20 px-2 md:px-3 py-0.5 md:py-1 rounded-full whitespace-nowrap">
                                                    {exp.year}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-sm md:text-xl text-[#1A1A1A]/60 font-sans break-words">{exp.company}</p>
                                    </div>

                                    <div className="mt-4 md:mt-6">
                                        <div className="w-full h-px bg-[#1A1A1A]/10 mb-3 md:mb-4" />
                                        <p className="text-xs md:text-xl font-sans leading-relaxed text-[#1A1A1A]/80 break-words">
                                            {exp.description}
                                        </p>
                                    </div>

                                    {/* Decoration */}
                                    <div className="absolute bottom-4 md:bottom-6 right-6 md:right-8 opacity-10 hidden md:block">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 19l7-7 3 3-7 7-3-3z" />
                                            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                                            <path d="M2 2l7.586 7.586" />
                                            <circle cx="11" cy="11" r="2" />
                                        </svg>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-12 flex gap-4 z-20">
                    {experiences.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-[#1A1A1A] w-8' : 'bg-[#1A1A1A]/20 hover:bg-[#1A1A1A]/50'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
