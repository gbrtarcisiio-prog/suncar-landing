export type FinancingEstimate = {
  financedAmount: number;
  monthlyPayment: number;
  totalAmount: number;
};

export function calculateFinancing(
  vehiclePrice: number,
  downPayment: number,
  months: number
): FinancingEstimate {
  const safePrice = Number.isFinite(vehiclePrice)
    ? Math.max(0, vehiclePrice)
    : 0;
  const safeDownPayment = Number.isFinite(downPayment)
    ? Math.max(0, downPayment)
    : 0;
  const safeMonths = Number.isFinite(months) ? Math.floor(months) : 0;
  const financedAmount = Math.max(0, safePrice - safeDownPayment);
  if (financedAmount === 0 || safeMonths <= 0) {
    return { financedAmount, monthlyPayment: 0, totalAmount: 0 };
  }
  const monthlyPayment = financedAmount / safeMonths;
  return {
    financedAmount,
    monthlyPayment,
    totalAmount: monthlyPayment * safeMonths,
  };
}

export function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}
