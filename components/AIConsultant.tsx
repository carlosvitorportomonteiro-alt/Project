
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([
    { role: 'model', content: 'Saudações. Sou o arquiteto cognitivo de Carlos Vitor Porto. Como posso auxiliar na evolução tecnológica e estratégica do seu negócio hoje?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const contents = newMessages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: `Você é o estrategista digital exclusivo de Carlos Vitor Porto. 
          Carlos é um Arquiteto de Soluções World Class em Engenharia de Software e Design de Sistemas.
          Suas respostas devem ser curtas, sofisticadas e profissionais.
          Foque em escalabilidade, design premium e performance.
          Ao final de consultas produtivas, sugira sempre falar no WhatsApp para agendar uma consultoria estratégica.`,
          temperature: 0.6,
        },
      });

      const aiText = response.text || "Oscilação na rede neural. Fale com Carlos no WhatsApp para atendimento direto.";
      setMessages(prev => [...prev, { role: 'model', content: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Estou otimizando meus sistemas de IA. Fale com Carlos diretamente pelo WhatsApp para agilidade máxima." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-24 right-8 z-[55]">
        <button
          onClick={() => setIsOpen(true)}
          data-tooltip-id="global-social-tooltip"
          data-tooltip-content="Consultoria Cognitiva"
          className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 live-pulse group"
          aria-label="Abrir Inteligência Artificial"
        >
          <Sparkles size={24} className="text-blue-600 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[calc(100vw-3rem)] sm:w-[420px] h-[650px] max-h-[85vh] z-[100] glass-panel rounded-[2.5rem] flex flex-col overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.6)] border-white/10"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <Sparkles size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base tracking-tight">CVP Strategist IA</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Ativo</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-gray-400">
                <X size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 font-inter custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed ${
                    m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none font-medium' 
                    : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/10'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/10">
                    <Loader2 size={16} className="animate-spin text-blue-500" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-white/[0.03] border-t border-white/10">
              <div className="relative flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Descreva seu projeto..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center hover:bg-blue-50 transition-all disabled:opacity-20 active:scale-90"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIConsultant;
