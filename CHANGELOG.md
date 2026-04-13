# Changelog

All notable changes to the Socratic Math Tutor project will be documented in this file.

## [1.4.2] - 2026-04-13

### Fixed
- **Unused Imports**: Removed unused `useRef` from `App.tsx` and unused `useEffect` from `useLocalStorage.ts`.
- **Type Safety**: Replaced `any` type on `selectedImage` prop in `ChatInput.tsx` with a proper typed interface.
- **Deprecated API**: Removed the deprecated `inline` prop from the `code` renderer in `ChatMessage.tsx`, ensuring compatibility with `react-markdown` v9+.

### Improved
- **Code Clarity**: Removed redundant and self-explanatory inline comments across `useLocalStorage.ts`, `GeminiService.ts`, and `ChatInput.tsx`.



## [1.4.1] - 2026-04-13

### Changed
- **Directory Consolidation**: Reorganized the `src` directory into feature-based subfolders: `components/chat`, `components/layout`, `components/library`, and `components/modals`.
- **Services Migration**: Moved core AI logic to `src/services/` for better separation of concerns.
- **Types Centralization**: Created a dedicated `src/types/` directory to host all shared interfaces, resolving potential circular dependencies and improving code discoverability.


## [1.4.0] - 2026-04-13

### Added
- **Chat Persistence**: Implemented `localStorage` sync via a custom `useLocalStorage` hook, allowing tutoring sessions to persist across page refreshes.
- **API Key Guard**: Added a startup validation check and a professional `ApiKeyModal` UI to prevent silent failures when the Gemini API key is missing.
- **Session Management**: Added a "Clear Session" feature in the header to allow students to reset their chat history.

### Changed
- **Architectural Refactoring**: Continued modularization by decomposing `App.tsx` into specialized components: `Header`, `ChatArea`, `ChatMessage`, and `ChatInput`.
- **Math Rendering**: Enhanced the `ChatMessage` component with standardized `ReactMarkdown` overrides for more consistent LaTeX rendering and styling.

### Fixed
- **Type Safety**: Improved type definitions for message parts and service interactions.


## [1.3.1] - 2026-04-13

### Fixed
- **Code Cleanup**: Removed unnecessary dependencies including `express`, `dotenv`, and `tsx` to streamline the project and reduce bundle size.
- **Consistency**: Applied uniform formatting (spacing, indentation, and quoting) across all `.tsx` and `.ts` files in the `src` directory.

### Improved
- **Project Structure**: Verified that all core components are correctly modularized and free of redundant code.



## [1.3.0] - 2026-04-13

### Fixed
- **Model Evolution**: Updated the tutoring AI to use `gemini-2.0-pro-exp-02-05`, ensuring compatibility with advanced mathematical reasoning and the `thinkingBudget` configuration.
- **Generator Handling**: Fixed a redundant `await` in the `AsyncGenerator` loop within `App.tsx`, improving the efficiency of the streaming response display.
- **Import Cleanup**: Removed unused `ThinkingLevel` import from `@google/genai` in `GeminiService.ts`.

### Changed
- **Code Modularity**: Extracted the `ConceptLibrary` component into its own dedicated file (`ConceptLibrary.tsx`) to improve maintainability and reduce the size of `App.tsx`.
- **Dependency Refresh**: Updated `@google/genai` and `typescript` to their latest stable versions for improved security and performance.
- **Documentation**: Updated `README.md` to reflect the latest model selections and technical specifications.

### Improved
- **Code Formatting**: Applied consistent formatting across the core codebase files.


## [1.2.0] - 2026-04-13

### Fixed
- **Model Names**: Corrected fictional model identifiers to real Gemini API model names.
  - `GeminiService.ts`: `gemini-3.1-pro-preview` → `gemini-2.5-pro-preview-05-06`
  - `ConceptService.ts`: `gemini-3-flash-preview` → `gemini-2.0-flash`
- **Thinking Config**: Replaced unsupported `ThinkingLevel.HIGH` enum with the correct `thinkingBudget: 8000` config field in `GeminiService.ts`.
- **Null Safety**: Added a null/undefined guard on `response.text` in `ConceptService.ts` before calling `JSON.parse`, preventing a silent runtime crash when the API returns an empty response.
- **Type Safety**: Replaced untyped `as any` casts in `GeminiService.ts` with properly typed `Part` objects from `@google/genai`.
- **Async correctness**: Wrapped the `getSocraticResponse` generator call with `await` inside the `for await` loop in `App.tsx` to correctly resolve the outer `Promise<AsyncGenerator>` before iteration.
- **Stale closure**: Refactored `handleSend` and `handleTryProblem` in `App.tsx` to use `useCallback` with correct dependency arrays, preventing stale-closure bugs when the library sends a problem to the chat.
- **Race condition**: Added a 300 ms delay in `handleTryProblem` to ensure the Concept Library exit animation completes before the chat message is sent.
- **Input lockout**: Added `disabled={isLoading}` to the text input and quick-action buttons so the user cannot submit while a response is streaming.
- **Enter key guard**: Added `!isLoading` check on the `onKeyDown` Enter handler to prevent duplicate submissions.
- **Page title**: Fixed `index.html` `<title>` from "My Google AI Studio App" to "Socratic Math Tutor".
- **Font loading**: Added Google Fonts `<link>` tags to `index.html` for Cormorant Garamond and Inter, ensuring the serif and sans-serif fonts load correctly in all environments.
- **Missing dev dependencies**: Added `@types/react`, `@types/react-dom`, and `@types/katex` to `package.json` devDependencies to fix TypeScript compilation errors.
- **Env completeness**: Added `APP_URL` to the `define` block in `vite.config.ts` so it is available at runtime via `process.env.APP_URL`, matching `.env.example`.
- **Camera attribute**: Added `capture="environment"` to the hidden file input in `App.tsx` so mobile browsers open the rear camera directly.
- **Image mutation**: `GeminiService.ts` now deep-copies the `history` array before mutating it with the attached image part, preventing unintended state mutation of the caller's message array.

## [1.1.0] - 2026-04-10

### Added
- **Concept Library**: A dedicated UI section to browse and search for mathematical concepts.
- **Interactive Learning**: Added step-by-step interactive analogies and "Check Your Understanding" quizzes to the Concept Library.
- **Practice Problems**: Integrated pre-defined example problems for each concept with a "Try in Chat" feature.
- **Hint System**: Added contextual hints for both concept explanations and quiz questions.
- **UI Guidance**: Added a "Capabilities & Tips" section to the welcome screen and tooltips for the image upload feature.

### Improved
- **Search Experience**: Dynamic concept generation using `gemini-3-flash-preview`.
- **Navigation**: Seamless transition between the chat interface and the Concept Library.
- **Error Handling**: Enhanced Socratic response logic to handle complex derivations more robustly.

## [1.0.0] - 2026-04-10

### Added
- Initial release of the Socratic Math Tutor.
- Image upload and analysis using `gemini-3.1-pro-preview`.
- Socratic step-by-step guidance logic.
- High-Thinking mode for complex mathematical reasoning.
- LaTeX math rendering with KaTeX.
- Detailed conceptual explanations with analogies and formula breakdowns.
- Warm, organic UI design with Motion animations.
- Interactive "Why?" and "Hint" quick-actions.
- Responsive chat interface with message history.
