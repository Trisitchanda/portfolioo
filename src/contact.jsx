import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

// --- 1. SUNBURST COMPONENT ---
const Sunburst = () => {
    return (
        <motion.svg
            // Positioned behind the text, scaled up, and rotating
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] pointer-events-none z-[-1]"
            viewBox="0 0 100 100"
            fill="none"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <motion.line
                    key={i}
                    x1="50" y1="20"
                    x2="50" y2="10"
                    stroke="white" // Ensure this is white or a visible color
                    strokeWidth="8"
                    strokeLinecap="round"
                    transform={`rotate(${angle} 50 50)`}
                />
            ))}
        </motion.svg>
    );
};

// --- 2. MAGNETIC BUTTON ---
const MagneticButton = ({ children, className }) => {
    const ref = useRef(null);
    const x = useSpring(0, { stiffness: 150, damping: 15 });
    const y = useSpring(0, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const xPos = (clientX - (left + width / 2)) * 0.1;
        const yPos = (clientY - (top + height / 2)) * 0.1;
        x.set(xPos);
        y.set(yPos);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            className={`relative overflow-hidden group ${className}`}
        >
            <span className="relative z-10">{children}</span>
            <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </motion.button>
    );
};

// --- 3. REVEAL TEXT WRAPPER ---
const RevealText = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
};

// --- MAIN PAGE ---
const ContactPage = () => {
    // We use this ref to track the scroll progress of the whole page if needed
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <main ref={containerRef} id="contact" className="w-full bg-[#F5F5F0]">
            
            {/* --- SECTION 1: BLUE (STICKY) --- 
               The 'sticky top-0' makes it stay on screen until the pink one covers it.
            */}
            <section className="sticky top-0 h-screen bg-[#AEC6CF] flex flex-col items-center justify-center rounded-b-[4rem] z-10 overflow-hidden">
                <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8 p-6">
                    <RevealText>
                        <div className="relative inline-block">
                            <h1 className="text-6xl md:text-9xl font-serif text-[#1A1A1A] leading-[0.9] tracking-tight">
                                I'm always <br />
                                open to <span className="italic">work.</span>
                            </h1>
                            {/* Background Circle Decoration */}
                            <motion.svg 
                                style={{ scale: useTransform(scrollYProgress, [0, 0.3], [1, 1.5]) }}
                                className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-20" 
                                viewBox="0 0 200 200"
                            >
                                <circle cx="100" cy="100" r="90" fill="white" />
                            </motion.svg>
                        </div>
                    </RevealText>

                    <RevealText delay={0.2}>
                        <p className="text-sm md:text-base font-sans uppercase tracking-widest max-w-md mx-auto leading-relaxed opacity-70">
                            With passionate creatives striving to create uniqueness.
                        </p>
                    </RevealText>
                </div>
                
                {/* Scroll Indicator */}
                <motion.div 
                    className="absolute bottom-12"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <ArrowDown size={32} strokeWidth={1.5} opacity={0.5} />
                </motion.div>
            </section>


            {/* --- SECTION 2: PINK (STICKY) --- 
               This slides OVER the Blue section.
            */}
            <section className="sticky top-0 h-screen bg-[#FFC4C4] flex flex-col items-center justify-center z-20 rounded-t-[4rem] rounded-b-[4rem] shadow-[-20px_0_40px_rgba(0,0,0,0.1)]">
                <div className="w-full max-w-5xl text-center space-y-24 px-4">
                    
                    {/* Email Block */}
                    <div className="space-y-8">
                        <RevealText>
                            <h2 className="text-6xl md:text-8xl font-serif text-[#1A1A1A]">
                                If you like mails
                            </h2>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <MagneticButton className="px-8 py-4 md:px-12 md:py-6 border border-[#1A1A1A] rounded-full text-lg md:text-2xl font-sans tracking-widest hover:bg-[#1A1A1A] hover:text-[#FFC4C4] transition-colors duration-300">
                                YOO.CHUNGYUN@GMAIL.COM
                            </MagneticButton>
                        </RevealText>
                        <p className="text-xs font-sans uppercase opacity-50 tracking-widest mt-4">
                            Shoot me a message for details
                        </p>
                    </div>

                    {/* Socials */}
                    <div className="space-y-8">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-[1px] bg-black/20 mb-4"></div>
                            <p className="text-sm font-sans uppercase tracking-widest">
                                If you like scrolling — Here are my socials
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 text-2xl font-serif italic cursor-pointer">
                            {['@CHUNGI_STUDIO', '@CHUNGIYOO'].map((handle, i) => (
                                <motion.span key={i} whileHover={{ scale: 1.1, rotate: -2 }} className="hover:text-white transition-colors">
                                    {handle}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* --- SECTION 3: YELLOW (STICKY/FINAL) --- 
               This slides OVER the Pink section.
            */}
            <section className="sticky top-0 h-screen bg-[#FFF4BD] flex flex-col items-center justify-between z-30 rounded-t-[4rem] pt-32 pb-8 shadow-[-20px_0_40px_rgba(0,0,0,0.1)]">
                
                {/* Main Content */}
                <div className="flex-1 flex flex-col items-center justify-center w-full max-w-5xl space-y-12">
                    <RevealText>
                        <div className="relative z-10 text-center">
                            <h2 className="text-6xl md:text-8xl font-serif leading-tight">
                                Say a simple <br />
                                {/* FIXED: Sunburst is now correctly behind Hello */}
                                <span className="relative inline-block italic">
                                    Hello!
                                    <Sunburst />
                                </span>
                            </h2>
                        </div>
                    </RevealText>

                    {/* Image */}
                    <RevealText delay={0.2}>
                        <motion.div 
                            whileHover={{ rotate: 0, scale: 1.05 }}
                            className="relative w-64 h-80 md:w-80 md:h-96 bg-gray-200 rotate-3 border-4 border-white shadow-xl overflow-hidden cursor-pointer"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
                                alt="Profile"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </motion.div>
                    </RevealText>

                    <RevealText delay={0.3}>
                        <h2 className="text-5xl md:text-7xl font-serif mt-8 text-center">
                            Let's collaborate & <br />
                            tell your story.
                        </h2>
                    </RevealText>
                </div>

                {/* Footer */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-black/10 pt-8 max-w-7xl mx-auto px-6">
                    <div className="text-3xl font-serif italic text-[#FF7E7E] mb-6 md:mb-0">
                        chungi & you
                    </div>
                    <div className="flex gap-8 text-xs font-sans uppercase tracking-widest">
                        <a href="#" className="hover:text-[#FF7E7E] transition-colors">Behance</a>
                        <a href="#" className="hover:text-[#FF7E7E] transition-colors">Instagram</a>
                        <a href="#" className="hover:text-[#FF7E7E] transition-colors">LinkedIn</a>
                    </div>
                    <div className="mt-6 md:mt-0 text-[10px] uppercase opacity-40">
                        © Copyright 2026
                    </div>
                </div>
            </section>

        </main>
    );
};

export default ContactPage;