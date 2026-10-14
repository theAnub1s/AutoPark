/* ==========================================================================
   REQUISITO TÉCNICO 1: Selección de elementos DOM con comentarios explicativos
   ========================================================================== */

<<<<<<< HEAD
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
=======
const profileForm =
    document.getElementById("profileForm");

const nombre =
    document.getElementById("nombre");

const correo =
    document.getElementById("correo");

const telefono =
    document.getElementById("telefono");

const tipoCuenta =
    document.getElementById("tipoCuenta");

const ciudad =
    document.getElementById("ciudad");

const contrasena =
    document.getElementById("contrasena");

const btnTogglePassword =
    document.getElementById("btnTogglePassword");


/* =========================
   BOTONES
========================= */

const btnEditar =
    document.getElementById("btnEditar");

const btnGuardar =
    document.getElementById("btnGuardar");

const btnCancelar =
    document.getElementById("btnCancelar");

const btnLogout =
    document.getElementById("btnLogout");


/* =========================
   INFORMACIÓN DEL USUARIO
========================= */

const userNameTitle =
    document.querySelector(".user-name");

const avatarInitials =
    document.querySelector("#avatarInitials");

const perfilMensaje =
    document.getElementById("perfilMensaje");


/* =========================
   INPUTS DEL FORMULARIO
========================= */

const inputs =
    document.querySelectorAll(
        "#profileForm .form-control"
    );


/* =========================
   VARIABLES
========================= */
>>>>>>> ef27b2bcd506d51dcb4573d4d51a40b79ba548bb

let valoresIniciales = {};

let modoEdicion = false;


/* =========================
   MENSAJES DEL PERFIL
========================= */

function mostrarMensaje(texto, tipo) {

    if (!perfilMensaje) {
        return;
    }

    perfilMensaje.textContent = texto;

    perfilMensaje.className = "alert";

    if (tipo === "exito") {

        perfilMensaje.classList.add(
            "alert-success"
        );

    } else if (tipo === "error") {

        perfilMensaje.classList.add(
            "alert-danger"
        );

    } else {

        perfilMensaje.classList.add(
            "alert-info"
        );

    }

    perfilMensaje.classList.remove("d-none");
}


function ocultarMensaje() {

    if (!perfilMensaje) {
        return;
    }

    perfilMensaje.textContent = "";

    perfilMensaje.classList.add("d-none");

}


<<<<<<< HEAD
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
=======
/* =========================
   CARGAR USUARIO TEMPORAL
========================= */
function cargarUsuario() {

    const usuarioGuardado =
        localStorage.getItem("usuarioActual");

    if (!usuarioGuardado) {
        return;
    }

>>>>>>> ef27b2bcd506d51dcb4573d4d51a40b79ba548bb
    try {
        const usuario = JSON.parse(usuarioGuardado);

<<<<<<< HEAD
        if (usuario.nombre && nombre) {
            nombre.value = usuario.nombre;
            userNameTitle.textContent = usuario.nombre;
            actualizarIniciales(usuario.nombre);
        }

        if (usuario.correo && correo) {
            correo.value = usuario.correo;
        }
=======
        const usuario =
            JSON.parse(usuarioGuardado);

        if (
            usuario.nombre && nombre) {

            nombre.value = usuario.nombre;

            if (userNameTitle) {

                userNameTitle.textContent = usuario.nombre;

            }

            actualizarIniciales(
                usuario.nombre
            );

        }

        if (
            usuario.correo &&
            correo
        ) {

            correo.value =
                usuario.correo;

        }

        if (
            usuario.telefono &&
            telefono
        ) {

            telefono.value =
                usuario.telefono;

        }

        if (
            usuario.ciudad &&
            ciudad
        ) {

            ciudad.value =
                usuario.ciudad;

        }

>>>>>>> ef27b2bcd506d51dcb4573d4d51a40b79ba548bb
    } catch (error) {
        console.warn("No se pudieron cargar los datos del usuario.");
    }
}

