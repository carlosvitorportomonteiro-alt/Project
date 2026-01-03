
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import FloatingSocials from './components/FloatingSocials.tsx';
import AnimatedBackground from './components/AnimatedBackground.tsx';
import AIConsultant from './components/AIConsultant.tsx';
import ScrollProgress from './components/ScrollProgress.tsx';

// Pages
import Home from './pages/Home.tsx';
import Services from './pages/Services.tsx';
import Differentials from './pages/Differentials.tsx';
import Portfolio from './pages/Portfolio.tsx';
import Contact from './pages/Contact.tsx';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pt-24 min-h-screen"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="relative overflow-x-hidden min-h-screen selection:bg-blue-500/30 text-white bg-[#050505]">
        <ScrollProgress />
        <AnimatedBackground />
        <Navbar />
        
        <PageWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/diferenciais" element={<Differentials />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contato" element={<Contact />} />
          </Routes>
        </PageWrapper>

        <Footer />
        <FloatingSocials />
        <AIConsultant />
      </div>
    </Router>
  );
};

export default App;
