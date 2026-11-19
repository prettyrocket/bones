import { useCallback } from 'react';

import { useLocalStorage } from '@/hooks/useLocalStorage';

/** A saved set of checked ids, e.g. collected bones. */
export function useCheckedSet(key: string) {
  const [ids, setIds] = useLocalStorage<string[]>(key, []);

  const toggle = useCallback(
    (id: string) =>
      setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setIds],
  );
  const clear = useCallback(() => setIds([]), [setIds]);

  return { ids, has: (id: string) => ids.includes(id), toggle, clear };
}

export const useBones = () => useCheckedSet('rbm3.bones');
export const useShopping = () => useCheckedSet('rbm3.shopping');
export const usePolished = () => useCheckedSet('rbm3.polished');
