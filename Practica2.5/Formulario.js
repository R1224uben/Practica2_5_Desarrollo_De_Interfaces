
document.addEventListener("DOMContentLoaded", () => {

  // Elementos 
  const form = document.getElementById("formMatricula");
  const nombre = document.getElementById("nombre");
  const msgNombre = document.getElementById("msgNombre");
  const discoteca = document.getElementById("discoteca");
  const msgDiscoteca = document.getElementById("msgDiscoteca");

  // letras, tildes, espacios (mín 3 chars)
  const comprobar = /^[A-Za-zÁÉÍÓÚáéíóúÄËÏÖÜäëïöüÑñ\s]{3,}$/;

  // Validar nombre 
  nombre.addEventListener("input", () => {
    const valor = nombre.value.trim();
    const ok = valor && comprobar.test(valor);
    
    nombre.className = ok ? "campo-ok" : "campo-error";
    msgNombre.className = `msg ${ok ? "msg-ok" : "msg-error"}`;
    msgNombre.textContent = ok ? "Nombre válido" : "Solo letras y espacios, mínimo 3 caracteres";
  });

  // Validar discoteca 
  discoteca.addEventListener("change", () => {
    const ok = discoteca.value !== "";
    
    discoteca.className = ok ? "campo-ok" : "campo-error";
    msgDiscoteca.className = `msg ${ok ? "msg-ok" : "msg-error"}`;
    msgDiscoteca.textContent = ok ? "Discoteca válida" : "Selecciona una discoteca";
  });

  // Bloquear envío
  form.addEventListener("submit", (e) => {
    const valorNombre = nombre.value.trim();
    const nombreOk = valorNombre && comprobar.test(valorNombre);
    const discotecaOk = discoteca.value !== "";
    
    if (!nombreOk || !discotecaOk) {
      e.preventDefault();
      (nombreOk ? discoteca : nombre).focus();
    }
  });
});
