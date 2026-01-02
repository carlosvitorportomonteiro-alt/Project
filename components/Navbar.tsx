
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
// Added missing imports for framer-motion components used in the mobile menu
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Portfólio', path: '/portfolio' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className={`glass-panel rounded-full px-8 py-2.5 flex items-center justify-between transition-all duration-700 border-white/5 ${isScrolled ? 'bg-black/80 backdrop-blur-xl shadow-2xl' : 'bg-transparent'}`}>
          <Link to="/" className="flex items-center gap-3">
            <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center">
              <span className="font-bold text-xs">C</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">CVP Engineering</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[9px] font-black uppercase tracking-[0.3em] transition-colors hover:text-white ${location.pathname === link.path ? 'text-blue-500' : 'text-gray-500'}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="w-px h-4 bg-white/10 mx-2" />
            <a 
              href="https://wa.me/556899688695" 
              className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500 hover:text-white transition-all"
            >
              Start_Project
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-gray-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black/98 z-40 md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-500 hover:text-white transition-all"
              >
                {link.name}
              </Link>
            ))}
            <button onClick={() => setMobileMenuOpen(false)} className="mt-8 text-gray-600"><X size={32} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
