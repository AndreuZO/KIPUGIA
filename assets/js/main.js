// Punto de entrada: cada módulo es independiente y se puede quitar sin romper los demás.
import { initHeader } from './modules/header.js';
import { initNetwork } from './modules/network.js';
import { initReveal } from './modules/reveal.js';
import { initInteractions } from './modules/interactions.js';
import { initPortfolio } from './modules/portfolio.js';
import { initForm } from './modules/form.js';

window.lucide?.createIcons();
document.getElementById('year').textContent = new Date().getFullYear();

initHeader();
initNetwork(document.getElementById('heroCanvas'));
initReveal();
initInteractions();
initPortfolio();
initForm(document.getElementById('contactForm'));
