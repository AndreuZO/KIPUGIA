// Microinteracciones: tilt 3D + brillo en cards, botones magnéticos y progreso del timeline.
const canHover = matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;

const setVars = (el, vars) => Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));

export function initInteractions() {
  if (canHover) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        setVars(card, {
          '--ry': `${(x - 0.5) * 10}deg`,
          '--rx': `${(0.5 - y) * 10}deg`,
          '--gx': `${x * 100}%`,
          '--gy': `${y * 100}%`,
        });
      });
      card.addEventListener('pointerleave', () => setVars(card, { '--rx': '0deg', '--ry': '0deg' }));
    });

    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        setVars(btn, {
          '--mx': `${(e.clientX - r.left - r.width / 2) * 0.25}px`,
          '--my': `${(e.clientY - r.top - r.height / 2) * 0.35}px`,
        });
      });
      btn.addEventListener('pointerleave', () => setVars(btn, { '--mx': '0px', '--my': '0px' }));
    });
  }

  // La línea del timeline se llena según el scroll dentro de la sección
  const timeline = document.getElementById('timeline');
  if (!timeline) return;
  const update = () => {
    const r = timeline.getBoundingClientRect();
    const p = (innerHeight * 0.85 - r.top) / (innerHeight * 0.5);
    timeline.style.setProperty('--progress', Math.max(0, Math.min(1, p)).toFixed(3));
  };
  addEventListener('scroll', update, { passive: true });
  update();
}
