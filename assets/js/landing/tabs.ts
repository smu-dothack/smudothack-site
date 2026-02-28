/**
 * Tab switching for the interactive panel on the landing page.
 * Lazily initializes each tab's content on first activation.
 */

import { initTerminal } from './terminal';
import { initSnake } from './snake';
import { initTypingTest } from './typing-test';
import { initMatrix } from './matrix';

type TabName = 'terminal' | 'snake' | 'typing' | 'matrix';

const initialized: Partial<Record<TabName, boolean>> = {};

const initializers: Record<TabName, () => void> = {
  terminal: initTerminal,
  snake: initSnake,
  typing: initTypingTest,
  matrix: initMatrix,
};

function switchTab(tabName: TabName): void {
  // Update tab buttons
  document.querySelectorAll<HTMLButtonElement>('.interactive-tab').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  // Update panels
  document.querySelectorAll<HTMLElement>('.interactive-panel').forEach((panel) => {
    panel.classList.toggle('hidden', panel.id !== `panel-${tabName}`);
  });

  // Lazy init
  if (!initialized[tabName]) {
    initialized[tabName] = true;
    initializers[tabName]();
  }

  // Notify active panel (for canvas resize, etc.)
  document.dispatchEvent(
    new CustomEvent('panel-activate', { detail: { tab: tabName } })
  );
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll<HTMLButtonElement>('.interactive-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab as TabName | undefined;
      if (tab) switchTab(tab);
    });
  });

  // Init the default active tab
  switchTab('terminal');
});
