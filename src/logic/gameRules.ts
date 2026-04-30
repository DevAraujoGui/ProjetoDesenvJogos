import type { Company } from '../types/Company';
import type { Feedback, PlayerDecision } from '../types/GameState';
import { formatPercent } from '../utils/formatCurrency';

export function evaluateDecision(company: Company, decision: PlayerDecision): Feedback {
  const { isSonegadora, tipoSonegacao, faturamentoDeclarado, impostoDevido, impostoPago } = company;

  if (decision === 'fiscalizar' && isSonegadora) {
    const recovered = (impostoDevido - impostoPago) * 2.0; // Penalty multiplier
    let msg = '';
    if (tipoSonegacao === 'subfaturamento') {
      msg = `Sonegação confirmada! A movimentação bancária indicava subfaturamento. Multa aplicada e impostos recuperados.`;
    } else if (tipoSonegacao === 'despesas_falsas') {
      msg = `Sonegação confirmada! Despesas infladas para esconder lucro. Patrimônio dos sócios denunciava a fraude.`;
    }
    return {
      correct: true,
      delta: recovered,
      msg,
    };
  }

  if (decision === 'regular' && !isSonegadora) {
    return {
      correct: true,
      delta: impostoPago * 0.1, // Reward for good compliance check
      msg: `Empresa idônea. Indicadores condizentes com a realidade. Bom trabalho.`,
    };
  }

  if (decision === 'regular' && isSonegadora) {
    let msg = '';
    if (tipoSonegacao === 'subfaturamento') {
      msg = `Erro grave! Você deixou passar um claro caso de subfaturamento (alta movimentação bancária).`;
    } else {
      msg = `Erro grave! Você não notou que a empresa inventou despesas (sócios enriqueceram sem lucro).`;
    }
    return {
      correct: false,
      delta: -(impostoDevido * 0.5), // Penalty for missing evasion
      msg,
    };
  }

  // fiscalizar + honest
  return {
    correct: false,
    delta: -(faturamentoDeclarado * 0.01), // Operational cost
    msg: `Fiscalização desnecessária. Empresa estava em dia e com dados consistentes. Custo operacional aplicado.`,
  };
}

export function getRating(score: number): string {
  if (score > 10_000_000) return 'Auditor Lenda';
  if (score > 3_000_000) return 'Fiscal de Elite';
  if (score > 500_000) return 'Bom Trabalho';
  if (score > 0) return 'Pode Melhorar';
  return 'Sonegadores Venceram';
}
