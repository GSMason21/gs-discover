export type PersonaType = string;

export interface Question {
  id: number;
  text: string;
  category: string;
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

export interface QuizConfig {
  appName: string;
  pageTitle: string;
  pageSubtitle: string;
  narrativeTitle: string;
  narrativeBody: string;
  formHeading: string;
  formSubheading: string;
  formCta: string;
  formLoadingText: string;
  resultTagline: string;
  footerText: string;
  completionTag: string;
  score1Label?: string;
  score2Label?: string;
  scoringMode: 'profile' | 'matrix';
}
