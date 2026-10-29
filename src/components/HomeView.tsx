import { useState } from "react";
import type { TextData } from "../types";
import { LEVEL_LABEL, LEVEL_COLOR } from "../constants";

interface Props {
  texts: TextData[];
  progress: { done: string[] };
  onOpen: (t: TextData) => void;
}

function countWords(t: TextData): number {
  return t.sentences?.reduce((n, s) => n + s.toks.length, 0) ?? 0;
}

export default function HomeView({ texts, progress, onOpen }: Props) {
  const [filter, setFilter] = useState<"all" | "simple" | "moyen" | "eleve">("all");
  const filtered = texts.filter((t) => filter === "all" || t.level === filter);
  const annotatedTotal = texts.filter((t) => t.annotated).length;
  const doneCount = progress.done.length;

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-3xl mx-auto px-5 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 tracking-tight">Versiones</h1>
          <p className="text-stone-500 mt-1">
            Entraînement aux versions latines : analyse guidée, sans traduction automatique.
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="text-sm text-stone-600 font-medium">
            Progression : {doneCount} / {annotatedTotal} texte{annotatedTotal > 1 ? "s" : ""} terminé
            {doneCount > 1 ? "s" : ""}
          </span>
          <div className="h-2 flex-1 min-w-[120px] bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all"
              style={{ width: `${annotatedTotal ? (doneCount / annotatedTotal) * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "simple", "moyen", "eleve"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-full text-sm border transition-all"
              style={{
                backgroundColor: filter === f ? "#1c1917" : "#ffffff",
                color: filter === f ? "#ffffff" : "#44403c",
                borderColor: filter === f ? "#1c1917" : "#d6d3d1",
              }}
            >
              {f === "all" ? "Tous" : LEVEL_LABEL[f]}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((t) => (
            <button
              key={t.id}
              onClick={() => onOpen(t)}
              disabled={!t.annotated}
              className="w-full text-left bg-white border border-stone-200 rounded-xl px-5 py-4 transition-all hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-stone-900">
                    {t.author} <span className="text-stone-400 font-normal">·</span>{" "}
                    <span className="italic">{t.work}</span>
                  </div>
                  <div className="text-sm text-stone-500 mt-0.5">{t.passage}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {progress.done.includes(t.id) && (
                    <span className="text-emerald-700 bg-emerald-100 text-xs px-2 py-1 rounded-full font-medium">
                      Terminé ✓
                    </span>
                  )}
                  {!t.annotated && (
                    <span className="text-stone-500 bg-stone-100 text-xs px-2 py-1 rounded-full">
                      À venir
                    </span>
                  )}
                  {t.annotated && (
                    <span
                      className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{ color: "#ffffff", backgroundColor: LEVEL_COLOR[t.level] }}
                    >
                      {LEVEL_LABEL[t.level]}
                    </span>
                  )}
                </div>
              </div>
              {t.annotated && (
                <div className="text-xs text-stone-400 mt-2">
                  {countWords(t)} mots · {t.sentences!.length} phrases
                </div>
              )}
            </button>
          ))}
        </div>

        <p className="text-xs text-stone-400 mt-8 leading-relaxed">
          Textes latins du domaine public ; annotations, notes de difficulté, repères culturels et
          traductions originales. Aucune analyse automatique : chaque texte est annoté mot par mot.
        </p>
      </div>
    </div>
  );
}