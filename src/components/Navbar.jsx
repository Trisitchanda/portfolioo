import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom'; 

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Works', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' } 
];

const ActiveLine = () => {
    return (
        <svg
            className="absolute w-[125%] h-[150%] -left-[12%] -top-[15%] pointer-events-none overflow-visible"
            viewBox="0 0 100 50" 
            preserveAspectRatio="none"
        >
            <motion.path
                d="M10,15 Q40,5 90,15 T90,35 T10,35 T10,15 L25,12"
                fill="none"
                stroke="#FF3333" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ 
                    duration: 1.5, 
                    ease: "easeInOut", 
                    delay: 0.2 
                }}
            />
        </svg>
    );
};

const HoverItalicText = ({ text, onClick, isActive }) => {
    return (
        <motion.div
            className="relative cursor-pointer group flex flex-col items-center"
            initial="initial"
            whileHover="hover"
            onClick={onClick}
        >
            <div className="relative z-10 flex items-center justify-center">
                {text.split('').map((char, i) => (
                    <motion.span
                        key={i}
                        className="text-5xl md:text-8xl font-serif text-[#1A1A1A] uppercase tracking-tight inline-block origin-bottom-left"
                        variants={{
                            initial: { 
                                fontStyle: 'normal', 
                                y: 0, 
                                rotate: 0,
                                x: 0 
                            },
                            hover: {
                                fontStyle: 'italic',
                                y: -2,
                                rotate: 10, 
                                x: 2, 
                                transition: {
                                    duration: 0.8, 
                                    ease: [0.2, 0.65, 0.3, 0.9],
                                    delay: i * 0.05 
                                }
                            }
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </div>
            {isActive && <ActiveLine />}
        </motion.div>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Works');
    
    // Router hooks
    const navigate = useNavigate();
    const location = useLocation();

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Navigation Handler
    const handleNavigation = (item) => {
        setActiveTab(item.name);
        
        // Wait for circle animation to finish a bit (800ms match roughly animation feel)
        setTimeout(() => {
            setIsOpen(false);
            
            if (item.href.startsWith('/')) {
                // Route navigation (e.g., /contact)
                navigate(item.href);
            } else {
                if (location.pathname !== '/') {
                    // Go home first if not on home
                    navigate('/');
                    // Wait for home mount then scroll
                    setTimeout(() => {
                        const element = document.querySelector(item.href);
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                } else {
                    // Just scroll
                    const element = document.querySelector(item.href);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }, 1200); 
    };

    return (
        <>
            <motion.nav
                className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-center z-[100] mix-blend-difference text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
            >
                {/* Logo */}
                <div className="flex flex-col leading-[0.85] z-[101]">
                    <a href="/" className="flex items-center gap-2 text-white mix-blend-difference pointer-events-auto outline-none">
                        <span className="text-3xl font-bold tracking-tight">
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

                {/* Toggle Button */}
                <button
                    onClick={toggleMenu}
                    className="flex flex-col gap-1.5 z-[101] pointer-events-auto p-2 group"
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

            {/* Fullscreen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 bg-[#F5F5F0] z-[99] flex flex-col items-center justify-center pointer-events-auto"
                    >
                        {/* Menu Items */}
                        <div className="flex flex-col items-center gap-6 md:gap-10">
                            {navItems.map((item) => (
                                <HoverItalicText
                                    key={item.name}
                                    text={item.name}
                                    isActive={activeTab === item.name}
                                    onClick={() => handleNavigation(item)}
                                />
                            ))}
                        </div>

                        {/* Footer */}
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