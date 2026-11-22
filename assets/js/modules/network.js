// Fondo del hero: red de nodos conectados (inspirada en el isotipo) que reacciona al mouse.
const COLORS = ['#087BC1', '#00C7D9', '#00CBA5'];
const LINK_DIST = 140;
const MOUSE_DIST = 180;

export function initNetwork(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mouse = { x: -9999, y: -9999 };
  let nodes = [];
  let w = 0, h = 0, raf = 0, running = false;

  const resize = () => {
    const dpr = Math.min(devicePixelRatio, 2);
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(110, Math.floor((w * h) / 12000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    if (reduced) frame();
  };

  const frame = () => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      if (!reduced) {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
      }

      // Atracción suave hacia el cursor
      const mdx = mouse.x - a.x, mdy = mouse.y - a.y;
      const md = Math.hypot(mdx, mdy);
      if (md < MOUSE_DIST) {
        a.x += mdx * 0.012;
        a.y += mdy * 0.012;
        ctx.strokeStyle = `rgba(0,199,217,${1 - md / MOUSE_DIST})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }

      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK_DIST) {
          ctx.strokeStyle = `rgba(8,123,193,${(1 - d / LINK_DIST) * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }

      ctx.fillStyle = a.c;
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
    }
  };

  const loop = () => { frame(); raf = requestAnimationFrame(loop); };

  const hero = canvas.parentElement;
  hero.addEventListener('pointermove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });

  addEventListener('resize', resize);
  resize();
  if (reduced) return;

  // Pausa la animación cuando el hero no se ve (ahorra CPU/batería)
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !running) { running = true; loop(); }
    else if (!entry.isIntersecting) { running = false; cancelAnimationFrame(raf); }
  }).observe(canvas);
}
