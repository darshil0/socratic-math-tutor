export interface MessagePart {
  text?: string;
  inlineData?: {
    data: string;
    mimeType: string;
  };
}

export interface Message {
  role: "user" | "model";
  parts: MessagePart[];
}

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

// Type guards for runtime validation
export function isMessagePart(obj: any): obj is MessagePart {
  return (
    typeof obj === "object" &&
    obj !== null &&
    (obj.text === undefined || typeof obj.text === "string") &&
    (obj.inlineData === undefined ||
      (typeof obj.inlineData === "object" &&
        typeof obj.inlineData.data === "string" &&
        typeof obj.inlineData.mimeType === "string"))
  );
}

export function isMessage(obj: any): obj is Message {
  return (
    typeof obj === "object" &&
    obj !== null &&
    (obj.role === "user" || obj.role === "model") &&
    Array.isArray(obj.parts) &&
    obj.parts.every((p: any) => isMessagePart(p))
  );
}

export function isValidMimeType(mimeType: string): boolean {
  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/heic",
    "image/heif",
  ];
  return validTypes.includes(mimeType.toLowerCase());
}

export function isValidBase64(data: string): boolean {
  try {
    return /^[A-Za-z0-9+/=]+$/.test(data) && data.length % 4 === 0;
  } catch {
    return false;
  }
}
