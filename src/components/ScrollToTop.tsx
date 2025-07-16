import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { useLenisStore } from '../store/lenisStore';

function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const { lenis } = useLenisStore();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [lenis]);

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