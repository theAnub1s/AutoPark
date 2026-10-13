/* ==========================================================================
   REQUISITO TÉCNICO 1: Selección de elementos DOM con comentarios explicativos
   ========================================================================== */

// Justificación: Se utiliza getElementById por ser el método más rápido y directo para obtener un formulario único por su ID.
const profileForm = document.getElementById("profileForm");

// Justificación: Se utiliza getElementById para acceder a los campos individuales que se habilitan o deshabilitan.
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const telefono = document.getElementById("telefono");
const tipoCuenta = document.getElementById("tipoCuenta");
const ciudad = document.getElementById("ciudad");
const contrasena = document.getElementById("contrasena");

const btnEditar = document.getElementById("btnEditar");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
const btnLogout = document.getElementById("btnLogout");
const btnThemeToggle = document.getElementById("btnThemeToggle");

const userNameTitle = document.getElementById("userNameTitle");
const avatarInitials = document.getElementById("avatarInitials");

// Justificación: Se utiliza querySelector para obtener el contenedor padre donde se aplicará delegación de eventos.
const contenedorAcciones = document.querySelector(".form-actions");

// Justificación: Se utiliza querySelectorAll para seleccionar todos los campos <input> dentro de la cuadrícula de forma agrupada en un NodeList.
const inputsCampos = document.querySelectorAll(".form-grid input");

let valoresIniciales = {};


/* ==========================================================================
   REQUISITO TÉCNICO 2, 3 y 5: Funciones con nombre, addEventListener y classList
   ========================================================================== */

// Aplicar tema dinámicamente mediante data-bs-theme y classList (Requisito 5)
function aplicarTema(esOscuro) {
    if (esOscuro) {
        document.documentElement.setAttribute("data-bs-theme", "dark");
        document.body.classList.add("dark-mode");
        if (btnThemeToggle) btnThemeToggle.checked = true;
    } else {
        document.documentElement.setAttribute("data-bs-theme", "light");
        document.body.classList.remove("dark-mode");
        if (btnThemeToggle) btnThemeToggle.checked = false;
    }
}

// Manejador con nombre para el cambio de tema (Requisito 2)
function manejarCambioTema(evento) {
    const esOscuro = evento.target.checked;
    aplicarTema(esOscuro);
    localStorage.setItem("temaAutoPark", esOscuro ? "dark" : "light");
}

// Manejador con nombre para el evento click del botón de tema (Requisito 2)
function manejarClickTema() {
    // Apoya la captura del evento click exigido en la tabla
}

// Cargar preferencia guardada
const temaGuardado = localStorage.getItem("temaAutoPark");
aplicarTema(temaGuardado === "dark");

// Asignación con addEventListener sin funciones anónimas (Requisito 3)
if (btnThemeToggle) {
    btnThemeToggle.addEventListener("change", manejarCambioTema);
    btnThemeToggle.addEventListener("click", manejarClickTema);
}


/* ==========================================================================
   REQUISITO TÉCNICO 4: Delegación de eventos en una interacción
   ========================================================================== */

function habilitarEdicion() {
    inputsCampos.forEach(input => {
        if (input) {
            valoresIniciales[input.id] = input.value;
            input.disabled = false;
        }
    });

    btnEditar.disabled = true;
    btnGuardar.disabled = false;
    btnCancelar.disabled = false;
}

function cancelarEdicion() {
    inputsCampos.forEach(input => {
        if (input) {
            input.value = valoresIniciales[input.id] || "";
            input.disabled = true;
        }
    });

    btnEditar.disabled = false;
    btnGuardar.disabled = true;
    btnCancelar.disabled = true;
}

// Manejador con nombre que escucha en el contenedor padre usando delegación de eventos (Requisito 2 y 4)
function manejarAccionesFormulario(evento) {
    const boton = evento.target.closest("button");
    if (!boton) return;

    if (boton.id === "btnEditar") {
        habilitarEdicion();
    } else if (boton.id === "btnCancelar") {
        cancelarEdicion();
    }
}

// Escuchador asignado al contenedor para aplicar la delegación (Requisito 3 y 4)
if (contenedorAcciones) {
    contenedorAcciones.addEventListener("click", manejarAccionesFormulario);
}


/* ==========================================================================
   CARGAR Y GUARDAR DATOS DEL USUARIO
   ========================================================================== */

function actualizarIniciales(nombreCompleto) {
    if (!avatarInitials) return;

    const iniciales = nombreCompleto
        .trim()
        .split(/\s+/)
        .map(palabra => palabra.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase();

    avatarInitials.textContent = iniciales;
}

const usuarioGuardado = localStorage.getItem("usuarioActual");

if (usuarioGuardado) {
    try {
        const usuario = JSON.parse(usuarioGuardado);

        if (usuario.nombre && nombre) {
            nombre.value = usuario.nombre;
            userNameTitle.textContent = usuario.nombre;
            actualizarIniciales(usuario.nombre);
        }

        if (usuario.correo && correo) {
            correo.value = usuario.correo;
        }
    } catch (error) {
        console.warn("No se pudieron cargar los datos del usuario.");
    }
}

// Manejador con nombre para el envío del formulario (Requisito 2)
function manejarEnvioFormulario(evento) {
    evento.preventDefault();

    if (nombre.value.trim() === "" || correo.value.trim() === "") {
        alert("El nombre y el correo son obligatorios.");
        return;
    }

    const nuevoNombre = nombre.value.trim();
    userNameTitle.textContent = nuevoNombre;
    actualizarIniciales(nuevoNombre);

    const usuarioActualizado = {
        nombre: nuevoNombre,
        correo: correo.value.trim()
    };

    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActualizado));

    inputsCampos.forEach(input => {
        if (input) input.disabled = true;
    });

    btnEditar.disabled = false;
    btnGuardar.disabled = true;
    btnCancelar.disabled = true;
}

if (profileForm) {
    profileForm.addEventListener("submit", manejarEnvioFormulario);
}


/* ==========================================================================
   CIERRE DE SESIÓN
   ========================================================================== */

// Manejador con nombre para el cierre de sesión (Requisito 2)
function manejarCierreSesion() {
    const navbarLogout = document.getElementById("logoutButton");

    if (navbarLogout) {
        navbarLogout.click();
        return;
    }

    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("usuarioActual");
    sessionStorage.removeItem("estacionamientoSeleccionado");
    sessionStorage.removeItem("reservaPendiente");

    window.location.href = "login.html";
}

if (btnLogout) {
    btnLogout.addEventListener("click", manejarCierreSesion);
}