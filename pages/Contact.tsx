
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Instagram, MapPin, Phone, CheckCircle2, Sparkles } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSent, setIsSent] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isWaiting) {
      e.preventDefault();
      return;
    }

    setIsSent(true);
    setIsWaiting(true);

    // O link abrirá em uma nova aba normalmente pelo target="_blank"
    // Resetar o estado após 5 segundos
    setTimeout(() => {
      setIsSent(false);
      setIsWaiting(false);
    }, 5000);
  };

  return (
    <div className="px-6 max-w-7xl mx-auto pb-32 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-4 py-1.5 glass-panel rounded-full inline-flex items-center gap-2 border-blue-500/20"
            >
              <Sparkles size={12} className="text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Conecte-se com a Elite</span>
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
              Vamos Criar <br /><span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Algo Épico?</span>
            </h1>
            <p className="text-gray-500 text-xl font-inter leading-relaxed max-w-lg font-light">
              Não acreditamos em formulários frios. Preferimos o contato direto para entender a alma do seu projeto e entregar o extraordinário.
            </p>
          </div>

          <div className="space-y-6">
            <a 
              href="https://wa.me/556899688695" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 p-8 glass-panel rounded-[2.5rem] group hover:border-green-500/30 transition-all bg-green-500/[0.02]"
            >
              <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white transition-all duration-500">
                <MessageCircle size={32} />
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">WhatsApp Direto</p>
                <p className="text-2xl font-bold text-white tracking-tight">+55 68 9968-8695</p>
              </div>
            </a>

            <a 
              href="https://www.instagram.com/carlos_vitor_porto?igsh=eW16NTA1b3FuOHVm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 p-8 glass-panel rounded-[2.5rem] group hover:border-purple-500/30 transition-all bg-purple-500/[0.02]"
            >
              <div className="w-16 h-16 bg-white/5 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-yellow-400 group-hover:via-pink-500 group-hover:to-purple-600 transition-all duration-500">
                <Instagram size={32} />
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Instagram Oficial</p>
                <p className="text-2xl font-bold text-white tracking-tight">@carlos_vitor_porto</p>
              </div>
            </a>
          </div>

          <div className="flex flex-wrap gap-10 opacity-40 font-inter text-sm font-medium">
             <div className="flex items-center gap-2 text-white"><MapPin size={18} className="text-blue-500" /> Rio Branco, AC - Brasil</div>
             <div className="flex items-center gap-2 text-white"><Phone size={18} className="text-blue-500" /> Consultoria Exclusiva</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-panel p-10 md:p-14 rounded-[3.5rem] relative z-10 space-y-10 border-white/10">
            <div className="flex items-center gap-5">
               <div className="relative">
                 <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40">
                    <Sparkles size={24} className="text-white" />
                 </div>
                 <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-[#050505] rounded-full" />
               </div>
               <div>
                  <h3 className="font-black text-xl tracking-tight">Vitor Web Solutions</h3>
                  <p className="text-green-500 text-[10px] font-black uppercase tracking-widest">Atendimento Ativo</p>
               </div>
            </div>
            
            <p className="text-gray-400 text-xl leading-relaxed font-inter font-light italic">
              "Nossa engenharia está a um clique de distância. Clique abaixo para uma análise profunda do seu modelo de negócio e vamos escalá-lo."
            </p>

            <div className="relative h-24 flex items-center">
              <AnimatePresence mode="wait">
                {isSent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="w-full py-7 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full flex items-center justify-center gap-3 font-bold text-base md:text-lg text-center px-6"
                  >
                    <CheckCircle2 size={24} className="shrink-0" />
                    Sua mensagem foi enviada! A equipe entrará em contato em breve.
                  </motion.div>
                ) : (
                  <motion.a 
                    key="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href="https://wa.me/556899688695"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="w-full py-7 bg-white text-black text-center block rounded-full font-black text-xl hover:bg-blue-50 transition-all shadow-2xl active:scale-95"
                  >
                    INICIAR CONVERSA (X1)
                  </motion.a>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="text-center text-gray-500 text-xs font-black uppercase tracking-widest">
                 Tempo médio de resposta: <span className="text-white">5 min</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <motion.div 
                    key={s} 
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: s * 0.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-blue-500" 
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute -inset-10 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
