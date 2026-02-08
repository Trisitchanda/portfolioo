import React, { useState } from 'react';
import Preloader from './Preloader';
import Navbar from './Navbar';
import CustomCursor from './CustomCursor';
import ScrollManager from './ScrollManager';

const Layout = ({ children }) => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            <CustomCursor />
            {loading ? (
                <Preloader onComplete={() => setLoading(false)} />
            ) : (
                <>
                    <ScrollManager />
                    <Navbar />
                    <main className="w-full min-h-screen">
                        {children}
                    </main>
                </>
            )}
        </>
    );
};

export default Layout;
