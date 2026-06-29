## Socratic Math Tutor

**Version 1.5.2** — A compassionate, step-by-step math tutor built with React, Vite, and Google Gemini. [github](https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash)

***

## Overview

Socratic Math Tutor helps learners understand how to solve math problems instead of just showing the final answer. [github](https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash)
You can upload a problem image or type a question, and the tutor will guide you with small hints and clear explanations for each step. [devpost](https://devpost.com/software/math-tutor-ai-agent)

Session history is stored in the browser, math is rendered with KaTeX, and a searchable Concept Library offers extra explanations, quizzes, and practice. [devpost](https://devpost.com/software/math-tutor-ai-agent)

***

## Key Features

- **Socratic guidance**: The tutor asks questions and explains each step to build understanding, not shortcuts. [devpost](https://devpost.com/software/math-tutor-ai-agent)
- **Image support**: Upload handwritten or printed problems and keep the image alongside the conversation. [devpost](https://devpost.com/software/math-tutor-ai-agent)
- **Math rendering**: LaTeX math is rendered in chat using KaTeX for clean, readable equations. [github](https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash)
- **Concept Library**: Search topics, read explanations, take quizzes, and send practice problems directly into the chat. [devpost](https://devpost.com/software/math-tutor-ai-agent)
- **Session persistence**: Messages and uploaded images are stored in `localStorage`, so your history survives page refreshes. [devpost](https://devpost.com/software/math-tutor-ai-agent)
- **Robust validation**: Inputs and API responses are validated with TypeScript to avoid invalid or inconsistent state. [github](https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash)
- **Clear error handling**: API, validation, and timeout errors are shown with distinct, user-friendly messages. [devpost](https://devpost.com/software/math-tutor-ai-agent)

***

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
- `@testing-library/react` [github](https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash)

***

## Project Structure

```txt
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

***

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

Then add your Gemini API key in `.env` as `GEMINI_API_KEY=...`. [github](https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash)

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

By default, the app runs at `http://localhost:3000` (configured in `package.json`). [github](https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash)

***

## Environment Variables

| Name             | Required | Description                                                    |
|------------------|----------|----------------------------------------------------------------|
| `GEMINI_API_KEY` | Yes      | Your Google Gemini API key (get one at ai.google.dev).         [github](https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash) |
| `APP_URL`        | No       | Optional public app URL for future integrations or sharing.    [devpost](https://devpost.com/software/math-tutor-ai-agent) |

***

## Common Troubleshooting

### `npm` command not found

1. Install Node.js (LTS recommended) from nodejs.org. [github](https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash)
2. Restart your terminal.  
3. Confirm installation:

   ```bash
   node --version
   npm --version
   ```

### API key modal keeps appearing

1. Make sure `.env` is in the project root (same folder as `package.json`). [github](https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash)
2. Confirm the variable name and value: `GEMINI_API_KEY=<your-key>`.  
3. Restart the dev server:

   ```bash
   npm run dev
   ```

4. Clear your browser cache if the modal still appears. [devpost](https://devpost.com/software/math-tutor-ai-agent)

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

2. Open the browser DevTools (F12) and check the console for errors. [github](https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash)

***

## Usage

- **Ask a question**: Type a math problem and press Enter to start a guided explanation. [devpost](https://devpost.com/software/math-tutor-ai-agent)
- **Upload an image**: Use the camera icon to attach a handwritten or printed problem. [devpost](https://devpost.com/software/math-tutor-ai-agent)
- **Reset history**: Click the trash icon in the header to clear the current session.  
- **Explore concepts**: Open the Concept Library tab to search topics and take quizzes.  
- **Wait for replies**: The send button is disabled while the AI is generating a response. [devpost](https://devpost.com/software/math-tutor-ai-agent)

***

## Development Commands

| Command                  | Description                                |
|--------------------------|--------------------------------------------|
| `npm run dev`            | Start Vite 8 dev server (default: 3000).    [github](https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash) |
| `npm run build`          | Build production assets to `dist/`.        |
| `npm run preview`        | Preview the production build locally.      |
| `npm run clean`          | Remove the `dist/` directory.              |
| `npm run lint`           | Run TypeScript type checking (`tsc --noEmit`). |
| `npm run test`           | Run unit tests with Vitest.                |
| `npm run test:watch`     | Run tests continuously in watch mode.      |
| `npm run test:coverage`  | Generate test coverage reports.            |

***

## Building for Production

```bash
npm run build
```

The production build is output to `dist/`, ready to deploy on Vercel, Netlify, GitHub Pages, or any static hosting provider. [github](https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash)

***

## Release Notes

Detailed release notes and version history are available in `CHANGELOG.md` in the repository. [github](https://github.com/Windy3f3f3f3f/socratic-math-tutor/blob/main/.genignore)

***

## Contributing

When contributing, please:

- Keep TypeScript types strict and consistent.  
- Write clear, helpful error messages for end users.  
- Test locally with `npm run dev` and `npm run build`.  
- Run `npm run lint` before committing.  
- Update `CHANGELOG.md` for significant changes. [github](https://github.com/Windy3f3f3f3f/socratic-math-tutor/blob/main/.genignore)

***

## Known Limitations

- Session data is stored only in `localStorage`; clearing browser data will remove chat history. [devpost](https://devpost.com/software/math-tutor-ai-agent)
- Uploaded images are base64-encoded and sent to the Gemini API; review Gemini’s data policies if privacy is a concern. [github](https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash)
- An active internet connection is required for all Gemini API calls. [github](https://github.com/Farhan-Feb/AI_Math_Tutor_Gemini_1.5_Flash)

***

## License

This project is provided as-is for educational use. [github](https://github.com/Windy3f3f3f3f/socratic-math-tutor/blob/main/.genignore)

***

## Support

For bugs, questions, or feature requests, please open an issue on GitHub:  
`https://github.com/darshil0/socratic-math-tutor/issues`. [github](https://github.com/Windy3f3f3f3f/socratic-math-tutor/blob/main/.genignore)

***
