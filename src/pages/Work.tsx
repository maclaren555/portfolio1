import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { projects } from '../utils/projectData';

// FORCE REFRESH
gsap.registerPlugin(ScrollTrigger);

const Work: React.FC = () => {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const projectsContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const container = projectsContainerRef.current;
        if (!container) return;

        const projectItems = gsap.utils.toArray('.project-item-title, .project-item-meta');
        
        gsap.set(projectItems, { yPercent: 101 });

        ScrollTrigger.create({
            trigger: container,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(projectItems, {
                    yPercent: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                });
            },
            once: true,
        });

    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    const currentImage = projects.find(p => p.id === hoveredProject)?.imageUrl;

    return (
        <section
            id="work"
            className="relative w-full min-h-screen text-[#e5e7eb] px-8"
            onMouseMove={handleMouseMove}
        >
            <div className="absolute top-[10%] left-[5%] text-[10vw] font-[900] text-[oklch(0.25_0.05_250)] opacity-[0.2] uppercase select-none pointer-events-none">
                Work
            </div>
            <div ref={projectsContainerRef} className="max-w-7xl mx-auto border-t border-gray-700/50">
                {projects.map((project) => (
                    <Link
                        to={`/work/${project.slug}`}
                        key={project.id}
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                        className="group py-[2vh] border-b border-gray-700/50 flex justify-between items-center transition-all duration-500 ease-in-out hover:pl-[2vw] hover:pr-[1vw] cursor-pointer"
                    >
                        <div className="overflow-hidden py-1">
                            <motion.h3 
                                layoutId={`title-${project.slug}`}
                                className="project-item-title text-[6vw] font-[900] uppercase transition-all duration-500 ease-in-out group-hover:text-[oklch(0.8_0.2_260)] leading-none"
                            >
                                {project.name}
                            </motion.h3>
                        </div>
                        <div className="overflow-hidden">
                            <div className="project-item-meta flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <p className="text-[1.2vw] font-[500] text-gray-400">{project.category}</p>
                                <svg width="2vw" height="2vw" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 group-hover:rotate-45">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <AnimatePresence>
                {hoveredProject && currentImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, x: cursorPosition.x + 20, y: cursorPosition.y - 150 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', width: '25vw', height: '35vh' }}
                        className="z-[9998] rounded-lg overflow-hidden shadow-2xl"
                    >
                        <img src={currentImage} alt="Project preview" className="w-full h-full object-cover" />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Work; 