import React from 'react';
import type { Company } from '../types/Company';
import { formatCurrency, formatPercent } from '../utils/formatCurrency';

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const lucroDeclarado = Math.max(0, company.faturamentoDeclarado - company.despesasDeclaradas);

  return (
    <div className="company-card">
      <div className="company-header">
        <div
          className="company-icon"
          style={{ background: `${company.sector.color}22`, color: company.sector.color }}
        >
          {company.sector.icon}
        </div>
        <div>
          <div className="company-name">{company.nome}</div>
          <div className="company-sector">{company.sector.name}</div>
        </div>
      </div>

      <div className="data-grid">
        <div className="data-cell">
          <div className="data-cell-label">Faturamento Declarado</div>
          <div className="data-cell-value">{formatCurrency(company.faturamentoDeclarado)}</div>
        </div>
        <div className="data-cell">
          <div className="data-cell-label">Despesas Declaradas</div>
          <div className="data-cell-value" style={{ color: '#fc8181' }}>{formatCurrency(company.despesasDeclaradas)}</div>
        </div>
        <div className="data-cell">
          <div className="data-cell-label">Lucro Declarado</div>
          <div className="data-cell-value highlight">{formatCurrency(lucroDeclarado)}</div>
        </div>
      </div>

      <div className="data-grid" style={{ marginTop: '1rem', borderTop: '1px solid #2d3748', paddingTop: '1rem' }}>
        <div className="data-cell">
          <div className="data-cell-label" title="Dados do COAF e Bancos">Movimentação Bancária ℹ️</div>
          <div className="data-cell-value" style={{ color: '#76e4f7' }}>{formatCurrency(company.movimentacaoBancaria)}</div>
        </div>
        <div className="data-cell">
          <div className="data-cell-label" title="Declaração de IR dos Sócios">Evolução Patrimonial ℹ️</div>
          <div className="data-cell-value" style={{ color: '#b794f4' }}>{formatCurrency(company.aumentoPatrimonialSocios)}</div>
        </div>
      </div>
    </div>
  );
}
