# Changelog

All notable changes to the **Socratic Math Tutor** project are documented in this file. This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.4] — 2026-04-14

### 🚀 Added
- **Persistent Image History**: User-uploaded images are now stored as base64 strings in `localStorage`, ensuring they persist across page refreshes alongside text.
- **Multi-part Rendering**: Updated the `ChatMessage` component to support mixed-media rendering (text and images) within a single message bubble.

### 🛠️ Fixed
- **SDK v2.0 Integration**: Refactored `GeminiService.ts` to support the latest `@google/genai` requirements, specifically the `systemInstruction` object and `AsyncGenerator` streaming patterns.
- **Type Safety**: Refined the `Message` interface to align with the Gemini API `Part` structure, making `text` optional to accommodate image-only parts.
- **Code Optimization**: Removed unused variables and streamlined the `handleSend` logic in `App.tsx` for better performance.

---

## [1.4.3] — 2026-04-13

### 🔧 Changed
- **Comprehensive `.gitignore`**: Expanded ignore rules to cover Vite 6/TypeScript caches, all `.env` variants, editor-specific metadata (`.vscode`, `.idea`), and various OS/package manager artifacts.
- **Enhanced `.env.example`**: Improved the template with clear setup instructions, direct links to AI Studio, and better documentation for optional variables.

---

## [1.4.2] — 2026-04-13

### 🛠️ Fixed
- **Component Cleanup**: Removed unused hooks (`useRef`, `useEffect`) from core files to reduce overhead.
- **Markdown Compatibility**: Removed the deprecated `inline` prop from the code renderer in `ChatMessage.tsx` to support `react-markdown` v9+.
- **Strict Typing**: Replaced `any` types in `ChatInput.tsx` with robust TypeScript interfaces.

---

## [1.4.1] — 2026-04-13

### 📦 Changed
- **Directory Restructuring**: Migrated to a feature-based architecture. Components are now categorized under `chat/`, `layout/`, `library/`, and `modals/`.
- **Logic Separation**: Moved core AI logic into a dedicated `services/` directory and centralized shared interfaces in `types/`.

---

## [1.4.0] — 2026-04-13

### 🚀 Added
- **Session Persistence**: Implemented a custom `useLocalStorage` hook to save tutoring sessions automatically.
- **API Key Guard**: Created a specialized `ApiKeyModal` that prevents app usage until a valid Gemini API key is configured.
- **Session Management**: Added a global "Clear Session" action in the header to allow users to reset their learning history.

---

## [1.3.0] — 2026-04-13

### 🔧 Changed
- **Model Evolution**: Upgraded the primary tutor to `gemini-2.0-pro-exp-02-05` to utilize the new `thinkingBudget` (8,000 tokens) for complex logic.
- **Dependency Refresh**: Updated `@google/genai` and `typescript` to their latest stable releases.
- **Refactoring**: Extracted `ConceptLibrary.tsx` from the main app file to improve modularity.

---

## [1.2.0] — 2026-04-13

### 🛠️ Fixed
- **Model Aliasing**: Corrected fictional model names to valid production identifiers (`gemini-2.0-flash` and `gemini-2.0-pro-exp`).
- **Race Conditions**: Implemented a 300ms delay in `handleTryProblem` to ensure UI animations complete before message processing begins.
- **UI Safety**: Added `disabled` states to all inputs during AI generation to prevent duplicate submissions.
- **Mobile UX**: Added `capture="environment"` to file inputs to enable direct rear-camera access on mobile devices.
- **Asset Loading**: Fixed Google Font imports and updated the `index.html` title.

---

## [1.1.0] — 2026-04-10

### 🚀 Added
- **Concept Library**: A secondary interface for browsing mathematical topics independently of the chat.
- **Interactive Quizzes**: Added "Check Your Understanding" modules with contextual hints.
- **"Try in Chat"**: Integrated a bridge between the library and the tutor, allowing users to send practice problems directly to the AI.

---

## [1.0.0] — 2026-04-10

### 🚀 Added
- **Initial Release**: Core Socratic tutoring engine powered by Google Gemini.
- **Image Recognition**: Support for analyzing handwritten math via vision-language models.
- **Math Rendering**: Full LaTeX support via KaTeX.
- **Responsive UI**: Framer Motion-powered interface optimized for desktop and mobile learning.
