import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, 
  Send, 
  Image as ImageIcon, 
  Loader2, 
  User, 
  GraduationCap,
  X,
  ChevronRight,
  BookOpen,
  Info
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { getSocraticResponse, Message } from "./GeminiService";
import { ConceptLibrary } from "./ConceptLibrary";

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = (reader.result as string).split(",")[1];
        setSelectedImage({ data: base64Data, mimeType: file.type });
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = useCallback(async (overrideInput?: string) => {
    const messageText = (overrideInput ?? input).trim();
    if (!messageText && !selectedImage) return;

    const userMessage: Message = {
      role: "user",
      parts: [{ text: messageText || "I've uploaded a problem for us to look at." }],
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const currentImage = selectedImage;
    clearImage();

    try {
      let fullResponse = "";
      const responseStream = getSocraticResponse(newMessages, currentImage ?? undefined);
      
      setMessages(prev => [...prev, { role: "model", parts: [{ text: "" }] }]);

      for await (const chunk of responseStream) {
        fullResponse += chunk;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "model",
            parts: [{ text: fullResponse }],
          };
          return updated;
        });
      }
    } catch (error) {
      console.error("Error getting response:", error);
      setMessages(prev => [
        ...prev,
        { role: "model", parts: [{ text: "I'm so sorry, I'm having a little trouble thinking right now. Could we try that again?" }] }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, messages, selectedImage]);

  const handleTryProblem = useCallback((problem: string) => {
    setShowLibrary(false);
    // Use setTimeout to ensure the library close animation completes before sending
    setTimeout(() => {
      handleSend(`I'd like to try this problem: ${problem}`);
    }, 300);
  }, [handleSend]);

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-[#fcfaf7] font-sans">
      {/* Header */}
      <header className="p-6 border-b border-[#e8e2d9] flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#5A5A40] rounded-full flex items-center justify-center text-white shadow-sm">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-medium text-[#2d2a26]">Socratic Math Tutor</h1>
            <p className="text-xs text-[#8c867e] uppercase tracking-widest font-medium">Patient • Encouraging • Step-by-Step</p>
          </div>
        </div>
        <button 
          onClick={() => setShowLibrary(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#5A5A40] hover:bg-[#f5f2ed] rounded-full transition-colors"
        >
          <BookOpen size={18} />
          <span className="hidden sm:inline">Concept Library</span>
        </button>
      </header>

      <AnimatePresence>
        {showLibrary && <ConceptLibrary onClose={() => setShowLibrary(false)} onTryProblem={handleTryProblem} />}
      </AnimatePresence>

      {/* Chat Area */}
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
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-3 bg-[#5A5A40] text-white rounded-full hover:bg-[#4a4a34] transition-all shadow-md flex items-center gap-2 font-medium"
            >
              <Camera size={20} />
              Upload a Problem
            </button>
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm ${
                  msg.role === "user" ? "bg-[#e8e2d9] text-[#5c5751]" : "bg-[#5A5A40] text-white"
                }`}>
                  {msg.role === "user" ? <User size={16} /> : <GraduationCap size={16} />}
                </div>
                <div className={`p-5 rounded-3xl shadow-sm ${
                  msg.role === "user" 
                    ? "bg-[#f5f2ed] text-[#2d2a26] rounded-tr-none" 
                    : "bg-white text-[#2d2a26] rounded-tl-none border border-[#e8e2d9]"
                }`}>
                  <div className="prose prose-stone max-w-none prose-p:leading-relaxed prose-headings:font-serif">
                    <ReactMarkdown 
                      remarkPlugins={[remarkMath]} 
                      rehypePlugins={[rehypeKatex]}
                    >
                      {msg.parts[0].text}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
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

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-[#e8e2d9]">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Image Preview */}
          <AnimatePresence>
            {previewUrl && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="relative inline-block"
              >
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="h-32 w-auto rounded-xl border-4 border-white shadow-lg object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={clearImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3">
            <input 
              type="file" 
              accept="image/*" 
              capture="environment"
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-[#5c5751] hover:bg-[#f5f2ed] rounded-full transition-colors group relative"
              title="Upload image"
            >
              <Camera size={24} />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#2d2a26] text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl">
                Best for Algebra & Calculus. Ensure clear lighting and handwriting.
              </div>
            </button>
            
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
                placeholder={selectedImage ? "Ask about this problem..." : "Type your message or ask 'Why?'"}
                className="w-full px-6 py-4 bg-[#f5f2ed] border-none rounded-full focus:ring-2 focus:ring-[#5A5A40] transition-all outline-none text-[#2d2a26]"
                disabled={isLoading}
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading || (!input.trim() && !selectedImage)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#5A5A40] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4a4a34] transition-all shadow-sm"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setInput("Why did we do that?")}
              className="text-xs font-medium text-[#8c867e] hover:text-[#5A5A40] flex items-center gap-1 transition-colors"
              disabled={isLoading}
            >
              <ChevronRight size={14} />
              "Why did we do that?"
            </button>
            <button 
              onClick={() => setInput("Can you give me a hint?")}
              className="text-xs font-medium text-[#8c867e] hover:text-[#5A5A40] flex items-center gap-1 transition-colors"
              disabled={isLoading}
            >
              <ChevronRight size={14} />
              "Can you give me a hint?"
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

