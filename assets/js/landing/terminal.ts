/**
 * Fake terminal/CLI simulator for the landing page interactive panel.
 */

type CommandResponse = string[];

const commands: Record<string, CommandResponse> = {
  help: [
    'Available commands:',
    '  help      - Show this help',
    '  about     - About .Hack',
    '  events    - Upcoming events',
    '  join      - How to join',
    '  socials   - Our social links',
    '  whoami    - Who are you?',
    '  clear     - Clear terminal',
  ],
  about: [
    'SMU .Hack',
    '─────────',
    "Singapore Management University's tech club.",
    'We build things, break things, and learn together.',
    '',
    'Type "join" to find out how to become a member.',
  ],
  events: [
    'Upcoming Events:',
    '─────────────────',
    'Check /events for the latest workshops,',
    'hackathons, and tech talks.',
    '',
    'Type "join" to get notified about new events.',
  ],
  join: [
    'Join .Hack!',
    '───────────',
    'Visit /join to sign up.',
    'Open to all SMU students.',
    '',
    'No experience required — just curiosity.',
  ],
  socials: [
    'Connect with us:',
    '─────────────────',
    'GitHub: github.com/smu-dothack',
    '',
    'More links at /contact',
  ],
  whoami: [
    'You are a curious visitor.',
    'Perhaps a future .Hack member?',
    '',
    '> hint: type "join"',
  ],
  ls: ['about.md    events/    projects/', 'join.md     community/ contact.md'],
  pwd: ['/home/dothack'],
  date: [new Date().toString()],
};

function writeLine(output: HTMLElement, text: string, className?: string): void {
  const line = document.createElement('div');
  line.textContent = text;
  if (className) line.className = className;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function writeLines(output: HTMLElement, lines: string[], className?: string): void {
  lines.forEach((l) => writeLine(output, l, className));
}

function processCommand(output: HTMLElement, cmd: string): void {
  const trimmed = cmd.trim().toLowerCase();

  writeLine(output, `$ ${trimmed}`, 'text-muted');

  if (trimmed === 'clear') {
    output.innerHTML = '';
    return;
  }

  if (trimmed.startsWith('echo ')) {
    writeLine(output, trimmed.slice(5));
    writeLine(output, '');
    return;
  }

  const response = commands[trimmed];
  if (response) {
    writeLines(output, response);
  } else {
    writeLine(output, `command not found: ${trimmed}`, 'text-red-400');
    writeLine(output, 'Type "help" for available commands.', 'text-muted');
  }
  writeLine(output, '');
}

export function initTerminal(): void {
  const panel = document.getElementById('panel-terminal');
  if (!panel) return;

  panel.innerHTML = `
    <div class="flex flex-col h-full font-mono text-sm">
      <div id="terminal-output" class="flex-1 overflow-y-auto p-3 space-y-1"></div>
      <div class="flex items-center border-t border-border/50 p-3">
        <span class="text-accent mr-2">$</span>
        <input id="terminal-input" type="text"
          class="flex-1 bg-transparent text-text outline-none placeholder-muted/50"
          placeholder="Type 'help' to start..." autocomplete="off" spellcheck="false">
      </div>
    </div>`;

  const output = document.getElementById('terminal-output')!;
  const input = document.getElementById('terminal-input') as HTMLInputElement;

  // Welcome message
  writeLines(
    output,
    [
      '┌──────────────────────┐',
      '│   Welcome to .Hack   │',
      '│   ─────────────────   │',
      '│   Type "help" to      │',
      '│   get started.        │',
      '└──────────────────────┘',
      '',
    ],
    'text-accent'
  );

  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(output, input.value);
      input.value = '';
    }
  });

  panel.addEventListener('click', () => input.focus());
  input.focus();
}
