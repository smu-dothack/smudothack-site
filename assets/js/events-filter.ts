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
        card.style.display =
          filter === 'all' || card.dataset.eventStatus === filter ? '' : 'none';
      });
    });
  });
});
