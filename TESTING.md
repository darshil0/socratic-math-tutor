# Testing Socratic Math Tutor

We use **Vitest** for unit testing and **jsdom** for simulating the browser environment.

## Running Tests

### Run all tests once
```bash
npm run test
```

### Run tests in watch mode
```bash
npx vitest
```

### Check test coverage
```bash
npx vitest run --coverage
```

## Test Structure

Tests are located in the `src/tests/` directory:

- `types.test.ts`: Validates runtime type guards and utility functions.
- `GeminiService.test.ts`: Tests service configuration and logic (API calls are usually mocked).
- `useImageUpload.test.ts`: Tests hook state management and image processing logic.

## Writing New Tests

When adding a new feature:

1. **Services**: If you add a new service, create a corresponding `.test.ts` file in `src/tests/`. Use `vi.mock` for external API dependencies.
2. **Hooks**: Use `@testing-library/react`'s `renderHook` to test custom hooks.
3. **Components**: Use `@testing-library/react` for component testing if necessary.

## CI/CD

All pull requests are expected to pass the full test suite, linting, and build process.
