
import { createIcons, Sparkles, Send, X, Satellite, Lock, RefreshCw, Globe, ArrowUpRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Initialize Lucide Icons
createIcons({
    icons: { Sparkles, Send, X, Satellite, Lock, RefreshCw, Globe, ArrowUpRight }
});

// App State Management
const STATE = {
    apiKey: process.env.API_KEY,
    usageCount: parseInt(localStorage.getItem('cvp_forge_usage') || '0', 10),
    maxUses: 2,
    chatMessages: [{ role: 'model', content: 'Saudações. Sou o assistente cognitivo de Carlos Vitor Porto. Como posso auxiliar na sua estratégia digital hoje?' }]
};

// UI Elements
const elements = {
    navbar: document.getElementById('navbar'),
    forgeBtn: document.getElementById('forge-btn'),
    forgeOutput: document.getElementById('forge-output'),
    forgeLock: document.getElementById('forge-lock'),
    promptInput: document.getElementById('image-prompt'),
    quotaIndicator: document.getElementById('quota-indicator'),
    weatherGrid: document.getElementById('weather-grid'),
    chatToggle: document.getElementById('ai-chat-toggle'),
    chatWindow: document.getElementById('chat-window'),
    chatMessages: document.getElementById('chat-messages'),
    chatInput: document.getElementById('chat-input'),
    chatSend: document.getElementById('send-chat'),
    chatClose: document.getElementById('close-chat')
};

// --- Core Features ---

// 1. Weather Intelligence (Grounding)
async function fetchWeather() {
    try {
        const ai = new GoogleGenAI({ apiKey: STATE.apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: "Terminal Meteorológico: Forneça temperatura atual e condição (sol, chuva, nublado) para SP, RJ, DF, BA. Formato CSV: Cidade,Temp,Condicao.",
            config: { tools: [{ googleSearch: {} }] },
        });

        const data = response.text.split('\n').filter(l => l.includes(','));
        elements.weatherGrid.innerHTML = data.map(line => {
            const [city, temp, cond] = line.split(',').map(s => s.trim());
            return `
                <div class="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-500/10 to-transparent border border-white/5 weather-card">
                    <span class="text-[9px] font-black uppercase tracking-widest text-blue-500 mb-2 block">Realtime_Node</span>
                    <h4 class="text-xl font-black mb-4">${city}</h4>
                    <div class="flex justify-between items-end">
                        <span class="text-4xl font-black">${temp}</span>
                        <span class="text-[9px] font-bold uppercase text-gray-500 tracking-widest">${cond}</span>
                    </div>
                </div>
            `;
        }).join('');
    } catch (e) {
        console.error("Weather sync failed", e);
    }
}

// 2. Image Forge (Imagen 4.0)
async function generateImage() {
    if (STATE.usageCount >= STATE.maxUses) return;
    const prompt = elements.promptInput.value.trim();
    if (!prompt) return;

    elements.forgeBtn.disabled = true;
    elements.forgeBtn.innerHTML = "Sintetizando Matriz...";
    elements.forgeOutput.innerHTML = `<div class="animate-pulse text-[10px] font-black uppercase text-blue-500">Acessando Kernel Neural...</div>`;

    try {
        const ai = new GoogleGenAI({ apiKey: STATE.apiKey });
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `High-end industrial luxury aesthetic, ultra-detailed, cinematic: ${prompt}`,
            config: { numberOfImages: 1, outputMimeType: 'image/jpeg' }
        });

        if (response.generatedImages?.[0]) {
            const img = response.generatedImages[0].image.imageBytes;
            elements.forgeOutput.innerHTML = `<img src="data:image/jpeg;base64,${img}" class="w-full h-full object-cover animate-in fade-in duration-1000">`;
            
            STATE.usageCount++;
            localStorage.setItem('cvp_forge_usage', STATE.usageCount);
            updateQuotaUI();
        }
    } catch (error) {
        elements.forgeOutput.innerHTML = `<div class="text-red-500 text-[10px]">FALHA CRÍTICA NA SÍNTESE</div>`;
    } finally {
        elements.forgeBtn.disabled = false;
        elements.forgeBtn.innerHTML = "Disparar Síntese Visual";
    }
}

function updateQuotaUI() {
    if (STATE.usageCount >= STATE.maxUses) {
        elements.forgeLock.classList.remove('hidden');
    }
    const dots = [...elements.quotaIndicator.children];
    dots.forEach((dot, i) => {
        if (i < (STATE.maxUses - STATE.usageCount)) {
            dot.className = "w-3 h-3 rounded-full bg-blue-500 shadow-glow";
        } else {
            dot.className = "w-3 h-3 rounded-full bg-red-500/20";
        }
    });
}

// 3. AI Strategist Chat
async function sendChatMessage() {
    const text = elements.chatInput.value.trim();
    if (!text) return;

    appendMessage('user', text);
    elements.chatInput.value = '';
    
    try {
        const ai = new GoogleGenAI({ apiKey: STATE.apiKey });
        const history = STATE.chatMessages.map(m => ({ role: m.role, parts: [{ text: m.content }] }));
        history.push({ role: 'user', parts: [{ text }] });

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: history,
            config: { systemInstruction: "Responda como Carlos Vitor Porto Strategist. Respostas curtas, sofisticadas e profissionais." }
        });

        const reply = response.text || "Oscilação na rede. Tente novamente.";
        appendMessage('model', reply);
        STATE.chatMessages.push({ role: 'model', content: reply });
    } catch (e) {
        appendMessage('model', "Erro na conexão neural.");
    }
}

function appendMessage(role, content) {
    const div = document.createElement('div');
    div.className = `message-${role} animate-in slide-in-from-bottom-2`;
    div.innerText = content;
    elements.chatMessages.appendChild(div);
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

// --- Event Listeners ---

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        elements.navbar.classList.add('py-4');
        elements.navbar.querySelector('div > div').classList.add('bg-black/80');
    } else {
        elements.navbar.classList.remove('py-4');
        elements.navbar.querySelector('div > div').classList.remove('bg-black/80');
    }
});

elements.forgeBtn.addEventListener('click', generateImage);

elements.chatToggle.addEventListener('click', () => {
    elements.chatWindow.classList.toggle('hidden');
});

elements.chatClose.addEventListener('click', () => {
    elements.chatWindow.classList.add('hidden');
});

elements.chatSend.addEventListener('click', sendChatMessage);
elements.chatInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendChatMessage());

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    fetchWeather();
    updateQuotaUI();
    // Re-render chat initial message
    appendMessage('model', STATE.chatMessages[0].content);
});
