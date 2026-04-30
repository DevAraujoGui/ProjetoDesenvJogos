import type { Company } from './Company';

export type GamePhase = 'start' | 'playing' | 'over';
export type PlayerDecision = 'regular' | 'fiscalizar';

export interface Feedback {
  correct: boolean;
  delta: number;
  msg: string;
}

export interface GameState {
  phase: GamePhase;
  company: Company | null;
  score: number;
  timeLeft: number;
  totalDecisions: number;
  correctDecisions: number;
  streak: number;
  maxStreak: number;
  lastFeedback: Feedback | null;
  waitingNext: boolean;
}
