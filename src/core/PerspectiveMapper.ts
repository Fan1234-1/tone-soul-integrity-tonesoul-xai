/*
 * PerspectiveMapper.ts
 * Converts a ToneVector (ΔT, ΔS, ΔR) into an IntegrityVector
 * based on the TRSC (Tone Responsibility Semantic Conversion) principle.
 */

import { ToneVector, ToneSemanticType } from "./toneVector";

export interface IntegrityVector {
  /** Truthfulness: How sincere or direct the tone is in conveying factual responsibility */
  truthfulness: number;
  /** Sincerity: Alignment between emotional tone and pragmatic intent */
  sincerity: number;
  /** Responsibility: Degree to which the speaker assumes moral/logical responsibility */
  responsibility: number;
}

/**
 * Maps a ToneVector to an IntegrityVector.
 * This function defines how we reinterpret tone into ethical signal.
 */
export function mapToneToIntegrityVec(tv: ToneVector): IntegrityVector {
  return {
    // Truthfulness: Highest when tone is neither too passive nor too aggressive
    truthfulness: 1.0 - Math.abs(tv.ΔT - 0.5) * 2, // normalized dip around extremes

    // Sincerity: Depends on the direction type
    sincerity: estimateSincerity(tv.ΔS),

    // Responsibility: Directly using ΔR
    responsibility: tv.ΔR
  };
}

/**
 * Estimates sincerity based on speech act direction.
 * Higher sincerity: assert, reveal, apology
 * Lower sincerity: joke, deny, test
 */
function estimateSincerity(direction: ToneSemanticType): number {
  switch (direction) {
    case "assert":
    case "reveal":
    case "apology":
      return 0.9;
    case "question":
    case "request":
      return 0.7;
    case "command":
    case "warning":
      return 0.5;
    case "test":
    case "deny":
      return 0.3;
    case "joke":
      return 0.2;
    default:
      return 0.6;
  }
}

/**
 * Utility to display the vector cleanly (for logs or reflection output)
 */
export function stringifyIntegrityVec(iv: IntegrityVector): string {
  return `I⟨T:${iv.truthfulness.toFixed(2)}, S:${iv.sincerity.toFixed(2)}, R:${iv.responsibility.toFixed(2)}⟩`;
}
