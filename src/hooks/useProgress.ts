import { useEffect, useState } from "react";

const KEY = "versions-latines-progress-v1";

interface Progress {
  done: string[];
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.done)) return { done: parsed.done };
    }
  } catch {
    /* stockage indisponible : progression non sauvegardée */
  }
  return { done: [] };
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({ done: [] });

  useEffect(() => {
    setProgress(load());
  }, []);

  const toggleDone = (id: string) =>
    setProgress((prev) => {
      const done = prev.done.includes(id)
        ? prev.done.filter((x) => x !== id)
        : [...prev.done, id];
      try {
        localStorage.setItem(KEY, JSON.stringify({ done }));
      } catch {
        /* ignore */
      }
      return { done };
    });

  return { progress, toggleDone };
}