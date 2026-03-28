import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import usePortfolioData from '../hooks/usePortfolioData';

// --- CARD COMPONENT ---
const Card = ({ project, index, total, scrollYProgress }) => {
    const step = 1 / total;
    const start = index * step;
    const end = start + step;

    const y = useTransform(scrollYProgress, [start, end], [800, index * -20]); 
    const scale = useTransform(scrollYProgress, [start, end], [0.8, 1]);
    const rotateValue = (index % 2 === 0 ? -1 : 1) * (Math.random() * 4 + 2); 

    const [isHovered, setHovered] = useState(false);

    return (
        <motion.div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
            style={{ y, scale, zIndex: index }}
        >
            <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-[320px] md:w-[400px] aspect-[3/4.2] rounded-[2rem] overflow-hidden cursor-pointer pointer-events-auto shadow-2xl origin-bottom bg-[#1A1A1A]"
                style={{
                    rotate: isHovered ? 0 : rotateValue,
                    transition: "rotate 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
                }}
                whileHover={{ 
                    y: -60, 
                    scale: 1.05,
                    boxShadow: "0 40px 60px -20px rgba(0, 0, 0, 0.3)",
                    transition: { duration: 0.3, ease: "easeOut" }
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="absolute inset-0 bg-gray-900">
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-90"
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500" />
                </div>

                <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-20">
                    <div className="flex justify-between items-start">
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-medium uppercase tracking-widest">
                            {project.year}
                        </span>
                        <motion.div 
                            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center"
                            animate={{ 
                                scale: isHovered ? 1 : 0,
                                opacity: isHovered ? 1 : 0,
                                rotate: isHovered ? 45 : 0
                            }}
                        >
                            <ArrowUpRight size={20} />
                        </motion.div>
                    </div>

                    <div>
                        <motion.p 
                            className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-white/70"
                            animate={{ x: isHovered ? 10 : 0 }}
                        >
                            {project.category}
                        </motion.p>
                        <motion.h3 
                            className="text-4xl md:text-5xl font-serif leading-[0.9]"
                            animate={{ x: isHovered ? 10 : 0 }}
                        >
                            {project.title}
                        </motion.h3>
                    </div>
                </div>
            </motion.a>
        </motion.div>
    );
};

const Projects = () => {
    const { data: { projects } } = usePortfolioData();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const updateTheme = () => {
        document.body.style.backgroundColor = '#F5F5F0';
    };

    const bgColor = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75],
        ["#d4e4bc", "#e8c3cb", "#c3d1e8", "#e8dcc3"]
    );

    // Parallax for the big text so it moves slightly slower than the scroll
    const yText = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section ref={containerRef} id='projects' className="relative min-h-[400vh] py-24 flex flex-col justify-start items-center">
            
            <motion.div
                className="absolute inset-0 pointer-events-none"
                onViewportEnter={updateTheme}
                viewport={{ margin: "-20% 0px -20% 0px" }}
            />

            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

                {/* 1. Background Shape */}
                <motion.div
                    className="absolute z-0 w-[150vw] h-[150vw] rounded-full top-[20%]"
                    style={{
                        backgroundColor: bgColor,
                        scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]),
                    }}
                />

                {/* 2. AWARD-WINNING HEADER: Masked Video Text */}
                <motion.div 
                    style={{ y: yText }}
                    className="absolute top-[15%] w-full flex flex-col items-center z-0 pointer-events-none"
                >
                    <div className="relative text-center">
                        {/* The Text Mask */}
                        <h2 className="text-[12vw] font-serif leading-none text-transparent bg-clip-text bg-[#1A1A1A] mix-blend-overlay opacity-80 select-none">
                            MY <br/> PROJECTS
                        </h2>
                        
                        {/* Optional: Add a subtle stroke or shadow to make it pop if blend mode is too faint */}
                        <h2 className="absolute top-0 left-0 w-full text-[12vw] font-serif leading-none text-transparent bg-clip-text stroke-black stroke-2 opacity-10" style={{ WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}>
                            MY <br/> PROJECTS
                        </h2>
                    </div>
                </motion.div>

                {/* 3. The Interactive Card Stack */}
                <div className="relative z-10 w-full max-w-md h-[65vh] flex items-center justify-center perspective-1000 mt-20">
                     {projects.map((project, index) => (
                        <Card 
                            key={project.id} 
                            project={project} 
                            index={index} 
                            total={projects.length} 
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>

                {/* 4. Bottom Text */}
                <motion.div 
                    className="absolute bottom-8 z-10 text-center px-6"
                    style={{ opacity: useTransform(scrollYProgress, [0.9, 1], [1, 0]) }}
                >
                    <p className="text-xs font-sans uppercase tracking-[0.2em] text-black/40">
                        ( Scroll to Explore )
                    </p>
                </motion.div>

            </div>
        </section>
    );
};

export default Projects;