"use client";
import { useEffect, useRef, useState } from 'react';

/**
 * Ensures a single portal root element exists in the DOM and returns it.
 * The element is selected / created using a unique data attribute.
 * Safe for SSR – returns null until mounted.
 */
export function usePortalRoot(dataAttr: string = 'data-floating-layer-root'): HTMLDivElement | null {
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const attrRef = useRef(dataAttr);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    let node = document.querySelector<HTMLDivElement>(`[${attrRef.current}]`);
    if (!node) {
      node = document.createElement('div');
      node.setAttribute(attrRef.current, '');
      document.body.appendChild(node);
    }
    setEl(node);
  }, []);

  return el;
}

export default usePortalRoot;