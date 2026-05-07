# Socratic Math Tutor

> **Version 1.5.0** — A compassionate, patient AI math tutor that guides students through complex problems one step at a time using the Socratic method.

---

## Overview

Socratic Math Tutor helps students genuinely understand mathematics rather than just arriving at answers. Upload a photo of any problem and the tutor will walk you through it step by step, explaining the reasoning behind every move. Ask "Why did we do that?" at any point and you'll get a deep conceptual explanation, complete with analogies, formula breakdowns, and interactive examples.

This version includes comprehensive input validation, enhanced error handling with user-friendly feedback, and improved type safety throughout the application, ensuring a robust and reliable tutoring experience.

---

## Features

**Socratic Guidance** — The AI never hands you the answer. Instead it introduces one step at a time and asks questions that lead you to work it out yourself.

**Image Analysis** — Upload a photo of a handwritten or printed math problem and the tutor will identify it and begin the walkthrough immediately.

**Deep Conceptual Explanations** — Asking "Why?" triggers a full breakdown of the underlying concept: definition, LaTeX formula display, variable-by-variable explanation, and a relatable analogy.

**Concept Library** — Browse and search mathematical topics independently. Each entry includes an interactive step-by-step analogy, a "Check Your Understanding" quiz with hints, and practice problems you can send directly to the chat.

**High-Thinking Reasoning** — The tutoring model runs with an extended thinking budget for rigorous, multi-step mathematical logic.

**Math Rendering** — Equations are rendered beautifully using KaTeX.

**Session Persistence** — Your entire conversation, including uploaded images, is saved to `localStorage` and survives page refreshes. Use the trash icon in the header to start fresh.

**API Key Guard** — If the Gemini API key is missing on startup, a friendly overlay walks you through setup before anything else loads.

**Robust Error Handling** — Clear, contextual error messages differentiate between API errors, validation failures, and network timeouts, helping you understand what went wrong and how to fix it.

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
| Validation | Custom type guards with runtime validation |

---

## Project Structure

```
src/
├── components/
│   ├── chat/         # ChatArea, ChatInput, ChatMessage
│   ├── layout/       # Header
│   ├── library/      # ConceptLibrary
│   └── modals/       # ApiKeyModal
├── hooks/            # useLocalStorage, useChat
├── services/         # GeminiService, ConceptService
├── types/            # Shared TypeScript interfaces + type guards
├── constants/        # Centralized prompts and configuration
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
| `APP_URL` | No | Placeholder for public URL (currently unused in core logic). |

---

## Troubleshooting

### API Key Issues
If the "API Key Required" modal persists after adding your key:
1. Ensure the `.env` file is in the root directory (same level as `package.json`).
2. Verify the variable name is exactly `GEMINI_API_KEY`.
3. Restart the development server (`npm run dev`) to load the new environment variables.
4. Check that your key is active and has permissions for Gemini 2.0 models in AI Studio.

### Concept Library Overlay Not Covering the Page
If the Concept Library appears misaligned or doesn't fill the screen, ensure the root `<div>` in `App.tsx` has the `relative` Tailwind class. The overlay uses `absolute inset-0` and requires a positioned ancestor to scope correctly.

### Import Alias Errors (`@/...` paths not resolving)
The `@` alias in `vite.config.ts` must point to `src/`, not the project root. Verify the alias reads:
```ts
alias: { "@": path.resolve(__dirname, "src") }
```
This aligns with the `tsconfig.json` mapping of `"@/*" → "src/*"`.

### Validation Errors on Message Send
If you see a validation error when sending a message or image:
1. Ensure the image file is in a supported format (JPEG, PNG, GIF, WebP, HEIC, HEIF).
2. Verify the image is not corrupted by opening it in another application.
3. Check that your message contains either text or a valid image (not both empty).
4. If uploading an image, ensure it has loaded completely before sending.

### Concept Library Search Returns No Results
If a concept search returns no results or an error:
1. Try a shorter or more specific search term (e.g., "Derivatives" instead of "How to find derivatives of polynomials").
2. Ensure your internet connection is stable and the API key has quota remaining.
3. Check the browser console for detailed error messages.
4. Try a different search term; some concepts may not be available in the knowledge base.

### Port Conflicts
The app defaults to port `3000`. If this port is in use, Vite will attempt to use another. You can force a port in `package.json`:
```bash
npm run dev -- --port 3001
```

---

## Usage Notes

The input field and quick-action buttons are disabled while the AI is responding, preventing duplicate submissions. Pressing **Enter** sends the message; **Shift+Enter** is reserved for future multiline input support and does not trigger a send. On mobile, the file input uses `capture="environment"` to open the rear camera directly.

The Concept Library uses `gemini-2.0-flash` for fast, structured JSON concept generation. Chat history is stored in the browser's `localStorage`. Click the trash icon in the header to clear your session. If `GEMINI_API_KEY` is missing at startup, an overlay will block the UI and guide you through configuration. Restart the dev server after adding the key.

All messages and images are stored locally in your browser. Clearing the cache or localStorage will erase your chat history. Images are encoded in base64 and included directly in the chat history, ensuring they persist across page refreshes until you explicitly clear the session.

---

## What's New in v1.5.0

This release focuses on architectural restructuring, accessibility enhancements, and codebase synchronization.

**Architectural Restructuring:** Extracted image handling and state management from `App.tsx` into a dedicated `useImageUpload` hook, improving modularity and reducing component complexity.

**Accessibility Enhancements:** Added descriptive `aria-label` attributes to key interactive elements in the Header, ensuring a better experience for screen reader users.

**Performance Optimization:** Memoized core session management handlers using `useCallback` to prevent unnecessary re-renders of layout components.

**Version Synchronization:** Standardized project versioning to 1.5.0 across all metadata files (`package.json`, `package-lock.json`, `README.md`, `CHANGELOG.md`), resolving historical discrepancies.

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for the full release history and detailed version notes.

---

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run clean` | Remove the `dist` directory |
| `npm run lint` | Run TypeScript type checking |

---

## Contributing

When adding new features or fixing bugs, please ensure:

1. All new code passes TypeScript strict mode (`npm run lint`).
2. Error handling includes specific error messages with context.
3. User-facing errors are written in clear, non-technical language.
4. Type safety is maintained; avoid `any` casts where possible.
5. Changes are logged in the CHANGELOG.md file.

---

## License

This project is provided as-is for educational and tutoring purposes.

---

## Support & Feedback

For issues, suggestions, or feedback, please refer to the troubleshooting section above or check the browser console for detailed error messages that may help diagnose issues.
