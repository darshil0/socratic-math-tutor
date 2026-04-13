# Socratic Math Tutor

> **Version 1.4.3** — A compassionate, patient AI math tutor that guides students through complex problems one step at a time using the Socratic method.

---

## Overview

Socratic Math Tutor helps students genuinely understand mathematics rather than just arriving at answers. Upload a photo of any problem and the tutor will walk you through it step by step, explaining the reasoning behind every move. Ask "Why did we do that?" at any point and you'll get a deep conceptual explanation, complete with analogies, formula breakdowns, and interactive examples.

---

## Features

**Socratic Guidance** — The AI never hands you the answer. Instead it introduces one step at a time and asks questions that lead you to work it out yourself.

**Image Analysis** — Upload a photo of a handwritten or printed math problem and the tutor will identify it and begin the walkthrough immediately.

**Deep Conceptual Explanations** — Asking "Why?" triggers a full breakdown of the underlying concept: definition, LaTeX formula display, variable-by-variable explanation, and a relatable analogy.

**Concept Library** — Browse and search mathematical topics independently. Each entry includes an interactive step-by-step analogy, a "Check Your Understanding" quiz with hints, and practice problems you can send directly to the chat.

**High-Thinking Reasoning** — The tutoring model runs with an extended thinking budget for rigorous, multi-step mathematical logic.

**Math Rendering** — Equations are rendered beautifully using KaTeX.

**Session Persistence** — Your conversation is saved to `localStorage` and survives page refreshes. Use the trash icon in the header to start fresh.

**API Key Guard** — If the Gemini API key is missing on startup, a friendly overlay walks you through setup before anything else loads.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 6, Tailwind CSS v4 |
| Tutoring AI | Google Gemini API — `gemini-2.0-pro-exp-02-05` with `thinkingBudget: 8000` |
| Concept Search | Google Gemini API — `gemini-2.0-flash` with structured JSON output |
| Animations | Motion (Framer Motion v12) |
| Math Rendering | React-Markdown + Remark-Math + Rehype-KaTeX + KaTeX |
| Icons | Lucide-React |

---

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

---

## Getting Started

1. Clone the repository.
2. Copy `.env.example` to `.env` and add your API key:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies and start the dev server:
   ```bash
   npm install
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.
5. Upload a photo of a math problem using the camera icon, or type a question directly.
6. Follow the tutor's first step, and ask "Why did we do that?" any time you want a deeper explanation.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Your Google AI Studio API key. Get one at [aistudio.google.com](https://aistudio.google.com/app/apikey). |
| `APP_URL` | No | Public URL where the app is hosted. Auto-injected by AI Studio; leave blank for local development. |

---

## Usage Notes

- The input field and quick-action buttons are disabled while the AI is responding, preventing duplicate submissions.
- On mobile, the file input uses `capture="environment"` to open the rear camera directly.
- The Concept Library uses `gemini-2.0-flash` for fast, structured JSON concept generation.
- Chat history is stored in the browser's `localStorage`. Click the trash icon in the header to clear your session.
- If `GEMINI_API_KEY` is missing at startup, an overlay will block the UI and guide you through configuration. Restart the dev server after adding the key.

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for the full release history.
