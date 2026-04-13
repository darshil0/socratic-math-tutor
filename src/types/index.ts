export interface Message {
  role: "user" | "model";
  parts: { text: string; inlineData?: { data: string; mimeType: string } }[];
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
