import type { Company, Sector } from '../types/Company';
import { rand, pick } from '../utils/random';

const TAX_RATE = 0.15;

const SECTORS: Sector[] = [
  { name: 'Varejo', icon: '🏪', color: '#f6ad55' },
  { name: 'Tech', icon: '💻', color: '#76e4f7' },
  { name: 'Construção', icon: '🏗️', color: '#fc8181' },
  { name: 'Alimentação', icon: '🍽️', color: '#68d391' },
  { name: 'Saúde', icon: '🏥', color: '#b794f4' },
  { name: 'Logística', icon: '🚛', color: '#f6ad55' },
  { name: 'Finanças', icon: '🏦', color: '#76e4f7' },
  { name: 'Indústria', icon: '🏭', color: '#fbd38d' },
];

const PREFIXES = ['Alpha', 'Beta', 'Grupo', 'Cia.', 'Corp.', 'Sul', 'Norte', 'Prime', 'Max', 'Nova'];
const SUFFIXES = ['Soluções', 'Comércio', 'Serviços', 'Indústria', 'Holding', 'Empreendimentos', 'SA', 'Ltda', 'Brasil'];

export function generateCompany(): Company {
  const sector = pick(SECTORS);
  const R = rand(500_000, 50_000_000); // Real Revenue
  
  const roll = Math.random();
  let isSonegadora: boolean;
  let tipoSonegacao: Company['tipoSonegacao'];
  
  let faturamentoDeclarado: number;
  let despesasDeclaradas: number;
  let movimentacaoBancaria: number;
  let aumentoPatrimonialSocios: number;
  
  let impostoDevido: number;
  let impostoPago: number;

  const realExpenses = R * rand(0.4, 0.8);
  const realProfit = Math.max(0, R - realExpenses);
  impostoDevido = realProfit * TAX_RATE;

  if (roll < 0.45) {
    // Honest
    isSonegadora = false;
    tipoSonegacao = 'honest';
    
    faturamentoDeclarado = R;
    despesasDeclaradas = realExpenses;
    const declaredProfit = faturamentoDeclarado - despesasDeclaradas;
    
    movimentacaoBancaria = R * rand(0.9, 1.1);
    aumentoPatrimonialSocios = declaredProfit * rand(0.1, 0.5);
    impostoPago = declaredProfit * TAX_RATE;
  } else if (roll < 0.70) {
    // Subfaturamento
    isSonegadora = true;
    tipoSonegacao = 'subfaturamento';
    
    faturamentoDeclarado = R * rand(0.3, 0.6);
    despesasDeclaradas = faturamentoDeclarado * rand(0.4, 0.8);
    const declaredProfit = Math.max(0, faturamentoDeclarado - despesasDeclaradas);
    
    movimentacaoBancaria = R * rand(0.95, 1.05); // High relative to declared revenue
    aumentoPatrimonialSocios = realProfit * rand(0.3, 0.6); // High relative to declared profit
    impostoPago = declaredProfit * TAX_RATE;
  } else {
    // Despesas Falsas
    isSonegadora = true;
    tipoSonegacao = 'despesas_falsas';
    
    faturamentoDeclarado = R;
    despesasDeclaradas = R * rand(0.95, 1.05); // Inflated expenses to hide profit
    const declaredProfit = Math.max(0, faturamentoDeclarado - despesasDeclaradas);
    
    movimentacaoBancaria = R * rand(0.9, 1.1);
    aumentoPatrimonialSocios = realProfit * rand(0.2, 0.5); // Wealth grows despite "no profit"
    impostoPago = declaredProfit * TAX_RATE;
  }

  const nome = `${pick(PREFIXES)} ${pick(SUFFIXES)}`;

  return { 
    nome, 
    sector, 
    faturamentoDeclarado, 
    despesasDeclaradas, 
    movimentacaoBancaria, 
    aumentoPatrimonialSocios, 
    impostoDevido, 
    impostoPago, 
    isSonegadora, 
    tipoSonegacao 
  };
}
