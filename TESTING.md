# Testing Socratic Math Tutor

We use **Vitest** for unit testing and **jsdom** for simulating the browser environment.

## Running Tests

### Run all tests once
```bash
npm run test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Check test coverage
```bash
npm run test -- --coverage
```

## Test Structure

Tests are located alongside source files using the `*.test.ts` pattern:

- `src/types.test.ts`: Validates runtime type guards and utility functions.
- `src/GeminiService.test.ts`: Tests service configuration and logic (API calls are usually mocked).
- `src/useImageUpload.test.ts`: Tests hook state management and image processing logic.

## Setup

The test setup includes:
- `@testing-library/jest-dom` for custom DOM matchers
- `vitest/globals` for global test functions (`describe`, `it`, `expect`)

## Writing New Tests

When adding a new feature:

1. **Services**: Place `.test.ts` next to the service file. Use `vi.mock` for external API dependencies.
2. **Hooks**: Use `@testing-library/react`'s `renderHook` to test custom hooks.
3. **Components**: Use `@testing-library/react` for component testing.

## CI/CD

All pull requests must pass:
- Full test suite (`npm run test`)
- Linting (`npm run lint`)
- Build process (`npm run build`)
- Minimum coverage threshold: 80%

## Adding Test Scripts to package.json

If these scripts don't exist, add to `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```
