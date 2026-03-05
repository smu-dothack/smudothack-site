/**
 * Client-side automatic event status detection.
 * Upgrades "up-next" to "ongoing" when the event is currently happening,
 * and downgrades "up-next"/"ongoing" to "done" when the event has ended.
 * Runs on page load — works in real-time without needing a site rebuild.
 */

import {
  type EventStatus,
  STATUS_STYLES,
  ALL_STATUS_CLASSES,
  computeStatus,
} from './event-status.logic';

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
    const newStatus = computeStatus(
      {
        current: card.dataset.status as EventStatus,
        startDate: card.dataset.startDate || '',
        endDate: card.dataset.endDate || '',
        startTime: card.dataset.startTime || '',
        endTime: card.dataset.endTime || '',
        allDay: card.dataset.allDay === 'true',
        autoStatus: card.dataset.autoStatus !== 'false',
      },
      now
    );
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
    const newStatus = computeStatus(
      {
        current: article.dataset.status as EventStatus,
        startDate: article.dataset.startDate || '',
        endDate: article.dataset.endDate || '',
        startTime: article.dataset.startTime || '',
        endTime: article.dataset.endTime || '',
        allDay: article.dataset.allDay === 'true',
        autoStatus: article.dataset.autoStatus !== 'false',
      },
      now
    );

    if (newStatus) {
      const badge = article.querySelector<HTMLElement>('[data-status]');
      if (badge) updateBadge(badge, newStatus);
    }

    // Always update the "Back to Events" link hash to match the actual status
    const finalStatus = newStatus || article.dataset.status;
    const backLink = article.querySelector<HTMLAnchorElement>('a[href*="/events/#"]');
    if (backLink && finalStatus) {
      backLink.href = backLink.href.replace(/#.*$/, `#${finalStatus}`);
    }
  });

  // Notify other scripts (e.g. events-filter) that statuses have been updated
  document.dispatchEvent(new CustomEvent('event-statuses-updated'));
});
