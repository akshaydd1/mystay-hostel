"use client"
import { useEffect, useState } from 'react';
import { getSortOptionsByContext, SortContext, SortOption } from './sort.config';

interface UseSortOptionsParams {
  context?: SortContext;
  endpoint?: string; // reserved for future API usage
  initialOptions?: SortOption[]; // override list (e.g., SSR preload)
}

interface UseSortOptionsResult {
  options: SortOption[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useSortOptions({
  context = 'default',
  endpoint,
  initialOptions,
}: UseSortOptionsParams): UseSortOptionsResult {
  const [options, setOptions] = useState<SortOption[]>(initialOptions || getSortOptionsByContext(context));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      // Future: fetch(endpoint) -> transform payload into SortOption[]
      const data = initialOptions || getSortOptionsByContext(context);
      setOptions(data);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (endpoint) void load();
    else setOptions(initialOptions || getSortOptionsByContext(context));
  }, [context, endpoint, initialOptions]);

  return { options, loading, error, refresh: load };
}

export default useSortOptions;