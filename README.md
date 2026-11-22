# KIPUGIA — Web corporativa

Sitio estático (HTML + CSS + JavaScript con módulos ES). No necesita build ni `npm install`.

## Cómo abrirlo en VS Code
Los módulos JS no cargan con doble clic (`file://`); hace falta un servidor local:
- Extensión **Live Server** → clic derecho en `index.html` → *Open with Live Server*, o
- `python -m http.server 5500` y abrir http://localhost:5500

## Estructura
```
index.html                 Todas las secciones (comentadas con ===== SECCIÓN =====)
assets/css/main.css        Estilos; tokens de la paleta oficial en :root
assets/js/main.js          Punto de entrada
assets/js/modules/
  header.js                Header al hacer scroll, barra de progreso, menú móvil
  network.js               Red de nodos animada del hero (canvas)
  reveal.js                Animaciones al hacer scroll, títulos por palabra, contadores
  interactions.js          Tilt 3D en cards, botones magnéticos, línea del proceso
  portfolio.js             Filtro de proyectos
  form.js                  Validación del formulario de contacto
assets/img/                Favicon; aquí van las imágenes reales
```

## Pendientes para producción
- Reemplazar el isotipo placeholder (`<symbol id="kipugia-mark">` en `index.html` y `favicon.svg`) por el SVG oficial.
- Reemplazar las imágenes de `picsum.photos` por las reales en `assets/img/`.
- Cambiar textos lorem ipsum, correo, teléfono y número de WhatsApp (`wa.me/51900000000`).
- Conectar el formulario a un backend (Formspree, EmailJS o API propia): hoy solo valida.
