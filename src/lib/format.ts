export const formatCad = (cents: number): string =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD"
  }).format(cents / 100);

export const formatWeight = (weightKg: number): string => `${weightKg.toFixed(2)}kg`;
