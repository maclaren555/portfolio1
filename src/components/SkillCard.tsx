import React from 'react';

interface SkillCardProps {
  iconSrc: string;
  name: string;
  glowColor: string; // e.g., '#61DAFB' for React
}

const SkillCard: React.FC<SkillCardProps> = ({ iconSrc, name, glowColor }) => {
  return (
    <div 
      className="group absolute flex flex-col items-center justify-center p-[1rem] bg-[#101010]/60 backdrop-blur-sm rounded-[0.75rem] border border-white/10"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[0.75rem]"
        style={{ background: `radial-gradient(circle at center, ${glowColor}20, transparent 70%)` }}
      ></div>
      <div 
        className="absolute -inset-px rounded-[0.75rem] opacity-0 group-hover:opacity-70 transition-opacity duration-300"
        style={{ boxShadow: `0 0 15px 3px ${glowColor}30`}}
      ></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <img src={iconSrc} alt={`${name} logo`} className="w-[3rem] h-[3rem] object-contain mb-[0.5rem] drop-shadow-lg" />
        <p className="text-white/50 text-sm group-hover:text-white font-light transition-colors duration-300">{name}</p>
      </div>
    </div>
  );
};

export default SkillCard; 