import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ExampleProblem {
  title: string;
  problem: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface AnalogyStep {
  title: string;
  description: string;
}

export interface Concept {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown with LaTeX
  category: string;
  hint: string;
  exampleProblems: ExampleProblem[];
  interactiveQuiz: QuizQuestion[];
  interactiveAnalogy: AnalogyStep[];
}

export async function searchConcepts(query: string): Promise<Concept[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
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

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse concepts:", e);
    return [];
  }
}
