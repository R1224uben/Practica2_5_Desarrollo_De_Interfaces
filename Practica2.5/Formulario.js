document.addEventListener("DOMContentLoaded", () => {

  const $ = id => document.getElementById(id);
  const form = $("formMatricula"), nombre = $("nombre"), msgNombre = $("msgNombre");
  const discoteca = $("discoteca"), msgDiscoteca = $("msgDiscoteca");

  const setMsg = (el, msgEl, ok, msg) => {
    el.className = ok ? "campo-ok" : "campo-error";
    msgEl.className = `msg ${ok ? "msg-ok" : "msg-error"}`;
    msgEl.textContent = msg;
  };

  // Validar nombre
  const validarNombre = () => {
    const val = nombre.value.trim();
    if (!val) return false;
    const ok = /^[A-Za-zÁÉÍÓÚáéíóúÄËÏÖÜäëïöüÑñ\s]{3,}$/.test(val);
    setMsg(nombre, msgNombre, ok, ok ? "Nombre válido" : "Solo letras, mínimo 3 caracteres");
    return ok;
  };

  // Validar discoteca
  const validarDiscoteca = () => {
    const ok = discoteca.value !== "";
    setMsg(discoteca, msgDiscoteca, ok, ok ? "Discoteca válida" : "Selecciona una discoteca");
    return ok;
  };

  //Validar al escribir
  nombre.addEventListener("input", validarNombre);
  discoteca.addEventListener("change", validarDiscoteca);

  // Comprobración de campos
  form.addEventListener("submit", e => {
    if (!validarNombre() || !validarDiscoteca()) {
      e.preventDefault();
      alert("Completa nombre y discoteca primero");
    }
  });
});
