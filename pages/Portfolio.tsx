
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Search, Sparkles } from 'lucide-react';

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: "Luxura E-commerce",
      category: "Plataforma de Vendas High-Ticket",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200",
      desc: "Experiência de compra ultra-veloz com checkout otimizado para conversão máxima de produtos de luxo."
    },
    {
      title: "Elite Mentor Hub",
      category: "Ecossistema de Infoprodutos",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      desc: "Plataforma completa para gestão de alunos, aulas e funis de vendas integrados."
    },
    {
      title: "NexGen ERP",
      category: "Software de Gestão Empresarial",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      desc: "Dashboard analítico sob medida para visualização de dados e automação de processos internos."
    },
    {
      title: "Aura Real Estate",
      category: "Portal Imobiliário Premium",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
      desc: "Site institucional com buscas inteligentes e interface desenhada para o mercado de alto padrão."
    }
  ];

  return (
    <div className="px-6 max-w-7xl mx-auto pb-32">
      <div className="text-center mb-24 mt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 px-4 py-1.5 glass-panel rounded-full inline-flex items-center gap-2 border-blue-500/20"
        >
          <Sparkles size={12} className="text-blue-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Engenharia em Ação</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
        >
          Cases de <span className="text-blue-500">Autoridade</span>
        </motion.h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-xl font-inter font-light">
          Uma seleção estratégica de projetos que elevaram o patamar tecnológico e comercial de nossos clientes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative flex flex-col"
          >
            <div className="relative overflow-hidden rounded-[3rem] aspect-[16/10] glass-panel p-3 border-white/5 group-hover:border-blue-500/20 transition-all duration-700">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover rounded-[2.5rem] grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-2xl">
                  <ExternalLink size={24} />
                </div>
              </div>
            </div>
            
            <div className="mt-8 px-4">
              <span className="text-blue-500 text-xs font-black uppercase tracking-[0.3em] mb-3 block">{project.category}</span>
              <h3 className="text-3xl font-black mb-4 group-hover:text-blue-400 transition-colors">{project.title}</h3>
              <p className="text-gray-500 font-inter text-lg font-light leading-relaxed">{project.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-40 p-12 md:p-24 glass-panel rounded-[4rem] text-center border-dashed border-2 border-white/5 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <Search className="mx-auto mb-10 text-blue-500/50" size={64} />
          <h2 className="text-4xl md:text-5xl font-black mb-10 tracking-tighter">"Excelência não é um ato, <br /> é um padrão inegociável."</h2>
          <p className="text-gray-500 text-xl font-inter font-light leading-relaxed">
            Cada linha de código e cada pixel de design passa por uma auditoria de performance rigorosa antes de chegar ao mercado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
