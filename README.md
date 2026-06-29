# Socratic Math Tutor

**Version 1.5.2** — A compassionate, step-by-step math tutor built with React, Vite, and Google Gemini.  
GitHub: [github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash](https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash)

---

## Overview

Socratic Math Tutor helps learners understand how to solve math problems instead of just showing the final answer. Upload a problem image or type a question, and the tutor will guide you with small hints and clear explanations for each step.

Session history is stored in the browser, math is rendered with KaTeX, and a searchable Concept Library offers extra explanations, quizzes, and practice problems.

---

## Key Features

- **Socratic guidance**: The tutor asks questions and explains each step to build understanding, not shortcuts.
- **Image support**: Upload handwritten or printed problems and keep the image alongside the conversation.
- **Math rendering**: LaTeX math is rendered in chat using KaTeX for clean, readable equations.
- **Concept Library**: Search topics, read explanations, take quizzes, and send practice problems directly into the chat.
- **Session persistence**: Messages and uploaded images are stored in `localStorage`, so your history survives page refreshes.
- **Robust validation**: Inputs and API responses are validated with TypeScript to avoid invalid or inconsistent state.
- **Clear error handling**: API, validation, and timeout errors are shown with distinct, user-friendly messages.

---

## Tech Stack

- React 19
- Vite 8
- TypeScript 5.8
- Tailwind CSS v4
- Google Gemini API (`@google/genai`)
- `react-markdown` + `remark-math` + `rehype-katex`
- `motion/react` (formerly Framer Motion)
- `lucide-react`
- Vitest
- `@testing-library/react`

---

## Project Structure

```
src/
├── components/
│   ├── chat/              # Chat UI: messages, input, conversation flow
│   ├── layout/            # Header, sidebar, overall page layout
│   ├── library/           # Concept Library UI and search
│   └── modals/            # API key modal and other overlays
├── constants/             # API endpoints, default prompts, category lists
├── hooks/                 # Custom hooks (e.g., useLocalStorage)
├── services/              # Gemini client and validation utilities
├── types/                 # TypeScript interfaces and enums
├── App.tsx                # Root component
├── main.tsx               # Vite entry point
└── index.css              # Global styles and Tailwind configuration
```

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash.git
cd AI_Math_Tutor_Gemini_1.5_Flash
```

### 2. Create your environment file

**macOS / Linux:**

```bash
cp .env.example .env
```

**Windows PowerShell:**

```powershell
copy .env.example .env
```

Then add your Gemini API key in `.env` as `GEMINI_API_KEY=...`

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

By default, the app runs at `http://localhost:3000`.

---

## Environment Variables

| Name             | Required | Description                                          |
|------------------|----------|------------------------------------------------------|
| `GEMINI_API_KEY` | Yes      | Your Google Gemini API key (get one at ai.google.dev). |
| `APP_URL`        | No       | Optional public app URL for future integrations.     |

---

## Common Troubleshooting

### `npm` command not found

1. Install Node.js (LTS recommended) from [nodejs.org](https://nodejs.org).
2. Restart your terminal.
3. Confirm installation:

   ```bash
   node --version
   npm --version
   ```

### API key modal keeps appearing

1. Make sure `.env` is in the project root (same folder as `package.json`).
2. Confirm the variable name and value: `GEMINI_API_KEY=<your-key>`.
3. Restart the dev server:

   ```bash
   npm run dev
   ```

4. Clear your browser cache if the modal still appears.

### Import alias errors (`@/` paths fail)

Confirm your `vite.config.ts` includes:

```ts
alias: {
  "@": path.resolve(__dirname, "src"),
}
```

And `tsconfig.json` includes:

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

### Port 3000 is already in use

Run the dev server on another port:

```bash
npm run dev -- --port 3001
```

### Blank page or build errors

1. Clear the build and reinstall:

   ```bash
   npm run clean
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

2. Open the browser DevTools (F12) and check the console for errors.

---

## Usage

- **Ask a question**: Type a math problem and press Enter to start a guided explanation.
- **Upload an image**: Use the camera icon to attach a handwritten or printed problem.
- **Reset history**: Click the trash icon in the header to clear the current session.
- **Explore concepts**: Open the Concept Library tab to search topics and take quizzes.
- **Wait for replies**: The send button is disabled while the AI is generating a response.

---

## Development Commands

| Command           | Description                              |
|-------------------|------------------------------------------|
| `npm run dev`     | Start Vite dev server (default: 3000).   |
| `npm run build`   | Build production assets to `dist/`.      |
| `npm run preview` | Preview the production build locally.    |
| `npm run clean`   | Remove the `dist/` directory.            |
| `npm run lint`    | Run TypeScript type checking.            |
| `npm run test`    | Run unit tests with Vitest.              |
| `npm run test:watch` | Run tests continuously in watch mode. |
| `npm run test:coverage` | Generate test coverage reports.    |

---

## Building for Production

```bash
npm run build
```

The production build is output to `dist/`, ready to deploy on Vercel, Netlify, GitHub Pages, or any static hosting provider.

---

## Release Notes

Detailed release notes and version history are available in `CHANGELOG.md` in the repository.

---

## Contributing

When contributing, please:

- Keep TypeScript types strict and consistent.
- Write clear, helpful error messages for end users.
- Test locally with `npm run dev` and `npm run build`.
- Run `npm run lint` before committing.
- Update `CHANGELOG.md` for significant changes.

---

## Known Limitations

- Session data is stored only in `localStorage`; clearing browser data will remove chat history.
- Uploaded images are base64-encoded and sent to the Gemini API; review Gemini's data policies if privacy is a concern.
- An active internet connection is required for all Gemini API calls.

---

## License

This project is provided as-is for educational use.

---

## Support

For bugs, questions, or feature requests, please open an issue on GitHub:  
https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash/issues
