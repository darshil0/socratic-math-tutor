# Contributing to Socratic Math Tutor

Thank you for your interest in contributing! We welcome help in making this tutor more effective and accessible.

## Development Standards

### 1. TypeScript & Type Safety
- Maintain strict type safety.
- Avoid using `any`. Use proper interfaces and type guards.
- All new features should include appropriate TypeScript definitions in `src/types/`.

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

- We use [Vitest](https://vitest.dev/) for unit testing.
- New services and hooks should have accompanying tests in `src/tests/`.
- Run tests before submitting:
  ```bash
  npm run test
  ```

## Submission Process

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes with descriptive messages.
4. Run `npm run lint`, `npm run build`, and `npm run test` to ensure everything passes.
5. Update `CHANGELOG.md` with your changes.
6. Submit a pull request.
