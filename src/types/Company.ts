export type EvasionType = 'honest' | 'subfaturamento' | 'despesas_falsas';

export interface Sector {
  name: string;
  icon: string;
  color: string;
}

export interface Company {
  nome: string;
  sector: Sector;
  
  faturamentoDeclarado: number;
  despesasDeclaradas: number;
  movimentacaoBancaria: number;
  aumentoPatrimonialSocios: number;

  impostoDevido: number;
  impostoPago: number;
  isSonegadora: boolean;
  tipoSonegacao: EvasionType;
}
