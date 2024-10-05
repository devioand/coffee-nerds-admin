import { useState, useCallback } from "react";

interface UseDisclosureProps {
  isOpen?: boolean;
}

interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export function useDisclosure({
  isOpen = false,
}: UseDisclosureProps = {}): UseDisclosureReturn {
  const [open, setOpen] = useState(isOpen);

  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);
  const onToggle = useCallback(() => setOpen((prev) => !prev), []);

  return { isOpen: open, onOpen, onClose, onToggle };
}

export default useDisclosure;
