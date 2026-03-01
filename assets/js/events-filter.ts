/**
 * Client-side filtering for the events page.
 * Filters event cards by status using data-event-status attributes.
 */

document.addEventListener('DOMContentLoaded', () => {
  const filters = document.getElementById('event-filters');
  if (!filters) return;

  const buttons = filters.querySelectorAll<HTMLButtonElement>('.filter-tab');
  const cards = document.querySelectorAll<HTMLElement>('[data-event-status]');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach((card) => {
        const status = card.dataset.eventStatus;
        const visible =
          filter === 'all' ||
          (filter === 'live' && status !== 'done') ||
          status === filter;
        card.style.display = visible ? '' : 'none';
      });
    });
  });
});
