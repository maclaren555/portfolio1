import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { useCursorStore } from '../store/cursorStore';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { cursorType } = useCursorStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Проверка, является ли устройство мобильным
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    // Проверяем при монтировании
    checkMobile();

    // Проверяем при изменении размера окна
    window.addEventListener('resize', checkMobile);

    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', mouseMove);
    
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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

  // Не отображаем курсор на мобильных устройствах
  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      variants={variants}
      animate={cursorType}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="fixed top-[0] left-[0] z-[9999] rounded-full pointer-events-none flex items-center justify-center cursor-auto"
    >
      {cursorType === 'contact' && (
        <span className="text-[1.2rem] font-[700] text-[#000000]">Contact</span>
      )}
    </motion.div>
  );
};

export default CustomCursor; 