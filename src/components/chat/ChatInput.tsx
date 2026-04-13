import { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, X, Send, ChevronRight } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (val: string) => void;
  isLoading: boolean;
  previewUrl: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearImage: () => void;
  onSend: (overrideInput?: string) => void;
  selectedImage: any;
}

export function ChatInput({ 
  input, 
  setInput, 
  isLoading, 
  previewUrl, 
  onImageUpload, 
  onClearImage, 
  onSend,
  selectedImage
}: ChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      onSend();
    }
  };

  return (
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
                onClick={onClearImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                disabled={isLoading}
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
            onChange={onImageUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-[#5c5751] hover:bg-[#f5f2ed] rounded-full transition-colors group relative"
            title="Upload image"
            disabled={isLoading}
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
              onKeyDown={handleKeyDown}
              placeholder={selectedImage ? "Ask about this problem..." : "Type your message or ask 'Why?'"}
              className="w-full px-6 py-4 bg-[#f5f2ed] border-none rounded-full focus:ring-2 focus:ring-[#5A5A40] transition-all outline-none text-[#2d2a26]"
              disabled={isLoading}
            />
            <button 
              onClick={() => onSend()}
              disabled={isLoading || (!input.trim() && !selectedImage)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#5A5A40] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4a4a34] transition-all shadow-sm"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => onSend("Why did we do that?")}
            className="text-xs font-medium text-[#8c867e] hover:text-[#5A5A40] flex items-center gap-1 transition-colors"
            disabled={isLoading}
          >
            <ChevronRight size={14} />
            "Why did we do that?"
          </button>
          <button 
            onClick={() => onSend("Can you give me a hint?")}
            className="text-xs font-medium text-[#8c867e] hover:text-[#5A5A40] flex items-center gap-1 transition-colors"
            disabled={isLoading}
          >
            <ChevronRight size={14} />
            "Can you give me a hint?"
          </button>
        </div>
      </div>
    </div>
  );
}
