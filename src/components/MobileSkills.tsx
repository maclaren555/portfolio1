import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Определяем пропсы для компонента
interface MobileSkillsProps {
  skills: {
    name: string;
    iconSrc: string;
    glowColor: string;
  }[];
}

// Исправленная анимация
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1 
  },
};

const MobileSkills: React.FC<MobileSkillsProps> = ({ skills }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <div ref={containerRef} className="relative overflow-hidden py-[128px] px-[24px] bg-black">
      <h2 className="relative z-[2] text-[2.5rem] font-[800] text-center mb-[64px] text-white">
        My Technical Skills
      </h2>
      <div className="relative z-[2] grid grid-cols-2 gap-[24px] w-full">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="relative flex aspect-square flex-col items-center justify-center rounded-[24px] overflow-hidden bg-[rgba(206, 224, 6, 0.99)] border border-[rgba(255,255,255,0.4)] backdrop-blur-[20px] shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.7, ease: "circOut", delay: index * 0.1 }}
          >
            {/* Светлое стекло эффект */}
            <div className="absolute inset-0 bg-[rgba(35, 234, 29, 0.79)] backdrop-blur-[12px]"></div>
            {/* Блики */}
            <div className="absolute top-0 left-0 w-full h-[70%] bg-gradient-to-b from-[rgba(223, 13, 13, 0.5)] to-transparent"></div>
            {/* Свечение */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at center, ${skill.glowColor}15 0%, transparent 70%)`,
                filter: 'blur(24px)',
              }}
            />
            {/* Контент */}
            <div className="relative z-10 flex flex-col items-center justify-center p-4">
              <img
                src={skill.iconSrc}
                alt={`${skill.name} icon`}
                className="w-[56px] h-[56px] mb-[20px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
              />
              <h3 className="text-[1.2rem] font-[700] text-gray-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                {skill.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MobileSkills; 