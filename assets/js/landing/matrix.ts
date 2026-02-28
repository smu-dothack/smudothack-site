/**
 * Matrix rain animation for the landing page interactive panel.
 * Interactive: characters speed up and glow on mouse hover.
 */

const FONT_SIZE = 14;
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*(){}[]|<>/\\~.Hack';

let matrixCanvas: HTMLCanvasElement;
let matrixCtx: CanvasRenderingContext2D;
let columns: number;
let drops: number[];
let mouseX = -1;
let mouseY = -1;
let animationId: number | null = null;

function resize(): void {
  const panel = matrixCanvas.parentElement!;
  matrixCanvas.width = panel.clientWidth;
  matrixCanvas.height = panel.clientHeight;
  columns = Math.floor(matrixCanvas.width / FONT_SIZE);
  drops = new Array(columns).fill(1);
}

function draw(): void {
  matrixCtx.fillStyle = 'rgba(26, 26, 26, 0.05)';
  matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
  matrixCtx.font = `${FONT_SIZE}px "Fira Code", monospace`;

  for (let i = 0; i < drops.length; i++) {
    const char = CHARS[Math.floor(Math.random() * CHARS.length)];
    const x = i * FONT_SIZE;
    const y = drops[i] * FONT_SIZE;

    const dist = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);

    if (dist < 80) {
      matrixCtx.fillStyle = '#5CEAAB';
      matrixCtx.shadowColor = '#5CEAAB';
      matrixCtx.shadowBlur = 10;
    } else if (dist < 150) {
      matrixCtx.fillStyle = '#4AC892';
      matrixCtx.shadowBlur = 0;
    } else {
      matrixCtx.fillStyle = '#408070';
      matrixCtx.shadowBlur = 0;
    }

    matrixCtx.fillText(char, x, y);
    matrixCtx.shadowBlur = 0;

    if (y > matrixCanvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i] += dist < 100 ? 1.5 : 1;
  }

  animationId = requestAnimationFrame(draw);
}

export function initMatrix(): void {
  const panel = document.getElementById('panel-matrix');
  if (!panel) return;

  panel.innerHTML = '<canvas id="matrix-canvas" class="w-full h-full"></canvas>';

  matrixCanvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
  matrixCtx = matrixCanvas.getContext('2d')!;

  matrixCanvas.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = matrixCanvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  matrixCanvas.addEventListener('mouseleave', () => {
    mouseX = -1;
    mouseY = -1;
  });

  document.addEventListener('panel-activate', ((e: CustomEvent) => {
    if (e.detail.tab === 'matrix') {
      resize();
      if (!animationId) draw();
    } else if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }) as EventListener);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    } else if (
      !document.hidden &&
      !document.getElementById('panel-matrix')?.classList.contains('hidden')
    ) {
      if (!animationId) draw();
    }
  });

  window.addEventListener('resize', resize);
  resize();
  draw();
}
