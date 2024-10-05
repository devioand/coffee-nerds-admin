import { useState, useCallback } from "react";

interface UseCopyReturn {
  copy: (text: string) => void;
  isCopied: boolean;
  resetCopy: () => void;
}

export function useCopy(): UseCopyReturn {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback((text: string) => {
    if (!navigator.clipboard) {
      console.warn("Clipboard not supported");
      return;
    }

    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      },
      (error) => {
        console.error("Failed to copy: ", error);
      }
    );
  }, []);

  const resetCopy = useCallback(() => {
    setIsCopied(false);
  }, []);

  return { copy, isCopied, resetCopy };
}

export default useCopy;
