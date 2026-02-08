import React from 'react';
import Layout from './components/Layout';
import Hero from './sections/Hero';
import TechPlayground from './sections/TechPlayground';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import TechStack from './sections/TechStack';
import Contact from './sections/Contact';

function App() {
    return (
        <Layout>
            <Hero />
            <TechPlayground />
            <Projects />
            <TechStack />
            <Experience />
            <Contact />
        </Layout>
    );
}

export default App;
