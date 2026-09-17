import { useState } from 'react';
import { readStoredIds, toggleId } from './research';
export function useStoredIds(key: string, allowed: string[]) {
  const [ids, setIds] = useState<string[]>(() => {
    try {
      return readStoredIds(window.localStorage, key, allowed);
    } catch {
      return [];
    }
  });
  const [persisted, setPersisted] = useState(true);
  function toggle(id: string) {
    setIds((current) => {
      const next = toggleId(current, id);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        setPersisted(false);
      }
      return next;
    });
  }
  return { ids, toggle, persisted };
}
