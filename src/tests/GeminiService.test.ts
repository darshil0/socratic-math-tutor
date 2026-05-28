import { describe, it, expect, vi } from "vitest";
import { isApiKeyConfigured } from "../services/GeminiService";

describe("GeminiService", () => {
  describe("isApiKeyConfigured", () => {
    it("should return true for a valid API key", () => {
      vi.stubEnv("GEMINI_API_KEY", "valid-key-123");
      expect(isApiKeyConfigured()).toBe(true);
      vi.unstubAllEnvs();
    });

    it("should return false for placeholder keys", () => {
      vi.stubEnv("GEMINI_API_KEY", "your_key_here");
      expect(isApiKeyConfigured()).toBe(false);
      vi.stubEnv("GEMINI_API_KEY", "invalid-key");
      expect(isApiKeyConfigured()).toBe(false);
      vi.unstubAllEnvs();
    });

    it("should return false for empty or missing key", () => {
      vi.stubEnv("GEMINI_API_KEY", "");
      expect(isApiKeyConfigured()).toBe(false);
      vi.unstubAllEnvs();
    });
  });
});
