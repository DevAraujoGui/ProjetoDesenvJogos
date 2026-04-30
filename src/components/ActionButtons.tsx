import React from 'react';
import type { PlayerDecision } from '../types/GameState';

interface ActionButtonsProps {
  onDecide: (decision: PlayerDecision) => void;
  disabled: boolean;
}

export function ActionButtons({ onDecide, disabled }: ActionButtonsProps) {
  return (
    <div className="action-row">
      <button
        className="btn-action btn-regular"
        onClick={() => onDecide('regular')}
        disabled={disabled}
      >
        ✓ Regular
      </button>
      <button
        className="btn-action btn-fiscalizar"
        onClick={() => onDecide('fiscalizar')}
        disabled={disabled}
      >
        ⚑ Fiscalizar
      </button>
    </div>
  );
}
