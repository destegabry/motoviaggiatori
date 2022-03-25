export const months = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

export function parse(date: string): Date | null {
  const timestamp = Date.parse(date);
  if (isNaN(timestamp)) {
    return null;
  }
  return new Date(timestamp);
}

export function formatFullDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
