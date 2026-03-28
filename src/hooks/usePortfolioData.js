import { useState } from 'react';

const initialData = {
    hero: {
        name: "Trisit",
        bio: "( Hi! I'm Trisit, a student and Developer. Welcome to my digital garden. )",
        role: "coding, but make it chill",
        watermark: "CS"
    },
    experiences: [
        {
            id: 1,
            year: "2024",
            role: "Senior Frontend Engineer",
            company: "TechFlow Solutions",
            description: "Architecting the next generation of enterprise SaaS. Optimized core rendering engine improving performance by 40%.",
            color: "#E0F2FE", // Sky Blue
            rotate: -2
        },
        {
            id: 2,
            year: "2022",
            role: "Creative Developer",
            company: "Pixel Perfect Agency",
            description: "Blurring the line between websites and art. Created award-winning interactive campaigns for global fashion brands.",
            color: "#FCE7F3", // Pink
            rotate: 1
        },
        {
            id: 3,
            year: "2021",
            role: "Full Stack Developer",
            company: "StartUp Inc.",
            description: "Built the foundation. Scaled backend APIs to handle 100k+ concurrent users while shipping features weekly.",
            color: "#FEF3C7", // Amber
            rotate: -1
        }
    ],
    projects: [
        {
            id: 1,
            title: "AI Mental Health",
            category: "Mobile App • AI",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
            year: "2023",
            link: "https://google.com",
            color: "#d4e4bc"
        },
        {
            id: 2,
            title: "EcoTrack Analytics",
            category: "Web Dashboard",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
            year: "2024",
            link: "https://google.com",
            color: "#e8c3cb"
        },
        {
            id: 3,
            title: "Nebula System",
            category: "Open Source",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
            year: "2022",
            link: "https://google.com",
            color: "#c3d1e8"
        },
        {
            id: 4,
            title: "CryptoVault",
            category: "Fintech • Web3",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
            year: "2023",
            link: "https://google.com",
            color: "#e8dcc3"
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
            title: 'Creative Direction',
            description: 'Visual storytelling and brand identity.',
            tags: ['Branding', 'Art Direction', 'Strategy']
        },
        {
            id: '02',
            title: 'FullStack Developer',
            description: 'MERN stack applications with a problem-first mindset.',
            tags: ['MERN', 'Critical Thinking']
        }
    ],
    contact: {
        email: "hello@yourmail.com",
        copyrightName: "Trisit",
        copyrightYear: "2026",
        headlinePart1: "Let’s collaborate &",
        headlinePart2: "build something meaningful."
    },
    socialLinks: [
        { name: "Behance", url: "#" },
        { name: "Instagram", url: "#" }
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
            portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
        },
        location: "Based in Kolkata",
        established: "Est. 2024",
        role: "Director & Illustrator",
        bioBigTextPart1: "On my free time you can find me trying to ",
        bioBigTextItalic: "rescue my plants",
        bioDescription1: "I am a multidisciplinary designer focusing on digital experiences. My work sits at the intersection of art, technology, and human interaction.",
        bioDescription2: "Currently based in Kolkata, working with brands to tell stories that matter.",
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
