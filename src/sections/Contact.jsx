import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Matter from 'matter-js';

const Contact = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);

    useEffect(() => {
        const Engine = Matter.Engine;
        const Render = Matter.Render;
        const World = Matter.World;
        const Bodies = Matter.Bodies;
        const Mouse = Matter.Mouse;
        const MouseConstraint = Matter.MouseConstraint;
        const Runner = Matter.Runner;

        // Create engine
        const engine = Engine.create();
        const world = engine.world;
        engineRef.current = engine;

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: sceneRef.current.clientWidth,
                height: 400,
                wireframes: false,
                background: 'transparent',
                pixelRatio: window.devicePixelRatio // Sharper rendering
            }
        });

        const width = sceneRef.current.clientWidth;
        const height = 400;

        // Smileys / Interactive Balls
        const balls = [];
        const colors = ['#FF9398', '#2779a7', '#FFF8C7', '#1A1A1A'];

        for (let i = 0; i < 10; i++) {
            balls.push(
                Bodies.circle(Math.random() * width, -Math.random() * 500, 25 + Math.random() * 15, {
                    render: {
                        fillStyle: colors[Math.floor(Math.random() * colors.length)],
                    },
                    restitution: 0.8,
                    friction: 0.005 // Lower friction for more fun slide
                })
            );
        }

        // Walls
        const ground = Bodies.rectangle(width / 2, height + 30, width, 60, { isStatic: true, render: { visible: false } });
        const leftWall = Bodies.rectangle(-30, height / 2, 60, height, { isStatic: true, render: { visible: false } });
        const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height, { isStatic: true, render: { visible: false } });

        World.add(world, [...balls, ground, leftWall, rightWall]);

        // Mouse Control
        const mouse = Mouse.create(render.canvas);

        // Remove mousewheel events to prevent scroll blocking/warnings
        mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        World.add(world, mouseConstraint);

        // Keep the mouse in sync with rendering
        render.mouse = mouse;

        // Run the engine
        const runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);

        return () => {
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
        };
    }, []);

    return (
        <section className="relative pt-24 pb-12 flex flex-col justify-between overflow-hidden">
            <motion.div
                className="absolute inset-0 pointer-events-none"
                onViewportEnter={() => document.body.style.backgroundColor = '#F5F5F0'}
                viewport={{ margin: "-40% 0px -40% 0px" }}
            />
            <div className="relative z-10 max-w-7xl w-full px-6 md:px-12">
                {/* Headline */}
                <motion.h2
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.95] text-black"
                >
                    Let’s collaborate &
                </motion.h2>

                <motion.h2
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.95] text-black"
                >
                    build something meaningful.
                </motion.h2>

                {/* CONTACT BUTTON */}
                <motion.a
                    href="mailto:hello@yourmail.com"
                    initial={{ rotate: -18 }}
                    whileHover={{ rotate: 0, scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 180, damping: 14 }}
                    className="
            absolute right-8 md:right-16 bottom-[-90px] md:bottom-[-120px]
            w-48 h-48 md:w-56 md:h-56
            rounded-full bg-white
            flex items-center justify-center
            text-black
            font-sans uppercase tracking-widest text-sm
            shadow-[0_40px_80px_rgba(0,0,0,0.25)]
            cursor-pointer
          "
                >
                    <span className="text-center leading-tight">
                        Contact
                        <br />
                        Me
                    </span>
                </motion.a>
            </div>

            {/* Physics Footer Area */}
            <div
                ref={sceneRef}
                className="w-full h-[400px] mt-12 bg-transparent cursor-grab active:cursor-grabbing"
                style={{ touchAction: 'none' }} // Fix passive event listener violation
            />

            <div className="absolute bottom-6 w-full text-center text-sm text-gray-400 font-sans uppercase tracking-widest z-20 pointer-events-none">
                © 2026 Trisit. All Rights Reserved.
            </div>
        </section>
    );
};

export default Contact;
