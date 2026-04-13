import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence } from "motion/react";
import { getSocraticResponse, isApiKeyConfigured } from "./services/GeminiService";
import { ConceptLibrary } from "./components/library/ConceptLibrary";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Message } from "./types";

// Components
import { Header } from "./components/layout/Header";
import { ChatArea } from "./components/chat/ChatArea";
import { ChatInput } from "./components/chat/ChatInput";
import { ApiKeyModal } from "./components/modals/ApiKeyModal";

export default function App() {
  const [messages, setMessages] = useLocalStorage<Message[]>("socratic_chat_history", []);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsConfigured(isApiKeyConfigured());
  }, []);

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
  }, [input, messages, selectedImage, setMessages]);

  const handleTryProblem = useCallback((problem: string) => {
    setShowLibrary(false);
    setTimeout(() => {
      handleSend(`I'd like to try this problem: ${problem}`);
    }, 300);
  }, [handleSend]);

  const clearSession = () => {
    if (confirm("Are you sure you want to clear your tutoring history?")) {
      setMessages([]);
      clearImage();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-[#fcfaf7] font-sans">
      {!isConfigured && <ApiKeyModal />}

      <Header 
        onShowLibrary={() => setShowLibrary(true)} 
        onClearSession={clearSession}
        canClear={messages.length > 0}
      />

      <AnimatePresence>
        {showLibrary && <ConceptLibrary onClose={() => setShowLibrary(false)} onTryProblem={handleTryProblem} />}
      </AnimatePresence>

      <ChatArea 
        messages={messages} 
        isLoading={isLoading} 
        onUploadClick={() => fileInputRef.current?.click()} 
      />

      <ChatInput 
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        previewUrl={previewUrl}
        onImageUpload={handleImageUpload}
        onClearImage={clearImage}
        onSend={handleSend}
        selectedImage={selectedImage}
      />
    </div>
  );
}

