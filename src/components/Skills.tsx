import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import SkillCard from './SkillCard';
import MobileSkills from './MobileSkills';

// Импортируем SVG как URL
import htmlIcon from '../assets/icons/html.svg';
import cssIcon from '../assets/icons/css.svg';
import jsIcon from '../assets/icons/javascript.svg';
import reactIcon from '../assets/icons/react.svg';
import viteIcon from '../assets/icons/vite.svg';
import tsIcon from '../assets/icons/typescript.svg';
import tailwindIcon from '../assets/icons/tailwind.svg';
import framerIcon from '../assets/icons/framer-motion.svg';
import gsapIcon from '../assets/icons/gsap.svg';
import phpIcon from '../assets/icons/php.svg';
import chatgptIcon from '../assets/icons/chatgpt.svg';

const skillsData = [
    { name: 'HTML', iconSrc: htmlIcon, glowColor: '#E44D26' },
    { name: 'CSS', iconSrc: cssIcon, glowColor: '#1572B6' },
    { name: 'JavaScript', iconSrc: jsIcon, glowColor: '#F7DF1E' },
    { name: 'React', iconSrc: reactIcon, glowColor: '#61DAFB' },
    { name: 'Vite', iconSrc: viteIcon, glowColor: '#646CFF' },
    { name: 'TypeScript', iconSrc: tsIcon, glowColor: '#3178C6' },
    { name: 'TailwindCSS', iconSrc: tailwindIcon, glowColor: '#38B2AC' },
    { name: 'Framer Motion', iconSrc: framerIcon, glowColor: '#0055FF' },
    { name: 'GSAP', iconSrc: gsapIcon, glowColor: '#88CE02' },
    { name: 'PHP', iconSrc: phpIcon, glowColor: '#777BB4' },
    { name: 'ChatGPT', iconSrc: chatgptIcon, glowColor: '#74AA9C' },
];

const Skills: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(true); // По умолчанию считаем, что десктоп

    useEffect(() => {
        const checkDevice = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        checkDevice(); // Проверяем при монтировании
        window.addEventListener('resize', checkDevice); // И при изменении размера окна

        return () => {
            window.removeEventListener('resize', checkDevice); // Очищаем при размонтировании
        };
    }, []);

    useEffect(() => {
        // Запускаем сложную анимацию только если это десктоп и контейнер существует
        if (!isDesktop || !containerRef.current) {
            return;
        };

        const container = containerRef.current;
        const radius = Math.min(container.offsetWidth, container.offsetHeight) * 0.45;
        const cards = Array.from(container.children).filter(c => c.id !== 'drag-hint') as HTMLElement[];
        const numCards = cards.length;

        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
        
        let rotX = 0, rotY = 0.2, velX = 0, velY = 0;
        const damping = 0.95;
        
        // ВАЖНО: нужно вернуть функцию очистки, чтобы убить тикер GSAP при размонтировании
        // или при переключении на мобильную версию
        const ticker = gsap.ticker;
        const mainTickerCallback = () => {
             if (!isDragging) {
                rotY += velY;
                rotX += velX;
                velY *= damping;
                velX *= damping;
            }
            rotY += 0.0003;
            
            const rotationY = gsap.utils.wrap(-Math.PI, Math.PI, rotY);
            const rotationX = gsap.utils.wrap(-Math.PI/2, Math.PI/2, rotX);
            
            cards.forEach((card, i) => {
                const phi = Math.acos(-1 + (2 * i) / (numCards-1));
                let theta = Math.sqrt(numCards * Math.PI) * phi;
                
                theta += rotationY;

                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);
                const sinTheta = Math.sin(theta);
                const cosTheta = Math.cos(theta);

                const r_x = cosTheta * sinPhi;
                const r_y = sinTheta * sinPhi;

                const rotatedX = r_x;
                const rotatedY = cosPhi * Math.sin(rotationX) + r_y * Math.cos(rotationX);

                const x = centerX + radius * rotatedX - card.offsetWidth / 2;
                const y = centerY + radius * rotatedY - card.offsetHeight / 2;
                const z = radius * cosPhi;
                const scale = (z + radius) / (2 * radius);

                gsap.to(card, {
                    x,
                    y,
                    transform: `translateZ(${z}px) scale(${0.5 + scale * 0.5})`,
                    opacity: 0.4 + scale * 0.6,
                    zIndex: Math.round(100 + z),
                    duration: 0.1,
                    ease: 'power1.out'
                });
            });
        };
        ticker.add(mainTickerCallback);
        
        let startX = 0, startY = 0, lastX = 0, lastY = 0, isDragging = false;

        const handleMouseDown = (e: MouseEvent) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            lastX = startX;
            lastY = startY;
            velX = 0;
            velY = 0;
            container.style.cursor = 'grabbing';
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const dx = e.clientX - lastX;
                const dy = e.clientY - lastY;
                rotY += dx * 0.005;
                rotX -= dy * 0.005;
                velY = dx * 0.01;
                velX = -dy * 0.01;
                lastX = e.clientX;
                lastY = e.clientY;
            }
        };

        const handleMouseUp = () => {
            if (isDragging) {
                isDragging = false;
                container.style.cursor = 'grab';
            }
        };
        
        const handleMouseEnter = () => container.style.cursor = 'grab';
        const handleMouseLeave = () => container.style.cursor = 'default';

        container.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
        
        // Intro animation
        gsap.from(cards, {
            scale: 0,
            opacity: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'power3.out'
        });

        // Hint animation
        const hint = document.getElementById('drag-hint');
        if (hint) {
            gsap.fromTo(hint, 
                { opacity: 0 }, 
                { 
                    opacity: 0.5, 
                    duration: 1.5, 
                    repeat: -1, 
                    yoyo: true, 
                    ease: 'sine.inOut',
                    delay: 2 // Start after intro
                }
            );
        }

        return () => {
            // Очистка
            ticker.remove(mainTickerCallback);
            container.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };

    }, [isDesktop]);

    return (
        <section id="skills">
            {isDesktop ? (
                <div className="relative py-[5rem] bg-[#0A0A0A] h-[100vh] flex flex-col justify-center items-center overflow-hidden">
                    <h2 
                        className="text-[3rem] lg:text-[4rem] font-bold text-center mb-[2rem]"
                        style={{
                            background: 'linear-gradient(to bottom right, #38bdf8, #a78bfa)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 2px 10px rgba(56, 189, 248, 0.2))'
                        }}
                    >
                        My Technical Skills
                    </h2>
                    <div ref={containerRef} className="relative w-full h-[70vh]" style={{ perspective: '1000px' }}>
                        {skillsData.map((skill, index) => (
                            <SkillCard 
                                key={index} 
                                name={skill.name} 
                                iconSrc={skill.iconSrc} 
                                glowColor={skill.glowColor} 
                            />
                        ))}
                        <div id="drag-hint" className="absolute bottom-[5%] left-1/2 -translate-x-1/2 text-white/50 text-sm font-light flex items-center" style={{pointerEvents: 'none'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            Drag to Explore
                        </div>
                    </div>
                </div>
            ) : (
                <MobileSkills skills={skillsData} />
            )}
        </section>
    );
};

export default Skills; 