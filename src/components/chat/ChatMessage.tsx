import { motion } from "motion/react";
import { User, GraduationCap } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Message } from "../../types";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex gap-4 max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm ${
          isUser ? "bg-[#e8e2d9] text-[#5c5751]" : "bg-[#5A5A40] text-white"
        }`}>
          {isUser ? <User size={16} /> : <GraduationCap size={16} />}
        </div>
        <div className={`p-5 rounded-3xl shadow-sm ${
          isUser 
            ? "bg-[#f5f2ed] text-[#2d2a26] rounded-tr-none" 
            : "bg-white text-[#2d2a26] rounded-tl-none border border-[#e8e2d9]"
        }`}>
          <div className="prose prose-stone max-w-none prose-p:leading-relaxed prose-headings:font-serif">
            <ReactMarkdown 
              remarkPlugins={[remarkMath]} 
              rehypePlugins={[rehypeKatex]}
              components={{
                // Custom math rendering to ensure consistency
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <div className="bg-[#fcfaf7] p-4 rounded-xl border border-[#e8e2d9] overflow-x-auto my-4">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </div>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {message.parts[0].text}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
