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
- TypeScript 5
- Tailwind CSS v4
- Google Gemini API
- react-markdown with remark-math and rehype-katex
- motion/react
- lucide-react

---

## Project Structure

```
src/
├── components/
│   ├── chat/              # Message display, input, and conversation UI
│   ├── layout/            # Header, sidebar, main layout
│   ├── library/           # Concept library and search interface
│   └── modals/            # API key modal and other overlays
├── constants/             # API endpoints, default prompts, categories
├── hooks/                 # Custom React hooks (useLocalStorage, etc.)
├── services/              # Gemini API client, validation utilities
├── types/                 # TypeScript interfaces and enums
├── App.tsx                # Root component
├── main.tsx               # Vite entry point
└── index.css              # Global styles and Tailwind setup
```

---

## Setup

### 1. Clone the repository

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

The app will open at `http://localhost:5173` (Vite default).

---

## Environment Variables

| Name | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Google Gemini API key. Get one at [ai.google.dev](https://ai.google.dev). |
| `APP_URL` | No | Optional public app URL for future integrations. |

---

## Common Troubleshooting

### `npm` command not found

1. Install Node.js from [nodejs.org](https://nodejs.org) (LTS recommended).
2. Restart your terminal.
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### API Key modal persists after setup

1. Ensure `.env` is at the project root (same directory as `package.json`).
2. Confirm the variable is exactly `GEMINI_API_KEY=<your-key>`.
3. Restart the dev server:
   ```bash
   npm run dev
   ```
4. Clear browser cache if needed.

### Import alias errors (`@/` paths fail)

Verify `vite.config.ts` has:

```ts
alias: {
  "@": path.resolve(__dirname, "src"),
}
```

And `tsconfig.json` has:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Port 5173 is already in use

Run on a different port:

```bash
npm run dev -- --port 3001
```

### Blank page or build errors

1. Clear the build cache:
   ```bash
   npm run clean
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```
2. Check browser console for errors (F12 / DevTools).

---

## Usage

- **Send a message**: Type your math question and press Enter.
- **Upload an image**: Click the camera icon to attach a handwritten or printed problem.
- **Clear history**: Click the trash icon in the header to start a fresh session.
- **Search concepts**: Use the Concept Library tab to find topics and take quizzes.
- **Input disabled feedback**: The send button disables while the AI is responding.

---

## Development Commands

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server (default: localhost:5173) |
| `npm run build` | Build for production to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run clean` | Remove `dist/` directory |
| `npm run lint` | Run TypeScript type checking |

---

## Building for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Deploy via Vercel, Netlify, GitHub Pages, or any static host.

---

## Release Notes

### v1.5.1

- Updated `tsconfig.json` with Vite-compatible compiler settings.
- Added `vite/client` types, `esModuleInterop`, and JSON module support.
- Fixed port references in documentation (5173 vs 3000).
- Improved README clarity and troubleshooting section.
- Enhanced project structure documentation.

### v1.5.0

- Initial stable release.
- Socratic tutoring workflow with Gemini API.
- Image upload and localStorage session persistence.
- Concept Library with search and quizzes.

---

## Contributing

When contributing, please:

- Maintain strict TypeScript type safety.
- Write clear, user-friendly error messages.
- Test locally with `npm run dev` and `npm run build`.
- Run `npm run lint` before committing.
- Update the release notes above for meaningful changes.

---

## Known Limitations

- Session data is stored only in browser localStorage; clearing browser data will erase chat history.
- Image uploads are base64-encoded and sent to the Gemini API; ensure you're comfortable with Gemini's data retention policies.
- The app requires an active internet connection for Gemini API calls.

---

## License

This project is provided as-is for educational purposes.

---

## Support

For issues, questions, or feature requests, open an issue on [GitHub](https://github.com/darshil0/socratic-math-tutor/issues).
