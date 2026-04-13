# Socratic Math Tutor

> **Version 1.4.4** — A compassionate, patient AI math tutor that guides students through complex problems one step at a time using the Socratic method.

-----

## Overview

Socratic Math Tutor helps students genuinely understand mathematics rather than just arriving at answers. Upload a photo of any problem and the tutor will walk you through it step-by-step, explaining the reasoning behind every move. Ask "Why did we do that?" at any point and you'll get a deep conceptual explanation, complete with analogies, formula breakdowns, and interactive examples.

-----

## Features

  * **Socratic Guidance** — The AI never hands you the answer. Instead, it introduces one step at a time and asks questions that lead you to work it out yourself.
  * **Image Analysis** — Upload a photo of a handwritten or printed math problem and the tutor will identify it and begin the walkthrough immediately.
  * **Deep Conceptual Explanations** — Asking "Why?" triggers a full breakdown of the underlying concept: definition, LaTeX formula display, variable-by-variable explanation, and a relatable analogy.
  * **Concept Library** — Browse and search mathematical topics independently. Each entry includes an interactive step-by-step analogy, a "Check Your Understanding" quiz with hints, and practice problems.
  * **High-Thinking Reasoning** — The tutoring model runs with an extended thinking budget for rigorous, multi-step mathematical logic.
  * **Math Rendering** — Equations are rendered beautifully using KaTeX.
  * **Session Persistence** — Your entire conversation, including uploaded images, is saved to `localStorage`. Use the trash icon in the header to start fresh.
  * **API Key Guard** — If the API key is missing on startup, a friendly overlay walks you through setup before anything else loads.

-----

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 6, Tailwind CSS v4 |
| **Tutoring AI** | Google Gemini API — `gemini-2.0-pro-exp-02-05` |
| **Concept Search** | Google Gemini API — `gemini-2.0-flash` |
| **Animations** | Motion (Framer Motion v12) |
| **Math Rendering** | React-Markdown + Remark-Math + Rehype-KaTeX |
| **Icons** | Lucide-React |

-----

## Project Structure

```text
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

-----

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/socratic-math-tutor.git
    cd socratic-math-tutor
    ```
2.  **Set up Environment Variables**:
    Copy `.env.example` to `.env` and add your API key (Note the `VITE_` prefix required by Vite):
    ```bash
    cp .env.example .env
    ```
3.  **Install & Run**:
    ```bash
    npm install
    npm run dev
    ```
4.  **Access the App**:
    Open [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) in your browser.
5.  **Start Learning**:
    Upload a photo of a math problem or type a question directly to begin the Socratic walkthrough.

-----

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | **Yes** | Your Google AI Studio API key. Get one at [aistudio.google.com](https://aistudio.google.com/app/apikey). |
| `VITE_APP_URL` | No | Public URL where the app is hosted. |

-----

## Usage Notes

  * **Input Blocking**: The input field and action buttons are disabled while the AI is responding to prevent race conditions.
  * **Mobile Camera**: On mobile devices, the file input uses `capture="environment"` to trigger the rear camera by default.
  * **Performance**: The Concept Library utilizes `gemini-2.0-flash` for near-instant, structured JSON responses.
  * **Data Privacy**: All chat history is stored locally in your browser. Clearing browser data or clicking the trash icon will delete your progress.

-----

## Changelog

See [CHANGELOG.md](https://www.google.com/search?q=./CHANGELOG.md) for the full release history.
