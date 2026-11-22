// Formulario de contacto: validación en el cliente.
// shortcut: no envía a ningún servidor; conectar a un backend/Formspree/EmailJS cuando exista.
export function initForm(form) {
  if (!form) return;
  const status = form.querySelector('.form__status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach((field) => {
      const ok = field.checkValidity() && field.value.trim() !== '';
      field.closest('.field').classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });

    status.classList.toggle('is-error', !valid);
    if (!valid) {
      status.textContent = 'Por favor completa todos los campos correctamente.';
      return;
    }
    status.textContent = '¡Gracias! Te contactaremos pronto.';
    form.reset();
  });

  form.addEventListener('input', (e) => e.target.closest('.field')?.classList.remove('is-invalid'));
}
