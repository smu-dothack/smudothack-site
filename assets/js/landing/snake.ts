/**
 * Retro Snake game for the landing page interactive panel.
 * Uses HTML5 Canvas with .Hack mint green branding.
 */

interface Point {
  x: number;
  y: number;
}

const GRID_SIZE = 12;
const TICK_MS = 120;

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let scoreEl: HTMLElement;
let tileCountX: number;
let tileCountY: number;
let snake: Point[];
let food: Point;
let dx = 0;
let dy = 0;
let score = 0;
let gameLoop: ReturnType<typeof setInterval> | null = null;
let gameOver = false;

function resize(): void {
  const container = canvas.parentElement!;
  canvas.width = container.clientWidth - 8;
  canvas.height = container.clientHeight - 52;
  tileCountX = Math.floor(canvas.width / GRID_SIZE);
  tileCountY = Math.floor(canvas.height / GRID_SIZE);
}

function placeFood(): void {
  food = {
    x: Math.floor(Math.random() * tileCountX),
    y: Math.floor(Math.random() * tileCountY),
  };
  for (const seg of snake) {
    if (seg.x === food.x && seg.y === food.y) {
      placeFood();
      return;
    }
  }
}

function reset(): void {
  resize();
  const mid = { x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2) };
  snake = [{ x: mid.x, y: mid.y }];
  dx = 0;
  dy = 0;
  score = 0;
  gameOver = false;
  scoreEl.textContent = '0';
  placeFood();
  if (gameLoop) clearInterval(gameLoop);
  gameLoop = setInterval(update, TICK_MS);
}

function draw(): void {
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Food
  ctx.fillStyle = '#4AC892';
  ctx.fillRect(food.x * GRID_SIZE + 1, food.y * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2);

  // Snake
  snake.forEach((seg, i) => {
    ctx.fillStyle = i === 0 ? '#5CEAAB' : '#3DCEA0';
    ctx.fillRect(seg.x * GRID_SIZE + 1, seg.y * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2);
  });

  // Game over overlay
  if (gameOver) {
    ctx.fillStyle = 'rgba(26, 26, 26, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#5CEAAB';
    ctx.font = '16px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = '12px "Fira Code", monospace';
    ctx.fillStyle = '#9CA3AF';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 15);
    ctx.fillText('Press R to restart', canvas.width / 2, canvas.height / 2 + 35);
  }
}

function update(): void {
  if (gameOver) return;
  if (dx === 0 && dy === 0) {
    draw();
    return;
  }

  const head: Point = {
    x: (snake[0].x + dx + tileCountX) % tileCountX,
    y: (snake[0].y + dy + tileCountY) % tileCountY,
  };

  // Self collision
  if (snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
    gameOver = true;
    draw();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = String(score);
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

export function initSnake(): void {
  const panel = document.getElementById('panel-snake');
  if (!panel) return;

  panel.innerHTML = `
    <div class="flex flex-col h-full p-3">
      <div class="flex items-center justify-between mb-2 px-1">
        <span class="text-xs font-mono text-muted">Score: <span id="snake-score">0</span></span>
        <span class="text-xs font-mono text-muted">Arrow keys / WASD</span>
        <button id="snake-restart" class="text-xs font-mono text-accent hover:text-accent-hover transition-colors">Restart</button>
      </div>
      <canvas id="snake-canvas" class="rounded bg-bg flex-1" style="image-rendering: pixelated;"></canvas>
    </div>`;

  canvas = document.getElementById('snake-canvas') as HTMLCanvasElement;
  ctx = canvas.getContext('2d')!;
  scoreEl = document.getElementById('snake-score')!;

  document.getElementById('snake-restart')!.addEventListener('click', reset);

  // Keyboard controls
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (document.getElementById('panel-snake')?.classList.contains('hidden')) return;

    switch (e.key) {
      case 'ArrowUp': case 'w': case 'W':
        if (dy !== 1) { dx = 0; dy = -1; } e.preventDefault(); break;
      case 'ArrowDown': case 's': case 'S':
        if (dy !== -1) { dx = 0; dy = 1; } e.preventDefault(); break;
      case 'ArrowLeft': case 'a': case 'A':
        if (dx !== 1) { dx = -1; dy = 0; } e.preventDefault(); break;
      case 'ArrowRight': case 'd': case 'D':
        if (dx !== -1) { dx = 1; dy = 0; } e.preventDefault(); break;
      case 'r': case 'R':
        if (gameOver) reset(); break;
    }
  });

  // Touch controls
  let touchStartX = 0;
  let touchStartY = 0;

  canvas.addEventListener('touchstart', (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  });

  canvas.addEventListener('touchmove', (e: TouchEvent) => e.preventDefault(), { passive: false });

  canvas.addEventListener('touchend', (e: TouchEvent) => {
    const diffX = e.changedTouches[0].clientX - touchStartX;
    const diffY = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0 && dx !== -1) { dx = 1; dy = 0; }
      else if (diffX < 0 && dx !== 1) { dx = -1; dy = 0; }
    } else {
      if (diffY > 0 && dy !== -1) { dx = 0; dy = 1; }
      else if (diffY < 0 && dy !== 1) { dx = 0; dy = -1; }
    }
  });

  // Re-init on tab activate
  document.addEventListener('panel-activate', ((e: CustomEvent) => {
    if (e.detail.tab === 'snake' && gameOver) reset();
  }) as EventListener);

  reset();
}
