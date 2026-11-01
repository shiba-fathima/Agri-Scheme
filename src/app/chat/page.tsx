"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: 'bot' | 'user';
  content: string;
}

const mockResponses: Record<string, string> = {
  "hello": "Hello! I am your Farm AI Assistant. How can I help you regarding government schemes today?",
  "hi": "Hi there! Looking for the latest schemes or need help with an application?",
  "tractor": "For tractors, the Sub-Mission on Agricultural Mechanization (SMAM) provides up to 50% subsidy. I can guide you through the application if you like.",
  "kisan": "PM-KISAN provides ₹6,000 per year in three equal installments. Are you looking to track your installment status?",
  "insurance": "The PM Fasal Bima Yojana covers crop loss due to natural calamities. The premium is just 1.5% to 2% for most crops. Would you like to check your eligibility?",
  "default": "I'm still learning! However, you can check your recommended schemes in the dashboard or browse the full list. Could you please provide more details?",
};

export default function ChatAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', content: "Namaste! I'm AgriScheme AI. Ask me anything about subsidies, loans, or insurance schemes." }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate AI thinking and response
    setTimeout(() => {
      const lowerInput = userMsg.content.toLowerCase();
      let responseContent = mockResponses["default"];
      
      for (const [key, value] of Object.entries(mockResponses)) {
        if (lowerInput.includes(key)) {
          responseContent = value;
          break;
        }
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', content: responseContent }]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-white rounded-2xl border shadow-sm overflow-hidden animate-in fade-in duration-500">
      {/* Chat Header */}
      <div className="bg-primary-600 text-white p-4 flex items-center gap-4 shrink-0">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
          <Bot className="w-7 h-7" />
        </div>
        <div>
          <h1 className="font-bold text-lg">AgriScheme AI Assistant</h1>
          <p className="text-primary-100 text-sm flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
            Online - Ready to help
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={cn(
              "flex gap-4 max-w-[85%]",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
              msg.role === 'user' ? "bg-slate-200 text-slate-600" : "bg-primary-100 text-primary-600"
            )}>
              {msg.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
            </div>
            <div className={cn(
              "p-4 rounded-2xl",
              msg.role === 'user' 
                ? "bg-primary-600 text-white rounded-tr-none shadow-sm" 
                : "bg-white text-slate-800 border rounded-tl-none shadow-sm"
            )}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-white border-t shrink-0">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button type="button" className="p-3 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors shrink-0">
            <Mic className="w-6 h-6" />
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 bg-slate-50 px-4 py-3 border-none rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button 
            type="submit" 
            disabled={!input.trim()}
            className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
