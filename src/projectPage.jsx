import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { ArrowUpRight, Github, Globe } from 'lucide-react';

// --- DATA (Same as before) ---
const projects = [
    {
        id: 1,
        title: "Bangs Salon",
        category: "Branding",
        year: "2023",
        description: "A complete digital rebrand for a high-end salon. We built a booking system that increased appointments by 40% using a custom scheduler.",
        tech: ["React", "Node.js", "Tailwind", "Framer Motion"],
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2669&auto=format&fit=crop",
        color: "#E8D4D8",
        links: { live: "https://google.com", github: "https://github.com" }
    },
    {
        id: 2,
        title: "Liberty Korea",
        category: "Editorial",
        year: "2024",
        description: "An immersive storytelling platform highlighting the people behind the politics. Features parallax scrolling and dynamic audio integration.",
        tech: ["Next.js", "WebGL", "Three.js", "CMS"],
        image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2670&auto=format&fit=crop",
        color: "#E0E8D8",
        links: { live: "https://google.com", github: "https://github.com" }
    },
    {
        id: 3,
        title: "Cube Energy",
        category: "Campaign",
        year: "2022",
        description: "A dashboard for tracking renewable energy usage in real-time. Designed to be accessible and data-rich without overwhelming the user.",
        tech: ["Vue", "D3.js", "Firebase", "SCSS"],
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop",
        color: "#D8E0E8",
        links: { live: "https://google.com", github: "https://github.com" }
    }
];

const now = new Date();
const formatted = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short", });
// --- COMPONENTS ---

// Custom Cursor (Preserved)
const Cursor = ({ isHovered }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-32 h-32 bg-black text-white rounded-full flex items-center justify-center pointer-events-none z-50 mix-blend-difference"
            style={{
                x: mouseX,
                y: mouseY,
                translateX: "-50%",
                translateY: "-50%"
            }}
            animate={{
                scale: isHovered ? 1 : 0,
                opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "circOut" }}
        >
            {/* <span className="text-xs font-sans uppercase tracking-widest font-bold">View Case</span> */}
        </motion.div>
    );
};

// Individual Project Component
const Project = ({ project, index, setHovered }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax Effect for the image inside the container
    const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    // Opacity Fade In for the whole section row
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            style={{ opacity }}
            className={`min-h-[90vh] w-full flex flex-col md:flex-row items-center justify-between py-24 px-6 md:px-20 gap-16 ${isEven ? '' : 'md:flex-row-reverse'}`}
        >

            {/* TEXT SIDE */}
            <div className={`w-full md:w-5/12 flex flex-col ${isEven ? 'items-start text-left' : 'items-end text-right'} mb-12 md:mb-0`}>

                {/* Number & Category */}
                <div className="overflow-hidden mb-6">
                    <motion.span
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-block text-xs font-sans uppercase tracking-[0.2em] border-b border-black/20 pb-2"
                    >
                        {`0${index + 1}`} — {project.category}
                    </motion.span>
                </div>

                {/* Title with staggered reveal */}
                <h2 className="text-6xl md:text-8xl font-serif leading-[0.9] mb-6 text-[#1A1A1A]">
                    {project.title.split(" ").map((word, i) => (
                        <span key={i} className="block overflow-hidden">
                            <motion.span
                                className="block"
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 0.7, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg font-serif leading-relaxed mb-8 max-w-md"
                >
                    {project.description}
                </motion.p>

                {/* Tech Stack Pills */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className={`flex flex-wrap gap-2 mb-10 ${isEven ? 'justify-start' : 'justify-end'}`}
                >
                    {project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 border border-black/10 rounded-full text-[10px] uppercase tracking-widest font-medium bg-white/50 backdrop-blur-sm">
                            {tech}
                        </span>
                    ))}
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex items-center gap-4"
                >
                    <a href={project.links.live} target="_blank" rel="noreferrer" className="group flex items-center gap-3 px-6 py-3 bg-[#1A1A1A] text-white rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                        <span>Live Site</span>
                        <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                    <a href={project.links.github} target="_blank" rel="noreferrer" className="group flex items-center gap-3 px-6 py-3 border border-black/20 rounded-full text-xs uppercase tracking-widest hover:bg-white transition-colors">
                        <Github size={16} />
                        <span>Code</span>
                    </a>
                </motion.div>
            </div>

            {/* IMAGE SIDE - UPDATED ANIMATION */}
            <motion.div
                // NEW: Elegant Entrance Animation instead of the mask
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full md:w-6/12 h-[50vh] md:h-[70vh] relative overflow-hidden rounded-[2rem] shadow-2xl group"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="w-full h-full overflow-hidden relative">
                    {/* The Parallax Image with Hover Zoom */}
                    <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
                        <img
                            src={project.image}
                            alt={project.title}
                            // Added group-hover:scale-105 for subtle zoom effect
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    </motion.div>
                </div>
            </motion.div>

        </motion.div>
    );
};

const Works = () => {
    const [isHovered, setHovered] = useState(false);

    return (
        <section className="relative w-full bg-[#F3F0E7] text-[#1A1A1A] overflow-hidden">

            <Cursor isHovered={isHovered} />

            {/* Noise Texture */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Header */}
            <div className="h-[70vh] flex flex-col items-center justify-center text-center px-4 relative">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.5, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-xs font-sans uppercase tracking-[0.4em] mb-6"
                >
                    Selected Works (2023-2026)
                </motion.p>
                <h1 className="text-[12vw] font-serif leading-[0.8] overflow-hidden">
                    <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} className="block">
                        Featured
                    </motion.span>
                    <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }} className="block italic">
                        Cases
                    </motion.span>
                </h1>
            </div>

            {/* Projects List */}
            <div className="pb-32">
                {projects.map((project, index) => (
                    <Project
                        key={project.id}
                        index={index}
                        project={project}
                        setHovered={setHovered}
                    />
                ))}
            </div>

            {/* Footer */}
            {/* --- AESTHETIC FOOTER CTA --- */}
            <div className="relative h-[60vh] flex flex-col items-center justify-center bg-[#F3F0E7] border-t border-black/5 overflow-hidden">

                {/* 1. Large Background Text (Parallax or Static decorative) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif text-[#1A1A1A] opacity-[0.03] pointer-events-none whitespace-nowrap">
                    VISIT AGAIN
                </div>

                {/* 2. Main Content */}
                <div className="relative z-10 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-8xl font-serif text-[#1A1A1A] mb-12"
                    >
                        Thank you for <span className="italic text-gray-400">visiting :3</span>
                    </motion.h2>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-10 py-5 bg-transparent border border-[#1A1A1A] rounded-full overflow-hidden"
                    >
                        {/* The Fill Animation */}
                        <div className="absolute inset-0 bg-[#1A1A1A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />

                        {/* The Text */}
                        <span className="relative z-10 flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#1A1A1A] group-hover:text-white transition-colors duration-500">
                            Happy coding
                            <ArrowUpRight size={16} />
                        </span>
                    </motion.button>
                </div>

                {/* 3. Small Footer Detail */}
                <div className="absolute bottom-8 text-[10px] uppercase tracking-widest opacity-30 mix-blend-darken">
                    Kolkata, India • Local Time {formatted}
                </div>
            </div>

        </section>
    );
};

export default Works;