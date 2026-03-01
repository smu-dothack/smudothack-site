/**
 * Typing speed test for the landing page interactive panel.
 * Shows code snippets and measures WPM + accuracy.
 */

const snippets: string[] = [
  'function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}',
  'const greet = (name) => {\n  return `Hello, ${name}!`;\n};',
  'for i in range(10):\n    print(f"Line {i}")',
  'def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, n):\n        if n % i == 0:\n            return False\n    return True',
  'const arr = [1, 2, 3, 4, 5];\nconst sum = arr.reduce((a, b) => a + b, 0);',
  'SELECT name, email\nFROM users\nWHERE active = true\nORDER BY name;',
];

let currentSnippet: string;
let startTime: number | null;
let typed: string;
let finished: boolean;
let display: HTMLElement;
let input: HTMLTextAreaElement;
let stats: HTMLElement;

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderDisplay(): void {
  let html = '';
  for (let i = 0; i < currentSnippet.length; i++) {
    const char = currentSnippet[i];
    const displayChar = char === '\n' ? '\u21b5\n' : char;
    const escaped = escapeHtml(displayChar);

    if (i < typed.length) {
      const cls = typed[i] === char ? 'text-accent' : 'text-red-400 bg-red-400/20';
      html += `<span class="${cls}">${escaped}</span>`;
    } else if (i === typed.length) {
      html += `<span class="bg-accent/30 text-text">${escaped}</span>`;
    } else {
      html += `<span class="text-muted/50">${escaped}</span>`;
    }
  }
  display.innerHTML = html;
}

function showStats(): void {
  const elapsed = (Date.now() - startTime!) / 1000 / 60;
  const words = currentSnippet.length / 5;
  const wpm = Math.round(words / elapsed);

  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === currentSnippet[i]) correct++;
  }
  const accuracy = Math.round((correct / currentSnippet.length) * 100);

  stats.innerHTML = `<span class="text-accent">${wpm} WPM</span> &middot; <span class="text-accent">${accuracy}%</span> accuracy`;
  stats.classList.remove('hidden');
  finished = true;
  input.disabled = true;
}

function newSnippet(): void {
  currentSnippet = snippets[Math.floor(Math.random() * snippets.length)];
  typed = '';
  startTime = null;
  finished = false;
  input.value = '';
  input.disabled = false;
  stats.classList.add('hidden');
  renderDisplay();
  input.focus();
}

export function initTypingTest(): void {
  const panel = document.getElementById('panel-typing');
  if (!panel) return;

  panel.innerHTML = `
    <div class="flex flex-col h-full p-3 font-mono text-sm">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs text-muted">Type the code below:</span>
        <button id="typing-restart" class="text-xs text-accent hover:text-accent-hover transition-colors">New snippet</button>
      </div>
      <div id="typing-display" class="flex-1 overflow-y-auto bg-bg rounded border border-border p-3 mb-2 whitespace-pre-wrap leading-relaxed"></div>
      <div id="typing-stats" class="text-xs text-muted text-center py-1 hidden"></div>
      <textarea id="typing-input" rows="1"
        class="bg-transparent text-text border border-border rounded px-3 py-2 outline-none focus:border-accent transition-colors resize-none"
        placeholder="Start typing..." autocomplete="off" spellcheck="false"></textarea>
    </div>`;

  display = document.getElementById('typing-display')!;
  input = document.getElementById('typing-input') as HTMLTextAreaElement;
  stats = document.getElementById('typing-stats')!;

  document.getElementById('typing-restart')!.addEventListener('click', newSnippet);

  input.addEventListener('input', () => {
    if (finished) return;
    if (!startTime) startTime = Date.now();
    typed = input.value;
    renderDisplay();
    if (typed.length >= currentSnippet.length) showStats();
  });

  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Tab') e.preventDefault();
  });

  newSnippet();
}
