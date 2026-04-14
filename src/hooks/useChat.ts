import { useState, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Message } from "@/types";
import { getSocraticResponse } from "@/services/GeminiService";

export function useChat() {
  const [messages, setMessages] = useLocalStorage<Message[]>("socratic_chat_history", []);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = useCallback(async (
    messageText: string,
    selectedImage: { data: string; mimeType: string } | null,
    onSuccess?: () => void
  ) => {
    const trimmedInput = messageText.trim();
    if (!trimmedInput && !selectedImage) return;

    const userMessage: Message = {
      role: "user",
      parts: [
        { text: trimmedInput || "I've uploaded a problem for us to look at." },
        ...(selectedImage ? [{ inlineData: { data: selectedImage.data, mimeType: selectedImage.mimeType } }] : [])
      ],
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    if (onSuccess) onSuccess();

    try {
      let fullResponse = "";
      const responseStream = getSocraticResponse(newMessages);

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
  }, [messages, setMessages]);

  const clearSession = useCallback((onClear?: () => void) => {
    if (confirm("Are you sure you want to clear your tutoring history?")) {
      setMessages([]);
      if (onClear) onClear();
    }
  }, [setMessages]);

  return {
    messages,
    setMessages,
    input,
    setInput,
    isLoading,
    handleSend,
    clearSession,
  };
}
