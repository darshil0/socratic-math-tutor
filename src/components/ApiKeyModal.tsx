import { motion } from "motion/react";
import { AlertCircle, Key, ExternalLink } from "lucide-react";

export function ApiKeyModal() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2d2a26]/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#e8e2d9] space-y-6"
      >
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle size={32} />
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl text-[#2d2a26]">API Key Required</h2>
          <p className="text-[#5c5751] leading-relaxed">
            To start tutoring, you'll need to configure your Google Gemini API key.
          </p>
        </div>

        <div className="bg-[#fcfaf7] p-5 rounded-2xl border border-[#e8e2d9] space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#5A5A40] text-white rounded-lg">
              <Key size={18} />
            </div>
            <div className="text-sm">
              <p className="font-bold text-[#2d2a26] mb-1">How to set it up:</p>
              <ol className="list-decimal pl-4 space-y-1 text-[#5c5751]">
                <li>Get a key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-[#5A5A40] font-medium hover:underline inline-flex items-center gap-1">AI Studio <ExternalLink size={12} /></a></li>
                <li>Create a <code className="bg-[#f5f2ed] px-1 rounded">.env</code> file in the root.</li>
                <li>Add <code className="bg-[#f5f2ed] px-1 rounded">GEMINI_API_KEY=your_key_here</code></li>
              </ol>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-center text-[#8c867e] uppercase tracking-widest font-medium">
          Note: Restart the development server after adding the key.
        </p>
      </motion.div>
    </div>
  );
}
