import { GoogleGenAI, Part } from "@google/genai";
import { Message } from "@/types";
import { SOCRATIC_SYSTEM_INSTRUCTION } from "@/constants/prompts";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "invalid-key" });

export function isApiKeyConfigured() {
  const apiKey = process.env.GEMINI_API_KEY;
  return !!apiKey && apiKey !== "" && apiKey !== "your_key_here" && apiKey !== "invalid-key";
}

export async function* getSocraticResponse(
  history: Message[]
): AsyncGenerator<string> {
  try {
    const contents = history.map((msg) => ({
    role: msg.role === "model" ? "model" : "user",
    parts: msg.parts.map((p) => {
      if (p.inlineData) {
        return {
          inlineData: {
            data: p.inlineData.data,
            mimeType: p.inlineData.mimeType,
          },
        } as Part;
      }
      return { text: p.text || "" } as Part;
    }),
  }));

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-2.0-pro-exp-02-05",
      contents,
      config: {
        systemInstruction: {
          role: "system",
          parts: [{ text: SOCRATIC_SYSTEM_INSTRUCTION }],
        },
        thinkingConfig: { thinkingBudget: 8000 },
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("GeminiService error:", error);
    throw error;
  }
}
