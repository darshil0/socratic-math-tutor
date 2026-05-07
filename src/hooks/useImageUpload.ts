import { useState, useCallback, useRef } from "react";

interface SelectedImage {
  data: string;
  mimeType: string;
}

export function useImageUpload() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64Data = result.split(",")[1];
        setSelectedImage({ data: base64Data, mimeType: file.type });
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const clearImage = useCallback(() => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  return {
    selectedImage,
    previewUrl,
    fileInputRef,
    handleImageUpload,
    clearImage,
  };
}
