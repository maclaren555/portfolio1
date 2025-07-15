import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollStore } from '../store/scrollStore';
import { useLenisStore } from '../store/lenisStore';

gsap.registerPlugin(ScrollTrigger);

const useSmoothScroll = () => {
  const setProgress = useScrollStore((state) => state.setProgress);
  const setLenis = useLenisStore((state) => state.setLenis);

  useEffect(() => {
    // Инициализация Lenis для плавной прокрутки
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    setLenis(lenis);

    // Интеграция с GSAP ScrollTrigger
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      // Обновляем прогресс в сторе. e.progress - значение от 0 до 1
      setProgress(e.progress);
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Очистка при размонтировании компонента
    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, [setProgress, setLenis]);
};

export default useSmoothScroll; 