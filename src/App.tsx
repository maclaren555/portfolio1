import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css'; // Оставим, если тут будут какие-то общие стили для App
import Hero from './pages/Hero'; // Импортируем Hero
import Work from './pages/Work'; // Импортируем Work
import CTA from './components/CTA'; // Импортируем CTA
import About from './pages/About'; // Импортируем About
import Skills from './components/Skills'; // Импортируем Skills из components
import Contact from './pages/Contact'; // Импортируем Contact
import CustomCursor from './components/CustomCursor'; // Импортируем CustomCursor
import useSmoothScroll from './hooks/useSmoothScroll';
import ProjectPage from './pages/ProjectPage'; // Импортируем страницу проекта
import ScrollToTop from './components/ScrollToTop';
import BurgerMenu from './components/BurgerMenu'; // Импортируем бургер-меню
import Preloader from './components/Preloader'; // Импортируем Preloader

const Home: React.FC = () => {
  // Вызываем хук для активации плавной прокрутки
  useSmoothScroll();
  return (
    <main className="w-full min-h-screen bg-[oklch(0.18_0_0)] text-[#e5e7eb]">
      <BurgerMenu /> {/* Добавляем бургер-меню */}
      <Hero /> {/* Отображаем Hero */}
      <Work /> {/* Отображаем секцию Work */}
      <div className="py-[10rem]">
        <CTA /> {/* Добавляем секцию CTA */}
      </div>
      <About /> {/* Добавляем секцию About */}
      <Skills /> {/* Добавляем Skills */}
      <Contact /> {/* Добавляем Contact */}
    </main>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work/:projectSlug" element={<ProjectPage />} />
      </Routes>
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3800); // 2.5с счетчик + 0.3с пауза + 0.5с анимация "HI" + 0.5с показ

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <CustomCursor /> {/* Курсор теперь на глобальном уровне */}
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {loading ? <Preloader key="preloader" /> : <AnimatedRoutes />}
      </AnimatePresence>
    </Router>
  );
}

export default App;
