export const formatCurrency = (value: number, fractionDigits = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: fractionDigits,
  }).format(value);

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);
