const tipoEntrada = document.querySelector(".radio-group");
const msgEntrada = document.getElementById("tipoEntrada");

tipoEntrada.addEventListener("change",() =>{
      msgEntrada.textContent = "Tipo de entrada seleccionada";
      msgEntrada.className = "msg msg-ok";
});

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

  // Validar teléfono
  function validarTelefono() {
    const campoTelefono = document.getElementById("numTelf");
    let campoMsg = document.getElementById("msgEdad");
    let telefono = document.getElementById("numTelf").value;
    if (telefono.length != 9) {
        campoTelefono.className = "campo-error";
        campoMsg.innerText = "El número de teléfono debe tener 9 dígitos. Y contener únicamente números.";
        campoMsg.className = "msg-error";
        return false;
    } else {
        campoTelefono.className = "campo-ok";
        campoMsg.innerText = "";
        return true;
    }
}

      //Funcion Email
      const inputEmail = document.getElementById("email");
      const msgEmail = document.getElementById("msgEmail");

      function validarEmail(){

            msgEmail.classList.remove("msg-error", "msg-ok")
            if(inputEmail.value === "" || !inputEmail.value.includes("@")){
                  msgEmail.textContent = "El correo debe contener un arroba y no debe de estar en blanco ";
                  msgEmail.classList.add("msg-error");
                  return false
            }else{
                  msgEmail.textContent = "El correo es correcto";
                  msgEmail.classList.add("msg-ok");

                  return true
            }
      }
      inputEmail.addEventListener("input", validarEmail);



document
  .getElementById("numTelf")
  .addEventListener("input", validarTelefono);

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
    const telefonoOk = validarTelefono();
    const entradaOK = msgEntrada.textContent === "Tipo de entrada seleccionada";
    const emailOk = validarEmail()
    
    // Mostrar errores en nombre si no es válido
    if (!nombreOk) {
      nombre.className = "campo-error";
      msgNombre.className = "msg msg-error";
      msgNombre.textContent = "Solo letras y espacios, mínimo 3 caracteres";
    }
    
    // Mostrar errores en discoteca si no es válido
    if (!discotecaOk) {
      discoteca.className = "campo-error";
      msgDiscoteca.className = "msg msg-error";
      msgDiscoteca.textContent = "Selecciona una discoteca";
    }
    
    // Mostrar errores en entrada si no es válido
    if (!entradaOK) {
      msgEntrada.className = "msg msg-error";
      msgEntrada.textContent = "Selecciona un tipo de entrada";
    }
    
    if (!nombreOk || !discotecaOk || !telefonoOk || !entradaOK || emailOk) {
      e.preventDefault();
      alert("Por favor, corrige los errores en el formulario antes de enviarlo.");
      return;
    }
    
    if (!navigator.onLine) {
      e.preventDefault();
      alert("Se necesita conexión a internet para enviar el formulario");
      return;
    }

    alert("Formulario enviado con éxito");
  });
});
