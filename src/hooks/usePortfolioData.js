import { useState } from 'react';

const initialData = {
    hero: {
        name: "Trisit",
        bio: "( Hi! I'm Trisit, a Developer. Welcome to my digital garden. )",
        role: "coding, but make it chill",
        watermark: "CS"
    },
    // experiences: [
    //     {
    //         id: 1,
    //         year: "2024",
    //         role: "Senior Frontend Engineer",
    //         company: "TechFlow Solutions",
    //         description: "Architecting the next generation of enterprise SaaS. Optimized core rendering engine improving performance by 40%.",
    //         color: "#E0F2FE", // Sky Blue
    //         rotate: -2
    //     },
    //     {
    //         id: 2,
    //         year: "2022",
    //         role: "Creative Developer",
    //         company: "Pixel Perfect Agency",
    //         description: "Blurring the line between websites and art. Created award-winning interactive campaigns for global fashion brands.",
    //         color: "#FCE7F3", // Pink
    //         rotate: 1
    //     },
    //     {
    //         id: 3,
    //         year: "2021",
    //         role: "Full Stack Developer",
    //         company: "StartUp Inc.",
    //         description: "Built the foundation. Scaled backend APIs to handle 100k+ concurrent users while shipping features weekly.",
    //         color: "#FEF3C7", // Amber
    //         rotate: -1
    //     }
    // ],
    projects: [
        {
            id: 1,
            title: "Bitezzy",
            category: "Full Stack",
            year: "2025",
            description: "An intelligent recipe platform and SaaS featuring AI-assisted search, personalized meal planning, cost & nutrition insights, and razorpay payment integration.",
            tech: ["React", "Redux", "Node.js", "Express", "MongoDB", "Redis", "Tailwind", "Framer Motion"],
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2680&auto=format&fit=crop",
            color: "#FFE2CD",
            link: "https://bitezzy.store",
            links: { live: "https://bitezzy.store", github: "https://github.com/subhranil002/BiteBot-Frontend" }
        },
        {
            id: 2,
            title: "Lumina",
            category: "Full Stack",
            year: "2026",
            description: "A subscription platform for creators featuring a 3D WebGL showcase, customizable membership tiers, robust analytics, and a secure media upload flow.",
            tech: ["React", "Redux", "Node.js", "Express", "MongoDB", "Three.js", "Tailwind", "Framer Motion"],
            image: "/moonn.png",
            color: "#DCE4FF",
            link: "https://luminaaaa.vercel.app",
            links: { live: "https://luminaaaa.vercel.app", github: "https://github.com/Trisitchanda/Lumina-forntend" }
        }
    ],
    techStack: [
        { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"] },
        { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Supabase", "GraphQL"] },
        { category: "Design", items: ["Figma", "Adobe CC", "Blender", "UI/UX", "Prototyping"] }
    ],
    services: [
        {
            id: '01',
            title: 'Gen AI Engineer',
            description: 'Building AI-powered full-stack applications, intelligent systems, and modern web experiences.',
            tags: ['GenAI', 'LLMs', 'AI Agents']
        },
        {
            id: '02',
            title: 'FullStack Developer',
            description: 'MERN stack applications with a problem-first mindset.',
            tags: ['MERN', 'Critical Thinking']
        }
    ],
    contact: {
        email: "trisitchanda@gmail.com",
        copyrightName: "Trisit",
        copyrightYear: "2026",
        headlinePart1: "Let’s collaborate &",
        headlinePart2: "build something meaningful."
    },
    socialLinks: [
        { name: "GitHub", url: "https://github.com/trisitchanda" },
        { name: "Instagram", url: "https://www.instagram.com/trisit_c/" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/trisit-chanda-2a2548260/" }
    ],
    navItems: [
        { name: 'Home', href: '/' },
        { name: 'Projects', href: '/projects' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' }
    ],
    about: {
        images: {
            swimmer: "/swimming.png",
            portrait: "https://res.cloudinary.com/diod4o44f/image/upload/v1780074740/WhatsApp_Image_2026-05-29_at_22.41.17_ron8v8.jpg"
        },
        location: "Based in Kolkata",
        role: "Developer",
        bioBigTextPart1: "On my free time you can find me trying to ",
        bioBigTextItalic: "read new fantasy books",
        bioDescription1: "I am a developer focusing on digital experiences. My work sits at the intersection of technology and problem solving.",
        bioDescription2: "Currently based in Kolkata, working on things I enjoy.",
        cvLink: "/path-to-your-cv.pdf"
    }
};

const usePortfolioData = () => {
    const [data, setData] = useState(initialData);

    return {
        data,
        setData
    };
};

export default usePortfolioData;
