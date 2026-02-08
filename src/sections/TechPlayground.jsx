import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const services = [
    {
        id: '01',
        title: 'Creative Direction',
        description: 'Visual storytelling and brand identity.',
        tags: ['Branding', 'Art Direction', 'Strategy']
    },
    {
        id: '02',
        title: 'FullStack Developer',
        description: 'MERN stack applications with a problem-first mindset.',
        tags: ['MERN', 'Critical Thinking']
    },
    // {
    //     id: '03',
    //     title: 'UI/UX Design',
    //     description: 'User-centric interfaces and experiences.',
    //     tags: ['Prototyping', 'Design Systems', 'Motion']
    // },
    // {
    //     id: '04',
    //     title: 'Illustration',
    //     description: 'Custom visuals and character design.',
    //     tags: ['Digital', 'Editorial', '3D Asset']
    // }
];

const TechPlayground = () => {
    const [hoveredService, setHoveredService] = useState(null);

    return (
        <section className="py-32 px-6 md:px-12 bg-[#F5F5F0]">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    className="text-sm font-sans uppercase tracking-widest mb-16 opacity-60 ml-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                >
                    Capabilities
                </motion.h2>

                <div className="flex flex-col">
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            className="relative border-t border-[#1A1A1A]/20 py-12 group cursor-pointer"
                            onMouseEnter={() => setHoveredService(service.id)}
                            onMouseLeave={() => setHoveredService(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
                                <div className="flex items-baseline gap-8">
                                    <span className="font-sans text-sm opacity-50">{service.id}</span>
                                    <h3 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] group-hover:italic transition-all duration-300">
                                        {service.title}
                                    </h3>
                                </div>
                                <div className="mt-4 md:mt-0 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="font-sans text-sm uppercase tracking-wider">{service.tags.join(' • ')}</span>
                                    <ArrowUpRight className="w-6 h-6" />
                                </div>
                            </div>

                            <motion.div
                                className="absolute inset-0 bg-[#1A1A1A]/5 z-0"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: hoveredService === service.id ? 1 : 0 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                style={{ originY: 1 }}
                            />
                        </motion.div>
                    ))}
                    <div className="border-t border-[#1A1A1A]/20" />
                </div>
            </div>
        </section>
    );
};

export default TechPlayground;
