import React from "react";
import type { Sentence, Tok } from "../types";
import { FUNC_LAYERS, CASE_LAYERS, MOOD_COLORS } from "../constants";

interface TokenSpanProps {
  tok: Tok;
  toggles: Record<string, boolean>;
  onClick: () => void;
}

function TokenSpan({ tok, toggles, onClick }: TokenSpanProps) {
  const style: React.CSSProperties = {
    cursor: "pointer",
    borderRadius: 3,
    transition: "background-color .15s, box-shadow .15s",
    paddingBottom: 1,
  };

  // Couche grammaticale : fond coloré
  const layer = FUNC_LAYERS.find((l) => toggles[l.key] && l.fns.includes(tok.fn as never));
  if (layer && tok.fn) style.backgroundColor = layer.color;

  // Couche morphologique : cas = trait droit sous le mot
  const caseLayer = CASE_LAYERS.find((c) => toggles[c.key] && c.key === tok.cs);
  if (caseLayer && tok.cs) {
    style.borderBottom = `3px solid ${caseLayer.color}`;
    style.paddingBottom = 0;
  }

  // Modes verbaux : soulignement ondulé
  if (toggles.mood && tok.mood) {
    style.textDecoration = `underline wavy ${MOOD_COLORS[tok.mood]}`;
    style.textUnderlineOffset = 4;
    style.textDecorationThickness = 2;
  }

  return (
    <span style={style} onClick={onClick} title="Cliquer pour l'analyse du mot">
      {tok.t}
    </span>
  );
}

interface Props {
  sent: Sentence;
  toggles: Record<string, boolean>;
  onWord: (t: Tok) => void;
}

export default function SentenceView({ sent, toggles, onWord }: Props) {
  const nodes: React.ReactNode[] = [];
  let lastEndedWithSpace = true;

  sent.toks.forEach((tok, i) => {
    const prev = sent.toks[i - 1];
    const next = sent.toks[i + 1];

    if (i > 0 && !lastEndedWithSpace) nodes.push(" ");
    lastEndedWithSpace = false;

    // Ouverture d'une P2
    if (tok.p2 && toggles.p2 && (!prev || prev.p2?.id !== tok.p2.id)) {
      nodes.push(
        <span key={`p2o-${i}`} style={{ color: "#B45309", fontWeight: 700 }}>
          {"("}
        </span>
      );
      nodes.push(
        <sup key={`p2l-${i}`} style={{ color: "#B45309", fontSize: "0.62em", marginRight: 2 }}>
          {tok.p2.label}
        </sup>
      );
    }

    if (tok.pre) nodes.push(<span key={`pre-${i}`}>{tok.pre}</span>);

    nodes.push(<TokenSpan key={`w-${i}`} tok={tok} toggles={toggles} onClick={() => onWord(tok)} />);

    if (tok.p) nodes.push(<span key={`pp-${i}`}>{tok.p}</span>);
    lastEndedWithSpace = tok.p ? tok.p.endsWith(" ") : false;

    // Fermeture d'une P2
    if (tok.p2 && toggles.p2 && (!next || next.p2?.id !== tok.p2.id)) {
      nodes.push(
        <span key={`p2c-${i}`} style={{ color: "#B45309", fontWeight: 700 }}>
          {")"}
        </span>
      );
      lastEndedWithSpace = false;
    }
  });

  return (
    <p className="font-serif text-[1.15rem] leading-[2.1] mb-4 text-stone-800">{nodes}</p>
  );
}