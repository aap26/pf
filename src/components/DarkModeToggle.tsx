import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored ? stored === 'dark' : prefersDark;
    setEnabled(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      className="rounded-xl px-3 py-2 text-sm transition hover:opacity-80
                 bg-muted text-foreground dark:bg-neutral-800 dark:text-neutral-100"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {enabled ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
