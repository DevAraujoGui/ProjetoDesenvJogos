import React, { useEffect } from 'react'; 
import { useGame } from '../hooks/useGame';
import { HUD } from './HUD';
import { CompanyCard } from './CompanyCard';
import { Feedback } from './Feedback';
import { ActionButtons } from './ActionButtons';
import { formatCurrency } from '../utils/formatCurrency';
import { getRating } from '../logic/gameRules';

export function Game() {
  const { state, startGame, decide, togglePause } = useGame();
  const { 
    phase, company, score, timeLeft, totalDecisions, correctDecisions,
    streak, maxStreak, lastFeedback, waitingNext, isPaused 
  } = state;


  useEffect(() => {
    if (lastFeedback) {
      const feedback = lastFeedback as any;
      const isSuccess = 
        feedback.type === 'success' || 
        feedback.status === 'success' || 
        feedback.correct === true || 
        feedback.isCorrect === true;
      
      const arquivoSom = isSuccess ? 'acerto.mp3' : 'erro.mp3';
      const som = new Audio(`/sounds/${arquivoSom}`);
      
      som.play().catch(error => console.log("Som aguardando interação..."));
    }
  }, [lastFeedback]);


  if (phase === 'start') {
    return (
      <div className="start-screen">
        <div className="start-title">Fiscal vs Sonegador</div>
        <div className="start-sub">Analise empresas e decida o futuro fiscal</div>
        <button className="btn-restart" onClick={startGame}>Iniciar Jogo</button>
      </div>
    );
  }


  if (phase === 'over') {
    const accuracy = totalDecisions > 0 ? Math.round(correctDecisions / totalDecisions * 100) : 0;
    return (
      <div className="gameover">
        <div className="gameover-title">{getRating(score)}</div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-num">{formatCurrency(score)}</div>
            <div className="stat-lbl">Arrecadação</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{accuracy}%</div>
            <div className="stat-lbl">Precisão</div>
          </div>
        </div>
        <button className="btn-restart" onClick={startGame}>Jogar Novamente</button>
      </div>
    );
  }


  return (
    <>
      <HUD
        score={score}
        timeLeft={timeLeft}
        correctDecisions={correctDecisions}
        totalDecisions={totalDecisions}
        streak={streak}
      />

      <button 
        onClick={togglePause} 
        className="btn-pause-toggle"
        style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 110 }}
      >
        {isPaused ? '▶️ Continuar' : '⏸️ Pausar'}
      </button>

      {isPaused ? (
        <div className="pause-screen">
          <div className="pause-content">
            <h2>Fiscalização Suspensa</h2>
            <p>O tempo está parado. Respire fundo, auditor!</p>
            <button className="btn-restart" onClick={togglePause}>
              Retomar Atividades
            </button>
          </div>
        </div>
      ) : (
        <>
          {company && <CompanyCard company={company} />}
          {lastFeedback && <Feedback feedback={lastFeedback} />}
          <ActionButtons onDecide={decide} disabled={waitingNext} />
        </>
      )}
    </>
  );
}
