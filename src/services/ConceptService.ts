import { GoogleGenAI, Type } from "@google/genai";
import { Concept } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "invalid-key" });

function validateConceptStructure(concept: any): concept is Concept {
  return (
    typeof concept === "object" &&
    concept !== null &&
    typeof concept.id === "string" &&
    typeof concept.title === "string" &&
    typeof concept.description === "string" &&
    typeof concept.content === "string" &&
    typeof concept.category === "string" &&
    typeof concept.hint === "string" &&
    Array.isArray(concept.exampleProblems) &&
    Array.isArray(concept.interactiveQuiz) &&
    Array.isArray(concept.interactiveAnalogy)
  );
}

export async function searchConcepts(query: string): Promise<Concept[]> {
  // Input validation
  if (!query || typeof query !== "string" || query.trim().length === 0) {
    throw new Error("Search query must be a non-empty string");
  }

  const sanitizedQuery = query.trim().slice(0, 500); // Prevent injection attacks

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Generate a list of 5-8 mathematical concepts related to "${sanitizedQuery}". 
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

    // Safely extract response text
    let text: string | null = null;
    try {
      text = response.text ?? null;
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : String(e);
      console.error(`SDK error accessing response.text for query "${sanitizedQuery}":`, errorMsg);
      throw new Error(`Failed to retrieve response: ${errorMsg}`);
    }

    // Validate response exists
    if (!text) {
      console.warn(`Empty response from concept search for query "${sanitizedQuery}"`);
      return [];
    }

    // Parse JSON with error context
    let concepts: any;
    try {
      concepts = JSON.parse(text);
    } catch (parseError) {
      const errorMsg = parseError instanceof Error ? parseError.message : String(parseError);
      console.error(`JSON parse error for query "${sanitizedQuery}":`, errorMsg, `\nResponse text: ${text.slice(0, 200)}...`);
      throw new Error(`Invalid response format: ${errorMsg}`);
    }

    // Validate array structure
    if (!Array.isArray(concepts)) {
      console.error(`Expected array, got ${typeof concepts} for query "${sanitizedQuery}"`);
      throw new Error("Response must be an array of concepts");
    }

    // Validate and filter each concept
    const validConcepts: Concept[] = [];
    const invalidIndices: number[] = [];

    concepts.forEach((concept, idx) => {
      if (validateConceptStructure(concept)) {
        validConcepts.push(concept);
      } else {
        invalidIndices.push(idx);
        console.warn(`Invalid concept structure at index ${idx} for query "${sanitizedQuery}":`, concept);
      }
    });

    if (invalidIndices.length > 0) {
      console.warn(
        `Filtered out ${invalidIndices.length} invalid concepts at indices [${invalidIndices.join(", ")}] for query "${sanitizedQuery}"`
      );
    }

    if (validConcepts.length === 0) {
      console.warn(`No valid concepts after validation for query "${sanitizedQuery}"`);
    }

    return validConcepts;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`Concept search failed for query "${sanitizedQuery}":`, errorMsg);
    throw new Error(`Failed to search concepts: ${errorMsg}`);
  }
}
