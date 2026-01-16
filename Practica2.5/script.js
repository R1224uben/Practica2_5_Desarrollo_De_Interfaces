
const tipoEntrada = document.querySelector(".radio-group");
const msgEntrada = document.getElementById("tipoEntrada");

tipoEntrada.addEventListener("change", () => {
  msgEntrada.textContent = "Tipo de entrada seleccionada";
  msgEntrada.className = "msg msg-ok";
});

document.addEventListener("DOMContentLoaded", () => {
  // Elementos 
  const contenedor = document.getElementById("contenedorPrincipal");
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

  document.getElementById("numTelf").addEventListener("input", validarTelefono);

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

  // Validar discoteca 
  discoteca.addEventListener("change", () => {
    const ok = discoteca.value !== "";
    
    discoteca.className = ok ? "campo-ok" : "campo-error";
    msgDiscoteca.className = `msg ${ok ? "msg-ok" : "msg-error"}`;
    msgDiscoteca.textContent = ok ? "Discoteca válida" : "Selecciona una discoteca";
  });

// TRANSFORMACIÓN A RESUMEN - 
function transformarEnResumen() {
  // BUSCAR RADIO SELECCIONADO (o null si no hay ninguno)
  const entradaSeleccionada = document.querySelector('input[name="entrada"]:checked');
  
  // RECOGER TODOS LOS DATOS DEL FORMULARIO en un objeto
  const datos = {
    nombre: nombre.value.trim(),                    // Nombre sin espacios extra
    telefono: document.getElementById("numTelf").value.trim(),  // Teléfono del input
    email: inputEmail.value.trim(),                 // Email del input
    discoteca: discoteca.value,                     // Valor del select
    //  OBSERVACIONES: Si existe el campo "obs" lo coge, sino cadena vacía
    observaciones: document.getElementById("obs")?.value.trim() || "",
    entrada: entradaSeleccionada?.value || "",      // Precio del radio o vacío
    //  TIPO ENTRADA: Texto del label siguiente al radio (ej: "VIP", "Normal")
    tipoEntrada: entradaSeleccionada?.nextElementSibling.textContent?.trim() || ""
  };

  // DICCIONARIO: Convierte códigos → Nombres bonitos de discotecas
  const nombresDiscotecas = {
    'copernico': 'Copérnico',    // copernico → Copérnico
    'nuit': 'Nuit',             // nuit → Nuit  
    'fabrik': 'Fabrik',         // fabrik → Fabrik
    'mon': 'Mon',               // mon → Mon
    'chapan': 'El Chapandaz'    // chapan → El Chapandaz
  };

  // GENERAR ID ÚNICO: "RES-" + timestamp actual (ej: RES-1705481234567)
  const idReserva = 'RES-' + Date.now();

  // BORRAR TODO el contenedor y crear HTML NUEVO
  contenedor.innerHTML = `
    <div class="resumen-container">
      <!-- HEADER CON TÍTULO DINÁMICO -->
      <div class="resumen-header">
        <!-- ${nombresDiscotecas[datos.discoteca]} → Sustituye ej: Copérnico -->
        <h1>¡RESERVA ${nombresDiscotecas[datos.discoteca]} CONFIRMADA!</h1>
        <div class="reserva-id">ID: ${idReserva}</div>  <!-- ID único -->
      </div>
      
      <div class="resumen-content">
        <!-- SECCIÓN 1: DATOS PERSONALES EN GRID -->
        <div class="resumen-section">
          <h3>Datos personales</h3>
          <div class="info-grid">
            <!-- Cada .info-item es una fila: label + valor -->
            <div class="info-item">
              <div class="info-label">Nombre</div>
              <div class="info-value">${datos.nombre}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Teléfono</div>
              <div class="info-value">${datos.telefono}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Email</div>
              <div class="info-value">${datos.email}</div>
            </div>
            <!-- FECHA/HORA ACTUAL en español -->
            <div class="info-item">
              <div class="info-label">Fecha/Hora</div>
              <div class="info-value">
                ${new Date().toLocaleString('es-ES', { 
                  weekday: 'long',      // "viernes"
                  year: 'numeric',      // "2026"
                  month: 'long',        // "enero"
                  day: 'numeric',       // "16"
                  hour: '2-digit',      // "08"
                  minute: '2-digit'     // "46"
                })}
              </div>
            </div>
          </div>
        </div>
        
        <!-- SECCIÓN 2: DETALLES ENTRADA -->
        <div class="resumen-section premium">
          <h3>Detalles entrada</h3>
          <!-- Título grande centrado con nombre discoteca -->
          <div style="text-align:center;margin-bottom:20px;">
            <div style="font-size:28px;font-weight:bold;color:#333;margin-bottom:10px;">
              ${nombresDiscotecas[datos.discoteca]}
            </div>
            <!-- Tipo: "VIP", "Normal", etc del label del radio -->
            <div style="font-size:20px;color:#666;">${datos.tipoEntrada}</div>
          </div>
          <!-- PRECIO del radio seleccionado + símbolo € -->
          <div class="precio-final">${datos.entrada}€</div>
          <!-- CÓDIGO QR simulado con el ID -->
          <div style="text-align:center;margin:20px 0;font-size:12px;color:#666;">
            Muestra este código en entrada<br><strong>${idReserva}</strong>
          </div>
        </div>
        
        <!-- SECCIÓN OPCIONAL: Solo aparece si hay observaciones -->
        ${datos.observaciones ? `
          <div class="resumen-section">
            <h3>Observaciones</h3>
            <div class="observaciones">${datos.observaciones}</div>
          </div>
        ` : ''}
      </div>
      
      <!-- FOOTER CON BOTONES -->
      <div class="resumen-footer">
        <p style="margin-bottom:20px;opacity:0.9;">¡Disfruta tu noche! Presenta esta página</p>
        <div class="botones-resumen">
          <!-- onclick="nuevaReserva()" → función global abajo -->
          <button class="btn-resumen btn-nuevo" onclick="nuevaReserva()">Nueva reserva</button>
          <!-- window.print() → imprime página actual -->
          <button class="btn-resumen btn-imprimir" onclick="window.print()">Imprimir</button>
        </div>
      </div>
    </div>
  `;

  //  CAMBIAR CLASE BODY para aplicar CSS especial del resumen
  document.body.classList.add('modo-resumen');
}

// FUNCIÓN GLOBAL para los botones del resumen
window.nuevaReserva = function() {
  location.reload();  // Recarga toda la página → formulario original
};


  // SUBMIT
  form.addEventListener("submit", (e) => {
    const valorNombre = nombre.value.trim();
    const nombreOk = valorNombre && comprobar.test(valorNombre);
    const discotecaOk = discoteca.value !== "";
    const telefonoOk = validarTelefono();
    const entradaOK = msgEntrada.textContent === "Tipo de entrada seleccionada";
    const emailOk = validarEmail();
    
    // PREVENCION DE ERRORES
    if (!nombreOk) {
      nombre.className = "campo-error";
      msgNombre.className = "msg msg-error";
      msgNombre.textContent = "Solo letras y espacios, mínimo 3 caracteres";
    }
    
    if (!discotecaOk) {
      discoteca.className = "campo-error";
      msgDiscoteca.className = "msg msg-error";
      msgDiscoteca.textContent = "Selecciona una discoteca";
    }
    
    if (!entradaOK) {
      msgEntrada.className = "msg msg-error";
      msgEntrada.textContent = "Selecciona un tipo de entrada";
    }
    
    // 
    if (!nombreOk || !discotecaOk || !telefonoOk || !entradaOK || !emailOk) {
      e.preventDefault();
      alert("Por favor, corrige los errores en el formulario antes de enviarlo.");
      return;
    }
    
    if (!navigator.onLine) {
      e.preventDefault();
      alert("Se necesita conexión a internet para enviar el formulario");
      return;
    }

    // transformar
    transformarEnResumen();
  });
});
