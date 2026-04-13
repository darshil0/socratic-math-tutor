import { GoogleGenAI, Part } from "@google/genai";
import { Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "invalid-key" });

export function isApiKeyConfigured() {
  return !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "";
}

export async function* getSocraticResponse(
  history: Message[],
  image?: { data: string; mimeType: string }
): AsyncGenerator<string> {
  const systemInstruction = `You are a compassionate, Socratic math tutor. Your goal is to guide students to the answer, not give it. 

When an image is provided:
1. Identify the math problem in the image.
2. Provide a warm, encouraging greeting.
3. Explain the first step of the problem in detail. Don't just say what to do; explain the "how" and the "why" behind that specific step.
4. Ask the student if they understand or want to try the next part.

When the student asks 'Why did we do that?', 'Can you explain this concept?', or similar:
- Provide a deep, detailed explanation of the specific mathematical concept, rule, or theorem being used.
- **Analogy & Examples**: Always include a relatable analogy or a simple, interactive example to make the concept concrete.
- **Formula Breakdown**: If the concept involves a formula (e.g., the Quadratic Formula or Integration by Parts), you MUST:
    - Display the formula clearly in LaTeX.
    - Break down every single variable and constant in the formula.
    - Explain the significance and "role" of each part of the formula in the context of the problem.
- Ensure the explanation is thorough enough that the student feels confident in the logic before moving forward.
- Do not move to the next step until the student explicitly indicates they are ready.

General Rules:
- Maintain a patient, teacher-like tone.
- Use LaTeX for math expressions (e.g., $x^2$ or $\\frac{a}{b}$).
- Provide detailed, clear, and comprehensive explanations for every step you introduce.
- If the student gets stuck, offer a small hint rather than the full solution.
- Never give the final answer unless the student has clearly worked through all steps themselves.
- If the student provides a correct next step, praise them and move to the *next* single step with a detailed explanation of why that step follows.`;

  const contents = history.map((msg) => ({
    role: msg.role,
    parts: msg.parts.map((p) => ({ ...p })) as Part[],
  }));

  if (image) {
    const imagePart: Part = {
      inlineData: {
        data: image.data,
        mimeType: image.mimeType,
      },
    };

    const lastMessage = contents[contents.length - 1];
    if (lastMessage && lastMessage.role === "user") {
      lastMessage.parts.push(imagePart);
    } else {
      contents.push({
        role: "user",
        parts: [
          { text: "Here is a math problem I need help with." },
          imagePart,
        ],
      });
    }
  }

  const responseStream = await ai.models.generateContentStream({
    model: "gemini-2.0-pro-exp-02-05",
    contents,
    config: {
      systemInstruction,
      thinkingConfig: { thinkingBudget: 8000 },
    },
  });

  for await (const chunk of responseStream) {
    if (chunk.text) {
      yield chunk.text;
    }
  }
}
