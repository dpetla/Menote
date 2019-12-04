export function formatTempString(temp: number): string {
  return Math.round(temp) + String.fromCharCode(176) + 'C';
}
