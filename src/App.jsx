import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Layout from './components/Layout';

// Sections (Your existing Home Page)
import Hero from './sections/Hero';
import TechPlayground from './sections/TechPlayground';
import Works from './projectPage'
import Projects from './sections/Projects'
import Experience from './sections/Experience';
import TechStack from './sections/TechStack';
import Contact from './sections/Contact';
import ScrollToTop from './components/ScrollToTop'; // <--- IMPORT THIS

// The New Page
import ContactPage from './contact'; // Import the new component here
import AboutPage from './about';

function App() {
    return (
        <Router>
                    <ScrollToTop/>
            <Layout>
                <Routes>
                    {/* 1. The Home Route (All your main sections) */}
                    <Route path="/" element={
                        <>
                            <Hero />
                            <TechPlayground />
                            <Projects />
                            <TechStack />
                            <Experience />
                            <Contact /> Optional: Add old footer here if you want
                        </>
                    } />

                    {/* 2. The New Contact Page Route */}
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/projects" element={<Works />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;