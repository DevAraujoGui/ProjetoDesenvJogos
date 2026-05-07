import { useState, useEffect, useCallback, useRef } from 'react';
import type { GameState, PlayerDecision } from '../types/GameState';
import { generateCompany } from '../logic/generateCompany';
import { evaluateDecision } from '../logic/gameRules';

const GAME_DURATION = 60;
const NEXT_COMPANY_DELAY = 4000;

const initialState: GameState = {
  phase: 'start',
  company: null,
  score: 0,
  timeLeft: GAME_DURATION,
  totalDecisions: 0,
  correctDecisions: 0,
  streak: 0,
  maxStreak: 0,
  lastFeedback: null,
  waitingNext: false,
  isPaused: false,
};

export function useGame() {
  const [state, setState] = useState<GameState>(initialState);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (nextRef.current) clearTimeout(nextRef.current);
  }, []);


  const startGame = useCallback(() => {
    clearTimers();
    setState({
      phase: 'playing',
      company: generateCompany(),
      score: 0,
      timeLeft: GAME_DURATION,
      totalDecisions: 0,
      correctDecisions: 0,
      streak: 0,
      maxStreak: 0,
      lastFeedback: null,
      waitingNext: false,
      isPaused: false, 
    });
  }, [clearTimers]);


  useEffect(() => {
  
  if (state.phase !== 'playing' || state.isPaused) {
    clearTimers(); 
    return;
  }

  timerRef.current = setInterval(() => {
    setState(prev => {
      const next = prev.timeLeft - 1;
      if (next <= 0) {
        clearTimers();
        return { ...prev, timeLeft: 0, phase: 'over' };
      }
      return { ...prev, timeLeft: next };
    });
  }, 1000);

  return clearTimers;
}, [state.phase, state.isPaused, clearTimers]); 

  const togglePause = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const decide = useCallback((decision: PlayerDecision) => {
    setState(prev => {
      
      if (prev.waitingNext || prev.phase !== 'playing' || !prev.company || prev.isPaused) return prev;

      const result = evaluateDecision(prev.company, decision);
      const newStreak = result.correct ? prev.streak + 1 : 0;

      return {
        ...prev,
        score: prev.score + result.delta,
        totalDecisions: prev.totalDecisions + 1,
        correctDecisions: prev.correctDecisions + (result.correct ? 1 : 0),
        streak: newStreak,
        maxStreak: Math.max(prev.maxStreak, newStreak),
        lastFeedback: result,
        waitingNext: true,
      };
    });

    nextRef.current = setTimeout(() => {
      setState(prev => {
        if (prev.phase !== 'playing') return prev;
        return { ...prev, company: generateCompany(), lastFeedback: null, waitingNext: false };
      });
    }, NEXT_COMPANY_DELAY);
  }, []); 

  useEffect(() => () => clearTimers(), [clearTimers]);

  return { state, startGame, decide, togglePause };
}
