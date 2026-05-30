import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowUpRight,
    Download,
    FileText
} from 'lucide-react';
import usePortfolioData from '../hooks/usePortfolioData';
import { Sticker } from '../about';

const TechPlayground = () => {
    const { data: { services, about } } = usePortfolioData();
    const [hoveredService, setHoveredService] = useState(null);

    return (
        <section className="py-32 px-6 md:px-12 bg-[#F5F5F0]">
            <div className="max-w-6xl mx-auto">

                {/* SECTION LABEL */}
                <motion.h2
                    className="text-sm font-sans uppercase tracking-widest mb-16 opacity-60 ml-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                >
                    Capabilities
                </motion.h2>

                {/* SERVICES */}
                <div className="flex flex-col">
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            className="relative border-t border-[#1A1A1A]/20 py-12 group cursor-pointer"
                            onMouseEnter={() => setHoveredService(service.id)}
                            onMouseLeave={() => setHoveredService(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
                                <div className="flex items-baseline gap-8">
                                    <span className="font-sans text-sm opacity-50">
                                        {service.id}
                                    </span>

                                    <h3 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] group-hover:italic transition-all duration-300">
                                        {service.title}
                                    </h3>
                                </div>

                                <div className="mt-4 md:mt-0 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="font-sans text-sm uppercase tracking-wider">
                                        {service.tags.join(' • ')}
                                    </span>

                                    <ArrowUpRight className="w-6 h-6" />
                                </div>
                            </div>

                            <motion.div
                                className="absolute inset-0 bg-[#1A1A1A]/5 z-0"
                                initial={{ scaleY: 0 }}
                                animate={{
                                    scaleY:
                                        hoveredService === service.id ? 1 : 0
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                style={{ originY: 1 }}
                            />
                        </motion.div>
                    ))}

                    <div className="border-t border-[#1A1A1A]/20" />
                </div>

                {/* CV SECTION */}
                <div className="relative mt-32 h-[280px] md:h-[350px]">

                    {/* background text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <h2 className="text-[20vw] md:text-[12vw] font-serif text-black/[0.03] leading-none select-none">
                            CV
                        </h2>
                    </div>

                    {/* label */}
                    <div className="absolute left-0 top-0">
                        <span className="text-xs uppercase tracking-[0.3em] text-black/40">
                            Résumé
                        </span>
                    </div>

                    {/* main sticker */}

                    <Sticker
                        delay={0.5}
                        rotate={8}
                        x="50%"
                        y="50%"
                    >
                        <a
                            href={about?.cvLink || "/resume.pdf"}
                            download
                            className="
            w-32 h-32 md:w-40 md:h-40
            rounded-full
            bg-[#FF9398]
            border border-black/10
            flex flex-col items-center justify-center
            shadow-lg
            text-[#1A1A1A]
            relative
            overflow-hidden
            group
        "
                        >
                            {/* rotating ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="
                absolute inset-2
                rounded-full
                border border-dashed border-black/20
            "
                            />

                            <FileText
                                size={26}
                                strokeWidth={1.5}
                                className="mb-2"
                            />

                            <span className="text-[11px] uppercase tracking-[0.2em] font-medium">
                                Download
                            </span>

                            <span className="text-xs font-serif italic">
                                CV
                            </span>

                            <motion.div
                                className="absolute bottom-4"
                                animate={{ y: [0, -3, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.5
                                }}
                            >
                                <Download size={14} />
                            </motion.div>
                        </a>
                    </Sticker>

                    <Sticker
                        delay={0.7}
                        rotate={15}
                        x="75%"
                        y="20%"
                    >
                        <div
                            className="
        w-20 h-20 md:w-24 md:h-24
        rounded-full
        bg-[#FFF4BD]
        border border-black/10
        flex items-center justify-center
        shadow-md
        "
                        >
                            <span className="text-3xl md:text-4xl">
                                :D
                            </span>
                        </div>
                    </Sticker>
                    <Sticker
                        delay={0.8}
                        rotate={8}
                        x="18%"
                        y="28%"
                    >
                        <div
                            className="
            px-5 py-3
            bg-white
            rounded-2xl
            border border-black/10
            shadow-md
        "
                        >
                            <span className="font-serif italic text-sm">
                                take a look →
                            </span>
                        </div>
                    </Sticker>


                    {/* side note */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="
                            absolute
                            bottom-0
                            right-0
                            max-w-xs
                            text-right
                            hidden md:block
                        "
                    >
                        <p className="text-sm text-black/50 leading-relaxed">
                            A concise overview of my projects,
                            technical skills, and journey as a
                            full-stack developer.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TechPlayground;