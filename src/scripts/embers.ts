/**
 * Rising embers — a lightweight 2D canvas particle field.
 * Caps DPR, scales particle count to viewport, pauses off-screen and in background tabs.
 */
interface Spark {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  life: number;
  max: number;
  phase: number;
  hue: number;
}

export function initEmbers(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let w = 0;
  let h = 0;
  let dpr = 1;
  let sparks: Spark[] = [];
  let running = false;
  let visible = true;
  let raf = 0;
  let last = 0;

  const count = () => Math.round(Math.min(70, Math.max(22, (w * h) / 26000)));

  const spawn = (initial = false): Spark => ({
    x: Math.random() * w,
    y: initial ? Math.random() * h : h + 10,
    r: Math.random() * 1.6 + 0.5,
    vy: -(Math.random() * 0.55 + 0.25),
    vx: (Math.random() - 0.5) * 0.25,
    life: 0,
    max: Math.random() * 520 + 380,
    phase: Math.random() * Math.PI * 2,
    hue: 18 + Math.random() * 18,
  });

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const target = count();
    while (sparks.length < target) sparks.push(spawn(true));
    sparks.length = target;
  };

  const frame = (t: number) => {
    const dt = Math.min(48, t - (last || t)) / 16.67;
    last = t;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < sparks.length; i++) {
      const s = sparks[i];
      s.life += dt;
      s.phase += 0.02 * dt;
      s.x += (s.vx + Math.sin(s.phase) * 0.18) * dt;
      s.y += s.vy * dt;
      const p = s.life / s.max;
      if (p >= 1 || s.y < -10) {
        sparks[i] = spawn();
        continue;
      }
      const alpha = Math.sin(Math.PI * p) * 0.85;
      const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
      g.addColorStop(0, `hsla(${s.hue}, 100%, 70%, ${alpha})`);
      g.addColorStop(0.4, `hsla(${s.hue}, 100%, 55%, ${alpha * 0.35})`);
      g.addColorStop(1, `hsla(${s.hue}, 100%, 50%, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (running || !visible || document.hidden) return;
    running = true;
    last = 0;
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  resize();
  let rt: number | undefined;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = window.setTimeout(resize, 150);
  });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    visible ? start() : stop();
  }).observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  start();
}
