import { useEffect, useState } from 'react';
export function ThemePicker() {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem('futuristic:theme') || 'system';
    } catch {
      return 'system';
    }
  });
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      document.documentElement.dataset.theme =
        mode === 'dark' || (mode === 'system' && media.matches) ? 'futuristic-dark' : 'futuristic';
    };
    apply();
    media.addEventListener('change', apply);
    try {
      localStorage.setItem('futuristic:theme', mode);
    } catch {
      /* Theme still works without persistent storage. */
    }
    return () => media.removeEventListener('change', apply);
  }, [mode]);
  return (
    <select
      className="select theme-picker"
      aria-label="Görünüm teması"
      value={mode}
      onChange={(e) => setMode(e.target.value)}
    >
      <option value="system">Sistem</option>
      <option value="light">Açık</option>
      <option value="dark">Koyu</option>
    </select>
  );
}
