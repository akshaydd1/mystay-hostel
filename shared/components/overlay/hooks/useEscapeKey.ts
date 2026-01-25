"use client";
import { useEffect } from 'react';

/** Adds an Escape key listener while enabled; cleans up automatically */
export function useEscapeKey(enabled: boolean, handler?: () => void) {
  useEffect(() => {
    if (!enabled || !handler) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handler();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [enabled, handler]);
}

export default useEscapeKey;