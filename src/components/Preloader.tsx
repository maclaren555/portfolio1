import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 300); // Пауза после 100%
          return 100;
        }
        return prevCount + 1;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } },
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 1.2, ease: [0.83, 0, 0.17, 1] } }}
      className="fixed top-[0] left-[0] w-[100%] h-[100%] flex items-center justify-center bg-[oklch(0.18_0_0)] z-[100]"
    >
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key="counter"
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-[#ffffff] text-[10vw] font-[700] relative"
          >
            {count}
            <span className="absolute top-[0.5rem] right-[-2.5rem] text-[2rem]">%</span>
          </motion.div>
        ) : (
          <motion.h1
            key="hi"
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="text-[#ffffff] text-[15vw] font-[800] uppercase"
          >
            HI
          </motion.h1>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Preloader; 