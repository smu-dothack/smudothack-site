/**
 * Client-side filtering for the past teams page.
 * Filters team sections by academic year using data-team-year attributes.
 */

document.addEventListener('DOMContentLoaded', () => {
  const filters = document.getElementById('year-filters');
  if (!filters) return;

  const buttons = filters.querySelectorAll<HTMLButtonElement>('.filter-tab');
  const sections = document.querySelectorAll<HTMLElement>('[data-team-year]');

  function showYear(year: string) {
    buttons.forEach((b) => {
      b.classList.toggle('active', b.dataset.filter === year);
    });

    sections.forEach((section) => {
      section.classList.toggle('hidden', section.dataset.teamYear !== year);
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      showYear(btn.dataset.filter!);
    });
  });

  // Show the first year by default
  const firstButton = buttons[0];
  if (firstButton) {
    showYear(firstButton.dataset.filter!);
  }
});
