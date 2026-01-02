
import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Layout, Smartphone, Globe, Layers, Zap, Sparkles } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Layout className="text-blue-500" />,
      title: "Landing Pages de Alta Conversão",
      desc: "Páginas focadas em vendas diretas, desenhadas para transformar cliques em clientes reais instantaneamente com design persuasivo."
    },
    {
      icon: <Globe className="text-purple-500" />,
      title: "Sites Institucionais de Elite",
      desc: "Plataformas completas que narram a história da sua marca e estabelecem autoridade máxima no mercado digital."
    },
    {
      icon: <Layers className="text-blue-500" />,
      title: "Ecossistemas Digitais",
      desc: "Hubs centrais integrados para múltiplos produtos: e-books, cursos, mentorias e serviços em uma infraestrutura unificada."
    },
    {
      icon: <Monitor className="text-purple-500" />,
      title: "Sistemas Web Customizados",
      desc: "Aplicações robustas sob medida para resolver problemas complexos do seu fluxo de trabalho e automação de processos."
    },
    {
      icon: <Zap className="text-blue-500" />,
      title: "Otimização de Performance",
      desc: "Melhoramos o carregamento e as métricas de Core Web Vitals para SEO, garantindo que seu site atual atinja o máximo de velocidade."
    },
    {
      icon: <Smartphone className="text-purple-500" />,
      title: "Design Mobile First",
      desc: "Sua marca impecável em qualquer tela. Foco total em uma experiência fluida e intuitiva em dispositivos móveis."
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
          <span className="text-[10px] font-black uppercase tracking-widest text-white/80">O que entregamos</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
        >
          Soluções Digitais <span className="text-blue-500">Premium</span>
        </motion.h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-xl font-inter font-light">
          Não entregamos apenas código. Entregamos ativos estratégicos que geram valor real e crescimento escalável para seu negócio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-10 rounded-[2.5rem] hover:border-blue-500/20 transition-all group flex flex-col h-full"
          >
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-500/10 transition-all">
              {React.cloneElement(service.icon as React.ReactElement, { size: 32 })}
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{service.title}</h3>
            <p className="text-gray-500 font-inter leading-relaxed flex-grow">{service.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Methodology Section */}
      <div className="mt-40 glass-panel rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">Nossa Metodologia <br /> de Trabalho</h2>
            <p className="text-gray-500 text-lg leading-relaxed font-inter">
              Seguimos um processo rigoroso para garantir que cada projeto atinja os mais altos padrões internacionais de qualidade técnica e visual.
            </p>
            <div className="space-y-4">
              {[
                { step: "01", title: "Imersão Estratégica", desc: "Entendemos seu mercado e objetivos de negócio." },
                { step: "02", title: "Arquitetura & Design", desc: "Criamos a estrutura visual e técnica de elite." },
                { step: "03", title: "Engenharia Superior", desc: "Desenvolvimento com as tecnologias mais modernas." },
                { step: "04", title: "Entrega World Class", desc: "Lançamento com performance e segurança máxima." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-5 items-start p-4 hover:bg-white/5 rounded-2xl transition-colors">
                  <span className="text-blue-500 font-black font-mono text-xl">{item.step}</span>
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm font-inter">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <img 
              src="https://picsum.photos/seed/elite-dev/1000/1000" 
              alt="Elite Development" 
              className="rounded-3xl shadow-2xl border border-white/10 relative z-10 grayscale hover:grayscale-0 transition-all duration-700 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
