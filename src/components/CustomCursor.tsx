import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { useCursorStore } from '../store/cursorStore';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const { cursorType } = useCursorStore();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's `md` breakpoint
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    if (!isMobile) {
      window.addEventListener('mousemove', mouseMove);
    }

    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('mousemove', mouseMove);
    };
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  const variants: Variants = {
    default: {
      x: position.x - 8,
      y: position.y - 8,
      height: 16,
      width: 16,
      backgroundColor: '#ffffff',
      mixBlendMode: 'difference',
    },
    contact: {
      x: position.x - 75,
      y: position.y - 75,
      height: 150,
      width: 150,
      backgroundColor: '#ffffff',
      mixBlendMode: 'difference',
    },
  };

  return (
    <motion.div
      variants={variants}
      animate={cursorType}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none flex items-center justify-center"
    >
      {cursorType === 'contact' && (
        <span className="text-[1.2rem] font-[700] text-[#000000]">Contact</span>
      )}
    </motion.div>
  );
};

export default CustomCursor; 