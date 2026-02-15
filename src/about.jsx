import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Smile, Star, Download } from 'lucide-react'; // Added Download Icon

// !!! IMPORT YOUR IMAGE
const SwimmerImg = "/swimming.png"; 

// --- COMPONENTS ---

const Sticker = ({ children, delay, rotate, x, y }) => {
    return (
        <motion.div
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            whileHover={{ scale: 1.1, rotate: rotate + 10, cursor: "grab", zIndex: 50 }}
            whileTap={{ scale: 0.95, cursor: "grabbing" }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ 
                opacity: 1, 
                scale: 1,
                rotate: rotate,
                transition: { type: "spring", bounce: 0.5, duration: 1.5, delay: delay } 
            }}
            viewport={{ once: true }}
            className="absolute flex items-center justify-center bg-white border border-black/5 shadow-lg backdrop-blur-sm cursor-grab"
            style={{ 
                left: x, 
                top: y,
                borderRadius: '50%'
            }}
        >
            {children}
        </motion.div>
    );
};

const BlobImage = () => {
    return (
        <motion.div 
            className="relative w-full max-w-xl aspect-square flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div
                animate={{ 
                    borderRadius: [
                        "60% 40% 30% 70% / 60% 30% 70% 40%",
                        "30% 60% 70% 40% / 50% 60% 30% 60%",
                        "60% 40% 30% 70% / 60% 30% 70% 40%"
                    ] 
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[80%] md:w-[500px] aspect-[4/5] overflow-hidden shadow-2xl z-10 bg-[#AEC6CF]"
                style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
            >
                <img 
                    src={SwimmerImg} 
                    alt="Floating" 
                    className="w-full h-full object-cover scale-110 opacity-90 mix-blend-multiply" 
                />
            </motion.div>
        </motion.div>
    );
};

const AboutPage = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    
    // Parallax effect for the hero text
    const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <div ref={containerRef} className="w-full bg-[#F3F0E7] text-[#1A1A1A] overflow-hidden">
            
            {/* --- SECTION 1: HERO --- */}
            <section className="relative h-screen w-full flex flex-col justify-between pt-32 pb-10 px-6 md:px-12 overflow-hidden">
                <div className="flex justify-between items-start w-full z-20 mix-blend-difference text-black md:text-inherit">
                    <div className="text-xs font-sans uppercase tracking-[0.2em] opacity-60">
                        Based in Kolkata <br/> Est. 2024
                    </div>
                    <div className="text-xs font-sans uppercase tracking-[0.2em] text-right opacity-60">
                        Scroll for <br/> Bio
                    </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-0 mt-10 md:mt-0">
                    <motion.div 
                        initial={{ clipPath: "inset(100% 0% 0% 0% round 200px 200px 0 0)" }}
                        animate={{ clipPath: "inset(0% 0% 0% 0% round 200px 200px 0 0)" }}
                        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                        className="relative w-[85vw] md:w-[40vw] h-[60vh] md:h-[70vh] bg-[#E5E5E5]"
                    >
                        <motion.img 
                            initial={{ scale: 1.3 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop" 
                            alt="Portrait" 
                            className="w-full h-full object-cover grayscale opacity-90"
                        />
                        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    </motion.div>
                </div>

                <div className="relative z-10 w-full">
                    <motion.h1 
                        style={{ y: yText }}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-[18vw] leading-[0.75] font-serif text-center text-[#1A1A1A] mix-blend-difference pointer-events-none select-none"
                    >
                        TRISIT
                    </motion.h1>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="flex justify-between items-end w-full mt-4 border-t border-black/10 pt-4"
                    >
                        <span className="text-sm font-serif italic">Director & Illustrator</span>
                        <div className="flex gap-2 text-[10px] uppercase tracking-widest opacity-50">
                            <span>(01)</span>
                            <span>About Me</span>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* --- SECTION 2: THE POOL & BIO (UPDATED) --- */}
            <section className="min-h-screen flex flex-col items-center justify-center py-32 px-6 bg-[#F3F0E7] relative z-10">
                
                <BlobImage />

                {/* --- NEW: Minimalist Bio Section --- */}
                <div className="mt-20 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start relative z-10">
                    
                    {/* Left Column: Big Statement */}
                    <div className="text-right md:text-left">
                        <motion.div
                            initial={{ rotate: 0 }}
                            whileInView={{ rotate: 180 }}
                            transition={{ duration: 1 }}
                            className="inline-block text-6xl text-[#FF3333] mb-6"
                        >
                            ✳
                        </motion.div>
                        <h2 className="text-3xl md:text-5xl font-serif leading-tight text-[#1A1A1A]">
                            On my free time you can find me trying to <span className="italic text-[#8FA3AD]">rescue my plants</span>.
                        </h2>
                    </div>

                    {/* Right Column: Detailed Bio & CV Button */}
                    <div className="space-y-8 pt-4">
                        <p className="text-lg font-serif leading-relaxed opacity-80">
                            I am a multidisciplinary designer focusing on digital experiences. My work sits at the intersection of art, technology, and human interaction.
                        </p>
                        <p className="text-sm font-sans uppercase tracking-wide opacity-50 leading-relaxed">
                            Currently based in Kolkata, working with brands to tell stories that matter.
                        </p>

                        {/* --- THE CV BUTTON --- */}
                        <motion.a 
                            href="/path-to-your-cv.pdf" // Put your CV in the public folder
                            download="Trisit_CV.pdf"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1A1A1A] text-[#F3F0E7] rounded-full font-sans text-xs uppercase tracking-widest hover:bg-[#FF3333] transition-colors duration-300 group"
                        >
                            <span>Download CV</span>
                            <Download size={16} className="group-hover:translate-y-1 transition-transform" />
                        </motion.a>
                    </div>

                </div>
            </section>


            {/* --- SECTION 3: HIT ME UP --- */}
            <section className="relative h-[90vh] bg-[#F3F0E7] border-t border-black/5 overflow-hidden flex flex-col items-center justify-center">
                
                {/* Center Content */}
                <div className="z-10 text-center relative mix-blend-darken">
                     <p className="text-[10px] font-sans uppercase tracking-[0.3em] mb-6 opacity-40">
                        Available for freelance
                     </p>
                     <div className="relative inline-block group cursor-pointer">
                        <h2 className="text-[10vw] font-serif leading-none text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#FF3333]">
                            HIT ME UP
                        </h2>
                        {/* Underline Animation */}
                        <motion.div 
                            className="h-1 bg-[#FF3333] w-0 mx-auto mt-2"
                            whileInView={{ w: "100%" }}
                            transition={{ duration: 1 }}
                        />
                     </div>
                </div>

                {/* Scattered Stickers */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="relative w-full h-full pointer-events-auto">
                        <Sticker delay={0.1} rotate={-10} x="20%" y="20%">
                            <div className="w-24 h-24 rounded-full bg-[#FFF4BD] flex items-center justify-center border border-black/5">
                                <Smile size={48} strokeWidth={1.5} className="text-[#1A1A1A]" />
                            </div>
                        </Sticker>

                        <Sticker delay={0.2} rotate={5} x="70%" y="15%">
                            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center p-1 border border-black/5 shadow-sm">
                                <div className="w-full h-full rounded-full border border-dashed border-black/20 animate-spin-slow flex items-center justify-center text-[9px] uppercase font-bold tracking-widest text-center">
                                    The Studio <br/> 2026
                                </div>
                            </div>
                        </Sticker>

                        <Sticker delay={0.3} rotate={15} x="15%" y="65%">
                            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center font-serif text-3xl border border-black/5 shadow-sm">
                                :D
                            </div>
                        </Sticker>

                        <Sticker delay={0.4} rotate={-5} x="75%" y="60%">
                             <div className="w-28 h-28 rounded-full bg-[#AEC6CF] flex items-center justify-center border border-black/5">
                                <Star size={40} fill="white" stroke="none" />
                            </div>
                        </Sticker>
                    </div>
                </div>
            </section>


            {/* --- SECTION 4: CLIENTS --- */}
            {/* <section className="py-24 bg-[#FFC4C4] text-center rounded-t-[3rem] relative z-20 -mt-12">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-[12vw] font-serif text-[#D63030] leading-[0.8] mb-12 mix-blend-multiply opacity-90">
                        Clients
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left max-w-4xl mx-auto border-t border-black/10 pt-12">
                        <div>
                            <h3 className="text-xs uppercase tracking-widest opacity-50 mb-8">Publishing</h3>
                            <ul className="space-y-4">
                                {['Macmillan Publishers', 'Penguin Random House', 'Harper Collins', 'Little Brown Young Readers'].map(c => (
                                    <li key={c} className="text-2xl font-serif hover:italic cursor-pointer transition-all hover:translate-x-4 opacity-80 hover:opacity-100">{c}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xs uppercase tracking-widest opacity-50 mb-8">Commercial</h3>
                            <ul className="space-y-4">
                                {['Der Blaue Engel', 'UNWRP', 'GRLcollective', 'Token Magazine'].map(c => (
                                    <li key={c} className="text-2xl font-serif hover:italic cursor-pointer transition-all hover:translate-x-4 opacity-80 hover:opacity-100">{c}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section> */}
        </div>
    );
};

export default AboutPage;