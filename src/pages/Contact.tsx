import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TelegramIcon from '../components/icons/TelegramIcon';
import GmailIcon from '../components/icons/GmailIcon';
import KworkIcon from '../components/icons/KworkIcon';

gsap.registerPlugin(ScrollTrigger);

const TitleWord = ({ word }: { word: string }) => (
  <h1 className="text-[10vw] md:text-[6vw] font-[800] leading-[1] uppercase text-[#ffffff]">
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
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !phone) {
      alert('Please fill out all fields.');
      return;
    }
    setStatus('loading');

    try {
      const response = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone }),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }
      
      setStatus('success');
      setName('');
      setPhone('');
      setTimeout(() => setStatus('idle'), 3000); // Сброс состояния через 3 секунды
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000); // Сброс состояния через 3 секунды
    }
  };


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

        <div className="flex flex-col items-center gap-[3rem]">
          {/* Title container */}
          <div ref={titleRef} className="w-full flex flex-col md:flex-row md:justify-center items-center">
            <TitleWord word="LET'S" />
            <TitleWord word="TALK." />
          </div>

          {/* Icons container */}
          <div className="flex flex-row gap-[2rem] md:gap-[3rem]">
            <a href="mailto:lafaetik555@gmail.com" className="transition-opacity duration-[300ms] hover:opacity-[0.7]" aria-label="Gmail">
              <GmailIcon className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] text-[#EA4335]" />
            </a>
            <a href="https://t.me/FMaclaren555" className="transition-opacity duration-[300ms] hover:opacity-[0.7]" aria-label="Telegram">
              <TelegramIcon className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] text-[#24A1DE]" />
            </a>
            <a href="https://kwork.ru/user/maclaren555" className="transition-opacity duration-[300ms] hover:opacity-[0.7]" aria-label="Kwork">
              <KworkIcon className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] text-[#ffd000]" />
            </a>
          </div>

          {/* Form container */}
          <form onSubmit={handleSubmit} className="w-[100%] max-w-sm flex flex-col gap-[1.5rem]">
            <input 
              type="text" 
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === 'loading'}
              className="bg-transparent border-b-2 border-gray-500 text-white py-[0.75rem] px-[0.5rem] focus:outline-none focus:border-white transition-colors disabled:opacity-50"
            />
            <input 
              type="tel" 
              placeholder="Phone" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={status === 'loading'}
              className="bg-transparent border-b-2 border-gray-500 text-white py-[0.75rem] px-[0.5rem] focus:outline-none focus:border-white transition-colors disabled:opacity-50"
            />
            <div className="h-[4rem] flex items-center justify-center">
              {status === 'idle' && (
                <button 
                  type="submit"
                  className="w-[100%] py-[1rem] bg-[#ffffff] text-[#000000] font-[700] text-[1.125rem] rounded-[9999px] transition-[all] duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#e5e7eb] hover:scale-[1.05] shadow-[0_10px_15px_-3px_rgba(255,255,255,0.1)]"
                >
                  Send
                </button>
              )}
              {status === 'loading' && <p className="text-white">Sending...</p>}
              {status === 'success' && <p className="text-green-400">Message sent successfully!</p>}
              {status === 'error' && <p className="text-red-400">Something went wrong. Please try again.</p>}
            </div>
          </form>
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