export function formatHour(hour: number): string {
  if (hour >= 0 && hour <= 11) return `上午 ${hour} 時`;
  return `下午 ${hour - 12} 時`;
}
