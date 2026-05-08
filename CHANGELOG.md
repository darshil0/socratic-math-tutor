# Changelog

All notable changes to the Socratic Math Tutor project will be documented in this file.

## [1.5.0] - 2026-05-08

### Added
- **Accessibility Enhancements**: Added descriptive `aria-label` attributes to the "Clear Chat History" and "Concept Library" buttons in the Header, improving screen reader support.
- **Image Upload Hook**: Created a new custom hook `useImageUpload` in `src/hooks/useImageUpload.ts` to centralize image handling logic (state, uploading, and clearing).
- **Documentation Improvements**: Updated `README.md` with Windows-compatible `.env` setup instructions and Node/npm troubleshooting guidance.

### Fixed
- **Version Discrepancy**: Standardized the project version to 1.5.0 across `package.json`, `package-lock.json`, `README.md`, and `CHANGELOG.md`, resolving inconsistencies between 1.4.7 and 1.4.8.

### Changed
- **Architectural Restructuring**: Refactored `src/App.tsx` to use the new `useImageUpload` hook, reducing component bloat and improving code modularity.
- **Performance Optimization**: Wrapped the `onClearSession` handler in `src/App.tsx` with `useCallback` to ensure a stable reference is passed to child components.

## [1.4.8] - 2026-05-07

### Added
- **Comprehensive Input Validation**: Implemented validation at all entry points, including message history in `GeminiService`, search queries in `ConceptService`, and image uploads in `ChatInput`. All user inputs are now validated against strict type guards before processing.
- **Runtime Type Guards**: Created dedicated type guard functions in `src/types/index.ts` to validate message structures, MIME types, and base64-encoded data at runtime. These guards prevent invalid data from propagating through the application.
- **Error Type Differentiation**: Enhanced `useChat` hook to differentiate between four distinct error types: API configuration errors, validation failures, network timeouts, and generic errors. Users now receive specific, actionable error messages rather than generic feedback.
- **Improved Error Logging**: Service layers now log detailed error context including failed queries, parse error details, response snippets, and validation failure indices. This comprehensive logging significantly aids in debugging and diagnosing issues in production.
- **Concept Structure Validation**: Added validation in `ConceptLibrary` to ensure concept objects contain all required properties and correctly structured arrays before rendering. Invalid concepts are gracefully handled with user-friendly error messaging.
- **Array Boundary Checks**: Implemented boundary validation for all array index operations in the Concept Library, ensuring analogy steps and quiz question indices remain within valid ranges.
- **Image Upload Robustness**: Image validation now ensures both base64 data and MIME type are present and valid before attempting to send. The send button's disabled state accurately reflects whether the user can proceed with the current input.
- **ARIA Labels**: Added accessibility labels to interactive elements in `ChatInput` for improved screen reader support and semantic HTML.

### Fixed
- **Input Validation in GeminiService**: Added precondition checks to validate that message history is a non-empty array with properly structured message objects. Each message is validated to have a `role` field and non-empty `parts` array, with inline data validated to include both `data` and `mimeType` fields.
- **Silent JSON Parse Failures in ConceptService**: Wrapped JSON parsing in try-catch with comprehensive error logging that includes the original query and response snippet. Invalid concepts are now filtered out with detailed logging of which indices failed, preventing partial data from corrupting the concept list.
- **Missing Null Checks in ConceptLibrary**: Added defensive checks throughout the component to handle missing or invalid concept properties. All optional arrays are now guarded with length checks before rendering, and array index access includes boundary validation.
- **Image Validation Logic in ChatInput**: Corrected the send button's disabled state to properly reflect whether the user has provided valid input. The button now correctly validates that either text is provided OR a valid image is provided (both data and mimeType fields populated).
- **Error Message Clarity**: Enhanced all error messages to be user-friendly and non-technical. API errors, validation errors, and timeout errors now provide specific guidance on how to resolve the issue.
- **Concept Quiz Boundary Errors**: Added validation to prevent quiz question index from exceeding the array bounds, with proper guards on the `correctIndex` field to ensure it falls within the valid options range.
- **Type Safety Throughout**: Improved type annotations and removed untyped `as any` casts in favor of proper type definitions. All function parameters now include explicit type signatures.

### Changed
- **Error Handling Strategy**: Refactored error handling across all services and hooks to provide context-aware error messages. Rather than generic error text, errors now indicate the type of failure and suggest remediation steps.
- **Message Validation Flow**: Input messages are now validated immediately upon construction in `useChat` before being added to the message history, preventing invalid state from persisting in localStorage.
- **Concept Search Error Reporting**: Search errors now include the search query that failed, the specific validation issues encountered, and suggestions for alternative search terms if available concepts are found.
- **Version Bump**: Incremented project version to 1.4.8 across all metadata files.

### Improved
- **Developer Experience**: Detailed error logs now include query context, response snippets, and specific failure indices, making it significantly easier to diagnose issues during development and in production.
- **Code Maintainability**: Extracted validation logic into dedicated type guard functions that can be reused throughout the codebase, reducing duplication and improving consistency.
- **User Experience**: Users now receive clear, actionable feedback when something goes wrong, reducing confusion and support inquiries related to error states.

---

## [1.4.7] - 2026-04-14

### Added
- **Centralized Prompts**: Moved all Socratic system instructions and tutor guidelines into a dedicated `src/constants/prompts.ts` file, improving maintainability and ensuring consistent AI behavior across different services.
- **Custom Chat Hook**: Extracted chat state management and transmission logic into a specialized `useChat` hook in `src/hooks/useChat.ts`. This decouples the UI from the AI service orchestration and simplifies `App.tsx`.

