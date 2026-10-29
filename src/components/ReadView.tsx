import { useState } from "react";
import type { TextData, Tok } from "../types";
import {
  FUNC_LAYERS,
  CASE_LAYERS,
  LEVEL_LABEL,
  FN_LABEL,
} from "../constants";
import ToggleButton from "./ToggleButton";
import SentenceView from "./SentenceView";

interface Props {
  text: TextData;
  progress: { done: string[] };
  onToggleDone: (id: string) => void;
  onBack: () => void;
}

type Tab = "texte" | "vocab" | "difficultes" | "culture";

export default function ReadView({ text, progress, onToggleDone, onBack }: Props) {
  const [tab, setTab] = useState<Tab>("texte");
  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const [info, setInfo] = useState<Tok | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);

  const toggle = (key: string) => setToggles((s) => ({ ...s, [key]: !s[key] }));
  const isDone = progress.done.includes(text.id);
  const wordCount = text.sentences?.reduce((n, s) => n + s.toks.length, 0) ?? 0;

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-5 py-8">
        <button onClick={onBack} className="text-sm text-stone-500 hover:text-stone-900 mb-4">
          ← Retour au catalogue
        </button>

        <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">
              {text.author} — <span className="italic">{text.passage}</span>
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              {text.work} · <span className="font-medium">{LEVEL_LABEL[text.level]}</span> ·{" "}
              {wordCount} mots
            </p>
          </div>
          <button
            onClick={() => onToggleDone(text.id)}
            className="text-sm px-4 py-2 rounded-lg border transition-all"
            style={{
              backgroundColor: isDone ? "#059669" : "#ffffff",
              color: isDone ? "#ffffff" : "#44403c",
              borderColor: isDone ? "#059669" : "#d6d3d1",
            }}
          >
            {isDone ? "Terminé ✓" : "Marquer comme terminé"}
          </button>
        </div>

        <div className="flex gap-1 border-b border-stone-200 mb-6 flex-wrap">
          {(
            [
              ["texte", "Texte"],
              ["vocab", "Vocabulaire"],
              ["difficultes", "Difficultés"],
              ["culture", "Culture & histoire"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="px-4 py-2 text-sm font-medium transition-all border-b-2"
              style={{
                borderColor: tab === key ? "#1c1917" : "transparent",
                color: tab === key ? "#1c1917" : "#78716c",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "texte" && (
          <div>
            <div className="bg-white border border-stone-200 rounded-xl p-4 mb-6">
              <div className="mb-3">
                <div className="text-xs uppercase tracking-wide text-stone-400 mb-2">
                  Analyse grammaticale (fond coloré)
                </div>
                <div className="flex flex-wrap gap-2">
                  {FUNC_LAYERS.map((l) => (
                    <ToggleButton
                      key={l.key}
                      active={!!toggles[l.key]}
                      label={l.label}
                      color={l.color}
                      onClick={() => toggle(l.key)}
                    />
                  ))}
                  <ToggleButton
                    active={!!toggles.p2}
                    label="P2 (parenthèses)"
                    color="#FDE68A"
                    onClick={() => toggle("p2")}
                  />
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-stone-400 mb-2">
                  Analyse morphologique (soulignement)
                </div>
                <div className="flex flex-wrap gap-2">
                  {CASE_LAYERS.map((l) => (
                    <ToggleButton
                      key={l.key}
                      active={!!toggles[l.key]}
                      label={l.label}
                      color={l.color}
                      onClick={() => toggle(l.key)}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-stone-400 mt-3">
                Les couches sont cumulables : fond coloré = fonction, trait droit = cas, soulignement
                ondulé = mode verbal. Cliquez sur un mot pour son lemme et son analyse.
              </p>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl px-6 py-6 sm:px-8">
              {text.sentences!.map((s, idx) => (
                <SentenceView key={idx} sent={s} toggles={toggles} onWord={setInfo} />
              ))}
            </div>

            <div className="bg-white border border-stone-200 rounded-xl px-6 py-5 mt-4">
              {info ? (
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-serif text-xl font-semibold text-stone-900 italic">
                      {info.t}
                    </span>
                    <span className="text-stone-700">{info.lemma}</span>
                  </div>
                  <div className="text-sm text-stone-600 mt-1">{info.morph}</div>
                  {info.fn && (
                    <div className="text-sm mt-1">
                      <span className="inline-block px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium">
                        {FN_LABEL[info.fn]}
                      </span>
                    </div>
                  )}
                  {info.note && <div className="text-sm text-stone-700 mt-2">{info.note}</div>}
                  <div className="text-xs text-stone-400 mt-2">
                    Traduction volontairement masquée ici : consultez l'onglet Vocabulaire.
                  </div>
                </div>
              ) : (
                <p className="text-sm text-stone-400">
                  Cliquez sur un mot du texte pour afficher son lemme et son analyse — sans la
                  traduction.
                </p>
              )}
            </div>

            <div className="mt-4">
              {!showTranslation ? (
                <button
                  onClick={() => setShowTranslation(true)}
                  className="text-sm px-4 py-2 rounded-lg border border-stone-300 text-stone-600 hover:bg-stone-100 transition-all"
                >
                  Je veux comparer ma traduction
                </button>
              ) : (
                <div className="bg-white border border-stone-200 rounded-xl px-6 py-5">
                  <div className="text-xs uppercase tracking-wide text-stone-400 mb-2">
                    Traduction de référence (à ne consulter qu'après avoir traduit)
                  </div>
                  <p className="font-serif text-stone-800 leading-relaxed">{text.translation}</p>
                  <button
                    onClick={() => setShowTranslation(false)}
                    className="text-xs text-stone-400 hover:text-stone-700 mt-3"
                  >
                    Masquer
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 text-xs text-stone-400 leading-relaxed">
              <div className="font-medium text-stone-500 mb-1">Légende</div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mb-1">
                {FUNC_LAYERS.map((l) => (
                  <span key={l.key}>
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-sm mr-1 align-middle"
                      style={{ backgroundColor: l.color }}
                    />
                    {l.label}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {CASE_LAYERS.map((l) => (
                  <span key={l.key}>
                    <span
                      className="inline-block w-3 border-b-[3px] mr-1 align-middle"
                      style={{ borderColor: l.color }}
                    />
                    {l.label}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs text-stone-400 mt-6 leading-relaxed">{text.source}</p>
          </div>
        )}

        {tab === "vocab" && (
          <div className="bg-white border border-stone-200 rounded-xl px-6 py-5">
            <h3 className="font-semibold text-stone-900 mb-3">
              Vocabulaire du passage ({text.vocab!.length} entrées)
            </h3>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
              {text.vocab!.map((v, i) => (
                <div key={i} className="flex gap-2 text-sm border-b border-stone-100 pb-1.5">
                  <span className="font-serif italic text-stone-800 min-w-[45%]">{v.l}</span>
                  <span className="text-stone-600">{v.f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "difficultes" && (
          <div className="bg-white border border-stone-200 rounded-xl px-6 py-5">
            <h3 className="font-semibold text-stone-900 mb-3">Points de difficulté</h3>
            <ul className="space-y-2">
              {text.difficulties!.map((d, i) => (
                <li key={i} className="text-sm text-stone-700 flex gap-2">
                  <span className="text-amber-600 font-bold shrink-0">→</span>
                  <span className="font-serif">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "culture" && (
          <div className="bg-white border border-stone-200 rounded-xl px-6 py-5">
            <h3 className="font-semibold text-stone-900 mb-3">Repères culturels et historiques</h3>
            <ul className="space-y-2">
              {text.culture!.map((c, i) => (
                <li key={i} className="text-sm text-stone-700 flex gap-2">
                  <span className="text-sky-600 shrink-0">◆</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}