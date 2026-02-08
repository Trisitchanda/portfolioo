import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: "AI Mental Health Companion",
        category: "Mobile App • AI",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        year: "2023",
        color: "#d4e4bc" // Soft Green
    },
    {
        id: 2,
        title: "EcoTrack Analytics",
        category: "Web Dashboard • Data",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        year: "2024",
        color: "#e8c3cb" // Soft Pink
    },
    {
        id: 3,
        title: "Nebula Design System",
        category: "Open Source • UI/UX",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        year: "2022",
        color: "#c3d1e8" // Soft Blue
    },
    {
        id: 4,
        title: "CryptoVault",
        category: "Fintech • Web3",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
        year: "2023",
        color: "#e8dcc3" // Soft Beige
    }
];

const Projects = () => {
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const updateTheme = () => {
        document.body.style.backgroundColor = '#F5F5F0';
    };

    // Interpolate background color based on scroll segments
    const bgColor = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75],
        ["#d4e4bc", "#e8c3cb", "#c3d1e8", "#e8dcc3"]
    );

    return (
        <section ref={containerRef} className="relative min-h-[400vh] py-24 flex flex-col justify-start items-center">
            <motion.div
                className="absolute inset-0 pointer-events-none"
                onViewportEnter={updateTheme}
                viewport={{ margin: "-20% 0px -20% 0px" }}
            />

            {/* Sticky Container - Now truly full width */}
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

                {/* Dynamic Background Shape */}
                <motion.div
                    className="absolute z-0 w-[150vw] h-[150vw] rounded-full top-[20%]"
                    style={{
                        backgroundColor: bgColor,
                        scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]),
                    }}
                />

                {/* Header - Added padding/width constraint */}
                <div className="z-10 text-center mb-12 mt-12 md:mt-0 px-6 md:px-12 w-full max-w-7xl">
                    <h2 className="text-5xl md:text-8xl font-serif text-[#1A1A1A] relative inline-block">
                        my selected
                        <br />
                        <span className="relative z-10 px-4">
                            works
                            {/* SVG Oval Annotation */}
                            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[160%] pointer-events-none z-0" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <motion.path
                                    d="M10,50 C10,10 190,10 190,50 C190,90 10,90 10,50 Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-accent-blue/50"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                            </svg>
                        </span>
                    </h2>
                </div>

                {/* Cards Stack - Added padding/width constraint */}
                <div className="relative z-10 w-full max-w-[350px] md:max-w-[400px] h-[450px] md:h-[600px] perspective-1000 px-6 md:px-0">
                    {projects.map((project, index) => {
                        // Calculate ranges for sequential reveal
                        const step = 1 / projects.length; // 0.25
                        const start = index * step;
                        const end = start + step;

                        // Slide up logic
                        const y = useTransform(
                            scrollYProgress,
                            [start, end],
                            [800, 0] // Start well below, animate to 0
                        );

                        // Rotations for the "fan" effect
                        const randomRotate = index % 2 === 0 ? -2 : 2;

                        return (
                            <motion.div
                                key={project.id}
                                className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden origin-bottom"
                                style={{
                                    y: index === 0 ? 0 : y, // Keep first card static base
                                    zIndex: index,
                                    rotate: index * randomRotate
                                }}
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                                    <h3 className="text-2xl font-serif">{project.title}</h3>
                                    <p className="text-xs uppercase tracking-widest opacity-80">{project.category}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Text - Added padding/width constraint */}
                <motion.div
                    className="z-10 mt-12 text-center px-6 md:px-12 w-full max-w-7xl"
                    style={{ opacity: useTransform(scrollYProgress, [0.8, 1], [0, 1]) }}
                >
                    <p className="text-4xl md:text-5xl font-serif mb-2">13 Illustrations</p>
                    <p className="text-sm font-sans uppercase tracking-widest text-gray-500">Commercial and personal stories true the art.</p>
                </motion.div>

            </div>
        </section>
    );
};

export default Projects;
