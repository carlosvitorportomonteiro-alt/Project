
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Activity, Sparkles, Image as ImageIcon, Loader2, Lock, Download, ChevronRight, Shield, Cpu, Code2, Zap, Terminal, Globe, Command, Maximize2, RefreshCcw, Trash2, Key, MessageCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import BrazilWeather from '../components/BrazilWeather.tsx';

const TechLabel = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`font-mono text-[10px] uppercase tracking-[0.3em] text-blue-500 flex items-center gap-2 ${className}`}>
    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
    {children}
  </div>
);

const ViewfinderCorners = () => (
  <>
    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/40 rounded-tl-lg pointer-events-none" />
    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/40 rounded-tr-lg pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/40 rounded-bl-lg pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/40 rounded-br-lg pointer-events-none" />
  </>
);

const ScanningLine = () => (
  <motion.div 
    animate={{ top: ["0%", "100%", "0%"] }}
    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    className="absolute left-0 right-0 h-[1px] bg-blue-400/50 z-20 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"
  />
);

const PerspectiveGrid = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.05]">
    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
  </div>
);

const ImageLab = () => {
  const MAX_USES = 2;
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [hasKey, setHasKey] = useState(false);
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    const savedCount = parseInt(localStorage.getItem('cvp_forge_usage') || '0', 10);
    setUsageCount(savedCount);

    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-4), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleOpenKey = async () => {
    if (window.aistudio?.openSelectKey) {
      addLog("Solicitando credenciais de acesso...");
      await window.aistudio.openSelectKey();
      setHasKey(true);
      addLog("Kernel Imagen 4.0 autenticado.");
    }
  };

  const generateImage = async () => {
    // Verificação estrita de créditos
    if (usageCount >= MAX_USES) {
      addLog("ERRO: Limite de cota atingido (2/2).");
      return;
    }

    if (!prompt.trim() || isGenerating) return;

    if (!hasKey) {
      addLog("ALERTA: Licença industrial pendente.");
      await handleOpenKey();
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);
    setLogs([]);
    addLog("Iniciando síntese neural...");

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      setTimeout(() => addLog("Injetando parâmetros 8K..."), 1000);
      setTimeout(() => addLog("Renderizando texturas elite..."), 2500);
      
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `High-end commercial photography, shot on RED camera, ultra-detailed, cinematic lighting, futuristic industrial aesthetic: ${prompt}`,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
      });

      if (response.generatedImages && response.generatedImages.length > 0) {
        const base64Data = response.generatedImages[0].image.imageBytes;
        const imageUrl = `data:image/jpeg;base64,${base64Data}`;
        
        // Persistência de uso
        const nextCount = usageCount + 1;
        setUsageCount(nextCount);
        localStorage.setItem('cvp_forge_usage', nextCount.toString());
        
        addLog("Ativo gerado com sucesso.");
        setGeneratedImage(imageUrl);
      } else {
        addLog("ERRO: Falha na síntese de imagem.");
      }
    } catch (error: any) {
      addLog("FALHA CRÍTICA: Interrupção no kernel.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const hasCredits = usageCount < MAX_USES;

  return (
    <section className="px-6 max-w-7xl mx-auto py-40 relative">
      <div className="flex flex-col items-center text-center mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8 px-6 py-2.5 rounded-full bg-blue-600/10 border border-blue-500/40 backdrop-blur-xl"
        >
          <Sparkles size={14} className="text-blue-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">Advanced Neural Laboratory</span>
        </motion.div>
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8">AI Image <span className="text-blue-500">Forge</span></h2>
        <p className="text-gray-500 max-w-2xl text-xl font-light leading-relaxed">
          Experimente nossa tecnologia proprietária de geração visual. <br />
          Demonstração restrita a <span className="text-white font-black underline decoration-blue-500">2 gerações por sessão</span>.
        </p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[4rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className="relative p-12 md:p-20 rounded-[4rem] border border-white/5 bg-[#080808] overflow-hidden shadow-2xl">
          <PerspectiveGrid />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch relative z-10">
            
            <div className="flex flex-col justify-between space-y-12">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <TechLabel>Neural_Prompt_Input</TechLabel>
                  <div className="flex gap-1.5 items-center bg-black/50 px-3 py-1.5 rounded-full border border-white/10">
                    <span className="text-[9px] font-black text-gray-500 uppercase mr-2">Quota:</span>
                    {[...Array(MAX_USES)].map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full border border-white/10 ${i < (MAX_USES - usageCount) ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]' : 'bg-red-500/20'}`} />
                    ))}
                  </div>
                </div>

                <div className="relative group/field">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={!hasCredits || isGenerating}
                    placeholder="Descreva a visão que deseja sintetizar..."
                    className="w-full h-72 bg-black/60 border border-white/10 rounded-[2.5rem] p-10 text-white placeholder:text-gray-800 focus:outline-none focus:border-blue-500/50 transition-all resize-none text-xl font-inter leading-relaxed shadow-inner"
                  />
                  
                  {!hasCredits && (
                    <motion.div 
                      initial={{ opacity: 0, backdropFilter: "blur(0px)" }} 
                      animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                      className="absolute inset-0 bg-black/80 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center border border-red-500/20"
                    >
                      <Lock className="text-red-500 mb-6" size={56} />
                      <h4 className="text-2xl font-black uppercase tracking-widest text-white mb-4">Acesso Bloqueado</h4>
                      <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-xs">
                        Você atingiu o limite de demonstração de 2 imagens. Para uso ilimitado e alta resolução, fale com nosso engenheiro.
                      </p>
                      <a
                        href="https://wa.me/556899688695"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-10 py-5 bg-white text-black rounded-full text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-blue-500 hover:text-white transition-all"
                      >
                        <MessageCircle size={18} /> Solicitar Licença
                      </a>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <button
                  onClick={generateImage}
                  disabled={!prompt.trim() || isGenerating || !hasCredits}
                  className="w-full py-8 bg-blue-600 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.5em] flex items-center justify-center gap-4 hover:bg-blue-500 hover:scale-[1.01] transition-all disabled:opacity-20 shadow-[0_20px_60px_rgba(37,99,235,0.3)]"
                >
                  {isGenerating ? <Loader2 className="animate-spin" size={24} /> : "Disparar Síntese Visual"}
                </button>
                
                <div className="p-8 rounded-[2rem] bg-black/40 border border-white/10 font-mono text-[10px] text-blue-500/60 h-40 overflow-hidden shadow-inner flex flex-col">
                  <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
                    <Terminal size={14} className="text-blue-500" />
                    <span className="font-black uppercase tracking-widest">System_Kernel_Log</span>
                  </div>
                  <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar">
                    {logs.length === 0 && <span className="opacity-30">Aguardando comando neural...</span>}
                    {logs.map((log, i) => <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-500">{log}</div>)}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col">
              <div className="aspect-square rounded-[3.5rem] border-2 border-white/10 flex items-center justify-center overflow-hidden bg-black shadow-2xl relative">
                <ViewfinderCorners />
                <ScanningLine />
                
                <AnimatePresence mode="wait">
                  {generatedImage ? (
                    <motion.div 
                      key="img"
                      initial={{ opacity: 0, scale: 1.1 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      className="w-full h-full relative"
                    >
                      <img src={generatedImage} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </motion.div>
                  ) : isGenerating ? (
                    <div className="flex flex-col items-center gap-10">
                      <div className="relative">
                        <div className="w-24 h-24 border-2 border-blue-500/10 border-t-blue-500 rounded-full animate-spin shadow-[0_0_40px_rgba(59,130,246,0.3)]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Activity size={32} className="text-blue-500 animate-pulse" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.6em] mb-2">Processando Matriz</p>
                        <p className="text-[9px] text-gray-600 font-mono">Kernel active: 0x8F22...B3</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-10 px-20 text-center opacity-40">
                      <div className="p-10 bg-white/[0.03] rounded-full border border-white/5">
                        <ImageIcon size={72} className="text-gray-800" />
                      </div>
                      <p className="text-[10px] text-gray-700 uppercase font-black tracking-[0.4em] leading-relaxed">
                        Interface de Saída Visual <br /> Aguardando Input
                      </p>
                    </div>
                  )}
                </AnimatePresence>
                
                <div className="absolute top-10 left-10 flex gap-3 z-20">
                   <div className="px-3 py-1.5 bg-blue-600/20 border border-blue-500/40 rounded text-[9px] font-black text-blue-400 uppercase tracking-widest backdrop-blur-xl">Forge_v4.0</div>
                   <div className="px-3 py-1.5 bg-black/60 border border-white/10 rounded text-[9px] font-black text-gray-500 uppercase tracking-widest backdrop-blur-xl">Industrial_HD</div>
                </div>
              </div>

              {generatedImage && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4 mt-8"
                >
                  <a 
                    href={generatedImage} 
                    download="cvp-neural-asset.jpg" 
                    className="flex-1 py-7 bg-white text-black rounded-[2rem] flex items-center justify-center gap-4 text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl"
                  >
                    <Download size={20} /> Exportar Ativo
                  </a>
                  <button 
                    onClick={() => {
                      setGeneratedImage(null);
                      setPrompt('');
                      addLog("Sistema reiniciado.");
                    }} 
                    className="px-8 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center text-gray-500 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const TechMarquee = () => {
  const techs = ["REACT", "NEXT.JS", "TYPESCRIPT", "NODE.JS", "AWS CLOUD", "TAILWIND CSS", "FRAMER MOTION", "POSTGRESQL", "DOCKER", "KUBERNETES", "GOOGLE CLOUD", "VERCEL"];
  return (
    <div className="py-16 bg-white/[0.02] border-y border-white/5 overflow-hidden flex whitespace-nowrap relative">
      <div className="absolute top-0 left-0 bottom-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute top-0 right-0 bottom-0 w-40 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      <motion.div 
        animate={{ x: [0, -1200] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-28 items-center px-10"
      >
        {[...techs, ...techs].map((tech, i) => (
          <span key={i} className="text-[12px] font-black tracking-[0.8em] text-gray-600 hover:text-white transition-colors cursor-default">
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#050505] overflow-hidden selection:bg-blue-500/30">
      <div className="absolute top-0 -left-[10%] w-[60vw] h-[60vw] bg-blue-600/[0.08] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-[10%] w-[50vw] h-[50vw] bg-indigo-600/[0.06] blur-[150px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=95&w=2500" 
            alt="Infrastructure"
            className="w-full h-full object-cover opacity-30 grayscale brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          <PerspectiveGrid />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 inline-flex items-center gap-4 px-8 py-3.5 rounded-full bg-blue-600/10 border border-blue-500/30 backdrop-blur-md"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_rgba(59,130,246,1)]" />
            <span className="text-[11px] font-black uppercase tracking-[0.6em] text-white">Elite Software Engineering</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-12 leading-[0.85]"
          >
            Arquitetura de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-200">Alto Impacto</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-gray-400 max-w-4xl mx-auto mb-20 leading-relaxed font-light tracking-tight"
          >
            Construímos a fundação digital para empresas que exigem performance inegociável <br className="hidden md:block" /> 
            e estética de prestígio internacional.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-10 items-center justify-center"
          >
            <a 
              href="https://wa.me/556899688695"
              className="group px-20 py-8 bg-blue-600 text-white rounded-full text-[12px] font-black uppercase tracking-[0.4em] hover:bg-blue-500 transition-all shadow-2xl flex items-center gap-5"
            >
              Iniciar Consultoria <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <Link 
              to="/portfolio"
              className="px-20 py-8 border-2 border-white/10 rounded-full text-[12px] font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-all text-white backdrop-blur-sm"
            >
              Cases Técnicos
            </Link>
          </motion.div>
        </div>
      </section>

      <TechMarquee />

      {/* Feature Section */}
      <section className="px-6 max-w-7xl mx-auto py-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { icon: <Shield size={32} className="text-blue-500" />, title: "Infras de Elite", desc: "Segurança Tier 4 com redundância ativa e proteção total contra ataques críticos." },
            { icon: <Globe size={32} className="text-blue-400" />, title: "Scale Global", desc: "Arquiteturas desenhadas para aguentar picos de milhões de acessos sem oscilação." },
            { icon: <Cpu size={32} className="text-white" />, title: "Native Performance", desc: "Código otimizado para atingir 100/100 em todas as métricas do Google Lighthouse." },
            { icon: <Zap size={32} className="text-blue-300" />, title: "AI Integration", desc: "Integração profunda de inteligência artificial generativa em fluxos de negócio." }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, borderColor: 'rgba(59, 130, 246, 0.4)' }}
              className="p-12 rounded-[3rem] border border-white/5 bg-[#080808] hover:bg-blue-600/[0.04] transition-all relative group"
            >
              <div className="mb-12 p-6 bg-white/[0.02] rounded-[2rem] w-fit border border-white/5 group-hover:border-blue-500/30 transition-all">{item.icon}</div>
              <h3 className="text-3xl font-black mb-6 text-white tracking-tight">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm font-light tracking-wide">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <BrazilWeather />

      <ImageLab />

      {/* Contact CTA */}
      <section className="px-6 py-60 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
            <span className="font-black text-[35vw] select-none tracking-tighter">ELITE</span>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-7xl md:text-[10rem] font-black mb-16 tracking-tighter text-white leading-[0.8]">Domine o <br /> Digital.</h2>
          <p className="text-gray-400 text-2xl mb-24 max-w-4xl mx-auto font-light leading-relaxed tracking-tight">
            Pare de apenas existir na web. Construa uma presença de autoridade técnica inquestionável com nossa engenharia superior.
          </p>
          <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
            <a 
              href="https://wa.me/556899688695"
              className="group inline-flex items-center gap-6 px-20 py-9 bg-white text-black rounded-full font-black text-xl hover:scale-[1.05] transition-all shadow-2xl"
            >
              Consultoria Estratégica <ChevronRight size={28} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
