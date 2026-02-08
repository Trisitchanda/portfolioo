import { useEffect } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const ScrollManager = () => {
    const { scrollYProgress } = useScroll();

    // Map scroll progress to background colors
    // Adjust these breakpoints based on actual section heights
    const backgroundColor = useTransform(
        scrollYProgress,
        [0.0, 0.25, 0.5, 0.75, 1.0],
        ['#F5F5F0', '#F5F5F0', '#1A1A1A', '#2779a7', '#F5F5F0'] // Beige -> Beige -> Dark -> Blue -> Beige
    );

    useMotionValueEvent(backgroundColor, "change", (latest) => {
        document.body.style.backgroundColor = latest;
    });

    return null; // This component handles side-effects only
};

export default ScrollManager;