// Manejador con nombre para el envío del formulario (Requisito 2)
function manejarEnvioFormulario(evento) {
    evento.preventDefault();

<<<<<<< HEAD
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
=======
/* =========================
   ACTUALIZAR INICIALES
========================= */

function actualizarIniciales(nombreCompleto) {

    if (!avatarInitials) {
        return;
    }

    const palabras =
        nombreCompleto
            .trim()
            .split(/\s+/)
            .filter(Boolean);

    const iniciales =
        palabras
            .slice(0, 2)
            .map(function obtenerInicial(palabra) {

                return palabra
                    .charAt(0)
                    .toUpperCase();

            })
            .join("");

    avatarInitials.textContent =
        iniciales || "U";
>>>>>>> ef27b2bcd506d51dcb4573d4d51a40b79ba548bb

    btnEditar.disabled = false;
    btnGuardar.disabled = true;
    btnCancelar.disabled = true;
}

if (profileForm) {
    profileForm.addEventListener("submit", manejarEnvioFormulario);
}


<<<<<<< HEAD
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
=======
/* =========================
   GUARDAR VALORES ORIGINALES
========================= */

function guardarValoresIniciales() {

    valoresIniciales = {};

    inputs.forEach(function guardarCampo(input) {

        valoresIniciales[input.id] =
            input.value;

    });

}
>>>>>>> ef27b2bcd506d51dcb4573d4d51a40b79ba548bb

    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("usuarioActual");
    sessionStorage.removeItem("estacionamientoSeleccionado");
    sessionStorage.removeItem("reservaPendiente");

<<<<<<< HEAD
    window.location.href = "login.html";
}
=======
/* =========================
   RESTAURAR VALORES
========================= */

function restaurarValoresIniciales() {

    inputs.forEach(function restaurarCampo(input) {

        if (
            Object.prototype.hasOwnProperty.call(
                valoresIniciales,
                input.id
            )
        ) {

            input.value =
                valoresIniciales[input.id];

        }

        input.classList.remove(
            "is-valid",
            "is-invalid"
        );

    });

}


/* =========================
   HABILITAR EDICIÓN
========================= */

function manejarEdicion() {

    ocultarMensaje();

    guardarValoresIniciales();

    modoEdicion = true;

    inputs.forEach(function habilitarCampo(input) {

        if (
            input.id !== "tipoCuenta" &&
            input.id !== "contrasena"
        ) {

            input.disabled = false;

        }

    });

    if (btnEditar) {
        btnEditar.disabled = true;
    }

    if (btnGuardar) {
        btnGuardar.disabled = false;
    }

    if (btnCancelar) {
        btnCancelar.disabled = false;
    }

    if (nombre) {
        nombre.focus();
    }

}


/* =========================
   CANCELAR EDICIÓN
========================= */

function manejarCancelacion() {
    restaurarValoresIniciales();
    modoEdicion = false;
    deshabilitarCampos();
    ocultarMensaje();
}


/* =========================
   DESHABILITAR CAMPOS
========================= */

function deshabilitarCampos() {

    inputs.forEach(function deshabilitarCampo(input) {

        input.disabled = true;

    });

    if (btnEditar) {
        btnEditar.disabled = false;
    }

    if (btnGuardar) {
        btnGuardar.disabled = true;
    }

    if (btnCancelar) {
        btnCancelar.disabled = true;
    }

}


/* =========================
   VALIDAR CAMPOS
========================= */

function manejarValidacion(event) {

    const campo = event.target;

    if (!campo.matches("input.form-control")) {
        return;
    }

    if (campo.disabled) {
        return;
    }

    let campoValido = true;

    switch (campo.id) {

        case "nombre":

            campoValido =
                campo.value.trim().length >= 3;

            break;

        case "correo":

            campoValido =
                campo.value.trim() !== "" &&
                campo.validity.valid;

            break;

        case "telefono": {

            const telefonoLimpio =
                campo.value.replace(/\D/g, "");

            campoValido =
                campo.value.trim() === "" ||
                telefonoLimpio.length === 10;

            break;

        }

        case "ciudad":

            campoValido =
                campo.value.trim().length >= 2;

            break;

        default:

            return;

    }

    campo.classList.toggle(
        "is-valid",
        campoValido &&
        campo.value.trim() !== ""
    );

    campo.classList.toggle(
        "is-invalid",
        !campoValido
    );

}


/* =========================
   VALIDAR FORMULARIO
========================= */

