import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Define Skill type and data locally
interface Skill {
  name: string;
  description: string;
  color: string;
}

const skills: Skill[] = [
  {
    name: 'React',
    description: 'A JavaScript library for building user interfaces.',
    color: '#61DAFB',
  },
  {
    name: 'TypeScript',
    description: 'A typed superset of JavaScript that compiles to plain JavaScript.',
    color: '#3178C6',
  },
  {
    name: 'JavaScript',
    description: 'The programming language of the Web.',
    color: '#F7DF1E',
  },
  {
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework for rapid UI development.',
    color: '#38B2AC',
  },
  {
    name: 'Framer Motion',
    description: 'A production-ready motion library for React.',
    color: '#0055FF',
  },
  {
    name: 'Node.js',
    description: 'A JavaScript runtime built on V8.',
    color: '#339933',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const MobileSkills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <div ref={containerRef} className="py-[5rem] px-[2rem]">
      <h2 className="text-[2.5rem] font-[700] text-center mb-[3rem] text-white">
        Technical Skills
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-[1.5rem] w-full">
        {skills.map((skill, index) => (
          <motion.div 
            key={index}
            className="p-[1.5rem] rounded-[1rem] flex flex-col items-center text-center"
            style={{ border: `1px solid ${skill.color}`, boxShadow: `0 0 15px ${skill.color}33` }}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-white font-[600] text-[1.1rem] mb-[0.5rem]">{skill.name}</h3>
            <p className="text-gray-400 text-[0.9rem]">{skill.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MobileSkills; 