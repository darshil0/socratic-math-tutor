import { GoogleGenAI, Type } from "@google/genai";
import { Concept } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "invalid-key" });

export async function searchConcepts(query: string): Promise<Concept[]> {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Generate a list of 5-8 mathematical concepts related to "${query}". 
    For each concept, provide:
    - id: a unique slug
    - title: the name of the concept
    - description: a short 1-sentence summary
    - category: e.g., Algebra, Calculus, Geometry
    - content: A detailed explanation in Markdown. Include a clear definition and formula breakdown (if applicable) using LaTeX.
    - hint: A small, helpful hint about the core of this concept.
    - exampleProblems: An array of 2-3 objects, each with:
        - title: A short name for the problem
        - problem: The actual math problem text
    - interactiveQuiz: An array of 2-3 multiple-choice questions to check understanding. Each has:
        - question: The question text
        - options: 4 possible answers
        - correctIndex: 0-3
        - explanation: Why the answer is correct
        - hint: A small hint to help solve this specific question.
    - interactiveAnalogy: An array of 3-4 steps that build a relatable analogy. Each has:
        - title: A short title for this stage of the analogy
        - description: The detailed comparison text`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { type: Type.STRING },
            content: { type: Type.STRING },
            hint: { type: Type.STRING },
            exampleProblems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  problem: { type: Type.STRING },
                },
                required: ["title", "problem"],
              },
            },
            interactiveQuiz: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                  hint: { type: Type.STRING },
                },
                required: ["question", "options", "correctIndex", "explanation", "hint"],
              },
            },
            interactiveAnalogy: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ["title", "description"],
              },
            },
          },
          required: ["id", "title", "description", "category", "content", "hint", "exampleProblems", "interactiveQuiz", "interactiveAnalogy"],
        },
      },
    },
  });

  // Safely access response.text — the SDK getter can throw if there are no candidates
  let text: string | null = null;
  try {
    text = response.text ?? null;
  } catch (e) {
    console.error(`Failed to read response text for query "${query}":`, e);
    return [];
  }

  if (!text) {
    console.error(`Empty response from concept search for query "${query}"`);
    return [];
  }

  try {
    return JSON.parse(text) as Concept[];
  } catch (e) {
    console.error(`Failed to parse concepts for query "${query}":`, e);
    return [];
  }
}
