## Contributing to Socratic Math Tutor

Thank you for your interest in contributing to Socratic Math Tutor. We welcome improvements that make the tutor more effective, accessible, and reliable.

## Development Standards

### TypeScript and Type Safety

- Maintain strict type safety as configured in `tsconfig.json`.
- Avoid `any`. Prefer explicit interfaces, enums, and type guards.
- Add new type definitions in `src/types/` when introducing new features.
- Run `npm run lint` (`tsc --noEmit`) before committing to verify type safety.

### Socratic Method

- The tutor should guide students through reasoning instead of giving direct answers.
- Use encouraging, compassionate language.
- Preserve the step-by-step tutoring style in all user-facing content.

### Component Architecture

- Keep components small and focused.
- Use hooks to separate reusable logic from UI concerns.
- Follow the existing directory structure:
  - `src/components/chat/`
  - `src/components/layout/`
  - `src/components/library/`
  - `src/components/modals/`

## Testing Guidelines

We use [Vitest](https://vitest.dev/) for unit testing and [jsdom](https://github.com/jsdom/jsdom) for browser simulation. [testing-library](https://testing-library.com/docs/react-testing-library/api/)

- Place test files alongside source files using the `*.test.ts` pattern.
  - Example: `src/services/GeminiService.test.ts`
  - Example: `src/hooks/useImageUpload.test.ts`
  - Example: `src/types.test.ts`
- Use `vi.mock` for external API dependencies.
- Use `renderHook` from `@testing-library/react` for hook testing. [testing-library](https://testing-library.com/docs/react-testing-library/api/)
- Run tests before submitting changes:
  ```bash
  npm run test
  npm run test:watch
  npm run test:coverage
  ```

## Code Quality Checklist

Before opening a pull request, make sure all of the following are complete:

- `npm run lint` passes.
- `npm run test` passes.
- `npm run build` passes.
- No new `any` types were introduced.
- Test files were added for new services and hooks.
- `CHANGELOG.md` was updated for meaningful changes.

## Submission Process

1. Fork the repository.
2. Create a feature branch, such as `feature/new-concept` or `fix/chat-bug`.
3. Commit your changes with clear, descriptive messages.
4. Run the full verification suite:
   ```bash
   npm run lint
   npm run test
   npm run build
   ```
5. Update `CHANGELOG.md` with your changes.
6. Open a pull request.

## Questions

If you need help, open an issue on [GitHub](https://github.com/darshil0/socratic-math-tutor/issues). [github](https://github.com/doocs/.github/blob/main/CONTRIBUTING.md)

A few improvements I made: fixed the opening sentence, tightened repeated phrasing, and made the checklist more parallel and easier to scan.
