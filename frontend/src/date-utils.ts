// Never use Date#toISOString() for calendar-date math here: it always
// converts to UTC, which silently shifts the date by a day for any user
// whose local timezone isn't UTC. These helpers stay in local time throughout.

export function toLocalDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayLocal(): string {
  return toLocalDateString(new Date());
}

export function addDaysLocal(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return toLocalDateString(d);
}
