import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const name = "MACLAREN555";
  const title = "Little Frontend Developer";
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    const heroElement = heroRef.current;
    // Находим внутренние span'ы, которые мы будем анимировать
    const letters = nameRef.current ? Array.from(nameRef.current.querySelectorAll('span > span')) : [];
    const subtitleElement = subtitleRef.current;

    if (!heroElement || letters.length === 0 || !subtitleElement) return;

    // --- Новая анимация появления с маской ---
    const tl = gsap.timeline();

    // 1. Устанавливаем начальное состояние
    gsap.set(letters, { yPercent: 110, autoAlpha: 1 }); // Сдвигаем буквы вниз за пределы маски
    gsap.set(subtitleElement, { yPercent: 100, autoAlpha: 1 }); // И подзаголовок тоже

    // 2. Анимируем появление
    tl.to(letters, {
      yPercent: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power3.out',
    })
    .to(subtitleElement, {
      yPercent: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, "-=0.6"); // Начинаем анимацию подзаголовка чуть раньше, чем закончится анимация букв

    // --- Логика для отталкивания букв от курсора (только для десктопа) ---
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroElement) return;
      const { clientX, clientY } = e;
      const { left, top } = heroElement.getBoundingClientRect();
      
      const x = clientX - left;
      const y = clientY - top;

      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i] as HTMLElement;
        const letterRect = letter.getBoundingClientRect();
        
        const letterCenterX = letterRect.left - left + letterRect.width / 2;
        const letterCenterY = letterRect.top - top + letterRect.height / 2;
        
        const deltaX = x - letterCenterX;
        const deltaY = y - letterCenterY;
        
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDist = 200; // Радиус влияния
        
        if (distance < maxDist) {
          const force = 1 - (distance / maxDist);
          const moveX = -(deltaX / distance) * force * 30; // 30 - сила отталкивания
          const moveY = -(deltaY / distance) * force * 30;
          
          gsap.to(letter, {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          gsap.to(letter, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      }
    };

    if (isDesktop) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      if (isDesktop && heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
      tl.kill(); // Очищаем таймлайн при размонтировании
    };
  }, [isDesktop]);

  return (
    <section 
      id="hero"
      ref={heroRef}
      className="relative flex items-center justify-center w-full h-screen overflow-hidden font-montserrat"
    >
      <div className="relative z-10 flex flex-col items-center text-center gap-[1rem] md:gap-0">
        <h1 
          ref={nameRef}
          className="text-[12vw] md:text-[15vw] lg:text-[18vw] font-[900] leading-none tracking-tighter text-[#ffffff] uppercase"
          aria-label={name}
        >
          {name.split("").map((letter, index) => (
            <span key={`${letter}-${index}`} className="inline-block overflow-hidden">
              <span
                className="inline-block" // Этот span будет двигаться
              >
                {letter === " " ? " " : letter}
              </span>
            </span>
          ))}
        </h1>
        <div className="overflow-hidden">
          <p ref={subtitleRef} className="text-[1.5rem] md:text-[1.875rem] text-[#9ca3af] font-[900]">
            {title}
          </p>
        </div>
      </div>

      {/* Тут будет кастомный индикатор скролла */}
    </section>
  );
};

export default Hero; 