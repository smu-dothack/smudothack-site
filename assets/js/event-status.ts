/**
 * Client-side automatic event status detection.
 * Upgrades "up-next" to "ongoing" when the event is currently happening,
 * and downgrades "up-next"/"ongoing" to "done" when the event has ended.
 * Runs on page load — works in real-time without needing a site rebuild.
 */

type EventStatus = 'planning' | 'up-next' | 'ongoing' | 'done';

interface StatusStyle {
  bg: string;
  text: string;
  label: string;
  pulse: boolean;
}

const STATUS_STYLES: Record<EventStatus, StatusStyle> = {
  ongoing: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Ongoing', pulse: true },
  'up-next': { bg: 'bg-accent/20', text: 'text-accent', label: 'Up Next', pulse: false },
  planning: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Planning', pulse: false },
  done: { bg: 'bg-muted/20', text: 'text-muted', label: 'Done', pulse: false },
};

const ALL_STATUS_CLASSES = Object.values(STATUS_STYLES).flatMap((s) => [s.bg, s.text]);

function parseTime(timeStr: string): { hours: number; minutes: number } | null {
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return { hours, minutes };
}

function buildDate(dateStr: string, timeStr: string, fallbackEndOfDay: boolean): Date | null {
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

function computeStatus(el: HTMLElement, now: Date): EventStatus | null {
  const current = el.dataset.status as EventStatus;
  if (!current || current === 'planning' || current === 'done') return null;

  const startDate = el.dataset.startDate || '';
  if (!startDate) return null;

  const endDate = el.dataset.endDate || '';
  const startTime = el.dataset.startTime || '';
  const endTime = el.dataset.endTime || '';
  const allDay = el.dataset.allDay === 'true';

  const eventStart = buildDate(startDate, allDay ? '' : startTime, false);
  const eventEnd = buildDate(endDate || startDate, allDay ? '' : endTime, true);
  if (!eventStart || !eventEnd) return null;

  if (now >= eventStart && now <= eventEnd) return 'ongoing';
  if (now > eventEnd) return 'done';
  return null;
}

function updateBadge(badge: HTMLElement, newStatus: EventStatus): void {
  const style = STATUS_STYLES[newStatus];

  // Swap colour classes
  ALL_STATUS_CLASSES.forEach((c) => badge.classList.remove(c));
  badge.classList.add(style.bg, style.text);

  // Update data attribute
  badge.dataset.status = newStatus;

  // Rebuild inner content (pulse dot + label)
  const pulseHtml = style.pulse
    ? `<span class="${badge.classList.contains('px-3') ? 'w-2 h-2' : 'w-1.5 h-1.5'} rounded-full bg-green-400 animate-pulse"></span>`
    : '';
  badge.innerHTML = `${pulseHtml} ${style.label}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const now = new Date();

  // Event cards on list / landing pages — data attrs are on the <a> element
  document.querySelectorAll<HTMLElement>('a[data-start-date]').forEach((card) => {
    const newStatus = computeStatus(card, now);
    if (!newStatus) return;

    // Update the badge inside the card
    const badge = card.querySelector<HTMLElement>('[data-status]');
    if (badge) updateBadge(badge, newStatus);

    // Update the wrapper's data-event-status for filter compatibility
    const wrapper = card.closest<HTMLElement>('[data-event-status]');
    if (wrapper) wrapper.dataset.eventStatus = newStatus;
  });

  // Single event page — data attrs are on the <article> element
  document.querySelectorAll<HTMLElement>('article[data-start-date]').forEach((article) => {
    const newStatus = computeStatus(article, now);
    if (!newStatus) return;

    const badge = article.querySelector<HTMLElement>('[data-status]');
    if (badge) updateBadge(badge, newStatus);
  });
});
