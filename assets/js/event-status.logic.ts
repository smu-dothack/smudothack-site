/**
 * Pure logic for event status detection.
 * Separated from DOM code so it can be unit tested.
 */

export type EventStatus = 'planning' | 'up-next' | 'ongoing' | 'done';

export interface StatusStyle {
  bg: string;
  text: string;
  label: string;
  pulse: boolean;
}

export const STATUS_STYLES: Record<EventStatus, StatusStyle> = {
  ongoing: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Ongoing', pulse: true },
  'up-next': { bg: 'bg-accent/20', text: 'text-accent', label: 'Up Next', pulse: false },
  planning: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Planning', pulse: false },
  done: { bg: 'bg-muted/20', text: 'text-muted', label: 'Done', pulse: false },
};

export const ALL_STATUS_CLASSES = Object.values(STATUS_STYLES).flatMap((s) => [s.bg, s.text]);

export function parseTime(timeStr: string): { hours: number; minutes: number } | null {
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return { hours, minutes };
}

export function buildDate(dateStr: string, timeStr: string, fallbackEndOfDay: boolean): Date | null {
  if (!dateStr) return null;
  if (timeStr) {
    const t = parseTime(timeStr);
    if (t) {
      return new Date(
        `${dateStr}T${String(t.hours).padStart(2, '0')}:${String(t.minutes).padStart(2, '0')}:00`
      );
    }
  }
  return new Date(dateStr + (fallbackEndOfDay ? 'T23:59:59' : 'T00:00:00'));
}

export interface EventData {
  current: EventStatus;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
}

export function computeStatus(data: EventData, now: Date): EventStatus | null {
  if (!data.current || data.current === 'planning' || data.current === 'done') return null;
  if (!data.startDate) return null;

  const eventStart = buildDate(data.startDate, data.allDay ? '' : data.startTime, false);
  const eventEnd = buildDate(data.endDate || data.startDate, data.allDay ? '' : data.endTime, true);
  if (!eventStart || !eventEnd) return null;

  if (now >= eventStart && now <= eventEnd) return 'ongoing';
  if (now > eventEnd) return 'done';
  return null;
}
