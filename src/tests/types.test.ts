import { describe, it, expect } from "vitest";
import { isMessagePart, isMessage, isValidMimeType, isValidBase64 } from "../types";

describe("Type Guards", () => {
  describe("isMessagePart", () => {
    it("should validate a valid text part", () => {
      expect(isMessagePart({ text: "hello" })).toBe(true);
    });

    it("should validate a valid inlineData part", () => {
      expect(isMessagePart({ inlineData: { data: "base64", mimeType: "image/png" } })).toBe(true);
    });

    it("should invalidate incorrect structures", () => {
      expect(isMessagePart(null)).toBe(false);
      expect(isMessagePart({ text: 123 })).toBe(false);
      expect(isMessagePart({ inlineData: { data: "base64" } })).toBe(false);
    });
  });

  describe("isMessage", () => {
    it("should validate a valid user message", () => {
      expect(isMessage({ role: "user", parts: [{ text: "hi" }] })).toBe(true);
    });

    it("should validate a valid model message", () => {
      expect(isMessage({ role: "model", parts: [{ text: "hello" }] })).toBe(true);
    });

    it("should invalidate incorrect roles", () => {
      expect(isMessage({ role: "admin", parts: [{ text: "hi" }] })).toBe(false);
    });
  });

  describe("isValidMimeType", () => {
    it("should validate standard image types", () => {
      expect(isValidMimeType("image/jpeg")).toBe(true);
      expect(isValidMimeType("image/png")).toBe(true);
      expect(isValidMimeType("IMAGE/PNG")).toBe(true);
    });

    it("should invalidate non-image types", () => {
      expect(isValidMimeType("application/pdf")).toBe(false);
      expect(isValidMimeType("text/plain")).toBe(false);
    });
  });

  describe("isValidBase64", () => {
    it("should validate correct base64 strings", () => {
      expect(isValidBase64("SGVsbG8=")).toBe(true);
      expect(isValidBase64("YmFzZTY0")).toBe(true);
    });

    it("should invalidate incorrect base64 strings", () => {
      expect(isValidBase64("invalid#base64")).toBe(false);
      expect(isValidBase64("SGVsbG8")).toBe(false); // Incorrect padding
    });
  });
});
