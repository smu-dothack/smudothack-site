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
    const reverse = filter === 'up-next';
    cards.forEach((card, i) => {
      const status = card.dataset.eventStatus;
      const visible =
        (filter === 'up-next' && status !== 'done') ||
        status === filter;
      card.style.display = visible ? '' : 'none';
      // DOM is newest-first (good for Done); reverse for Up Next so nearest upcoming is first
      card.style.order = reverse ? String(cards.length - i) : '';
    });
  }

  function activateTab(btn: HTMLButtonElement): void {
    buttons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.filter);
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activateTab(btn);
      location.hash = btn.dataset.filter || '';
    });
  });

  // Restore tab from URL hash, or fall back to the HTML-default active tab
  const hash = location.hash.replace('#', '');
  const hashBtn = hash
    ? filters.querySelector<HTMLButtonElement>(`.filter-tab[data-filter="${hash}"]`)
    : null;
  const initialBtn = hashBtn || filters.querySelector<HTMLButtonElement>('.filter-tab.active');
  if (initialBtn) {
    activateTab(initialBtn);
  }

  // Re-apply filter after event-status.ts updates statuses from dates
  document.addEventListener('event-statuses-updated', () => {
    const current = filters.querySelector<HTMLButtonElement>('.filter-tab.active');
    if (current) applyFilter(current.dataset.filter);
  });
});
