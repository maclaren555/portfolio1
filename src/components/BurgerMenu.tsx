import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const BurgerMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    const menuVariants: Variants = {
        closed: {
            x: '100%',
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            x: '0%',
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 40
            }
        }
    };

    const linkVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1 + 0.3,
                type: 'spring',
            }
        })
    };

    const menuItems = [
        { id: 'aboutWrapper', name: 'About' },
        { id: 'skills', name: 'Skills' },
        { id: 'contact', name: 'Contact' }
    ];

    return (
        <div className="md:hidden">
            {/* Burger Icon */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-[20px] right-[20px] z-[101] w-[40px] h-[40px] rounded-full bg-white/10 backdrop-blur-sm flex flex-col justify-center items-center"
            >
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }}
                    className="w-[20px] h-[2px] bg-white"
                />
                <motion.div
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    className="w-[20px] h-[2px] bg-white my-1"
                />
                <motion.div
                    animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0 }}
                    className="w-[20px] h-[2px] bg-white"
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-lg z-[100] flex flex-col items-center justify-center"
                    >
                        {menuItems.map((item, i) => (
                             <motion.button
                                key={item.id}
                                custom={i}
                                variants={linkVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                onClick={() => scrollToSection(item.id)}
                                className="text-white text-[2.5rem] font-bold my-4"
                            >
                                {item.name}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BurgerMenu; 