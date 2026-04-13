# Socratic Math Tutor

A compassionate, patient, and step-by-step AI math tutor that helps students master complex calculus and algebra problems through the Socratic method.

## Features

- **Image Analysis**: Upload a photo of any math problem for instant identification and guided walkthrough.
- **Socratic Method**: The AI guides you through one step at a time, explaining the "how" and "why" instead of just giving the answer.
- **Conceptual Depth**: Ask "Why did we do that?" to get detailed analogies, interactive examples, and formula breakdowns.
- **Concept Library**: Browse and search for mathematical concepts with interactive analogies, quizzes, and practice problems.
- **High-Thinking Reasoning**: Powered by Gemini 2.0 Pro with extended thinking budget for advanced mathematical logic.
- **Math Rendering**: Beautifully rendered LaTeX equations using KaTeX.
- **Warm Design**: A polished, organic UI designed to reduce math anxiety and foster a positive learning environment.

## Tech Stack

- **Frontend**: React 19, Vite 6, Tailwind CSS v4
- **AI (Tutoring)**: Google Gemini API (`gemini-2.0-pro-exp-02-05`) with High Thinking Budget
- **AI (Concept Search)**: Google Gemini API (`gemini-2.0-flash`) with structured JSON output
- **Animations**: Motion (Framer Motion v12)
- **Math Rendering**: React-Markdown, Remark-Math, Rehype-Katex, KaTeX
- **Icons**: Lucide-React

## Getting Started

1. Set your `GEMINI_API_KEY` in `.env` (copy from `.env.example`).
2. Run `npm install` then `npm run dev`.
3. Upload a photo of your math problem using the camera icon.
4. Follow the tutor's first step.
5. If you're stuck, use the "Why did we do that?" or "Can you give me a hint?" buttons.
6. Work through the problem step-by-step until you reach the solution together!

## Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Required. Your Google AI Studio API key. |
| `APP_URL` | The URL where this app is hosted (injected automatically by AI Studio). |

## Notes

- The input field and quick-action buttons are disabled while the AI is responding to prevent duplicate requests.
- Images are attached using the `capture="environment"` attribute on mobile, which opens the rear camera directly.
- The Concept Library uses `gemini-2.0-flash` for fast, structured JSON concept generation.
