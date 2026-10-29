// Fonctions syntaxiques (couche grammaticale — fond coloré)
export type Fn = "sujet" | "verbe" | "cod" | "coi" | "attribut" | "cc" | "adverbe";

// Cas (couche morphologique — trait droit sous le mot)
export type Cs = "nom" | "voc" | "acc" | "gen" | "dat" | "abl";

// Modes verbaux (couche morphologique — soulignement ondulé)
export type Mood = "indicatif" | "subjonctif" | "imperatif" | "infinitif" | "participe";

export interface Tok {
  t: string; // mot latin
  lemma: string; // lemme scolaire
  morph: string; // analyse morphologique
  fn?: Fn; // fonction syntaxique
  note?: string; // explication affichée au clic
  cs?: Cs; // cas
  mood?: Mood; // mode verbal
  p?: string; // ponctuation collée après le mot
  pre?: string; // texte collé avant (guillemets)
  p2?: { id: string; label: string }; // groupe subordonné
}

export interface Sentence {
  toks: Tok[];
}

export interface VocabEntry {
  l: string; // lemme
  f: string; // traduction française
}

export interface TextData {
  id: string;
  author: string;
  work: string;
  passage: string;
  level: "simple" | "moyen" | "eleve";
  source: string;
  annotated: boolean; // false = affiché « À venir », non cliquable
  sentences?: Sentence[];
  vocab?: VocabEntry[];
  difficulties?: string[];
  culture?: string[];
  translation?: string; // masquée derrière le bouton « Je veux comparer »
}