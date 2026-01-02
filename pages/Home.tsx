
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Monitor, Activity, Layers, Sparkles, Image as ImageIcon, Loader2, Lock, Download, ChevronRight, Server, Globe, Shield, Cpu, Code2, Database, Zap, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

const PerspectiveGrid = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div 
      className="absolute inset-0 opacity-[0.25]" 
      style={{ 
        backgroundImage: `radial-gradient(circle at 1.5px 1.5px, rgba(59, 130, 246, 0.4) 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }} 
    />
    <div 
      className="w-full h-full opacity-[0.08]" 
      style={{ 
        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.2) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1.5px, transparent 1.5px)`,
        backgroundSize: '100px 100px'
      }} 
    />
  </div>
);

const TechMarquee = () => {
  const techs = ["REACT", "NEXT.JS", "TYPESCRIPT", "NODE.JS", "AWS CLOUD", "TAILWIND CSS", "FRAMER MOTION", "POSTGRESQL", "DOCKER", "KUBERNETES", "GOOGLE CLOUD", "VERCEL"];
  return (
    <div className="py-14 bg-white/[0.05] border-y border-white/20 overflow-hidden flex whitespace-nowrap">
      <motion.div 
        animate={{ x: [0, -1200] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-24 items-center px-10"
      >
        {[...techs, ...techs].map((tech, i) => (
          <span key={i} className="text-[11px] font-black tracking-[0.6em] text-gray-400 hover:text-white transition-colors cursor-default">
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const ImageLab = () => {
  const MAX_USES = 3;
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    const count = parseInt(localStorage.getItem('cvp_ai_lab_usage_count') || '0', 10);
    setUsageCount(count);
  }, []);

  const generateImage = async () => {
    if (!prompt.trim() || isGenerating || usageCount >= MAX_USES) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: `High-definition technical photography, hyper-realistic, sharp focus, 8k, ultra-clear details, high contrast: ${prompt}` }] },
        config: { imageConfig: { aspectRatio: "1:1" } },
      });
      let imageUrl = null;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            imageUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }
      if (imageUrl) {
        setGeneratedImage(imageUrl);
        const nextCount = usageCount + 1;
        setUsageCount(nextCount);
        localStorage.setItem('cvp_ai_lab_usage_count', nextCount.toString());
      }
    } catch (error) { console.error(error); } finally { setIsGenerating(false); }
  };

  const hasCredits = usageCount < MAX_USES;
  const creditsLeft = MAX_USES - usageCount;

  return (
    <section className="px-6 max-w-6xl mx-auto py-32 relative">
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-blue-600/10 border border-blue-500/40">
          <Sparkles size={16} className="text-blue-500" />
          <span className="text-[12px] font-black uppercase tracking-[0.2em] text-blue-400">Deep Learning Visual Engine</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">AI Image Lab</h2>
        <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">Experimente o poder da nossa arquitetura de IA. Você possui <span className="text-white font-bold">3 créditos gratuitos</span> para gerar imagens de alta fidelidade.</p>
      </div>

      <div className="p-1 md:p-1 rounded-[3.8rem] bg-gradient-to-b from-white/20 to-transparent shadow-2xl">
        <div className="p-8 md:p-16 rounded-[3.5rem] border border-white/10 bg-[#080808] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-end px-2">
                  <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Prompt de Comando</label>
                  <div className="flex gap-1.5">
                    {[...Array(MAX_USES)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-6 h-1.5 rounded-full transition-all duration-500 ${i < creditsLeft ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-white/10'}`} 
                      />
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={!hasCredits || isGenerating}
                    placeholder={!hasCredits ? "Cota de demonstração finalizada." : "Ex: Data center futurista com luzes de neon azuis e fibra óptica cristalina..."}
                    className="w-full h-56 bg-black border-2 border-white/10 rounded-[2rem] p-8 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500 transition-all resize-none text-lg shadow-inner"
                  />
                  {!hasCredits && (
                    <div className="absolute inset-0 bg-black/95 rounded-[1.8rem] flex flex-col items-center justify-center border border-white/10 px-10 text-center backdrop-blur-sm">
                      <Lock className="text-blue-500 mb-5" size={40} />
                      <p className="text-lg font-black uppercase tracking-widest text-white mb-2">Créditos Esgotados</p>
                      <p className="text-sm text-gray-500 leading-relaxed">Você utilizou seus 3 créditos gratuitos. Entre em contato para pacotes ilimitados.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <button
                  onClick={generateImage}
                  disabled={!prompt.trim() || isGenerating || !hasCredits}
                  className="w-full py-7 bg-blue-600 text-white rounded-2xl text-base font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-blue-500 transition-all active:scale-[0.98] disabled:opacity-10 shadow-[0_15px_40px_rgba(37,99,235,0.3)]"
                >
                  {isGenerating ? <Loader2 className="animate-spin" size={24} /> : "Executar Renderização"}
                </button>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-1">
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Status do Sistema</span>
                    <span className="text-xs font-bold text-green-500 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Operacional
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-1 text-right">
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Créditos Disponíveis</span>
                    <span className="text-xs font-bold text-white uppercase tracking-widest">{creditsLeft} / {MAX_USES} FREE</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-square rounded-[2.5rem] border-2 border-white/15 flex items-center justify-center overflow-hidden bg-black shadow-2xl relative">
                <AnimatePresence mode="wait">
                  {generatedImage ? (
                    <motion.img 
                      key="img" 
                      initial={{ opacity: 0, scale: 0.98 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      src={generatedImage} 
                      className="w-full h-full object-cover" 
                    />
                  ) : isGenerating ? (
                    <div className="flex flex-col items-center gap-6">
                      <div className="relative">
                        <div className="w-20 h-20 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Activity size={24} className="text-blue-500" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-xs font-black text-blue-500 uppercase tracking-[0.3em]">IA Processando</span>
                        <span className="text-[10px] text-gray-600 uppercase font-bold animate-pulse">Alocando Recursos GPU...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-8 px-12 text-center">
                      <div className="w-24 h-24 bg-white/[0.02] border border-white/10 rounded-full flex items-center justify-center">
                         <ImageIcon size={48} className="text-gray-700" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-500 uppercase tracking-[0.4em] mb-2">Visual Output</p>
                        <p className="text-xs text-gray-700 font-medium">Aguardando comando de prompt para iniciar geração de alta fidelidade.</p>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
                
                {/* Sharp Corner Labels */}
                <div className="absolute top-6 left-6 px-3 py-1 bg-black/80 border border-white/20 rounded-lg text-[9px] font-black text-white uppercase tracking-widest backdrop-blur-md">8K_ULTRA_HD</div>
                <div className="absolute top-6 right-6 px-3 py-1 bg-blue-600 rounded-lg text-[9px] font-black text-white uppercase tracking-widest">AI_GENERATED</div>
              </div>

              {generatedImage && (
                <motion.a 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  href={generatedImage} 
                  download="carlos-porto-gen.png" 
                  className="absolute -bottom-6 left-10 right-10 py-5 bg-white text-black rounded-2xl flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest hover:bg-gray-100 transition-all shadow-2xl hover:-translate-y-1"
                >
                  <Download size={20} /> Baixar Arte Final HD
                </motion.a>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#050505] overflow-hidden">
      {/* Background Lighting - Deep Contrast */}
      <div className="absolute top-0 -left-[10%] w-[60vw] h-[60vw] bg-blue-600/[0.12] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-[10%] w-[50vw] h-[50vw] bg-indigo-600/[0.1] blur-[150px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=95&w=2500" 
            alt="Data Infrastructure"
            className="w-full h-full object-cover opacity-60 grayscale-[10%] brightness-[0.6] scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          <PerspectiveGrid />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 inline-flex items-center gap-4 px-7 py-3 rounded-full bg-blue-600/20 border border-blue-500/60 backdrop-blur-md"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_15px_rgba(59,130,246,1)]" />
            <span className="text-[12px] font-black uppercase tracking-[0.5em] text-white">Engenharia de Software de Elite</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-10 leading-[0.82]"
          >
            Sistemas em <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-200">Nível Superior</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto mb-16 leading-relaxed font-light tracking-tight"
          >
            Desenvolvimento de ecossistemas digitais blindados. 
            Infraestruturas escaláveis e design industrial para marcas que dominam o mercado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-8 items-center justify-center"
          >
            <a 
              href="https://wa.me/556899688695"
              className="group px-16 py-7 bg-blue-600 text-white rounded-full text-sm font-black uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-2xl flex items-center gap-4"
            >
              Iniciar Projeto <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <Link 
              to="/portfolio"
              className="px-16 py-7 border-2 border-white/40 rounded-full text-sm font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all text-white backdrop-blur-sm"
            >
              Cases de Sucesso
            </Link>
          </motion.div>
        </div>
      </section>

      <TechMarquee />

      {/* Features - Maximum Clarity */}
      <section className="px-6 max-w-7xl mx-auto py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Shield size={32} className="text-blue-500" />, title: "Segurança Tier 4", desc: "Sistemas blindados com redundância tripla e proteção ativa contra intrusões de rede." },
            { icon: <Globe size={32} className="text-blue-400" />, title: "Entrega Global", desc: "Otimização via CDN global para carregamento abaixo de 500ms em qualquer continente." },
            { icon: <Cpu size={32} className="text-white" />, title: "Cloud Engineering", desc: "Arquiteturas auto-escaláveis que suportam picos massivos de tráfego sem oscilação." },
            { icon: <Zap size={32} className="text-blue-300" />, title: "Performance Pura", desc: "Código otimizado para Core Web Vitals, garantindo nota máxima em todos os radares." }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -12, borderColor: 'rgba(255, 255, 255, 0.5)' }}
              className="p-12 rounded-[3rem] border border-white/10 bg-[#080808] hover:bg-blue-600/[0.05] transition-all shadow-2xl group"
            >
              <div className="mb-10 p-6 bg-white/[0.03] rounded-3xl w-fit border border-white/10 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-2xl font-black mb-5 text-white tracking-tight">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm font-light tracking-wide">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <ImageLab />

      {/* Process - Sharp Contrast */}
      <section className="px-6 max-w-7xl mx-auto py-32 border-y border-white/20 bg-white/[0.03] relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div>
            <span className="text-blue-500 text-[11px] font-black uppercase tracking-[0.6em] mb-10 block">Metodologia Industrial</span>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-12 tracking-tighter leading-[0.85]">Pipeline de <br /> Excelência.</h2>
            <div className="space-y-5">
              {[
                { n: "01", t: "Análise de Dados", d: "Entendemos os fluxos do seu negócio para criar a arquitetura ideal." },
                { n: "02", t: "Design UI/UX Elite", d: "Interfaces focadas em conversão de alto ticket e exclusividade." },
                { n: "03", t: "Build & Engineering", d: "Desenvolvimento modular com TypeScript e performance otimizada." },
                { n: "04", t: "Scaling & Support", d: "Deploy contínuo e suporte direto com os engenheiros responsáveis." }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-10 items-center p-10 border border-white/10 rounded-[2.5rem] hover:border-blue-500/60 transition-all group bg-black shadow-xl">
                  <span className="text-4xl font-black text-blue-600/40 font-mono group-hover:text-blue-500 transition-colors">{step.n}</span>
                  <div>
                    <h4 className="font-black text-white text-2xl mb-2">{step.t}</h4>
                    <p className="text-gray-500 text-sm font-light leading-relaxed">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-10 bg-blue-600/15 blur-[120px] opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="relative rounded-[4rem] p-3 border border-white/30 bg-white/5 shadow-2xl overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=95&w=1500" 
                alt="Code HD Excellence" 
                className="rounded-[3.5rem] grayscale-[0.1] brightness-[0.7] group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-1000" 
               />
               <div className="absolute bottom-10 left-10 p-10 rounded-[2.5rem] border border-white/30 bg-black/90 shadow-2xl backdrop-blur-xl group-hover:-translate-y-4 transition-transform duration-700">
                  <Code2 className="text-blue-500 mb-4" size={40} />
                  <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">High Precision Code</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Peak Clarity */}
      <section className="px-6 py-48 text-center relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-6xl md:text-9xl font-black mb-14 tracking-tighter text-white leading-none">Crie o <br /> Legado.</h2>
          <p className="text-gray-200 text-xl md:text-3xl mb-20 max-w-4xl mx-auto font-light leading-relaxed tracking-tight">
            Não entregamos ferramentas. Entregamos a superioridade técnica que sua marca merece para ditar as regras no digital.
          </p>
          <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
            <a 
              href="https://wa.me/556899688695"
              className="group inline-flex items-center gap-5 px-16 py-8 bg-white text-black rounded-full font-black text-xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.15)]"
            >
              Consultoria Estratégica <ChevronRight size={28} />
            </a>
            <Link 
              to="/contato"
              className="inline-flex items-center gap-5 px-16 py-8 border-2 border-white/40 text-white rounded-full font-black text-xl hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Falar com Engenheiro
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
