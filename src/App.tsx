import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { isApiKeyConfigured } from "@/services/GeminiService";
import { ConceptLibrary } from "@/components/library/ConceptLibrary";
import { useChat } from "@/hooks/useChat";
import { useImageUpload } from "@/hooks/useImageUpload";

// Components
import { Header } from "@/components/layout/Header";
import { ChatArea } from "@/components/chat/ChatArea";
import { ChatInput } from "@/components/chat/ChatInput";
import { ApiKeyModal } from "@/components/modals/ApiKeyModal";

export default function App() {
  const {
    messages,
    input,
    setInput,
    isLoading,
    handleSend,
    clearSession,
  } = useChat();

  const {
    selectedImage,
    previewUrl,
    fileInputRef,
    handleImageUpload,
    clearImage,
  } = useImageUpload();

  const [showLibrary, setShowLibrary] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    setIsConfigured(isApiKeyConfigured());
  }, []);

  const onSend = useCallback(async (overrideInput?: string) => {
    await handleSend(overrideInput ?? input, selectedImage, clearImage);
  }, [handleSend, input, selectedImage, clearImage]);

  const handleTryProblem = useCallback((problem: string) => {
    setShowLibrary(false);
    setTimeout(() => {
      onSend(`I'd like to try this problem: ${problem}`);
    }, 300);
  }, [onSend]);

  const onClearSession = useCallback(() => {
    clearSession(clearImage);
  }, [clearSession, clearImage]);

  return (
    <div className="relative flex flex-col h-screen max-w-4xl mx-auto bg-[#fcfaf7] font-sans">
      {!isConfigured && <ApiKeyModal />}

      <Header
        onShowLibrary={() => setShowLibrary(true)}
        onClearSession={onClearSession}
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
        onCameraClick={() => fileInputRef.current?.click()}
        onClearImage={clearImage}
        onSend={onSend}
        selectedImage={selectedImage}
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
        accept="image/*"
        capture="environment"
      />
    </div>
  );
}
