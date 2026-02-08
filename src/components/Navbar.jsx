import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { name: 'About', href: '#background' },
    { name: 'Works', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
];

const HoverItalicText = ({ text, onClick }) => {
    return (
        <motion.div
            className="relative cursor-pointer overflow-hidden"
            initial="initial"
            whileHover="hover"
            onClick={onClick}
        >
            <div className="flex items-center justify-center">
                {text.split('').map((char, i) => (
                    <motion.span
                        key={i}
                        className="text-5xl md:text-8xl font-serif text-[#1A1A1A] uppercase tracking-tight inline-block"
                        variants={{
                            initial: { fontStyle: 'normal', y: 0 },
                            hover: {
                                fontStyle: 'italic',
                                y: -5,
                                transition: {
                                    duration: 0.3,
                                    ease: [0.33, 1, 0.68, 1], // easeOutCubic
                                    delay: i * 0.03
                                }
                            }
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.backgroundColor = ''; // Reset any potential color overrides
        }
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Fixed Navbar Header */}
            <motion.nav
                className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-center z-[100] mix-blend-difference text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
            >
                {/* Logo */}
                <div className="flex flex-col leading-[0.85] z-[101]">
                    <a href="#" className="flex items-center gap-2 text-white mix-blend-difference pointer-events-auto group outline-none">
                        <span className="font-[Playfair_Display] text-3xl font-bold tracking-tight">
                            Trisit
                        </span>
                        <motion.span
                            className="text-xl"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                            ✳
                        </motion.span>
                    </a>
                </div>

                {/* Two-Bar Toggle Button */}
                <button
                    onClick={toggleMenu}
                    className="flex flex-col gap-1.5 z-[101] pointer-events-auto group p-2"
                >
                    <motion.div
                        className="w-8 h-0.5 bg-white mix-blend-difference"
                        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.div
                        className="w-8 h-0.5 bg-white mix-blend-difference"
                        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -2 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </button>
            </motion.nav>

            {/* Warning: Fullscreen Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} // smooth quart ease
                        className="fixed inset-0 bg-[#F5F5F0] z-[99] flex flex-col items-center justify-center pointer-events-auto"
                    >
                        {/* Close Button Placeholder (handled by fixed toggle above) */}

                        {/* Menu Items */}
                        <div className="flex flex-col items-center gap-8 md:gap-12">
                            {navItems.map((item, index) => (
                                <HoverItalicText
                                    key={item.name}
                                    text={item.name}
                                    onClick={() => {
                                        setIsOpen(false);
                                        const element = document.querySelector(item.href);
                                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                />
                            ))}
                        </div>

                        {/* Footer / Socials (Placeholder for 'Falling Letters') */}
                        <div className="absolute bottom-12 w-full px-12 flex justify-between text-sm font-sans uppercase tracking-widest text-[#1A1A1A]/60">
                            <span className="cursor-pointer hover:text-black transition-colors">Behance</span>
                            <span className="cursor-pointer hover:text-black transition-colors">Instagram</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