function validarPerfil() {

    let formularioValido = true;

    ocultarMensaje();

    inputs.forEach(function limpiarValidacion(input) {

        input.classList.remove(
            "is-valid",
            "is-invalid"
        );

    });

    if (nombre.value.trim().length < 3) {

        nombre.classList.add("is-invalid");

        mostrarMensaje(
            "El nombre debe contener al menos 3 caracteres.",
            "error"
        );

        nombre.focus();

        formularioValido = false;

        return formularioValido;

    }

    nombre.classList.add("is-valid");

    if (
        correo.value.trim() === "" ||
        !correo.validity.valid
    ) {

        correo.classList.add("is-invalid");

        mostrarMensaje(
            "Ingresa un correo electrónico válido.",
            "error"
        );

        correo.focus();

        formularioValido = false;

        return formularioValido;

    }

    correo.classList.add("is-valid");

    const telefonoLimpio =
        telefono.value.replace(/\D/g, "");

    if (
        telefono.value.trim() !== "" &&
        telefonoLimpio.length !== 10
    ) {

        telefono.classList.add("is-invalid");

        mostrarMensaje(
            "El teléfono debe contener 10 dígitos.",
            "error"
        );

        telefono.focus();

        formularioValido = false;

        return formularioValido;

    }

    if (telefono.value.trim() !== "") {

        telefono.classList.add("is-valid");

    }

    if (ciudad.value.trim().length < 2) {

        ciudad.classList.add("is-invalid");

        mostrarMensaje(
            "Ingresa una ciudad válida.",
            "error"
        );

        ciudad.focus();

        formularioValido = false;

        return formularioValido;

    }

    ciudad.classList.add("is-valid");

    return formularioValido;

}


/* =========================
   GUARDAR CAMBIOS
========================= */

function manejarGuardado(event) {

    event.preventDefault();

    if (!modoEdicion) {
        return;
    }

    if (!validarPerfil()) {
        return;
    }

    const nuevoNombre =
        nombre.value.trim();

    const nuevoCorreo =
        correo.value.trim();

    const usuarioActualizado = {

        nombre: nuevoNombre,

        correo: nuevoCorreo,

        telefono: telefono.value.trim(),

        ciudad: ciudad.value.trim()

    };

    try {

        localStorage.setItem(
            "usuarioActual",
            JSON.stringify(usuarioActualizado)
        );

    } catch (error) {

        mostrarMensaje(
            "No fue posible guardar los cambios en este navegador.",
            "error"
        );

        return;

    }

    if (userNameTitle) {

        userNameTitle.textContent =
            nuevoNombre;

    }

    actualizarIniciales(nuevoNombre);

    modoEdicion = false;

    deshabilitarCampos();

    guardarValoresIniciales();

    mostrarMensaje(
        "Los cambios de tu perfil se guardaron correctamente en este navegador.",
        "exito"
    );

}


/* =========================
   CERRAR SESIÓN
========================= */
>>>>>>> ef27b2bcd506d51dcb4573d4d51a40b79ba548bb

function manejarCierreSesion() {

    const navbarLogout =
        document.getElementById("logoutButton");

    if (
        navbarLogout &&
        navbarLogout !== btnLogout
    ) {

        navbarLogout.click();

        return;

    }

    localStorage.removeItem("sesionActiva");

    localStorage.removeItem("usuarioActual");

    sessionStorage.removeItem(
        "estacionamientoSeleccionado"
    );

    sessionStorage.removeItem(
        "reservaPendiente"
    );

    window.location.href = "login.html";

}


/* =========================
   MOSTRAR / OCULTAR CONTRASEÑA
========================= */

function manejarMostrarContrasena() {
    if (!contrasena) {
        return;
    }

    const esPassword = contrasena.type === "password";
    contrasena.type = esPassword ? "text" : "password";

    const icono = btnTogglePassword.querySelector("i");
    if (icono) {
        icono.classList.toggle("bi-eye");
        icono.classList.toggle("bi-eye-slash");
    }
}


/* =========================
   REGISTRO DE EVENTOS
========================= */

if (btnEditar) {

    btnEditar.addEventListener(
        "click",
        manejarEdicion
    );

}

if (btnCancelar) {

    btnCancelar.addEventListener(
        "click",
        manejarCancelacion
    );

}

if (profileForm) {

    profileForm.addEventListener(
        "submit",
        manejarGuardado
    );

    profileForm.addEventListener(
        "input",
        manejarValidacion
    );

}

if (btnLogout) {
<<<<<<< HEAD
    btnLogout.addEventListener("click", manejarCierreSesion);
}
=======

    btnLogout.addEventListener(
        "click",
        manejarCierreSesion
    );

}

if (btnTogglePassword) {
    btnTogglePassword.addEventListener(
        "click",
        manejarMostrarContrasena
    );
}


/* =========================
   INICIALIZACIÓN
========================= */

cargarUsuario();

deshabilitarCampos();
>>>>>>> ef27b2bcd506d51dcb4573d4d51a40b79ba548bb
