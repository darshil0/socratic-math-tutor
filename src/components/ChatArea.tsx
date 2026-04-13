import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Image as ImageIcon, Info, Camera, GraduationCap, Loader2 } from "lucide-react";
import { Message } from "../GeminiService";
import { ChatMessage } from "./ChatMessage";

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  onUploadClick: () => void;
}

export function ChatArea({ messages, isLoading, onUploadClick }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth"
    >
      {messages.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center h-full text-center space-y-6 max-w-md mx-auto"
        >
          <div className="w-20 h-20 bg-[#f5f2ed] rounded-full flex items-center justify-center text-[#5A5A40] mb-2">
            <ImageIcon size={40} />
          </div>
          <h2 className="font-serif text-3xl text-[#2d2a26]">Welcome, student.</h2>
          <p className="text-[#5c5751] leading-relaxed">
            I'm here to help you understand math, not just solve it. Upload a photo of a problem you're working on, and we'll walk through it together.
          </p>
          
          <div className="bg-white/50 p-4 rounded-2xl border border-[#e8e2d9] text-left space-y-2">
            <h3 className="text-xs font-bold text-[#5A5A40] uppercase tracking-widest flex items-center gap-2">
              <Info size={14} />
              Capabilities & Tips
            </h3>
            <ul className="text-xs text-[#5c5751] space-y-1 list-disc pl-4">
              <li>Best for: Algebra, Calculus, Trig, and Geometry.</li>
              <li>Supports: Handwritten or printed text.</li>
              <li>Tip: Ensure the photo is well-lit and clear.</li>
              <li>Limit: Complex 3D diagrams or multi-page proofs may be harder to parse.</li>
            </ul>
          </div>

          <button 
            onClick={onUploadClick}
            className="px-8 py-3 bg-[#5A5A40] text-white rounded-full hover:bg-[#4a4a34] transition-all shadow-md flex items-center gap-2 font-medium"
          >
            <Camera size={20} />
            Upload a Problem
          </button>
        </motion.div>
      )}

      <AnimatePresence mode="popLayout">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}
      </AnimatePresence>
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="flex gap-4 items-center">
            <div className="w-8 h-8 rounded-full bg-[#5A5A40] text-white flex items-center justify-center animate-pulse">
              <GraduationCap size={16} />
            </div>
            <div className="flex items-center gap-2 text-[#8c867e] italic text-sm">
              <Loader2 size={16} className="animate-spin" />
              Thinking through the steps...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
