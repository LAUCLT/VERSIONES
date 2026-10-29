import type { Fn, Cs, Mood } from "./types";

export interface FuncLayer {
  key: string;
  label: string;
  color: string;
  fns: Fn[];
}

export const FUNC_LAYERS: FuncLayer[] = [
  { key: "sujet", label: "Sujets", color: "#BFDBFE", fns: ["sujet"] },
  { key: "verbe", label: "Verbes", color: "#FECACA", fns: ["verbe"] },
  { key: "cod", label: "COD", color: "#BBF7D0", fns: ["cod"] },
  { key: "coi", label: "COI / compl.", color: "#FED7AA", fns: ["coi"] },
  { key: "attribut", label: "Attributs", color: "#E9D5FF", fns: ["attribut"] },
  { key: "cc", label: "Adverbes / CC", color: "#FEF3C7", fns: ["cc", "adverbe"] },
];

export const CASE_LAYERS: { key: string; label: string; color: string }[] = [
  { key: "nom", label: "Nominatif", color: "#1D4ED8" },
  { key: "voc", label: "Vocatif", color: "#BE185D" },
  { key: "acc", label: "Accusatif", color: "#15803D" },
  { key: "gen", label: "Génitif", color: "#7E22CE" },
  { key: "dat", label: "Datif", color: "#C2410C" },
  { key: "abl", label: "Ablatif", color: "#0E7490" },
  { key: "mood", label: "Modes verbaux", color: "#334155" },
];

export const MOOD_COLORS: Record<Mood, string> = {
  indicatif: "#475569",
  subjonctif: "#9333EA",
  imperatif: "#DC2626",
  infinitif: "#2563EB",
  participe: "#059669",
};

export const LEVEL_LABEL: Record<string, string> = {
  simple: "Simple",
  moyen: "Moyen",
  eleve: "Élevé",
};

export const LEVEL_COLOR: Record<string, string> = {
  simple: "#15803D",
  moyen: "#B45309",
  eleve: "#B91C1C",
};

export const FN_LABEL: Record<Fn, string> = {
  sujet: "Sujet",
  verbe: "Verbe",
  cod: "COD",
  coi: "COI / complément",
  attribut: "Attribut / apposition",
  cc: "Complément circonstanciel",
  adverbe: "Adverbe",
};

export const CASE_LABEL: Record<Cs, string> = {
  nom: "nominatif",
  voc: "vocatif",
  acc: "accusatif",
  gen: "génitif",
  dat: "datif",
  abl: "ablatif",
};