import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [hasMouse, setHasMouse] = useState(true); // New state to check for mouse

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // 1. Check if the device uses a mouse
    useEffect(() => {
        const checkPointer = () => {
            const isFinePointer = window.matchMedia('(pointer: fine)').matches;
            setHasMouse(isFinePointer);
        };

        checkPointer(); // Check on initial load
        window.addEventListener('resize', checkPointer); // Re-check if screen resizes/changes

        return () => window.removeEventListener('resize', checkPointer);
    }, []);

    // 2. Main cursor tracking logic
    useEffect(() => {
        // If it's a touch device, completely skip adding event listeners
        if (!hasMouse) return; 

        const manageMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            if (
                e.target.tagName === 'A' || 
                e.target.tagName === 'BUTTON' || 
                e.target.closest('a') || 
                e.target.closest('button')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', manageMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', manageMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [hasMouse, mouseX, mouseY]);

    // 3. If no mouse is detected (mobile/tablet), render absolutely nothing
    if (!hasMouse) return null;

    return (
        <>
            {/* Inner Dot */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%', 
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
            />
            
            {/* Outer Ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border-[1.5px] border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 1.8 : 1,
                    backgroundColor: isHovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
                    borderWidth: isHovering ? '0px' : '1.5px',
                }}
                transition={{ duration: 0.2, ease: "backOut" }}
            />
        </>
    );
};

export default CustomCursor;