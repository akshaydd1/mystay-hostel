"use client";
import { useEffect, useState } from "react";
import { parseCookies } from "@/shared/helpers/cookies-shared-helper";

interface CookieGateProps {
  /** Cookie names that must be present (truthy) before rendering children */
  required?: string[];
  /** What to show while waiting for cookies (spinner by default) */
  fallback?: React.ReactNode;
  /** Children to render once ready */
  children: React.ReactNode;
  /** Max time to wait before rendering anyway */
  timeoutMs?: number;
  /** Poll interval while waiting */
  pollIntervalMs?: number;
}

const DefaultFallback = () => (
  <div className="w-full flex justify-center items-center py-12">
    <div className="animate-spin h-6 w-6 border-2 border-mo-primary border-t-transparent rounded-full" />
  </div>
);

/**
 * CookieGate waits until specified cookies are readable client-side (post hydration)
 * before rendering children. Prevents hydration mismatch or relying on SSR-only values.
 */
const CookieGate = ({
  required = ["user_id"],
  fallback,
  children,
  timeoutMs = 4000,
  pollIntervalMs = 250,
}: CookieGateProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const start = Date.now();

    const check = () => {
      if (cancelled) return;
      const all = parseCookies();
      const ok = required.every((n) => !!all[n]);
      if (ok || Date.now() - start > timeoutMs) {
        setReady(true);
        return;
      }
      setTimeout(check, pollIntervalMs);
    };

    // Initial async check (after hydration)
    const id = setTimeout(check, 0);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [required, timeoutMs, pollIntervalMs]);

  if (!ready) return <>{fallback || <DefaultFallback />}</>;
  return <>{children}</>;
};

export default CookieGate;
