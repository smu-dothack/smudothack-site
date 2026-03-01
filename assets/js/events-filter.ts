/**
 * Client-side filtering for the events page.
 * Filters event cards by status using data-event-status attributes.
 */

document.addEventListener('DOMContentLoaded', () => {
  const filters = document.getElementById('event-filters');
  if (!filters) return;

  const buttons = filters.querySelectorAll<HTMLButtonElement>('.filter-tab');
  const cards = document.querySelectorAll<HTMLElement>('[data-event-status]');

  function applyFilter(filter: string | undefined): void {
    cards.forEach((card) => {
      const status = card.dataset.eventStatus;
      const visible =
        filter === 'all' ||
        (filter === 'live' && status !== 'done') ||
        status === filter;
      card.style.display = visible ? '' : 'none';
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  // Apply the active tab's filter on initial load
  const activeBtn = filters.querySelector<HTMLButtonElement>('.filter-tab.active');
  if (activeBtn) {
    applyFilter(activeBtn.dataset.filter);
  }

  // Re-apply filter after event-status.ts updates statuses from dates
  document.addEventListener('event-statuses-updated', () => {
    const current = filters.querySelector<HTMLButtonElement>('.filter-tab.active');
    if (current) applyFilter(current.dataset.filter);
  });
});
