import type { TextData } from "../types";

// Tout fichier JSON déposé dans src/data/texts/ est chargé automatiquement.
// Ajouter un texte = ajouter un fichier, aucune modification de code.
const modules = import.meta.glob("../data/texts/*.json", {
  eager: true,
}) as Record<string, { default: TextData }>;

export const TEXTS: TextData[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.author.localeCompare(b.author) || a.work.localeCompare(b.work));