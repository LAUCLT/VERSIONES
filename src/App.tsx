import { useState } from "react";
import { TEXTS } from "./data/loadTexts";
import { useProgress } from "./hooks/useProgress";
import HomeView from "./components/HomeView";
import ReadView from "./components/ReadView";
import type { TextData } from "./types";

export default function App() {
  const [selected, setSelected] = useState<TextData | null>(null);
  const { progress, toggleDone } = useProgress();

  return selected ? (
    <ReadView
      text={selected}
      progress={progress}
      onToggleDone={toggleDone}
      onBack={() => setSelected(null)}
    />
  ) : (
    <HomeView
      texts={TEXTS}
      progress={progress}
      onOpen={(t) => {
        if (t.annotated) setSelected(t);
      }}
    />
  );
}
