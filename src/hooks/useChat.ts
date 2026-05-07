import { useState, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Message } from "@/types";
import { getSocraticResponse } from "@/services/GeminiService";

export function useChat() {
  const [messages, setMessages] = useLocalStorage<Message[]>("socratic_chat_history", []);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const handleSend = useCallback(async (
    messageText: string,
    selectedImage: { data: string; mimeType: string } | null,
    onSuccess?: () => void
  ) => {
    const trimmedInput = messageText.trim();
    if (!trimmedInput && !selectedImage) return;

    // Validate message before sending
    if (selectedImage && (!selectedImage.data || !selectedImage.mimeType)) {
      console.error("Invalid image data: missing data or mimeType");
      setLastError("Image upload failed. Please try again.");
      return;
    }

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
    setLastError(null);

    if (onSuccess) onSuccess();

    try {
      let fullResponse = "";
      const responseStream = getSocraticResponse(newMessages);

      // Initialize model message
      setMessages(prev => [...prev, { role: "model", parts: [{ text: "" }] }]);

      // Stream response chunks
      for await (const chunk of responseStream) {
        fullResponse += chunk;
        setMessages(prev => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg && lastMsg.role === "model") {
            updated[updated.length - 1] = {
              role: "model",
              parts: [{ text: fullResponse }],
            };
          }
          return updated;
        });
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Chat error:", errorMsg);
      
      // Differentiate error types for user feedback
      let userFeedback = "I'm having trouble thinking right now. Please try again.";
      if (errorMsg.includes("API")) {
        userFeedback = "API error. Please check your connection and API key configuration.";
      } else if (errorMsg.includes("validation")) {
        userFeedback = "Invalid input. Please check your message and try again.";
      } else if (errorMsg.includes("timeout")) {
        userFeedback = "The request took too long. Please try a simpler question.";
      }
      
      setLastError(errorMsg);
      setMessages(prev => [
        ...prev,
        { role: "model", parts: [{ text: userFeedback }] }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, setMessages]);

  const clearSession = useCallback((onClear?: () => void) => {
    if (confirm("Are you sure you want to clear your tutoring history?")) {
      setMessages([]);
      setLastError(null);
      if (onClear) onClear();
    }
  }, [setMessages]);

  return {
    messages,
    setMessages,
    input,
    setInput,
    isLoading,
    lastError,
    handleSend,
    clearSession,
  };
}
