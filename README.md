# Socratic Math Tutor

> **Version 1.5.1** — A compassionate AI tutor for step-by-step math reasoning, built with React, Vite, and Google Gemini.

---

## Overview

Socratic Math Tutor is designed to help learners understand math instead of just getting answers.
Upload a problem image or type a question, and the tutor will guide you through the reasoning with friendly, incremental hints and conceptual explanations.

The app preserves session history in the browser, renders math with KaTeX, and offers a searchable Concept Library for extra practice.

---

## Key Features

- **Socratic guidance**: The tutor asks questions and explains the reasoning behind each step.
- **Image support**: Upload handwritten or printed problems and keep the picture as part of the conversation.
- **Math rendering**: Supports LaTeX with KaTeX inside chat messages.
- **Concept Library**: Search math topics, review explanations, take quizzes, and send practice problems to chat.
- **Session persistence**: Messages and uploaded images are saved in `localStorage` and survive page refresh.
- **Robust validation**: Input and API data are validated with strong TypeScript checks to prevent bad state.
- **Clear error handling**: Differentiates API, validation, and timeout failures with user-friendly feedback.

---

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS v4
- Google Gemini API
- React-Markdown + Remark-Math + Rehype-KaTeX
- Motion (`motion/react`)
- Lucide-React icons

---

## Project Structure

```
src/
├── components/
│   ├── chat/
│   ├── layout/
│   ├── library/
│   └── modals/
├── constants/
├── hooks/
├── services/
├── types/
├── App.tsx
├── main.tsx
└── index.css
```

---

## Setup

### 1. Clone

```bash
git clone https://github.com/darshil0/socratic-math-tutor.git
cd socratic-math-tutor
```

### 2. Create your environment file

- macOS / Linux:
  ```bash
  cp .env.example .env
  ```
- Windows PowerShell:
  ```powershell
  copy .env.example .env
  ```

Then add your Gemini API key to `.env`.

### 3. Install dependencies

```bash
npm install
```

### 4. Start development server

```bash
npm run dev
```

### 5. Open the app

Visit [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Name | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Google Gemini API key for AI tutoring. |
| `APP_URL` | No | Optional public app URL; currently unused in core behavior. |

---

## Common Troubleshooting

### `npm` not found
If your terminal reports `npm` is not recognized:

1. Install Node.js from https://nodejs.org.
2. Restart your terminal.
3. Verify with:
   ```bash
   node --version
   npm --version
   ```

### API Key modal remains visible

1. Confirm `.env` is at the project root.
2. Verify the key is set as `GEMINI_API_KEY`.
3. Restart the dev server with `npm run dev`.

### Import alias errors

Ensure `vite.config.ts` contains:

```ts
alias: {
  "@": path.resolve(__dirname, "src"),
}
```

This matches the `@/*` path mapping in `tsconfig.json`.

### Port conflicts
The app defaults to port `3000`. Use a different port with:

```bash
npm run dev -- --port 3001
```

---

## Usage Notes

- Press **Enter** to send a message.
- The input and send button are disabled while the AI is responding.
- Upload images using the camera icon; the app stores the image in base64 so it persists in the session.
- Click the trash icon in the header to clear the chat history.

---

## Development Commands

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run clean` | Remove `dist/` output |
| `npm run lint` | Run TypeScript checks |

---

## Release Notes

### v1.5.1

- Updated `tsconfig.json` with Vite-compatible compiler settings.
- Added `vite/client` types, `esModuleInterop`, and JSON module support.
- Improved README and environment setup instructions.

---

## Contributing

When contributing:

- Keep type safety strict.
- Prefer clear, user-friendly error messages.
- Update `CHANGELOG.md` for meaningful changes.
- Run `npm run lint` before committing.

---

## License

This project is provided as-is for educational purposes.
