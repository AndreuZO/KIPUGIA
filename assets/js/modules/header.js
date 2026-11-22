// Header: estado al hacer scroll, barra de progreso, menú móvil y link activo.
export function initHeader() {
  const header = document.getElementById('header');
  const progress = document.querySelector('.scroll-progress');
  const toggle = document.getElementById('navToggle');

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    header.classList.toggle('is-scrolled', scrollY > 40);
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setOpen = (open) => {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  toggle.addEventListener('click', () => setOpen(!document.body.classList.contains('nav-open')));
  document.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));

  // Marca el link de la sección visible
  const navLinks = document.querySelectorAll('.nav__link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      navLinks.forEach((l) => l.classList.toggle('is-active', l.hash === `#${target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s));
}
