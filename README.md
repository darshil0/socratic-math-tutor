# Socratic Math Tutor

> **Version 1.4.1** — A compassionate, patient, and step-by-step AI math tutor that helps students master complex calculus and algebra problems through the Socratic method.

## Features

- **Image Analysis**: Upload a photo of any math problem for instant identification and guided walkthrough.
- **Socratic Method**: The AI guides you through one step at a time, explaining the "how" and "why" instead of just giving the answer.
- **Conceptual Depth**: Ask "Why did we do that?" to get detailed analogies, interactive examples, and formula breakdowns.
- **Concept Library**: Browse and search for mathematical concepts with interactive analogies, quizzes, and practice problems.
- **High-Thinking Reasoning**: Powered by Gemini 2.0 Pro with extended thinking budget for advanced mathematical logic.
- **Math Rendering**: Beautifully rendered LaTeX equations using KaTeX.
- **Session Persistence**: Your tutoring session is saved across page refreshes via `localStorage`.
- **API Key Guard**: A friendly startup prompt guides you through setup if your API key is missing.
- **Warm Design**: A polished, organic UI designed to reduce math anxiety and foster a positive learning environment.

## Tech Stack

- **Frontend**: React 19, Vite 6, Tailwind CSS v4
- **AI (Tutoring)**: Google Gemini API (`gemini-2.0-pro-exp-02-05`) with High Thinking Budget
- **AI (Concept Search)**: Google Gemini API (`gemini-2.0-flash`) with structured JSON output
- **Animations**: Motion (Framer Motion v12)
- **Math Rendering**: React-Markdown, Remark-Math, Rehype-Katex, KaTeX
- **Icons**: Lucide-React

## Project Structure

```
src/
├── components/
│   ├── chat/         # ChatArea, ChatInput, ChatMessage
│   ├── layout/       # Header
│   ├── library/      # ConceptLibrary
│   └── modals/       # ApiKeyModal
├── hooks/            # useLocalStorage
├── services/         # GeminiService, ConceptService
├── types/            # Shared TypeScript interfaces
├── App.tsx
├── main.tsx
└── index.css
```

## Getting Started

1. Clone the repository.
2. Copy `.env.example` to `.env` and set your `GEMINI_API_KEY`.
3. Run `npm install` then `npm run dev`.
4. Upload a photo of your math problem using the camera icon, or type a question directly.
5. Follow the tutor's first step and ask "Why did we do that?" anytime you need deeper understanding.
6. Use the **Concept Library** to explore mathematical topics interactively.

## Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | **Required.** Your Google AI Studio API key. Get one at [aistudio.google.com](https://aistudio.google.com/app/apikey). |
| `APP_URL` | The URL where this app is hosted (injected automatically by AI Studio). |

## Notes

- The input field and quick-action buttons are disabled while the AI is responding to prevent duplicate requests.
- Images are attached using the `capture="environment"` attribute on mobile, which opens the rear camera directly.
- The Concept Library uses `gemini-2.0-flash` for fast, structured JSON concept generation.
- Chat history persists in the browser's `localStorage`. Use the trash icon in the header to clear your session.
- If the `GEMINI_API_KEY` is missing, an overlay will guide you through the setup process before you can start.
