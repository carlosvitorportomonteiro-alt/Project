
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, MessageCircle, Shield, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#050505] pt-24 pb-12 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/[0.02] blur-[150px] rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg shadow-blue-500/20">
                <span className="font-black text-2xl">C</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">Carlos Vitor Porto</span>
            </Link>
            <p className="text-gray-500 text-lg font-inter font-light max-w-md leading-relaxed">
              Arquiteto de Soluções especializado na engenharia de ecossistemas digitais de alta performance, escalabilidade de e-commerce e sistemas empresariais de elite.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <Instagram size={20} />, url: 'https://www.instagram.com/carlos_vitor_porto?igsh=eW16NTA1b3FuOHVm' },
                { icon: <MessageCircle size={20} />, url: 'https://wa.me/556899688695' },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 lg:col-span-2">
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500">Navegação</h4>
              <div className="flex flex-col gap-4">
                <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm">
                  <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" /> Início
                </Link>
                <Link to="/servicos" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm">
                  <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" /> Serviços
                </Link>
                <Link to="/portfolio" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm">
                  <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" /> Portfólio
                </Link>
                <Link to="/contato" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm">
                  <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" /> Contato
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-purple-500">Soluções</h4>
              <div className="flex flex-col gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm">
                   Scale Strategy <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm">
                   UX Optimization <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm">
                   Data Architecture <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm">
                   Custom Software <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 px-4 py-1.5 glass-panel rounded-full border-blue-500/20">
              <Shield size={14} className="text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Engenharia de Elite</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 glass-panel rounded-full border-purple-500/20">
              <Globe size={14} className="text-purple-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Performance Global</span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-gray-600 text-[10px] uppercase tracking-[0.4em] font-black">
              &copy; {new Date().getFullYear()} Carlos Vitor Porto • Software Engineering
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
