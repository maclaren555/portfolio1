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

  // Add state for errors and phone mask
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Simple phone mask function (formats as +X (XXX) XXX-XX-XX)
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length > 0) {
      let formatted = '+';
      if (digits.length >= 1) formatted += digits[0];
      if (digits.length >= 2) formatted += ' (' + digits.substring(1, 4);
      if (digits.length >= 4) formatted += ') ' + digits.substring(4, 7);
      if (digits.length >= 7) formatted += '-' + digits.substring(7, 9);
      if (digits.length >= 9) formatted += '-' + digits.substring(9, 11);
      return formatted;
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  // Update handleSubmit with validation
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setNameError('');
    setPhoneError('');
    let hasError = false;

    if (!name.trim()) {
      setNameError('Please enter your name');
      hasError = true;
    }
    if (!phone.trim() || phone.length < 10) { // Basic check
      setPhoneError('Please enter a valid phone number');
      hasError = true;
    }

    if (hasError) return;

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

  // Add useEffect for auto-focus on first input
  useLayoutEffect(() => {
    const nameInput = document.querySelector<HTMLInputElement>('input[placeholder="Name"]');
    nameInput?.focus();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="w-[100%] min-h-[80vh] sm:min-h-[100vh] relative bg-[black] overflow-hidden flex flex-col md:p-[40px] p-[32px]">
      
      {/* Content Layer */}
      <div className="relative z-[2] w-[100%] h-[100%] flex flex-col justify-center items-center text-center p-[24px] md:p-[40px] pb-[64px] md:pb-[80px]">

        {/* Adjust gaps and sizes for better symmetry and responsiveness */}
        <div className="flex flex-col items-center gap-[32px] sm:gap-[40px] md:gap-[48px] flex-grow justify-center">
          {/* Title with responsive size */}
          <div ref={titleRef} className="w-[100%] flex flex-row justify-center items-center text-[1.875rem] sm:text-[3.125rem] md:text-[3.75rem] gap-[8px]">
            <TitleWord word="LET'S" />
            <TitleWord word="TALK." />
          </div>

          {/* Icons with balanced gaps */}
          <div className="flex flex-row gap-[32px] sm:gap-[32px] md:gap-[40px]">
            <a href="mailto:lafaetik555@gmail.com" className="transition-opacity duration-[300ms] hover:opacity-[0.7] active:scale-[0.95]" aria-label="Gmail">
              <GmailIcon className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] md:w-[64px] md:h-[64px] text-[#EA4335]" />
            </a>
            <a href="https://t.me/FMaclaren555" className="transition-opacity duration-[300ms] hover:opacity-[0.7] active:scale-[0.95]" aria-label="Telegram">
              <TelegramIcon className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] md:w-[64px] md:h-[64px] text-[#24A1DE]" />
            </a>
            <a href="https://kwork.ru/user/maclaren555" className="transition-opacity duration-[300ms] hover:opacity-[0.7] active:scale-[0.95]" aria-label="Kwork">
              <KworkIcon className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] md:w-[64px] md:h-[64px] text-[#ffd000]" />
            </a>
          </div>

          {/* Form as above */}
          <form onSubmit={handleSubmit} className="w-[100%] max-w-[28rem] sm:max-w-[36rem] flex flex-col gap-[20px] sm:gap-[24px] mx-[16px] sm:mx-[0px]">
            <div className="relative">
            <input 
              type="text" 
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === 'loading'}
                aria-invalid={!!nameError}
                aria-describedby="name-error"
                className="w-[100%] bg-[transparent] border-b-[2px] border-[hsl(210,5%,45%)] text-[white] py-[12px] px-[8px] focus:outline-[none] focus:border-[white] focus:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all disabled:opacity-[0.5]"
            />
              {nameError && <p id="name-error" className="text-[rgba(252,165,165,0.8)] text-[0.875rem] mt-[4px]">{nameError}</p>}
            </div>
            <div className="relative">
            <input 
              type="tel" 
                placeholder="Phone (e.g. +7 (XXX) XXX-XX-XX)" 
              value={phone}
                onChange={handlePhoneChange}
              disabled={status === 'loading'}
                aria-invalid={!!phoneError}
                aria-describedby="phone-error"
                className="w-[100%] bg-[transparent] border-b-[2px] border-[hsl(210,5%,45%)] text-[white] py-[12px] px-[8px] focus:outline-[none] focus:border-[white] focus:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all disabled:opacity-[0.5]"
                maxLength={18} // For masked phone
            />
              {phoneError && <p id="phone-error" className="text-[rgba(252,165,165,0.8)] text-[0.875rem] mt-[4px]">{phoneError}</p>}
            </div>
            <div className="h-[64px] flex items-center justify-center" aria-live="polite">
              {status === 'idle' && (
                <button 
                  type="submit"
                  className="w-[100%] py-[16px] bg-[white] text-[black] font-bold text-[1.125rem] rounded-[9999px] transition-all duration-[300ms] hover:bg-[black] hover:text-[white] hover:scale-[1.05] active:scale-[0.95] shadow-[0_4px_6px_rgba(0,0,0,0.1)] disabled:opacity-[0.5]"
                >
                  Send
                </button>
              )}
              {status === 'loading' && <p className="text-[rgba(209,213,219,0.8)]">Sending...</p>}
              {status === 'success' && <p className="text-[rgba(134,239,172,0.8)]">Thank you! Message sent successfully.</p>}
              {status === 'error' && <p className="text-[rgba(252,165,165,0.8)]">Something went wrong. Please try again.</p>}
            </div>
          </form>
        </div>
        
        {/* Footer container */}
        <div className="absolute bottom-[2rem] left-[0] right-[0] flex justify-between px-[24px] md:px-[40px] text-[#9ca3af] text-[0.75rem] xs:text-[0.875rem] md:text-[1rem] pb-[env(safe-area-inset-bottom)] transition-opacity duration-[200ms] hover:opacity-[0.8]">
            <span>© 2025</span>
          <span>Maclaren555</span>
        </div>
      </div>
    </section>
  );
};

export default Contact; 