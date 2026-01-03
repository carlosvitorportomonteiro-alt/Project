
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudLightning, RefreshCw, ExternalLink, Satellite, Globe, ThermometerSun, Wind, Droplets } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface CapitalWeather {
  city: string;
  state: string;
  temp: string;
  condition: string;
  humidity?: string;
}

const BrazilWeather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<CapitalWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [sources, setSources] = useState<{ uri: string; title: string }[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Aja como um terminal meteorológico de alta precisão. Forneça a temperatura atual (número + °C) e a condição climática resumida para as principais capitais do Brasil (SP, RJ, MG, DF, BA, PR, RS, PE, CE, AM, SC, GO). Formate como uma lista CSV: Cidade,UF,Temperatura,Condição. Seja extremamente preciso com os dados de AGORA.",
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "";
      const lines = text.split('\n').filter(line => line.includes(','));
      
      const parsed: CapitalWeather[] = lines.map(line => {
        const parts = line.split(',').map(s => s.trim());
        if (parts.length >= 4) {
          return { city: parts[0], state: parts[1], temp: parts[2], condition: parts[3] };
        }
        return null;
      }).filter((item): item is CapitalWeather => item !== null);

      if (parsed.length > 0) {
        setWeatherData(parsed);
        setLastUpdate(new Date().toLocaleTimeString('pt-BR'));
      }

      // Extração obrigatória de fontes do Grounding
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const extractedSources = chunks
          .filter((c: any) => c.web)
          .map((c: any) => ({ uri: c.web.uri, title: c.web.title }));
        setSources(extractedSources);
      }

    } catch (error) {
      console.error("Erro na sincronização climática:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherStyle = (condition: string) => {
    const cond = condition.toLowerCase();
    if (cond.includes('chuva')) return { icon: <CloudRain className="text-blue-400" size={20} />, color: 'from-blue-500/20' };
    if (cond.includes('sol') || cond.includes('limpo')) return { icon: <Sun className="text-yellow-400" size={20} />, color: 'from-yellow-500/20' };
    if (cond.includes('raio') || cond.includes('tempestade')) return { icon: <CloudLightning className="text-purple-400" size={20} />, color: 'from-purple-500/20' };
    if (cond.includes('nublado') || cond.includes('nuvens')) return { icon: <Cloud className="text-gray-400" size={20} />, color: 'from-gray-500/20' };
    return { icon: <ThermometerSun className="text-blue-300" size={20} />, color: 'from-blue-500/10' };
  };

  return (
    <section className="px-6 max-w-7xl mx-auto py-32 relative">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 w-fit backdrop-blur-md"
          >
            <Satellite size={14} className="text-blue-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Atmospheric Data Sync</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">
            Real-Time <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">Climate Intelligence</span>
          </h2>
          <p className="text-gray-500 text-lg font-light leading-relaxed max-w-xl">
            Monitoramento meteorológico de alta precisão sincronizado via rede neural Gemini com busca ativa por satélite.
          </p>
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">Última Varredura</p>
            <p className="text-white font-mono text-sm">{lastUpdate || "--:--:--"}</p>
          </div>
          <button 
            onClick={fetchWeather}
            disabled={loading}
            className="group px-8 py-5 bg-white text-black rounded-2xl flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-500 hover:text-white transition-all disabled:opacity-50 shadow-2xl"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-700"} />
            Recarregar Nodes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {loading && weatherData.length === 0 ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="h-44 rounded-[2.5rem] bg-white/[0.02] border border-white/5 animate-pulse" />
            ))
          ) : (
            weatherData.map((data, i) => {
              const style = getWeatherStyle(data.condition);
              return (
                <motion.div
                  key={data.city}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5, borderColor: 'rgba(59, 130, 246, 0.4)' }}
                  className={`p-8 rounded-[2.5rem] bg-gradient-to-br ${style.color} to-transparent border border-white/5 backdrop-blur-xl relative overflow-hidden group`}
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />
                  
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-1">{data.state}</span>
                      <h4 className="text-xl font-black text-white tracking-tight">{data.city}</h4>
                    </div>
                    <div className="p-3 bg-black/40 rounded-2xl border border-white/5">
                      {style.icon}
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-4xl font-black text-white tracking-tighter mb-1">{data.temp}</p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{data.condition}</p>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                        <div className="w-1 h-1 rounded-full bg-blue-500/40" />
                        <div className="w-1 h-1 rounded-full bg-blue-500/20" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {sources.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 pt-10 border-t border-white/5"
        >
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
            <div className="flex items-center gap-3">
              <Globe size={14} className="text-gray-600" />
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.4em]">Verified Sources</span>
            </div>
            <div className="flex flex-wrap gap-6">
              {sources.map((source, i) => (
                <a 
                  key={i} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center gap-2 text-[10px] text-gray-600 hover:text-blue-400 transition-colors"
                >
                  <span className="w-4 h-[1px] bg-gray-800 group-hover:bg-blue-500 transition-colors" />
                  {source.title.substring(0, 30)}...
                  <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default BrazilWeather;
