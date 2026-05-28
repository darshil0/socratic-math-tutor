import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useImageUpload } from "../hooks/useImageUpload";

describe("useImageUpload", () => {
  it("should initialize with null values", () => {
    const { result } = renderHook(() => useImageUpload());
    expect(result.current.selectedImage).toBe(null);
    expect(result.current.previewUrl).toBe(null);
  });

  it("should clear image", () => {
    const { result } = renderHook(() => useImageUpload());

    act(() => {
      result.current.clearImage();
    });

    expect(result.current.selectedImage).toBe(null);
    expect(result.current.previewUrl).toBe(null);
  });
});
