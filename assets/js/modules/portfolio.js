// Filtro animado del portafolio por categoría.
export function initPortfolio() {
  const buttons = document.querySelectorAll('.filter');
  const projects = document.querySelectorAll('.project');

  buttons.forEach((btn) => btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    buttons.forEach((b) => {
      b.classList.toggle('is-active', b === btn);
      b.setAttribute('aria-selected', b === btn);
    });

    projects.forEach((p) => p.classList.add('is-filtering'));
    setTimeout(() => {
      projects.forEach((p) => {
        const show = filter === 'all' || p.dataset.category === filter;
        p.classList.toggle('is-hidden', !show);
        p.classList.add('is-visible'); // por si aún no se había revelado con el scroll
      });
      // doble rAF: deja que el navegador pinte el estado oculto antes de animar la entrada
      requestAnimationFrame(() => requestAnimationFrame(() => {
        projects.forEach((p) => p.classList.remove('is-filtering'));
      }));
    }, 300);
  }));
}
