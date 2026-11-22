// Animaciones de entrada: [data-reveal], títulos [data-split] y contadores [data-count].
export function initReveal() {
  document.querySelectorAll('[data-split]').forEach(splitWords);

  document.querySelectorAll('[data-delay]').forEach((el) => {
    el.style.setProperty('--delay', `${el.dataset.delay}ms`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      target.classList.add('is-visible');
      // Quita el retraso tras entrar, para que el hover/tilt responda al instante
      target.addEventListener('transitionend', () => target.style.setProperty('--delay', '0ms'), { once: true });
      if (target.dataset.count) countUp(target);
      target.querySelectorAll('[data-count]').forEach(countUp);
      observer.unobserve(target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
  // Contadores que no están dentro de un [data-reveal]
  document.querySelectorAll('[data-count]').forEach((el) => {
    if (!el.closest('[data-reveal]')) observer.observe(el);
  });
}

// Divide un título en palabras para animarlas una a una (conserva los <span> internos)
function splitWords(el) {
  let i = 0;
  const wrap = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType !== Node.TEXT_NODE) return wrap(child);
      const frag = document.createDocumentFragment();
      child.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) return frag.append(part);
        const word = document.createElement('span');
        const inner = document.createElement('span');
        word.className = 'word';
        inner.style.setProperty('--i', i++);
        inner.textContent = part;
        word.append(inner);
        frag.append(word);
      });
      child.replaceWith(frag);
    });
  };
  wrap(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-split')));
}

function countUp(el) {
  if (el.dataset.done) return;
  el.dataset.done = '1';
  const target = Number(el.dataset.count);
  const duration = 1800;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
