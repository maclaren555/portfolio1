import React from 'react';
import { motion } from 'framer-motion';
import { useCursorStore } from '../store/cursorStore';

const MarqueeText: React.FC = () => {
  return (
    <>
      <span className="px-[2rem]">Let's create</span>
      <span className="px-[2rem]">Let's create</span>
      <span className="px-[2rem]">Let's create</span>
      <span className="px-[2rem]">Let's create</span>
      <span className="px-[2rem]">Let's create</span>
    </>
  );
};

const CTA: React.FC = () => {
  const { setCursorType } = useCursorStore();

  const marqueeTransition = {
    duration: 80,
    ease: 'linear',
    repeat: Infinity,
  };

  return (
    <a href="#contact">
      <motion.section 
        className="w-[100%] py-[2rem] bg-[oklch(0.18_0_0)] flex overflow-hidden border-y-[1px] border-[#2a2a2a]"
        onMouseEnter={() => setCursorType('contact')}
        onMouseLeave={() => setCursorType('default')}
      >
        <motion.div
          className="text-[8vw] font-[800] uppercase text-[#ffffff] flex whitespace-nowrap"
          initial={{ x: '0%' }}
          animate={{ x: '-100%' }}
          transition={marqueeTransition}
          whileHover={{ transition: { duration: 200 } }} // Замедление текста при наведении
        >
          <MarqueeText />
          <MarqueeText />
        </motion.div>
        <motion.div
          className="text-[8vw] font-[800] uppercase text-[#ffffff] flex whitespace-nowrap"
          initial={{ x: '0%' }}
          animate={{ x: '-100%' }}
          transition={marqueeTransition}
          whileHover={{ transition: { duration: 200 } }} // Замедление текста при наведении
        >
          <MarqueeText />
          <MarqueeText />
        </motion.div>
      </motion.section>
    </a>
  );
};

export default CTA; 