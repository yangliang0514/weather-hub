export function formatHour(hour: number): string {
  if (hour >= 0 && hour <= 11) return `上午 ${hour} 時`;
  return `下午 ${hour - 12} 時`;
}

export function formatDate(date: Date) {
  return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`;
}