### Changed
- **Animation Library Migration**: Migrated from the legacy `framer-motion` package to the unified `motion/react` library, aligning with the latest React 19 standards and optimizing bundle size.
- **Version Bump**: Incremented project version to 1.4.7.

## [1.4.6] - 2026-04-14

### Fixed
- **Path Alias Mismatch**: Corrected `vite.config.ts` to resolve the `@` alias to `src/` instead of the project root, aligning it with the `tsconfig.json` mapping of `"@/*" → "src/*"`. This mismatch would cause runtime import failures for any component using `@/` prefixed paths.
- **Overlay Positioning**: Added `relative` positioning to the root `<div>` in `App.tsx`. The `ConceptLibrary` overlay uses `absolute inset-0` to fill the viewport, which requires a positioned ancestor — without this fix the overlay escaped its container and could cover unintended areas of the page.
- **Functional Callback Detection**: Replaced `value instanceof Function` with `typeof value === "function"` in `useLocalStorage.ts`. The `instanceof` check is unreliable for arrow functions across realm boundaries; `typeof` is the correct and portable approach.
- **SDK Error Resilience**: Wrapped the `response.text` getter access in `ConceptService.ts` inside a dedicated `try/catch`. The `@google/genai` SDK getter can throw when the response has no candidates; the previous null check only ran after the potential throw, so errors were silently swallowed and the function returned nothing.
- **AnimatePresence Key Anti-Pattern**: Replaced `key={idx}` (array index) with a stable content-derived key in `ChatArea.tsx`. Index keys cause `AnimatePresence` to mis-identify elements during insertions and deletions, producing broken enter/exit animations.
- **Shift+Enter Guard**: Added `!e.shiftKey` check to the `onKeyDown` handler in `ChatInput.tsx` so pressing Shift+Enter does not trigger a send. Also added `e.preventDefault()` to suppress any default browser behaviour on Enter. This correctly reserves Shift+Enter for future multiline textarea upgrades.

### Changed
- **Version Bump**: Incremented project version to 1.4.6.

## [1.4.5] - 2026-04-14

### Fixed
- **API Key Validation**: Refined `isApiKeyConfigured` to explicitly catch common placeholder values like `"your_key_here"` and `"invalid-key"`, preventing silent failures with default template values.
- **Debugging**: Enhanced `ConceptService` error logging to include the failed search query, significantly improving the ability to diagnose malformed LLM responses.

### Changed
- **Metadata Consistency**: Updated `metadata.json` name to `socratic-math-tutor` to match `package.json`, ensuring consistency across project descriptors.
- **Stylistic Standardization**: Standardized quote usage across `src/main.tsx` and `vite.config.ts` to double quotes, aligning with the project's primary coding style.
- **Documentation**: Updated `README.md` with a new Troubleshooting section and clarified the status of the `APP_URL` environment variable.
- **Version Bump**: Incremented project version to 1.4.5 across all metadata files.

## [1.4.4] - 2026-04-14

### Added
- **Image Persistence**: User-uploaded images are now included directly in the chat history, ensuring they are saved to `localStorage` and remain visible after a page refresh.
- **Chat Image Rendering**: The `ChatMessage` component now supports rendering multiple parts, including base64-encoded images.

### Fixed
- **API Reliability**: Refactored `GeminiService.ts` to correctly handle the `@google/genai` SDK v2.0 requirements, including the correct `systemInstruction` format and `AsyncGenerator` streaming logic.
- **Type Safety**: Improved the `Message` type definition to correctly align with the Gemini API part structure, making `text` optional and adding `inlineData`.
- **Logic Cleanup**: Removed unused variables and optimized the `handleSend` flow in `App.tsx`.

### Changed
- **Version Bump**: Incremented the project version to 1.4.4.

## [1.4.3] - 2026-04-13

### Changed
- **`.gitignore` Overhaul**: Replaced the minimal 8-line ignore file with a comprehensive, categorized ruleset covering Vite/TypeScript caches (`.vite/`, `*.tsbuildinfo`), all `.env.*` local variants, editor directories (`.vscode/`, `.idea/`), OS artifacts (`Thumbs.db`, `Desktop.ini`), and extended log patterns (`yarn-debug.log*`, `pnpm-debug.log*`).
- **`.env.example` Improvements**: Rewrote the environment variable template with a file-level header, a `cp` quickstart instruction, per-variable documentation including an AI Studio API key link, and an explicit empty default for `APP_URL` to signal it is optional during local development.

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
- **Search Experience**: Dynamic concept generation using `gemini-2.0-flash`.
- **Navigation**: Seamless transition between the chat interface and the Concept Library.
- **Error Handling**: Enhanced Socratic response logic to handle complex derivations more robustly.

## [1.0.0] - 2026-04-10

### Added
- Initial release of the Socratic Math Tutor.
- Image upload and analysis using `gemini-2.0-pro-exp-02-05`.
- Socratic step-by-step guidance logic.
- High-Thinking mode for complex mathematical reasoning.
- LaTeX math rendering with KaTeX.
- Detailed conceptual explanations with analogies and formula breakdowns.
- Warm, organic UI design with Motion animations.
- Interactive "Why?" and "Hint" quick-actions.
- Responsive chat interface with message history.
