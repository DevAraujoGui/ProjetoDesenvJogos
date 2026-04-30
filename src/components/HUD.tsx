import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';

interface HUDProps {
  score: number;
  timeLeft: number;
  correctDecisions: number;
  totalDecisions: number;
  streak: number;
}

export function HUD({ score, timeLeft, correctDecisions, totalDecisions, streak }: HUDProps) {
  const isUrgent = timeLeft <= 10;

  return (
    <div className="hud">
      <div className="hud-card">
        <div className="hud-label">Arrecadação</div>
        <div className="hud-value money">{formatCurrency(score)}</div>
      </div>
      <div className="hud-card">
        <div className={`hud-value timer ${isUrgent ? 'urgent' : ''}`}>
          <div className="hud-label">Tempo</div>
          {timeLeft}s
        </div>
      </div>
      <div className="hud-card">
        <div className="hud-label">Acertos</div>
        <div className="hud-value score">
          {correctDecisions}/{totalDecisions}
          {streak >= 3 && <span className="streak">{streak}x</span>}
        </div>
      </div>
    </div>
  );
}
