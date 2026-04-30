import React from 'react';
import type { Feedback as FeedbackType } from '../types/GameState';
import { formatScore } from '../utils/formatCurrency';

interface FeedbackProps {
  feedback: FeedbackType;
}

export function Feedback({ feedback }: FeedbackProps) {
  return (
    <div className={`feedback-box ${feedback.correct ? 'correct' : 'wrong'}`}>
      <div className="feedback-title">
        {feedback.correct ? 'Correto' : 'Erro'} — {formatScore(feedback.delta)}
      </div>
      {feedback.msg}
    </div>
  );
}
