import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { useLenisStore } from '../store/lenisStore';

function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const { lenis } = useLenisStore();

  useEffect(() => {
    if (navigationType !== 'POP') {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, lenis, navigationType]);

  return null;
}

export default ScrollToTop; 