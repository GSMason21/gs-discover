
export type PersonaType = 'DRIFTER' | 'SENTRY' | 'TRAILBLAZER' | 'SURVEYOR' | 'SCOUT' | 'WAYFINDER';

export interface Question {
  id: number;
  text: string;
  category: 'INNOVATION' | 'COHERENCE';
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
  strengths: { title: string; text: string }[];
  weaknesses: { title: string; text: string }[];
  opportunities: { title: string; text: string }[];
  habits: { title: string; text: string }[];
  nextSteps: string[];
  color: string;
}
