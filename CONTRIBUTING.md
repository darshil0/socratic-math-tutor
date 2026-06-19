# Contributing to Socratic Math Tutor

Thank you for your interest in contribute! We welcome help in making this tutor more effective and accessible.

## Development Standards

### 1. TypeScript & Type Safety
- Maintain strict type safety (configured in `tsconfig.json`).
- Avoid using `any`. Use proper interfaces and type guards.
- All new features should include appropriate TypeScript definitions in `src/types/`.
- Run `npm run lint` (`tsc --noEmit`) to verify type safety before committing.

### 2. Socratic Method
- The tutor should never just give the answer.
- Always guide the student through reasoning.
- Use encouraging and compassionate language.

### 3. Component Architecture
- Keep components small and focused.
- Use hooks for logic separation.
- Follow the existing directory structure:
  - `src/components/chat/`
  - `src/components/layout/`
  - `src/components/library/`
  - `src/components/modals/`

## Testing Guidelines

- We use [Vitest](https://vitest.dev/) for unit testing with [jsdom](https://github.com/jsdom/jsdom) for browser simulation.
- Place test files alongside source files using the `*.test.ts` pattern:
  - `src/services/GeminiService.test.ts`
  - `src/hooks/useImageUpload.test.ts`
  - `src/types.test.ts`
- Use `vi.mock` for external API dependencies.
- Use `@testing-library/react`'s `renderHook` for hook testing.
- Run tests before submitting:
  ```bash
  npm run test           # Run all tests once
  npm run test:watch     # Run in watch mode
  npm run test:coverage  # Check coverage
  ```

## Code Quality Checklist

Before submitting a pull request, ensure:

- ✅ `npm run lint` passes (TypeScript type checking)
- ✅ `npm run test` passes (all unit tests)
- ✅ `npm run build` passes (production build)
- ✅ No `any` types in new code
- ✅ Test files accompany new services/hooks
- ✅ `CHANGELOG.md` is updated

## Submission Process

1. Fork the repository.
2. Create a feature branch (e.g., `feature/new-concept` or `fix/chat-bug`).
3. Commit your changes with descriptive messages.
4. Run the full verification suite:
   ```bash
   npm run lint
   npm run test
   npm run build
   ```
5. Update `CHANGELOG.md` with your changes.
6. Submit a pull request.

## Questions?

Open an issue on [GitHub](https://github.com/darshil0/socratic-math-tutor/issues) if you need help!
