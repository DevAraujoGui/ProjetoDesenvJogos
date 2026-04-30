export function formatCurrency(val: number): string {
  if (val >= 1_000_000) return `R$ ${(val / 1_000_000).toFixed(2)}M`;
  if (val >= 1_000) return `R$ ${(val / 1_000).toFixed(1)}K`;
  return `R$ ${val.toFixed(0)}`;
}

export function formatScore(val: number): string {
  return (val >= 0 ? '+' : '') + formatCurrency(val);
}

export function formatPercent(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}
