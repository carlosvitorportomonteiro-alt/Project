
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Cpu, Fingerprint, Award, Headphones, XCircle, Sparkles } from 'lucide-react';

const Differentials: React.FC = () => {
  const diffs = [
    {
      icon: <Fingerprint className="text-blue-500" />,
      title: "Design 100% Customizado",
      desc: "Absolutamente nada de templates genéricos. Cada detalhe é criado para refletir a exclusividade da sua marca."
    },
    {
      icon: <Cpu className="text-purple-500" />,
      title: "Stack Tecnológica de Elite",
      desc: "Utilizamos as ferramentas mais poderosas do mercado: React, Tailwind, Framer Motion e Cloud de alta performance."
    },
    {
      icon: <Award className="text-blue-500" />,
      title: "Foco em Resultados",
      desc: "Interfaces desenhadas para converter. Aplicamos UX focado em transformar visitantes em clientes fiéis."
    },
    {
      icon: <ShieldCheck className="text-purple-500" />,
      title: "Segurança de Dados",
      desc: "Protocolos rígidos de criptografia e proteção para garantir a integridade total do seu ecossistema digital."
    },
    {
      icon: <CheckCircle2 className="text-blue-500" />,
      title: "Suporte X1 Personalizado",
      desc: "Nada de tickets infinitos. Você tem acesso direto ao arquiteto da sua solução para agilidade máxima."
    },
    {
      icon: <Headphones className="text-purple-500" />,
      title: "Consultoria Contínua",
      desc: "Acompanhamos o crescimento do seu projeto, sugerindo melhorias e evoluções tecnológicas constantes."
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
          <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Por que nós?</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
        >
          O Padrão <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">World Class</span>
        </motion.h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-xl font-inter font-light">
          A diferença entre um site comum e uma ferramenta de dominância digital está nos detalhes que a maioria ignora.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-40">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-10 rounded-[3rem] border-red-500/10 bg-red-500/[0.02]"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
              <XCircle size={24} />
            </div>
            <h3 className="text-2xl font-bold">Mercado Amador</h3>
          </div>
          <ul className="space-y-6 text-gray-500 font-inter">
            <li className="flex items-start gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500/50 shrink-0" />
              Templates prontos, lentos e repetitivos.
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500/50 shrink-0" />
              Falta de autoridade e visual genérico.
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500/50 shrink-0" />
              Código sem otimização e vulnerável.
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500/50 shrink-0" />
              Suporte inexistente ou por tickets.
            </li>
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-10 rounded-[3rem] border-blue-500/20 bg-blue-500/[0.05] scale-105 shadow-2xl relative z-10"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-2xl font-bold">Padrão Carlos Vitor Porto</h3>
          </div>
          <ul className="space-y-6 text-white font-inter">
            <li className="flex items-start gap-3">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              Arquitetura exclusiva e performance brutal.
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              Identidade visual impactante de alto ticket.
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              Engenharia robusta com segurança militar.
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              Acompanhamento estratégico em tempo real.
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {diffs.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[2.5rem] glass-panel border-white/5 hover:border-blue-500/20 transition-all flex flex-col"
          >
            <div className="mb-8 p-4 bg-white/5 rounded-2xl w-fit">{React.cloneElement(item.icon as React.ReactElement, { size: 32 })}</div>
            <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
            <p className="text-gray-500 font-inter leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Differentials;
