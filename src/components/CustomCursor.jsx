import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <motion.div
                className={classNames(
                    "fixed top-0 left-0 w-4 h-4 bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference", // inner dot
                    { "scale-[4]": isHovering }
                )}
                style={{
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                }}
                transition={{ type: "smooth", duration: 0 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-black rounded-full pointer-events-none z-[9998] mix-blend-difference" // outer ring
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />
        </>
    );
};

export default CustomCursor;
