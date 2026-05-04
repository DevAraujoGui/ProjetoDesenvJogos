import React, { useEffect } from 'react'; 
import { useGame } from '../hooks/useGame';
import { HUD } from './HUD';
import { CompanyCard } from './CompanyCard';
import { Feedback } from './Feedback';
import { ActionButtons } from './ActionButtons';
import { formatCurrency, formatPercent } from '../utils/formatCurrency';
import { getRating } from '../logic/gameRules';

export function Game() {
  const { state, startGame, decide } = useGame();
  const { phase, company, score, timeLeft, totalDecisions, correctDecisions,
          streak, maxStreak, lastFeedback, waitingNext } = state;

  useEffect(() => {
  if (lastFeedback) {
    console.log("Conteúdo do feedback:", lastFeedback);

    // Tentamos várias possibilidades comuns:
    const feedback = lastFeedback as any;
    const isSuccess = 
      feedback.type === 'success' || 
      feedback.status === 'success' || 
      feedback.correct === true || 
      feedback.isCorrect === true;
    
    const arquivoSom = isSuccess ? 'acerto.mp3' : 'erro.mp3';
    const som = new Audio(`/sounds/${arquivoSom}`);
    
    som.play().catch(error => console.error("Erro ao tocar:", error));
  }
}, [lastFeedback]);

  if (phase === 'start') {
    return (
      <div className="start-screen">
        <div className="start-title">Fiscal vs Sonegador</div>
        <div className="start-sub">Você tem 60s para analisar empresas e decidir</div>
        <div className="rules-grid">
          <div className="rule-card"><strong>Regular</strong>Empresa está em conformidade fiscal</div>
          <div className="rule-card"><strong>Fiscalizar</strong>Empresa está sonegando impostos</div>
          <div className="rule-card"><strong>Acerto</strong>Aumenta arrecadação do governo</div>
          <div className="rule-card"><strong>Erro</strong>Penalidade na arrecadação</div>
        </div>
        <button className="btn-restart" onClick={startGame}>Iniciar Jogo</button>
      </div>
    );
  }

  if (phase === 'over') {
    const accuracy = totalDecisions > 0 ? Math.round(correctDecisions / totalDecisions * 100) : 0;
    return (
      <div className="gameover" style={{ paddingBottom: '2rem' }}>
        <div className="gameover-title">{getRating(score)}</div>
        <div className="gameover-sub">Tempo encerrado — Resultado Final</div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-num" style={{ color: '#68d391' }}>{formatCurrency(score)}</div>
            <div className="stat-lbl">Arrecadação Total</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{ color: '#76e4f7' }}>{accuracy}%</div>
            <div className="stat-lbl">Taxa de Acertos</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{ color: '#f6ad55' }}>{totalDecisions}</div>
            <div className="stat-lbl">Casos Analisados</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{ color: '#b794f4' }}>{maxStreak}x</div>
            <div className="stat-lbl">Maior Sequência</div>
          </div>
        </div>

        <div className="educational-lesson" style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '8px',
          borderLeft: '4px solid #f6ad55',
          textAlign: 'left',
          fontSize: '0.9rem',
          lineHeight: '1.4'
        }}>
          <strong style={{ color: '#f6ad55', display: 'block', marginBottom: '0.5rem' }}>A Lição:</strong>
          A sonegação de impostos não é apenas um "crime sem vítima". Ela afeta diretamente os serviços públicos essenciais como saúde, educação e segurança. No mundo real, a sonegação raramente é óbvia. Ela se esconde em subfaturamento (vender sem nota, usar "caixa 2") e despesas falsas (para fingir que a empresa não deu lucro).
          Como auditor, sua missão é cruzar dados — como movimentação bancária e evolução patrimonial — para encontrar o dinheiro que pertence à sociedade.
        </div>

        <button className="btn-restart" style={{ marginTop: '1.5rem' }} onClick={startGame}>Jogar Novamente</button>
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
      {company && <CompanyCard company={company} />}
      {lastFeedback && <Feedback feedback={lastFeedback} />}
      <ActionButtons onDecide={decide} disabled={waitingNext} />
    </>
  );
}
