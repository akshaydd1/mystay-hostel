"use client";
import { useCallback, useEffect, useRef } from 'react';

export const FOCUSABLE_SELECTOR = [
  'a[href]','area[href]','button:not([disabled])','textarea:not([disabled])',
  'input:not([disabled])','select:not([disabled])','details summary',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

interface UseFocusTrapOptions {
  /** Called to determine initial focus target */
  initialFocus?: () => HTMLElement | null | undefined;
}

/**
 * Traps keyboard tab focus within a container while active.
 * Restores previously focused element on deactivation.
 */
export function useFocusTrap(active: boolean, containerRef: React.RefObject<HTMLElement | null>, opts: UseFocusTrapOptions = {}) {
  const prevFocused = useRef<HTMLElement | null>(null);

  // Manage initial focus + restore
  useEffect(() => {
    if (!active) {
      if (prevFocused.current) {
        prevFocused.current.focus?.();
      }
      return;
    }
    prevFocused.current = document.activeElement as HTMLElement | null;
    let target = opts.initialFocus?.();
    if (!target) {
      target = containerRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) || containerRef.current || null;
    }
    target?.focus?.();
  }, [active, containerRef, opts]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!active || e.key !== 'Tab') return;
    const root = containerRef.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(n => !n.hasAttribute('disabled'));
    if (nodes.length === 0) {
      e.preventDefault();
      root.focus();
      return;
    }
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const current = document.activeElement as HTMLElement | null;
    if (e.shiftKey) {
      if (current === first || !nodes.includes(current!)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (current === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, [active, containerRef]);

  useEffect(() => {
    if (!active) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [active, handleKeyDown]);
}

export default useFocusTrap;