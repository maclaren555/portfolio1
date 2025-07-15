import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TelegramIcon from '../components/icons/TelegramIcon';
import GmailIcon from '../components/icons/GmailIcon';
import KworkIcon from '../components/icons/KworkIcon';

gsap.registerPlugin(ScrollTrigger);

const TitleWord = ({ word }: { word: string }) => (
  <h1 className="text-[12vw] md:text-[8vw] font-[800] leading-[1] uppercase text-[#ffffff]">
    {word.split('').map((letter, index) => (
      <span key={index} className="inline-block overflow-hidden align-bottom">
        <span className="inline-block" style={{ willChange: 'transform' }}>
          {letter}
        </span>
      </span>
    ))}
  </h1>
);

// --- Main Contact Component ---
const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    const titleEl = titleRef.current;
    if (!sectionEl || !titleEl) return;

    const chars = gsap.utils.toArray<HTMLSpanElement>(titleEl.querySelectorAll('span > span'));
    if (chars.length === 0) return;

    gsap.set(chars, { yPercent: 110 });

    const st = ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(chars, {
          yPercent: 0,
          stagger: 0.03,
          duration: 0.8,
          ease: 'power3.out',
        });
      },
      onLeaveBack: () => {
        gsap.to(chars, {
          yPercent: 110,
          stagger: {
            amount: 0.3,
            from: 'end',
          },
          duration: 0.6,
          ease: 'power3.in',
        });
      },
    });

    return () => {
      if (st) st.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="w-[100%] h-[100vh] relative bg-[#000000] overflow-hidden flex flex-col">
      
      {/* Content Layer */}
      <div className="relative z-[2] w-full h-full flex flex-col justify-center items-center text-center p-[20px] md:p-[40px]">

        <div className="flex flex-col items-center gap-[4rem] md:gap-12">
          {/* Title container */}
          <div ref={titleRef} className="w-full flex flex-col md:flex-row md:justify-center items-center">
            <TitleWord word="LET'S" />
            <TitleWord word="TALK." />
          </div>

          {/* Icons container */}
          <div className="flex flex-row gap-[2rem] md:gap-[3rem]">
            <a href="mailto:lafaetik555@gmail.com" className="transition-opacity duration-[300ms] hover:opacity-[0.7]" aria-label="Gmail">
              <GmailIcon className="w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] text-[#EA4335]" />
            </a>
            <a href="https://t.me/FMaclaren555" className="transition-opacity duration-[300ms] hover:opacity-[0.7]" aria-label="Telegram">
              <TelegramIcon className="w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] text-[#24A1DE]" />
            </a>
            <a href="https://kwork.ru/user/maclaren555" className="transition-opacity duration-[300ms] hover:opacity-[0.7]" aria-label="Kwork">
              <KworkIcon className="w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] text-[#ffd000]" />
            </a>
          </div>
        </div>
        
        {/* Footer container */}
        <div className="absolute bottom-0 left-0 w-full p-[20px] md:p-[40px]">
          <div className="w-full flex justify-between items-center text-[#5f5f5f] text-[1rem]">
            <span>© 2025</span>
            <span>maclaren555</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 