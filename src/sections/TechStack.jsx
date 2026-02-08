import React from 'react';
import { motion } from 'framer-motion';

const stack = [
    { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"] },
    { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Supabase", "GraphQL"] },
    { category: "Design", items: ["Figma", "Adobe CC", "Blender", "UI/UX", "Prototyping"] }
];

const TechStack = () => {
    return (
        <section className="py-24 bg-[#F5F5F0] text-[#1A1A1A] overflow-hidden">
            <div className="mb-16 text-center px-6">
                <motion.h2
                    className="text-4xl md:text-6xl font-serif mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    Technological <span className="italic text-accent-blue">Arsenal</span>
                </motion.h2>
            </div>

            {/* Mobile: Clean Grid Layout */}
            <div className="lg:hidden px-6 space-y-12">
                {stack.map((group, index) => (
                    <motion.div
                        key={group.category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <h3 className="text-sm font-sans uppercase tracking-widest text-[#1A1A1A]/50 mb-6">
                            {group.category}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {group.items.map((item, idx) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + idx * 0.05 }}
                                    className="px-4 py-2 bg-white rounded-full border border-[#1A1A1A]/10 shadow-sm"
                                >
                                    <span className="text-sm font-sans text-[#1A1A1A]">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Desktop: Marquee Effect */}
            <div className="hidden lg:flex flex-col gap-8 md:gap-12">
                {stack.map((group, index) => (
                    <div key={group.category} className="relative">
                        {/* Category Label */}
                        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 bg-[#F5F5F0] pr-4">
                            <span className="text-sm font-sans uppercase tracking-widest text-[#1A1A1A]/50">{group.category}</span>
                        </div>

                        {/* Infinite Marquee */}
                        <div className="relative flex overflow-hidden group">
                            <motion.div
                                className="flex whitespace-nowrap"
                                animate={{ x: index % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                                transition={{
                                    repeat: Infinity,
                                    ease: "linear",
                                    duration: 20 + (index * 5)
                                }}
                            >
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="flex gap-4 md:gap-8 mx-4 md:mx-8">
                                        {group.items.map((item) => (
                                            <span
                                                key={item}
                                                className="text-6xl md:text-8xl font-serif text-transparent stroke-text hover:text-[#1A1A1A] hover:stroke-0 transition-colors duration-300 cursor-default"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TechStack;
