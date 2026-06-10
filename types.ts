// ─────────────────────────────────────────────────────────────────────────────
// types.ts — updated to support flexible category-based profile scoring.
// Category is now a plain string so it can map to any set of persona keys.
// ─────────────────────────────────────────────────────────────────────────────

export type PersonaType = string;

export interface Question {
  id: number;
  text: string;
  category: string;   // matches a key in PERSONAS — e.g. 'LEARNER', 'VISIONARY'
  options: {
    label: string;
    text: string;
    value: 'A' | 'B';
  }[];
}

export interface UserData {
  name: string;
  email: string;
  title: string;
  organization: string;
}

export interface PersonaProfile {
  id: PersonaType;
  name: string;
  subtitle: string;
  description: string;
  strengths:     { title: string; text: string }[];
  weaknesses:    { title: string; text: string }[];
  opportunities: { title: string; text: string }[];
  habits:        { title: string; text: string }[];
  nextSteps: string[];
  color: string;
}
